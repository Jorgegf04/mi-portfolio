<script setup lang="ts">
import { reactive, ref } from 'vue'
import { createContactMailto, type ContactPayload } from './contactApi'
import { t } from './i18n'

const form = reactive<ContactPayload>({ name: '', email: '', subject: '', message: '' })
const mailto = ref('')

function submit() {
  mailto.value = createContactMailto({ ...form })
}
</script>

<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="form-row">
      <div class="field">
        <label for="contact-name">{{ t('formName') }}</label>
        <input id="contact-name" v-model.trim="form.name" name="name" type="text" autocomplete="name" maxlength="100" required />
      </div>
      <div class="field">
        <label for="contact-email">{{ t('formEmail') }}</label>
        <input id="contact-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" maxlength="254" required />
      </div>
    </div>
    <div class="field">
      <label for="contact-subject">{{ t('formSubject') }}</label>
      <input id="contact-subject" v-model.trim="form.subject" name="subject" type="text" maxlength="150" required />
    </div>
    <div class="field">
      <label for="contact-message">{{ t('formMessage') }}</label>
      <textarea id="contact-message" v-model.trim="form.message" name="message" rows="5" minlength="20" maxlength="3000" required :placeholder="t('formPlaceholder')"></textarea>
      <span class="field-hint">{{ t('formHint') }}</span>
    </div>
    <div class="form-footer">
      <button class="button button-primary" type="submit">
        {{ t('formSubmit') }}
        <span aria-hidden="true">↗</span>
      </button>
      <p class="form-note">{{ t('formNote') }}</p>
    </div>
    <div v-if="mailto" class="form-feedback success" role="status">
      <p>{{ t('formPrepared') }}</p>
      <a class="button button-primary" :href="mailto">{{ t('formOpenEmail') }} <span aria-hidden="true">↗</span></a>
    </div>
  </form>
</template>
