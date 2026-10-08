<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ContactError, sendContact, type ContactPayload } from './contactApi'
import { t, type MessageKey } from './i18n'

const form = reactive<ContactPayload>({ name: '', email: '', subject: '', message: '', website: '' })
const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorKey = ref<MessageKey>('errorGeneric')

async function submit() {
  if (state.value === 'sending') return
  state.value = 'sending'
  errorKey.value = 'errorGeneric'
  try {
    await sendContact({ ...form })
    state.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    form.website = ''
  } catch (error) {
    errorKey.value = error instanceof ContactError ? error.code : 'errorGeneric'
    state.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="form-row">
      <div class="field">
        <label for="contact-name">{{ t('formName') }}</label>
        <input id="contact-name" v-model.trim="form.name" name="name" type="text" autocomplete="name" maxlength="100" required :disabled="state === 'sending'" />
      </div>
      <div class="field">
        <label for="contact-email">{{ t('formEmail') }}</label>
        <input id="contact-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" maxlength="254" required :disabled="state === 'sending'" />
      </div>
    </div>
    <div class="field">
      <label for="contact-subject">{{ t('formSubject') }}</label>
      <input id="contact-subject" v-model.trim="form.subject" name="subject" type="text" maxlength="150" required :disabled="state === 'sending'" />
    </div>
    <div class="field">
      <label for="contact-message">{{ t('formMessage') }}</label>
      <textarea id="contact-message" v-model.trim="form.message" name="message" rows="5" minlength="20" maxlength="3000" required :disabled="state === 'sending'" :placeholder="t('formPlaceholder')"></textarea>
      <span class="field-hint">{{ t('formHint') }}</span>
    </div>
    <div class="honeypot" aria-hidden="true">
      <label for="contact-website">{{ t('formHoneypot') }}</label>
      <input id="contact-website" v-model="form.website" name="website" type="text" autocomplete="off" tabindex="-1" />
    </div>
    <div class="form-footer">
      <button class="button button-primary" type="submit" :disabled="state === 'sending'">
        {{ state === 'sending' ? t('formSending') : t('formSubmit') }}
        <span aria-hidden="true">↗</span>
      </button>
      <p class="form-note">{{ t('formNote') }}</p>
    </div>
    <p v-if="state === 'success'" class="form-feedback success" role="status">{{ t('formSuccess') }}</p>
    <p v-if="state === 'error'" class="form-feedback error" role="alert">{{ t(errorKey) }}</p>
  </form>
</template>
