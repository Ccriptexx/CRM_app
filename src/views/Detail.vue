<template>
  <div>

    <Loader v-if="loading" />

    <p v-else-if="record.length" class="center">
      {{ 'Detail_message' | localize }}
        <strong>
          id={{ $route.params.id }}
        </strong>
      </p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'Detail_history' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Detail_income' : 'Detail_outcome' | localize }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
          }">
            <div class="card-content white-text">
              <p>{{ 'Detail_description' | localize }}: {{ record.description }}</p>
              <p>{{ 'Detail_amount' | localize }}: {{ record.amount | currency }}</p>
              <p>{{ 'Detail_category' | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
    
    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  
  }
}
</script>
