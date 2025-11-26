import { useI18n } from 'vue-i18n'
import { ref, watch, onMounted, computed } from 'vue'
import { getNews } from '@/services/strapi'
import gearImage from '@/assets/images/news/gear.jpg'
import routesImage from '@/assets/images/news/routes.jpg'
import trainingImage from '@/assets/images/news/training.jpg'
import climb1Image from '@/assets/images/climbing/climb-1.jpg'
import climb2Image from '@/assets/images/climbing/climb-2.jpg'
import climb3Image from '@/assets/images/climbing/clim-3.jpg'
import boulderImage from '@/assets/images/climbing/boulder.jpg'
import trainingGymImage from '@/assets/images/climbing/training.jpg'
import instructorImage from '@/assets/images/climbing/instructor.jpg'
import classesImage from '@/assets/images/climbing/StockCake-climbers_classes_Images_and_Photos_1763130252.jpg'
import laSportivaLogo from '@/assets/images/partners/lasportiva.png'
import petzlLogo from '@/assets/images/partners/petzl.png'
import logoFooter from '@/assets/images/partners/logo_footer.png'

export function useI18nContent() {
  const { t, locale } = useI18n()

  // Estado reactivo para noticias
  const newsItems = ref([])
  const newsLoading = ref(true)
  const newsError = ref(null)

  // Datos estáticos de fallback para noticias
  const staticNewsItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop',
      date: t('news.items[0].date'),
      title: t('news.items[0].title'),
      excerpt: t('news.items[0].excerpt'),
      link: '#'
    },
    {
      id: 2,
      image: routesImage,
      date: t('news.items[1].date'),
      title: t('news.items[1].title'),
      excerpt: t('news.items[1].excerpt'),
      link: '#'
    },
    {
      id: 3,
      image: trainingImage,
      date: t('news.items[2].date'),
      title: t('news.items[2].title'),
      excerpt: t('news.items[2].excerpt'),
      link: '#'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop',
      date: t('news.items[3].date'),
      title: t('news.items[3].title'),
      excerpt: t('news.items[3].excerpt'),
      link: '#'
    },
    {
      id: 5,
      image: gearImage,
      date: t('news.items[4].date'),
      title: t('news.items[4].title'),
      excerpt: t('news.items[4].excerpt'),
      link: '#'
    },
    {
      id: 6,
      image: routesImage,
      date: t('news.items[5].date'),
      title: t('news.items[5].title'),
      excerpt: t('news.items[5].excerpt'),
      link: '#'
    }
  ]

  // Función para cargar noticias desde Strapi
  const loadNews = async () => {
    newsLoading.value = true
    newsError.value = null

    try {
      const data = await getNews(locale.value)

      // Si Strapi devuelve datos, usarlos
      if (data && data.length > 0) {
        newsItems.value = data.map(item => {
          // Si la URL ya es absoluta (comienza con http), usarla directamente
          // Si es relativa (comienza con /), concatenarla con VITE_STRAPI_URL
          const imageUrl = item.image
            ? (item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_STRAPI_URL}${item.image}`)
            : null

          return {
            id: item.id,
            image: imageUrl,
            date: new Date(item.date).toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            title: item.title,
            excerpt: item.excerpt,
            slug: item.slug,
            link: `/news/${item.slug}`
          }
        })
      } else {
        // Si no hay datos, mantener array vacío para mostrar skeleton
        newsItems.value = []
      }
    } catch (error) {
      console.error('Error loading news from Strapi:', error)
      newsError.value = error
      // En caso de error, mantener array vacío para mostrar skeleton
      newsItems.value = []
    } finally {
      newsLoading.value = false
    }
  }

  // Cargar noticias al montar el componente
  onMounted(() => {
    loadNews()
  })

  // Recargar noticias cuando cambie el idioma
  watch(locale, () => {
    loadNews()
  })

  const navigation = computed(() => [
    { name: t('header.navigation.climbingGym'), href: '#climbing-gym' },
    { name: t('header.navigation.offerings'), href: '#offerings' },
    { name: t('header.navigation.service'), href: '#service' },
    { name: t('header.navigation.contact'), href: '#contact' }
  ])

  const hero = computed(() => ({
    title: '',
    tagline: t('hero.tagline'),
    cta: t('hero.cta'),
    images: [
      '/images/ropes-pink.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782861.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782894.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782911.jpg'
    ]
  }))

  const news = computed(() => ({
    title: t('news.title'),
    subtitle: t('news.subtitle'),
    items: newsItems.value,
    loading: newsLoading.value,
    error: newsError.value
  }))

  const climbingCenter = computed(() => ({
    title: t('climbingCenter.title'),
    subtitle: t('climbingCenter.subtitle'),
    description: t('climbingCenter.description'),
    services: [
      {
        id: 1,
        image: climb1Image,
        name: t('climbingCenter.services[0].name'),
        description: t('climbingCenter.services[0].description')
      },
      {
        id: 2,
        image: boulderImage,
        name: t('climbingCenter.services[1].name'),
        description: t('climbingCenter.services[1].description')
      },
      {
        id: 3,
        image: trainingGymImage,
        name: t('climbingCenter.services[2].name'),
        description: t('climbingCenter.services[2].description')
      },
      {
        id: 4,
        image: instructorImage,
        name: t('climbingCenter.services[3].name'),
        description: t('climbingCenter.services[3].description')
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
        name: t('climbingCenter.services[4].name'),
        description: t('climbingCenter.services[4].description')
      }
    ]
  }))

  const offerings = computed(() => ({
    title: t('offerings.title'),
    subtitle: t('offerings.subtitle'),
    items: [
      {
        id: 1,
        icon: 'memberships',
        image: climb1Image,
        name: t('offerings.items[0].name'),
        description: t('offerings.items[0].description'),
        link: '#'
      },
      {
        id: 2,
        icon: 'day-passes',
        image: boulderImage,
        name: t('offerings.items[1].name'),
        description: t('offerings.items[1].description'),
        link: '#'
      },
      {
        id: 3,
        icon: 'equipment',
        image: gearImage,
        name: t('offerings.items[2].name'),
        description: t('offerings.items[2].description'),
        link: '#'
      },
      {
        id: 4,
        icon: 'personal-training',
        image: instructorImage,
        name: t('offerings.items[3].name'),
        description: t('offerings.items[3].description'),
        link: '#'
      },
      {
        id: 5,
        icon: 'private-events',
        image: classesImage,
        name: t('offerings.items[4].name'),
        description: t('offerings.items[4].description'),
        link: '#'
      }
    ]
  }))

  const service = computed(() => ({
    title: t('service.title'),
    subtitle: t('service.subtitle'),
    items: [
      {
        id: 1,
        icon: 'beginner',
        name: t('service.items[0].name'),
        description: t('service.items[0].description'),
        link: '#'
      },
      {
        id: 2,
        icon: 'pro-training',
        name: t('service.items[1].name'),
        description: t('service.items[1].description'),
        link: '#'
      },
      {
        id: 3,
        icon: 'kids',
        name: t('service.items[2].name'),
        description: t('service.items[2].description'),
        link: '#'
      },
      {
        id: 4,
        icon: 'groups',
        name: t('service.items[3].name'),
        description: t('service.items[3].description'),
        link: '#'
      },
      {
        id: 5,
        icon: 'shop',
        name: t('service.items[4].name'),
        description: t('service.items[4].description'),
        link: '#'
      },
      {
        id: 6,
        icon: 'events',
        name: t('service.items[5].name'),
        description: t('service.items[5].description'),
        link: '#'
      }
    ]
  }))

  const gallery = computed(() => ({
    title: t('gallery.title'),
    subtitle: t('gallery.subtitle'),
    images: [
      { id: 1, src: '/images/gallery-1.jpg', alt: 'Climbing 1' },
      { id: 2, src: '/images/gallery-2.jpg', alt: 'Climbing 2' },
      { id: 3, src: '/images/gallery-3.jpg', alt: 'Climbing 3' },
      { id: 4, src: '/images/gallery-4.jpg', alt: 'Climbing 4' },
      { id: 5, src: '/images/gallery-5.jpg', alt: 'Climbing 5' },
      { id: 6, src: '/images/gallery-6.jpg', alt: 'Climbing 6' },
      { id: 7, src: '/images/gallery-7.jpg', alt: 'Climbing 7' },
      { id: 8, src: '/images/gallery-8.jpg', alt: 'Climbing 8' }
    ]
  }))

  const contact = computed(() => ({
    title: t('contact.title'),
    subtitle: t('contact.subtitle'),
    form: {
      name: t('contact.form.name'),
      email: t('contact.form.email'),
      phone: t('contact.form.phone'),
      message: t('contact.form.message'),
      send: t('contact.form.send'),
      namePlaceholder: t('contact.form.namePlaceholder'),
      emailPlaceholder: t('contact.form.emailPlaceholder'),
      phonePlaceholder: t('contact.form.phonePlaceholder'),
      messagePlaceholder: t('contact.form.messagePlaceholder')
    },
    info: {
      address: {
        title: t('contact.info.address.title'),
        street: t('contact.info.address.line1'),
        city: t('contact.info.address.line2').split(',')[0],
        country: t('contact.info.address.line2').split(',')[1]?.trim() || ''
      },
      phone: t('contact.info.phone.number'),
      email: t('contact.info.email.address'),
      hours: {
        title: t('contact.info.hours.title'),
        weekdays: t('contact.info.hours.weekdays'),
        weekend: t('contact.info.hours.weekends')
      }
    },
    map: {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.123456789!2d-2.9349473!3d43.2627124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE1JzQ1LjgiTiAywrA1NicwNS44Ilc!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses'
    }
  }))

  const footer = computed(() => ({
    tagline: t('footer.tagline'),
    columns: {
      hours: {
        title: t('footer.columns.hours.title'),
        items: [
          t('footer.columns.hours.items[0]'),
          t('footer.columns.hours.items[1]'),
          t('footer.columns.hours.items[2]'),
          t('footer.columns.hours.items[3]')
        ]
      },
      contact: {
        title: t('footer.columns.contact.title'),
        items: [
          t('footer.columns.contact.items[0]'),
          t('footer.columns.contact.items[1]'),
          t('footer.columns.contact.items[2]'),
          t('footer.columns.contact.items[3]'),
          t('footer.columns.contact.items[4]')
        ]
      },
      links: {
        title: t('footer.columns.links.title'),
        items: [
          { name: t('footer.columns.links.items[0].name'), href: '#' },
          { name: t('footer.columns.links.items[1].name'), href: '#' },
          { name: t('footer.columns.links.items[2].name'), href: '#' },
          { name: t('footer.columns.links.items[3].name'), href: '#' },
          { name: t('footer.columns.links.items[4].name'), href: '#' },
          { name: t('footer.columns.links.items[5].name'), href: '#' }
        ]
      },
      social: {
        title: t('footer.columns.social.title'),
        items: [
          { name: 'Facebook', href: '#', icon: 'facebook' },
          { name: 'Instagram', href: '#', icon: 'instagram' },
          { name: 'YouTube', href: '#', icon: 'youtube' },
          { name: 'Twitter', href: '#', icon: 'twitter' }
        ]
      }
    },
    partners: {
      title: t('footer.partners.title'),
      items: [
        { name: 'La Sportiva', logo: laSportivaLogo },
        { name: 'Petzl', logo: petzlLogo },
        { name: 'Logo Footer', logo: logoFooter }
      ]
    },
    copyright: t('footer.copyright'),
    legal: [
      { name: t('footer.legal[0].name'), href: '#' },
      { name: t('footer.legal[1].name'), href: '#' },
      { name: t('footer.legal[2].name'), href: '#' }
    ]
  }))

  return {
    navigation,
    hero,
    news,
    climbingCenter,
    offerings,
    service,
    gallery,
    contact,
    footer
  }
}
