<template>
  <footer class="relative z-10 bg-(--ki-dark-gray) text-white py-10!">
    <!-- Main Footer Content -->
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Opening Hours -->
        <div>
          <h3 class="text-lg font-heading font-bold uppercase tracking-wide mb-6">
            {{ footer.columns.hours.title }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="(item, index) in footer.columns.hours.items"
              :key="index"
              class="text-gray-300 font-body"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-heading font-bold uppercase tracking-wide mb-6">
            {{ footer.columns.contact.title }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="(item, index) in footer.columns.contact.items"
              :key="index"
              class="text-gray-300 font-body"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-heading font-bold uppercase tracking-wide mb-6">
            {{ footer.columns.links.title }}
          </h3>
          <ul class="space-y-3">
            <li v-for="link in footer.columns.links.items" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-300 hover:text-ki-secondary transition-colors font-body"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-heading font-bold uppercase tracking-wide mb-6">
            {{ footer.columns.social.title }}
          </h3>
          <div class="flex space-x-4">
            <a
              v-for="social in footer.columns.social.items"
              :key="social.name"
              :href="social.href"
              :aria-label="social.name"
              class="w-10 h-10 rounded-full bg-ki-medium-gray flex items-center justify-center hover:bg-ki-secondary transition-colors"
            >
              <component :is="getSocialIcon(social.icon)" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      
<div class="flex flex-row justify-between">
 <!-- Logo & Tagline -->
 <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-16 !py-5 ">
        <img
          :src="logo"
          alt="Rock Vibes"
          class="h-9 md:h-12 w-auto"
        />
        <p class="text-lg md:text-xl font-heading font-medium text-white/90 tracking-tight">
          Indoor climbing. Outdoor spirit.
        </p>
      </div>

      <!-- Partners Section -->
      <div v-if="footer.partners && footer.partners.items && footer.partners.items.length" class="">
        <h3 class="text-lg font-heading font-bold uppercase tracking-wide  text-center">
          {{ footer.partners.title }}
        </h3>
        <div class="flex flex-wrap justify-center items-center gap-8 !py-5">
          <div
            v-for="partner in footer.partners.items"
            :key="partner.name"
            class="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="h-12 object-contain"
            />
          </div>
        </div>
      </div>
</div>
     
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-ki-medium-gray">
      <div class="container-custom !py-1">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-400 font-body">
            {{ footer.copyright }}
          </p>
          <div class="flex space-x-6">
            <a
              v-for="legal in footer.legal"
              :key="legal.name"
              :href="legal.href"
              class="text-sm text-gray-400 hover:text-ki-secondary transition-colors font-body"
            >
              {{ legal.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { h } from 'vue'
import logoYellow from '@/assets/logos/logo-rock-vibes-yellow.svg'

export default {
  name: 'AppFooter',
  props: {
    footer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      logo: logoYellow
    }
  },
  methods: {
    getSocialIcon(iconName) {
      const icons = {
        facebook: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' })
        ]),
        instagram: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' })
        ]),
        youtube: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' })
        ]),
        twitter: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' })
        ])
      }

      const iconFn = icons[iconName] || icons.facebook
      return iconFn()
    }
  }
}
</script>
