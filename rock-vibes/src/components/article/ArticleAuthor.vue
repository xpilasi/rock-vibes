<template>
  <div v-if="author" class="article-author border-t border-b border-gray-800 !pt-3 !pb-3 mt-8">
    <h3 class="text-sm font-heading font-semibold uppercase tracking-wider text-gray-500 !mb-2 ">
      About the Author
    </h3>
    <div class="flex items-start gap-6  rounded-xl p-6">
      <!-- Avatar -->
      <div class="flex-shrink-0">
        <div v-if="author.avatar" class="w-20 h-20 rounded-full overflow-hidden ring-2 ring-gray-800">
          <img :src="author.avatar" :alt="authorName" class="w-full h-full object-cover" />
        </div>
        <div v-else class="w-20 h-20 rounded-full bg-(--ki-yellow) flex items-center justify-center text-(--ki-black) text-2xl font-heading font-bold ring-2 ring-gray-800">
          {{ authorInitial }}
        </div>
      </div>

      <!-- Author Info -->
      <div class="flex-1">
        <div class="font-heading font-bold text-xl text-white mb-1">
          {{ authorName }}
        </div>
        <div class="text-sm font-body text-(--ki-yellow) mb-3">
          {{ author.role || 'Staff Writer' }}
        </div>
        <p v-if="author.bio" class="text-gray-300 font-body text-sm leading-relaxed">
          {{ author.bio }}
        </p>

        <!-- Social Links -->
        <div v-if="author.socialLinks && author.socialLinks.length" class="flex gap-3 mt-4">
          <a
            v-for="link in author.socialLinks"
            :key="link.platform"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-500 hover:text-(--ki-yellow) transition-colors"
            :aria-label="link.platform"
          >
            <component :is="getSocialIcon(link.platform)" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleAuthor',
  props: {
    author: {
      type: [Object, String],
      default: null
    }
  },
  computed: {
    authorName() {
      if (typeof this.author === 'string') return this.author
      return this.author?.name || 'Unknown Author'
    },
    authorInitial() {
      return this.authorName.charAt(0).toUpperCase()
    }
  },
  methods: {
    getSocialIcon(platform) {
      const icons = {
        twitter: 'IconTwitter',
        linkedin: 'IconLinkedIn',
        instagram: 'IconInstagram',
        facebook: 'IconFacebook',
        website: 'IconLink'
      }
      return icons[platform] || 'IconLink'
    }
  },
  components: {
    IconTwitter: {
      template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>`
    },
    IconLinkedIn: {
      template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
    },
    IconInstagram: {
      template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
    },
    IconFacebook: {
      template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
    },
    IconLink: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`
    }
  }
}
</script>
