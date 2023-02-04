<template>
  <table>
    <thead>
    <tr>
      <th>№</th>
      <th>{{ 'History_table_amount' | localize }}</th>
      <th>{{ 'History_table_date' | localize }}</th>
      <th>{{ 'History_table_category' | localize }}</th>
      <th>{{ 'History_table_type' | localize }}</th>
      <th>{{ 'History_table_open' | localize }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span 
          :class="[record.typeClass]"
          class="white-text badge"
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button 
          class="btn-small btn" 
          @click="$router.push('/detail/' + record.id)"
          v-tooltip="'Посмотреть запись'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
