import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category';
import record from './record';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const res = {
        base: "EUR",
        date: "2023-01-24",
        rates: {
          EUR: 1,
          RUB: 74.898779,
          USD: 1.085859
        }
      }
      return res
      // const key = process.env.VUE_APP_FIXER
      // const myHeaders = new Headers();
      // myHeaders.append("apikey", key);

      // const requestOptions = {
      //   method: 'GET',
      //   redirect: 'follow',
      //   headers: myHeaders
      // };

      // const res =  await fetch("https://api.apilayer.com/fixer/latest?symbols=EUR,USD,RUB", requestOptions)
      // return res.json()
    }
  },
  modules: {
    auth, info, category, record
  }
})
