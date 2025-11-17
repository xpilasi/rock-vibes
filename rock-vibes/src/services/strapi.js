import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Helper para extraer datos de respuesta Strapi v5
const extractData = (response) => {
  const data = response.data.data

  if (Array.isArray(data)) {
    return data.map(item => ({
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      date: item.date,
      excerpt: item.excerpt,
      content: item.content,
      slug: item.slug,
      // En Strapi v5, las imágenes vienen directamente en el campo image como array
      // Tomamos la primera imagen del array
      image: item.image?.[0]?.url || null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt
    }))
  }

  return {
    id: data.id,
    documentId: data.documentId,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content: data.content,
    slug: data.slug,
    image: data.image?.[0]?.url || null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    publishedAt: data.publishedAt
  }
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
    const data = extractData(response)
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
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
    return extractData(response)
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
