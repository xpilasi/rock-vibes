<template>
  <div v-if="tags && tags.length" class="article-tags pt-8 border-t border-gray-800">
    <h3 class="text-sm font-heading font-semibold uppercase tracking-wider text-gray-500 mb-4">
      Tags
    </h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in tags"
        :key="tag.id || tag"
        class="inline-flex items-center px-4 py-2 rounded-full text-sm font-body bg-gray-900 text-gray-300 border border-gray-800 hover:border-(--ki-yellow) hover:text-(--ki-yellow) transition-all cursor-pointer"
      >
        #{{ typeof tag === 'string' ? tag : tag.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTags',
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>
