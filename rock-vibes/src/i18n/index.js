import { createI18n } from 'vue-i18n'

// Import translations
import headerEn from '@/locales/header/en.json'
import headerEs from '@/locales/header/es.json'
import heroEn from '@/locales/hero/en.json'
import heroEs from '@/locales/hero/es.json'
import newsEn from '@/locales/news/en.json'
import newsEs from '@/locales/news/es.json'
import climbingCenterEn from '@/locales/climbingCenter/en.json'
import climbingCenterEs from '@/locales/climbingCenter/es.json'
import offeringsEn from '@/locales/offerings/en.json'
import offeringsEs from '@/locales/offerings/es.json'
import serviceEn from '@/locales/service/en.json'
import serviceEs from '@/locales/service/es.json'
import galleryEn from '@/locales/gallery/en.json'
import galleryEs from '@/locales/gallery/es.json'
import contactEn from '@/locales/contact/en.json'
import contactEs from '@/locales/contact/es.json'
import footerEn from '@/locales/footer/en.json'
import footerEs from '@/locales/footer/es.json'

const messages = {
  en: {
    header: headerEn,
    hero: heroEn,
    news: newsEn,
    climbingCenter: climbingCenterEn,
    offerings: offeringsEn,
    service: serviceEn,
    gallery: galleryEn,
    contact: contactEn,
    footer: footerEn
  },
  es: {
    header: headerEs,
    hero: heroEs,
    news: newsEs,
    climbingCenter: climbingCenterEs,
    offerings: offeringsEs,
    service: serviceEs,
    gallery: galleryEs,
    contact: contactEs,
    footer: footerEs
  }
}

// Function to detect browser/OS language
function detectLanguage() {
  // Check if there's a saved preference
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    return savedLocale
  }

  // Detect browser language
  const browserLanguage = navigator.language || navigator.userLanguage

  // Extract language code (e.g., 'es-ES' -> 'es', 'en-US' -> 'en')
  const languageCode = browserLanguage.split('-')[0].toLowerCase()

  // Return Spanish if detected, otherwise default to English
  if (languageCode === 'es') {
    return 'es'
  }

  return 'en'
}

const savedLocale = detectLanguage()

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages
})

export default i18n
