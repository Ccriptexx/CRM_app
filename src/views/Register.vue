<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ 'Login_title' | localize }}</span>
      <div class="input-field">
        <input
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
          {{ 'Login_message_email_no_empty' | localize }}
        </small>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.email"
        >
        {{ 'Login_message_email_correct' | localize }}l
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{
              invalid: ($v.password.$dirty && !$v.password.required) || 
                        ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{ 'Login_password' | localize }}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
        {{ 'Login_message_pass_no_empty' | localize }}
        </small>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >
        {{ 'Login_message_pass_minLength' | localize }} {{ $v.password.$params.minLength.min }} {{ 'Login_message_pass_now' | localize }} {{ password.length }}
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">{{ 'Name' | localize }}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
        {{ 'Register_name_message' | localize }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>{{ 'Register_have_acoutn' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
        {{ 'Register_button' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'Register_have_acoutn' | localize }}
        <router-link to="/login">{{ 'Login_button' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch {/**/}
      
    }
  }
}
</script>
