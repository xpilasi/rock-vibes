<template>
  <div id="app">
    <!-- Header -->
    <AppHeader :navigation="navigation" />

    <!-- Main Content -->
    <main class="relative z-10">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter :footer="footer" />
  </div>
</template>

<script>
import { useI18nContent } from './composables/useI18nContent'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const { navigation, footer } = useI18nContent()

    return {
      navigation,
      footer
    }
  }
}
</script>
