import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Helper para calcular tiempo de lectura basado en contenido
const calculateReadingTime = (content) => {
  if (!content) return 5
  const wordsPerMinute = 265
  const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

// Helper para extraer datos de artículos con metadata completa
const extractArticleData = (item) => ({
  id: item.id,
  documentId: item.documentId,
  title: item.title,
  date: item.date,
  excerpt: item.excerpt,
  content: item.content,
  slug: item.slug,
  image: item.image?.[0]?.url || null,

  // New metadata fields
  metaDescription: item.metaDescription || item.excerpt,
  readingTime: item.readingTime || calculateReadingTime(item.content || item.excerpt),
  featured: item.featured || false,
  featuredImageCaption: item.featuredImageCaption || null,
  featuredImageCredit: item.featuredImageCredit || null,

  // Author component (default temporal para desarrollo)
  author: item.author ? {
    name: item.author.name,
    bio: item.author.bio,
    role: item.author.role,
    avatar: item.author.avatar?.url || null,
    socialLinks: item.author.socialLinks || []
  } : {
    name: 'Rock Vibes Team',
    bio: 'Passionate about climbing and sharing the latest news from the rock climbing community.',
    role: 'Staff Writer',
    avatar: null,
    socialLinks: []
  },

  // Category relation (default temporal para desarrollo)
  category: item.category ? {
    id: item.category.id,
    name: item.category.name,
    slug: item.category.slug,
    color: item.category.color || '#FFD23F'
  } : 'News',

  // Tags relation (array)
  tags: item.tags?.map(tag => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug
  })) || [],

  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  publishedAt: item.publishedAt
})

// Helper para extraer datos de respuesta Strapi v5
const extractData = (response) => {
  const data = response.data.data

  if (Array.isArray(data)) {
    return data.map(item => extractArticleData(item))
  }

  return extractArticleData(data)
}

// News (Noticias)
export const getNews = async (locale = 'en') => {
  try {
    const response = await api.get(`/plural-news`, {
      params: {
        locale,
        sort: 'date:desc',
        populate: '*'
      }
    })
    return extractData(response)
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

// Get single news by slug
export const getNewsBySlug = async (slug, locale = 'en') => {
  try {
    const response = await api.get(`/plural-news`, {
      params: {
        locale,
        'filters[slug][$eq]': slug,
        populate: '*'
      }
    })
    console.log('Full API response:', response.data)
    const data = extractData(response)
    console.log('Extracted data:', data)
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    throw error
  }
}

// Get single news by documentId (works across all locales)
export const getNewsByDocumentId = async (documentId, locale = 'en') => {
  try {
    const response = await api.get(`/plural-news/${documentId}`, {
      params: {
        locale,
        populate: '*'
      }
    })
    return extractData(response)
  } catch (error) {
    console.error('Error fetching news by documentId:', error)
    throw error
  }
}

// Gallery Images
export const getGalleryImages = async () => {
  try {
    const response = await api.get(`/gallery-images`, {
      params: {
        sort: 'order:asc',
        populate: '*'
      }
    })

    // Transform gallery images data
    const data = response.data.data

    if (Array.isArray(data)) {
      return data.map(item => ({
        id: item.id,
        documentId: item.documentId,
        alt: item.alt,
        category: item.category,
        src: item.image?.url || null, // Get the direct URL from the image object
        formats: item.image?.formats || {}, // Include all image formats for responsive images
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    throw error
  }
}

// Climbing Services
export const getClimbingServices = async (locale = 'en') => {
  try {
    const response = await api.get(`/climbing-services`, {
      params: {
        locale,
        sort: 'order:asc',
        populate: '*'
      }
    })
    return extractData(response)
  } catch (error) {
    console.error('Error fetching climbing services:', error)
    throw error
  }
}

// Offerings
export const getOfferings = async (locale = 'en') => {
  try {
    const response = await api.get(`/offerings`, {
      params: {
        locale,
        sort: 'order:asc',
        populate: '*'
      }
    })
    return extractData(response)
  } catch (error) {
    console.error('Error fetching offerings:', error)
    throw error
  }
}

// Services
export const getServices = async (locale = 'en') => {
  try {
    const response = await api.get(`/services`, {
      params: {
        locale,
        sort: 'order:asc',
        populate: '*'
      }
    })
    return extractData(response)
  } catch (error) {
    console.error('Error fetching services:', error)
    throw error
  }
}

export default api
