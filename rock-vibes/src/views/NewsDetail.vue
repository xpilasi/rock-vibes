<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="loading" class="section-padding">
      <div class="container-custom max-w-4xl">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div class="aspect-video bg-gray-200 rounded-lg mb-8"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="section-padding">
      <div class="container-custom max-w-4xl text-center">
        <h1 class="text-4xl font-heading font-bold text-gray-900 mb-4">{{ $t('news.notFound') || 'News not found' }}</h1>
        <p class="text-gray-600 mb-8">{{ $t('news.notFoundMessage') || 'The news article you are looking for does not exist.' }}</p>
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 bg-ki-yellow text-gray-900 font-heading font-semibold rounded-lg hover:bg-ki-warm-orange transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ $t('news.backToHome') || 'Back to Home' }}
        </router-link>
      </div>
    </div>

    <!-- News Content -->
    <article v-else-if="newsItem" class="section-padding">
      <div class="container-custom max-w-4xl">
        <!-- Back Button -->
        <router-link
          to="/"
          class="inline-flex items-center text-gray-600 hover:text-ki-yellow font-body mb-8 transition-colors group"
        >
          <svg class="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ $t('news.backToNews') || 'Back to News' }}
        </router-link>

        <!-- Article Header -->
        <header class="mb-8">
          <time class="text-sm text-gray-500 font-body mb-3 block">{{ formattedDate }}</time>
          <h1 class="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            {{ newsItem.title }}
          </h1>
          <p v-if="newsItem.excerpt" class="text-xl text-gray-600 font-body leading-relaxed">
            {{ newsItem.excerpt }}
          </p>
        </header>

        <!-- Featured Image -->
        <div v-if="imageUrl" class="relative aspect-video rounded-lg bg-red-200 h-[200px] w-full overflow-hidden shadow-card mb-8">
          <img
            :src="imageUrl"
            :alt="newsItem.title"
            class="w-full object-cover object-center"
          />
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none font-body">
          <div v-if="newsItem.content" class="text-gray-700 leading-relaxed" v-html="newsItem.content"></div>
          <div v-else-if="newsItem.excerpt" class="text-gray-700 leading-relaxed whitespace-pre-line">
            {{ newsItem.excerpt }}
          </div>
        </div>

        <!-- Footer Actions -->
        <footer class="mt-12 pt-8 border-t border-gray-200">
          <router-link
            to="/#news"
            class="inline-flex items-center px-6 py-3 bg-ki-yellow text-gray-900 font-heading font-semibold rounded-lg hover:bg-ki-warm-orange transition-colors"
          >
            {{ $t('news.moreNews') || 'More News' }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </footer>
      </div>
    </article>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getNewsBySlug } from '../services/strapi'

export default {
  name: 'NewsDetail',
  setup() {
    const route = useRoute()
    const { locale } = useI18n()

    const newsItem = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const strapiUrl = import.meta.env.VITE_STRAPI_URL

    const formattedDate = computed(() => {
      if (!newsItem.value?.date) return ''

      return new Date(newsItem.value.date).toLocaleDateString(
        locale.value === 'es' ? 'es-ES' : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      )
    })

    const imageUrl = computed(() => {
      if (!newsItem.value?.image) return null
      // Si la URL ya es absoluta (comienza con http), usarla directamente
      // Si es relativa (comienza con /), concatenarla con strapiUrl
      return newsItem.value.image.startsWith('http')
        ? newsItem.value.image
        : `${strapiUrl}${newsItem.value.image}`
    })

    const loadNews = async () => {
      loading.value = true
      error.value = null

      try {
        const slug = route.params.slug
        const data = await getNewsBySlug(slug, locale.value)

        if (!data) {
          error.value = 'News not found'
          newsItem.value = null
        } else {
          newsItem.value = data
        }
      } catch (err) {
        console.error('Error loading news:', err)
        error.value = err
        newsItem.value = null
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadNews()
    })

    return {
      newsItem,
      loading,
      error,
      formattedDate,
      imageUrl,
      strapiUrl
    }
  }
}
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose p {
  margin-bottom: 1.25em;
  line-height: 1.75;
}
</style>
