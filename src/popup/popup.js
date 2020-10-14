import Vue from 'vue'
import App from './App'
import router from './router'

window.vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

chrome.storage.local.get(['running'], function(r) {
  if(r.running == true) router.push({ path: 'collecting' }) 
  else router.push({ path: 'home' })
})
window.vm.$emit("startMonitoring","A")