<template>
  <div class="min-h-screen bg-(--ki-black)" style="padding-top: 100px;">
    <!-- Loading State -->
    <div v-if="loading" class="pb-12">
      <div class="container-custom">
        <div class="animate-pulse max-w-4xl mx-auto">
          <div class="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-800 rounded w-1/4 mb-8"></div>
          <div class="aspect-[21/9] bg-gray-800 rounded-lg mb-8"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-800 rounded"></div>
            <div class="h-4 bg-gray-800 rounded"></div>
            <div class="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="pb-12">
      <div class="container-custom text-center">
        <h1 class="text-4xl font-heading font-bold text-white mb-4">
          {{ $t('news.notFound') || 'News not found' }}
        </h1>
        <p class="text-gray-400 mb-8 text-lg">
          {{ $t('news.notFoundMessage') || 'The news article you are looking for does not exist.' }}
        </p>
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 bg-(--ki-yellow) text-(--ki-black) font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ $t('news.backToHome') || 'Back to Home' }}
        </router-link>
      </div>
    </div>

    <!-- News Content -->
    <article v-else-if="newsItem" class="pb-16">
      <!-- Article Header -->
      <header class="container-custom mb-10">
        <div class="max-w-4xl mx-auto">
          <!-- Back Button -->
          <router-link
            to="/#news"
            class="inline-flex items-center text-gray-400 hover:text-(--ki-yellow) font-body text-sm mb-6 transition-colors group"
          >
            <svg class="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ $t('news.backToNews') || 'Back to News' }}
          </router-link>

          <!-- Category Badge -->
          <div v-if="newsItem.category" class="mb-6">
            <span class="inline-block px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-wider bg-(--ki-yellow) text-(--ki-black) rounded-full">
              {{ newsItem.category }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-5 leading-tight tracking-tight">
            {{ newsItem.title }}
          </h1>

          <!-- Excerpt/Subtitle -->
          <p v-if="newsItem.excerpt" class="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 font-body">
            {{ newsItem.excerpt }}
          </p>

          <!-- Article Meta -->
          <ArticleMeta
            :date="newsItem.date"
            :reading-time="newsItem.readingTime"
            :category="newsItem.category"
            :author="newsItem.author"
          />
        </div>
      </header>

      <!-- Featured Image -->
      <div class="mb-12">
        <figure class="w-full bg-gray-900">
          <!-- Debug info -->
          <div v-if="imageUrl" class="container-custom mb-2">
            <div class="max-w-4xl mx-auto text-xs text-gray-600 font-mono">
              Image URL: {{ imageUrl }}
            </div>
          </div>

          <div class="w-full overflow-hidden" style="max-height: 600px;">
            <img
              v-if="imageUrl"
              :src="imageUrl"
              :alt="newsItem.title"
              class="w-full h-auto object-cover"
              @error="handleImageError"
              @load="handleImageLoad"
            />
            <div v-else class="w-full bg-gray-800 flex items-center justify-center" style="height: 400px;">
              <div class="text-center">
                <svg class="w-20 h-20 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-500 text-sm">No image available</p>
              </div>
            </div>
          </div>
          <figcaption v-if="newsItem.featuredImageCaption || newsItem.featuredImageCredit" class="container-custom mt-4">
            <div class="max-w-4xl mx-auto text-sm text-gray-500 font-body">
              <span v-if="newsItem.featuredImageCaption">{{ newsItem.featuredImageCaption }}</span>
              <span v-if="newsItem.featuredImageCredit" class="text-gray-600">
                <span v-if="newsItem.featuredImageCaption"> • </span>{{ newsItem.featuredImageCredit }}
              </span>
            </div>
          </figcaption>
        </figure>
      </div>

      <!-- Article Body -->
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <ArticleBody :content="newsItem.content || newsItem.excerpt" class="mb-12" />

          <!-- Tags -->
          <ArticleTags v-if="newsItem.tags && newsItem.tags.length" :tags="newsItem.tags" class="mb-12" />

          <!-- Author -->
          <ArticleAuthor v-if="newsItem.author" :author="newsItem.author" class="mb-12" />

          <!-- Footer Actions -->
          <footer class="mt-16 pt-8 border-t border-gray-800">
            <div class="flex items-center justify-between">
              <router-link
                to="/#news"
                class="inline-flex items-center px-6 py-3 bg-(--ki-yellow) text-(--ki-black) font-heading font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                {{ $t('news.moreNews') || 'More News' }}
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </router-link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getNewsBySlug } from '../services/strapi'
import ArticleMeta from '../components/article/ArticleMeta.vue'
import ArticleAuthor from '../components/article/ArticleAuthor.vue'
import ArticleTags from '../components/article/ArticleTags.vue'
import ArticleBody from '../components/article/ArticleBody.vue'

export default {
  name: 'NewsDetail',
  components: {
    ArticleMeta,
    ArticleAuthor,
    ArticleTags,
    ArticleBody
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
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
          console.log('Received news data:', data)
          console.log('Image from data:', data.image)
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

    const handleImageError = (e) => {
      console.error('Image failed to load:', e.target.src)
      console.error('Error event:', e)
    }

    const handleImageLoad = () => {
      console.log('Image loaded successfully')
    }

    onMounted(() => {
      loadNews()
    })

    // Redirigir al home cuando cambie el idioma
    watch(locale, () => {
      router.push('/')
    })

    return {
      newsItem,
      loading,
      error,
      formattedDate,
      imageUrl,
      strapiUrl,
      handleImageError,
      handleImageLoad
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
