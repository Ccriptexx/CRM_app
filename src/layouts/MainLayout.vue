<template>
  <div>
    <loader v-if="loading"/>
    <div class="app-main-layout" v-else>

      <Navbar v-on:click="isOpen = !isOpen"/>

      <Sidebar v-model="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="CreateNewRecord">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import messages from '@/utils/messages';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    Navbar, Sidebar
  },
  computed: {
    CreateNewRecord() {
      return localizeFilter('History_add_record')
    },
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code || 'Что-то пошло не так  '])
    }
  }
}
</script>
