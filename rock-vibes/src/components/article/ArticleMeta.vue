<template>
  <div class="article-meta flex flex-wrap items-center gap-3 md:gap-4 text-sm font-body text-gray-400">
    <!-- Author -->
    <div v-if="author" class="flex items-center gap-2">
      <div v-if="author.avatar" class="w-8 h-8 rounded-full overflow-hidden bg-gray-800">
        <img :src="author.avatar" :alt="author.name" class="w-full h-full object-cover" />
      </div>
      <div v-else class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
        <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
      </div>
      <span class="font-medium text-white">{{ author.name || author }}</span>
    </div>

    <!-- Separator -->
    <span v-if="author" class="text-gray-700">•</span>

    <!-- Date -->
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <time :datetime="date">{{ formattedDate }}</time>
    </div>

    <!-- Separator -->
    <span class="text-gray-700">•</span>

    <!-- Reading Time -->
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span>{{ readingTime || 5 }} min read</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    date: {
      type: String,
      required: true
    },
    readingTime: {
      type: Number,
      default: 5
    },
    category: {
      type: [Object, String],
      default: null
    },
    author: {
      type: [Object, String],
      default: null
    }
  },
  computed: {
    formattedDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(this.date).toLocaleDateString('en-US', options)
    }
  }
}
</script>
