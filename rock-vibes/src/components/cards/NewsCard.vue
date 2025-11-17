<template>
  <router-link :to="link" class="block">
    <article class="group relative overflow-hidden rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover-lift">
      <div class="aspect-[4/3] overflow-hidden">
        <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div class="absolute inset-0 gradient-overlay-card">
        <div class="absolute bottom-0 left-0 right-0 !p-4">
          <time class="text-sm text-white/80 font-body mb-2 block">{{ date }}</time>
          <h3 class="text-2xl font-heading font-bold text-white mb-2 line-clamp-2">
            {{ title }}
          </h3>
          <p class="text-base text-white/90 font-body line-clamp-2 mb-4">
            {{ excerpt }}
          </p>
          <span class="inline-flex text-white/50 items-center text-ki-secondary font-heading font-semibold uppercase text-xs tracking-wide group-hover:text-ki-warm-orange transition-colors">
            Read More
            <svg
              class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  </router-link>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    image: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
