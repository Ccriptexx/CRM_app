<template>
  <form 
    class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ 'Login_title' |localize }}</span>
      <div class="input-field">
        <input
          autocomplete="on"
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: ($v.email.$dirty && !$v.email.required) || 
                      ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
        {{ 'Login_message_email_no_empty' |localize }}
        </small>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.email"
        >
        {{ 'Login_message_email_correct' |localize }}
        </small>
      </div>
      <div class="input-field">
        <input
            autocomplete="on"
            id="password"
            type="password"
            v-model.trim="password"
            :class="{
              invalid: ($v.password.$dirty && !$v.password.required) || 
                        ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{ 'Login_password' |localize }}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
        {{ 'Login_message_pass_no_empty' |localize }}
        </small>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{ 'Login_message_pass_minLength'| localize }} {{ $v.password.$params.minLength.min }} {{ 'Login_message_pass_now'| localize }} {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
        {{ 'Login_button'| localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'Login_no_acount'| localize }}
        <router-link to="/register">{{ 'Login_button_register'| localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {/**/}
    }
  }
}
</script>
