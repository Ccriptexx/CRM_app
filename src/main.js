import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import messagePlagin from './utils/message.plagin'
import titlePlagin from './utils/title.plagin'
import Loader from '@/components/Loader'
import VueMeta from 'vue-meta'
import toolyipDirective from './directives/toolyip.directive'
import firebase from 'firebase/compat/app'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize'
import 'firebase/compat/auth'
import 'firebase/compat/database'

Vue.config.productionTip = false
Vue.use(messagePlagin)
Vue.use(titlePlagin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', toolyipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDsXddbh8f4N4qWNWZWt4zfENjXKX6aYbs",
  authDomain: "vue-crmapp-69e66.firebaseapp.com",
  projectId: "vue-crmapp-69e66",
  storageBucket: "vue-crmapp-69e66.appspot.com",
  messagingSenderId: "472877594426",
  appId: "1:472877594426:web:184cdd74d2be7daeafc203",
  measurementId: "G-CWS617BZY9",
  databaseURL: "https://vue-crmapp-69e66-default-rtdb.europe-west1.firebasedatabase.app"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

