<template>
  <header
    :class="headerClasses"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  >
    <div class="container-custom">
      <nav class="flex items-center justify-between h-20 md:h-20">
        <!-- Logo -->
        <a href="#" class="flex items-center">
          <img
            :src="currentLogo"
            alt="Rock Vibes"
            class="h-12 md:h-14 w-auto transition-opacity duration-300"
          />
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            :class="[
              'text-xl font-heading font-semibold tracking-tight transition-colors duration-700',
              item.name === 'CONTACT' || item.name === 'CONTACTO'
                ? 'px-3! py-1! rounded-3xl text-white bg-(--ki-yellow) hover:bg-pink-600'
                : navLinkClass + ' relative group'
            ]"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ item.name }}
            <span
              v-if="item.name !== 'CONTACT' && item.name !== 'CONTACTO'"
              class="absolute left-0 -bottom-1 w-0 h-[3px] transition-all duration-700 group-hover:w-full"
              :class="isScrolled ? 'bg-(--ki-secondary)' : 'bg-white'"
            ></span>
          </a>

          <!-- Language Selector -->
          <div class="flex items-center gap-2 ml-4">
            <button
              @click="changeLanguage('en')"
              :class="[
                'text-sm font-heading font-semibold tracking-wider transition-all duration-300',
                currentLocale === 'en'
                  ? (isScrolled ? 'text-(--ki-yellow)' : 'text-(--ki-yellow)')
                  : (isScrolled ? 'text-(--ki-black) hover:text-(--ki-secondary)' : 'text-white/70 hover:text-white')
              ]"
            >
              EN
            </button>
            <span :class="isScrolled ? 'text-(--ki-black)' : 'text-white'">/</span>
            <button
              @click="changeLanguage('es')"
              :class="[
                'text-sm font-heading font-semibold tracking-wider transition-all duration-300',
                currentLocale === 'es'
                  ? (isScrolled ? 'text-(--ki-yellow)' : 'text-(--ki-yellow)')
                  : (isScrolled ? 'text-(--ki-black) hover:text-(--ki-secondary)' : 'text-white/70 hover:text-white')
              ]"
            >
              ES
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-(--ki-secondary)"
          :class="mobileButtonClass"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white border-t border-(--ki-border-gray) shadow-lg"
      >
        <div class="container-custom py-4">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="block py-3 text-sm font-heading font-semibold text-(--ki-black) hover:text-(--ki-secondary) transition-colors uppercase tracking-wider"
            @click.prevent="handleMobileNavClick(item.href)"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { useI18n } from 'vue-i18n'
import logoLight from '@/assets/logos/logo-rock-vibes.svg'
import logoDark from '@/assets/logos/logo-rock-vibes-dark.svg'

export default {
  name: 'AppHeader',
  props: {
    navigation: {
      type: Array,
      required: true
    }
  },
  setup() {
    const { locale } = useI18n()
    return {
      currentLocale: locale
    }
  },
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      logoLight,
      logoDark
    }
  },
  computed: {
    headerClasses() {
      return this.isScrolled
        ? 'bg-white shadow-nav'
        : 'bg-gradient-to-b from-black/80 via-black/50 to-transparent'
    },
    currentLogo() {
      return this.isScrolled ? this.logoDark : this.logoLight
    },
    logoClass() {
      return this.isScrolled ? 'text-[var(--ki-black)]' : 'text-white'
    },
    navLinkClass() {
      return this.isScrolled
        ? 'text-[var(--ki-black)] hover:text-[var(--ki-secondary)]'
        : 'text-white'
    },
    mobileButtonClass() {
      return this.isScrolled ? 'text-[var(--ki-black)]' : 'text-white'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    handleMobileNavClick(href) {
      this.isMobileMenuOpen = false
      this.scrollToSection(href)
    },
    scrollToSection(href) {
      const target = document.querySelector(href)
      if (target) {
        const headerHeight = 80
        const targetPosition = target.offsetTop - headerHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    },
    changeLanguage(lang) {
      this.currentLocale = lang
      localStorage.setItem('locale', lang)
      window.location.reload()
    }
  }
}
</script>
