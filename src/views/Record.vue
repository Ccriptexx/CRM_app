<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Record_title' | localize }}</h3>
    </div>

    <loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">{{ 'Planning_no_categoties' | localize }}
      <router-link to="/categories">
        {{ 'Planning_add_category' | localize }}
      </router-link>
    </p>

    <form class="form" v-else @submit.prevent="handelSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >{{ c.title }}</option>
        </select>
        <label>{{ 'Select_a_category' | localize }}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ 'Detail_income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ 'Detail_outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
            id="amount"
            type="number"
            v-model.number="amount"
        >
        <label for="amount">{{ 'Detail_amount' | localize }}</label>
        <span 
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.minValue"
          >
            {{ 'Category_limit_message' | localize }} {{ $v.amount.$params.minValue.min }}
          </span>
      </div>

      <div class="input-field">
        <input
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
            id="description"
            type="text"
            v-model="description"
        >
        <label for="description">{{ 'Detail_description' | localize }}</label>
        <span 
            class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required"
          >
            {{ 'Detail_description_message' | localize }}
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Category_create_button' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import {required, minValue} from 'vuelidate/lib/validators'
import Loader from '@/components/Loader.vue'
import {mapGetters} from 'vuex'
export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  components: { Loader, required, minValue },
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    category: null,
    categories: [],
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    description: {required},
    amount: {minValue: minValue(1)}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handelSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) { }
        
      } else {
        this.$message(`Недостаточно средст на счете (${this.amount - this.info.bill})`)
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
