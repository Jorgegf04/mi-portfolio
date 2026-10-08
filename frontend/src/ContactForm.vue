<script setup lang="ts">
import { reactive, ref } from 'vue'
import { sendContact, type ContactPayload } from './contactApi'

const form = reactive<ContactPayload>({ name: '', email: '', subject: '', message: '', website: '' })
const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function submit() {
  if (state.value === 'sending') return
  state.value = 'sending'
  errorMessage.value = ''
  try {
    await sendContact({ ...form })
    state.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    form.website = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'No se pudo enviar el mensaje.'
    state.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="form-row">
      <div class="field">
        <label for="contact-name">Nombre</label>
        <input id="contact-name" v-model.trim="form.name" name="name" type="text" autocomplete="name" maxlength="100" required :disabled="state === 'sending'" />
      </div>
      <div class="field">
        <label for="contact-email">Correo electrónico</label>
        <input id="contact-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" maxlength="254" required :disabled="state === 'sending'" />
      </div>
    </div>
    <div class="field">
      <label for="contact-subject">Asunto</label>
      <input id="contact-subject" v-model.trim="form.subject" name="subject" type="text" maxlength="150" required :disabled="state === 'sending'" />
    </div>
    <div class="field">
      <label for="contact-message">Mensaje</label>
      <textarea id="contact-message" v-model.trim="form.message" name="message" rows="5" minlength="20" maxlength="3000" required :disabled="state === 'sending'" placeholder="Cuéntame en qué puedo ayudarte..."></textarea>
      <span class="field-hint">Entre 20 y 3000 caracteres.</span>
    </div>
    <div class="honeypot" aria-hidden="true">
      <label for="contact-website">Deja este campo vacío</label>
      <input id="contact-website" v-model="form.website" name="website" type="text" autocomplete="off" tabindex="-1" />
    </div>
    <div class="form-footer">
      <button class="button button-primary" type="submit" :disabled="state === 'sending'">
        {{ state === 'sending' ? 'Enviando…' : 'Enviar mensaje' }}
        <span aria-hidden="true">↗</span>
      </button>
      <p class="form-note">Responderé a la dirección que indiques.</p>
    </div>
    <p v-if="state === 'success'" class="form-feedback success" role="status">Mensaje enviado. Gracias por escribirme.</p>
    <p v-if="state === 'error'" class="form-feedback error" role="alert">{{ errorMessage }}</p>
  </form>
</template>
