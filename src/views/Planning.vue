<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Planning_title' | localize }}</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>

    <loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">{{ 'Planning_no_categoties' | localize }}
      <router-link to="/categories">
        {{ 'Planning_add_category' | localize }}
      </router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  components: { Loader },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    // debugger

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 
        ? 'green'
        :  percent < 100 
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
