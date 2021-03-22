import component from './components/cvss.vue'

component.install = Vue => {
  Vue.component(component.name, component)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(component)
}

export default component
