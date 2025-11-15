# 🧗 Rock Vibes - Plan de Integración Strapi CMS

## 📖 Índice

1. [Contexto del Proyecto](#contexto-del-proyecto)
2. [Problema a Resolver](#problema-a-resolver)
3. [Solución Propuesta](#solución-propuesta)
4. [Arquitectura Técnica](#arquitectura-técnica)
5. [Stack Tecnológico](#stack-tecnológico)
6. [Configuración de Cuentas](#configuración-de-cuentas)
7. [Configuración MCP](#configuración-mcp)
8. [Modelos de Contenido Strapi](#modelos-de-contenido-strapi)
9. [Integración Frontend](#integración-frontend)
10. [Plan de Implementación](#plan-de-implementación)
11. [Costos y Escalabilidad](#costos-y-escalabilidad)
12. [Mantenimiento](#mantenimiento)

---

## 🎯 Contexto del Proyecto

### Naturaleza del Proyecto

**Rock Vibes** es un sitio web corporativo para un centro de escalada indoor ubicado en Bilbao, España. El proyecto es una landing page moderna construida con:

- **Frontend**: Vue 3 + Vite
- **Estilos**: Tailwind CSS 4
- **Internacionalización**: vue-i18n (Español/Inglés)
- **Características actuales**:
  - Hero section con parallax
  - Sección de noticias (actualmente estática)
  - Galería de imágenes
  - Información de servicios
  - Ofertas y membresías
  - Formulario de contacto
  - Footer con partners

### Estado Actual

El contenido está **hardcodeado** en archivos JavaScript y JSON de traducción:
- `/src/composables/useI18nContent.js` - Contenido estático
- `/src/locales/*/*.json` - Traducciones estáticas

**Problema**: Cada vez que el cliente quiere actualizar noticias, cambiar imágenes o modificar ofertas, necesita:
1. Contactar al desarrollador
2. Esperar cambios en código
3. Esperar deploy
4. Incurrir en costos de desarrollo

---

## 🔴 Problema a Resolver

### Limitaciones Actuales

1. **Dependencia del desarrollador**: El cliente no puede actualizar contenido de forma autónoma
2. **Tiempo de actualización**: Días/semanas para cambios simples
3. **Costos operativos**: Cada cambio genera costo de desarrollo
4. **Escalabilidad limitada**: Agregar nuevas secciones requiere código
5. **Gestión de imágenes**: Sin optimización ni CDN
6. **Multiidioma complicado**: Duplicación manual de contenido

### Impacto en el Negocio

- ❌ Noticias desactualizadas por falta de agilidad
- ❌ Promociones no publicadas a tiempo
- ❌ Imágenes de galería sin actualizar
- ❌ Dependencia total del equipo técnico
- ❌ Costos recurrentes por cambios menores

---

## ✅ Solución Propuesta

### Headless CMS con Strapi

Implementar **Strapi** como backend headless que permita:

1. **Autonomía del cliente**: Panel de administración intuitivo
2. **Actualización en tiempo real**: Cambios visibles en minutos
3. **Gestión de medios**: Upload y optimización de imágenes
4. **Multiidioma nativo**: Sistema i18n integrado
5. **API automática**: REST API generada automáticamente
6. **Zero costos de desarrollo**: Cliente gestiona su propio contenido

### Beneficios Clave

| Antes (Estático) | Después (Strapi) |
|------------------|------------------|
| Desarrollador edita código | Cliente edita desde panel web |
| Días de espera | Minutos |
| Costo por cambio | $0 |
| Solo desarrollador puede cambiar | Equipo del gimnasio puede cambiar |
| Imágenes sin optimizar | CDN + optimización automática |
| Traducciones manuales | Sistema i18n integrado |

---

## 🏗️ Arquitectura Técnica

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO FINAL                        │
│                  (Cliente del gimnasio)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │     Frontend Vue 3         │
        │   (Netlify/Vercel)         │
        │   - SSG/SPA                │
        │   - Tailwind CSS 4         │
        │   - vue-i18n               │
        └────────┬───────────────────┘
                 │ fetch API
                 │ GET /api/news
                 │ GET /api/galleries
                 ▼
        ┌────────────────────────────┐
        │    Strapi CMS              │
        │    (Render.com)            │
        │    - REST API              │
        │    - Admin Panel           │
        │    - Media Library         │
        └────────┬───────────────────┘
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────────┐
│PostgreSQL│ │ Supabase │ │Claude Code   │
│ Database │ │ Storage  │ │+ MCP Servers │
│(Supabase)│ │(Imágenes)│ │              │
└──────────┘ └──────────┘ └──────────────┘
```

### Flujo de Datos

#### 1. **Cliente del gimnasio actualiza contenido:**
```
Cliente → Strapi Admin Panel → PostgreSQL + Storage
```

#### 2. **Usuario visita el sitio web:**
```
Browser → Vue App → Strapi API → PostgreSQL/Storage → Respuesta JSON
```

#### 3. **Desarrollador mantiene infraestructura:**
```
Desarrollador → Claude Code → Render MCP + Strapi MCP → Deploy/Debug
```

---

## 🛠️ Stack Tecnológico

### Frontend (Sin cambios)

```javascript
{
  "framework": "Vue 3.5+",
  "build": "Vite 6.x",
  "styling": "Tailwind CSS 4",
  "i18n": "vue-i18n",
  "http": "axios",
  "hosting": "Netlify o Vercel (gratis)"
}
```

### Backend (Nuevo)

```javascript
{
  "cms": "Strapi 5.x (latest)",
  "runtime": "Node.js 20.x",
  "database": "PostgreSQL 15",
  "storage": "Supabase Storage",
  "hosting": "Render.com (free tier)"
}
```

### Infraestructura

| Servicio | Propósito | Plan | Costo |
|----------|-----------|------|-------|
| **Render.com** | Hosting Strapi | Free Tier | $0/mes |
| **Supabase** | PostgreSQL + Storage | Free Tier | $0/mes |
| **Netlify/Vercel** | Hosting Vue App | Free Tier | $0/mes |

### Productividad (MCP)

```json
{
  "mcp_servers": {
    "render": "@render-oss/render-mcp-server",
    "strapi": "strapi-mcp-server"
  }
}
```

---

## 📝 Configuración de Cuentas

### 1. Render.com

**Propósito**: Alojar la aplicación Strapi

#### Pasos de Registro:

1. Ir a [https://render.com/](https://render.com/)
2. Click en **"Get Started"**
3. Registrarse con GitHub (recomendado) o email
4. Verificar email
5. Dashboard → Account Settings → API Keys
6. **"Create New API Key"**
7. Nombre: `Claude Code MCP`
8. **Guardar API Key** (necesaria para MCP)

#### Información a guardar:

```bash
RENDER_API_KEY=rnd_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 2. Supabase

**Propósito**: Base de datos PostgreSQL + Storage para imágenes

#### Pasos de Configuración:

1. Ir a [https://supabase.com/](https://supabase.com/)
2. Login con cuenta existente
3. **New Project**
   - Name: `rock-vibes-cms`
   - Database Password: (generar y guardar)
   - Region: **Europe West (Frankfurt)** (más cercano a Bilbao)
   - Plan: **Free**
4. Esperar 2-3 minutos mientras se crea
5. Una vez creado, ir a **Settings** → **Database**
6. Copiar **Connection String** (modo "URI")
7. Ir a **Settings** → **API**
8. Copiar **anon public key** y **service_role key**

#### Información a guardar:

```bash
# Database
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres

# Storage (para Strapi)
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 3. GitHub (Si no tienes repo)

**Propósito**: Versionado de código Strapi

#### Crear repositorio para Strapi:

```bash
# Crear repo en GitHub UI
# Nombre sugerido: rock-vibes-strapi

# Luego configuraremos el proyecto local y haremos push
```

---

### 4. Netlify/Vercel (Opcional ahora)

**Propósito**: Hosting del frontend Vue

*Nota: Esto se puede hacer después, primero enfocarnos en Strapi*

---

## 🔌 Configuración MCP

### ¿Qué son los MCP Servers?

**Model Context Protocol** permite a Claude Code interactuar directamente con servicios externos (Render, Strapi) sin salir del IDE.

### Configurar Render MCP

#### 1. Crear archivo de configuración:

```bash
# Si no existe, crear:
mkdir -p .claude
touch .claude/mcp_settings.json
```

#### 2. Editar `.claude/mcp_settings.json`:

```json
{
  "mcpServers": {
    "render": {
      "command": "npx",
      "args": ["-y", "@render-oss/render-mcp-server"],
      "env": {
        "RENDER_API_KEY": "TU_RENDER_API_KEY_AQUI"
      }
    }
  }
}
```

#### 3. Verificar instalación:

Una vez configurado, reinicia Claude Code. Deberías poder:

```
"Show me my Render services"
"Create a new web service for Strapi"
"Show deployment logs"
```

---

### Configurar Strapi MCP (Después de deploy)

#### 1. Actualizar `.claude/mcp_settings.json`:

```json
{
  "mcpServers": {
    "render": {
      "command": "npx",
      "args": ["-y", "@render-oss/render-mcp-server"],
      "env": {
        "RENDER_API_KEY": "TU_RENDER_API_KEY_AQUI"
      }
    },
    "strapi": {
      "command": "npx",
      "args": ["-y", "strapi-mcp-server"],
      "env": {
        "STRAPI_URL": "https://rock-vibes-strapi.onrender.com",
        "STRAPI_API_TOKEN": "TU_STRAPI_TOKEN_AQUI"
      }
    }
  }
}
```

#### 2. Obtener Strapi API Token:

Una vez Strapi esté desplegado:

1. Login en Strapi Admin Panel
2. Settings → API Tokens → Create new API Token
3. Name: `Claude Code MCP`
4. Token type: **Full access**
5. Token duration: **Unlimited**
6. Save y copiar token

---

## 📊 Modelos de Contenido Strapi

### Content Types a Crear

#### 1. **News** (Noticias)

```javascript
{
  "singularName": "news",
  "pluralName": "news",
  "displayName": "News",
  "description": "Noticias y actualizaciones del gimnasio",
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "date": {
      "type": "date",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "required": true,
      "maxLength": 200,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    }
  }
}
```

**Campos en Admin Panel:**
- Title (ES): "Nuevas rutas de boulder"
- Title (EN): "New boulder routes"
- Date: 2025-11-15
- Excerpt (ES): "Hemos añadido 10 nuevas rutas..."
- Excerpt (EN): "We've added 10 new routes..."
- Image: Upload

---

#### 2. **Gallery** (Galería)

```javascript
{
  "singularName": "gallery-image",
  "pluralName": "gallery-images",
  "displayName": "Gallery Image",
  "attributes": {
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "alt": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "category": {
      "type": "enumeration",
      "enum": ["climbing", "boulder", "training", "events"],
      "default": "climbing"
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

---

#### 3. **Climbing Service** (Servicios del gimnasio)

```javascript
{
  "singularName": "climbing-service",
  "pluralName": "climbing-services",
  "displayName": "Climbing Service",
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "icon": {
      "type": "string",
      "required": false
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

---

#### 4. **Offering** (Ofertas/Membresías)

```javascript
{
  "singularName": "offering",
  "pluralName": "offerings",
  "displayName": "Offering",
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "icon": {
      "type": "string",
      "required": false
    },
    "link": {
      "type": "string",
      "required": false
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

---

#### 5. **Service** (Servicios adicionales)

```javascript
{
  "singularName": "service",
  "pluralName": "services",
  "displayName": "Service",
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "description": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": { "localized": true }
      }
    },
    "icon": {
      "type": "enumeration",
      "enum": ["beginner", "pro-training", "kids", "groups", "shop", "events"],
      "required": true
    },
    "order": {
      "type": "integer",
      "default": 0
    }
  }
}
```

---

### Configuración i18n en Strapi

#### Habilitar plugin i18n:

1. Settings → Internationalization
2. Add locale: **Español (es)**
3. Set default locale: **English (en)**

#### Para cada Content Type:

- Advanced Settings → Internationalization → Enable localization
- Esto permite tener versiones en EN/ES del mismo contenido

---

## 🔗 Integración Frontend

### 1. Instalar Dependencias

```bash
cd /Users/macbook/Desktop/proyectos/rock-vibes/rock-vibes
npm install axios
```

---

### 2. Crear Servicio API

**Archivo**: `/src/services/strapi.js`

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Helper para extraer datos de respuesta Strapi
const extractData = (response) => {
  const data = response.data.data
  if (Array.isArray(data)) {
    return data.map(item => ({
      id: item.id,
      ...item.attributes,
      // Transformar imagen si existe
      image: item.attributes.image?.data?.attributes?.url || null
    }))
  }
  return {
    id: data.id,
    ...data.attributes,
    image: data.attributes.image?.data?.attributes?.url || null
  }
}

// News
export const getNews = async (locale = 'en') => {
  const response = await api.get(`/news`, {
    params: {
      locale,
      sort: 'date:desc',
      populate: '*'
    }
  })
  return extractData(response)
}

// Gallery
export const getGalleryImages = async () => {
  const response = await api.get(`/gallery-images`, {
    params: {
      sort: 'order:asc',
      populate: '*'
    }
  })
  return extractData(response)
}

// Climbing Services
export const getClimbingServices = async (locale = 'en') => {
  const response = await api.get(`/climbing-services`, {
    params: {
      locale,
      sort: 'order:asc',
      populate: '*'
    }
  })
  return extractData(response)
}

// Offerings
export const getOfferings = async (locale = 'en') => {
  const response = await api.get(`/offerings`, {
    params: {
      locale,
      sort: 'order:asc',
      populate: '*'
    }
  })
  return extractData(response)
}

// Services
export const getServices = async (locale = 'en') => {
  const response = await api.get(`/services`, {
    params: {
      locale,
      sort: 'order:asc',
      populate: '*'
    }
  })
  return extractData(response)
}

export default api
```

---

### 3. Variables de Entorno

**Archivo**: `.env`

```bash
VITE_STRAPI_URL=https://rock-vibes-strapi.onrender.com
```

**Archivo**: `.env.local` (no commitear)

```bash
VITE_STRAPI_URL=http://localhost:1337
```

---

### 4. Actualizar Composable

**Archivo**: `/src/composables/useI18nContent.js`

```javascript
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  getNews,
  getGalleryImages,
  getClimbingServices,
  getOfferings,
  getServices
} from '@/services/strapi'

// Importar imágenes locales como fallback
import gearImage from '@/assets/images/news/gear.jpg'
// ... resto de imports

export function useI18nContent() {
  const { t, locale } = useI18n()

  // Estado reactivo
  const news = ref([])
  const galleryImages = ref([])
  const climbingServices = ref([])
  const offerings = ref([])
  const services = ref([])
  const loading = ref(true)
  const error = ref(null)

  // Cargar datos desde Strapi
  const loadContent = async () => {
    loading.value = true
    error.value = null

    try {
      const [
        newsData,
        galleryData,
        climbingData,
        offeringsData,
        servicesData
      ] = await Promise.all([
        getNews(locale.value),
        getGalleryImages(),
        getClimbingServices(locale.value),
        getOfferings(locale.value),
        getServices(locale.value)
      ])

      news.value = newsData
      galleryImages.value = galleryData
      climbingServices.value = climbingData
      offerings.value = offeringsData
      services.value = servicesData

    } catch (err) {
      console.error('Error loading content from Strapi:', err)
      error.value = err
      // Fallback a contenido estático si falla
      loadStaticContent()
    } finally {
      loading.value = false
    }
  }

  // Contenido estático como fallback
  const loadStaticContent = () => {
    // Mantener contenido actual hardcodeado como backup
    news.value = [
      {
        id: 1,
        title: t('news.items[0].title'),
        date: t('news.items[0].date'),
        excerpt: t('news.items[0].excerpt'),
        image: gearImage
      }
      // ... resto
    ]
  }

  // Watch cambios de idioma
  watch(locale, loadContent, { immediate: true })

  // Contenido estático (hero, contact, footer)
  const navigation = [
    { name: t('header.navigation.climbingGym'), href: '#climbing-gym' },
    { name: t('header.navigation.offerings'), href: '#offerings' },
    { name: t('header.navigation.service'), href: '#service' },
    { name: t('header.navigation.contact'), href: '#contact' }
  ]

  const hero = {
    tagline: t('hero.tagline'),
    cta: t('hero.cta'),
    images: [
      '/images/ropes-pink.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782861.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782894.jpg',
      '/images/StockCake-climbing_center_Images_and_Photos_1762782911.jpg'
    ]
  }

  // ... resto del contenido estático (contact, footer, etc)

  return {
    // Dinámico desde Strapi
    news,
    gallery: { images: galleryImages },
    climbingCenter: { services: climbingServices },
    offerings: { items: offerings },
    service: { items: services },

    // Estático
    navigation,
    hero,
    contact,
    footer,

    // Estados
    loading,
    error
  }
}
```

---

### 5. Loading States en Componentes

**Ejemplo**: `/src/sections/NewsSection.vue`

```vue
<template>
  <section>
    <SectionTitle :title="news.title" :subtitle="news.subtitle" />

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p>Cargando noticias...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">Error cargando noticias. Intenta recargar.</p>
    </div>

    <!-- Content -->
    <Swiper v-else ...>
      <SwiperSlide v-for="item in news.items" :key="item.id">
        <NewsCard :item="item" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script>
export default {
  props: {
    news: Object,
    loading: Boolean,
    error: Error
  }
}
</script>
```

---

## 📋 Plan de Implementación

### Fase 1: Setup Inicial (1-2 horas)

#### ✅ Tareas:

1. **Crear cuentas**
   - [ ] Render.com
   - [ ] Supabase (ya tienes)
   - [ ] GitHub repo para Strapi

2. **Configurar MCP**
   - [ ] Instalar Render MCP
   - [ ] Probar conexión con Render

3. **Crear proyecto Strapi local**
   ```bash
   npx create-strapi-app@latest rock-vibes-strapi --quickstart
   cd rock-vibes-strapi
   ```

4. **Configurar variables de entorno**
   ```bash
   # .env en proyecto Strapi
   DATABASE_CLIENT=postgres
   DATABASE_URL=tu_url_de_supabase
   ```

---

### Fase 2: Configurar Strapi (2-3 horas)

#### ✅ Tareas:

1. **Instalar plugins necesarios**
   ```bash
   npm install @strapi/plugin-i18n
   npm install @strapi/provider-upload-supabase
   ```

2. **Configurar Supabase Storage**

   **Archivo**: `config/plugins.js`
   ```javascript
   module.exports = ({ env }) => ({
     upload: {
       config: {
         provider: 'strapi-provider-upload-supabase',
         providerOptions: {
           apiUrl: env('SUPABASE_URL'),
           apiKey: env('SUPABASE_KEY'),
           bucket: env('SUPABASE_BUCKET', 'strapi-uploads'),
           directory: env('SUPABASE_DIRECTORY', ''),
         },
       },
     },
   });
   ```

3. **Habilitar i18n**
   - Settings → Internationalization
   - Add locale: Español (es)

4. **Crear Content Types**
   - News
   - Gallery Image
   - Climbing Service
   - Offering
   - Service

5. **Configurar permisos públicos**
   - Settings → Roles → Public
   - Permitir `find` y `findOne` en todos los content types

6. **Crear API Token**
   - Settings → API Tokens → Create
   - Full access, unlimited
   - Guardar token

---

### Fase 3: Deploy a Render (1 hora)

#### ✅ Tareas:

1. **Preparar para producción**
   ```bash
   # Añadir a package.json
   "scripts": {
     "start": "strapi start"
   }
   ```

2. **Crear .gitignore**
   ```
   node_modules
   .env
   .cache
   build
   .strapi-updater.json
   ```

3. **Commit y push a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial Strapi setup"
   git remote add origin https://github.com/tu-usuario/rock-vibes-strapi.git
   git push -u origin main
   ```

4. **Desde Claude Code con Render MCP**:
   ```
   "Create a new web service on Render for my Strapi app from GitHub repo"

   Settings:
   - Environment: Node
   - Build Command: npm install && npm run build
   - Start Command: npm run start
   - Environment Variables:
     - NODE_ENV=production
     - DATABASE_URL=[Supabase URL]
     - SUPABASE_URL=[...]
     - SUPABASE_KEY=[...]
     - APP_KEYS=[random]
     - API_TOKEN_SALT=[random]
     - ADMIN_JWT_SECRET=[random]
     - JWT_SECRET=[random]
   ```

5. **Verificar deploy**
   - Esperar 5-10 minutos
   - Visitar `https://rock-vibes-strapi.onrender.com/admin`
   - Crear primer usuario admin

---

### Fase 4: Migrar Contenido (1-2 horas)

#### ✅ Tareas:

1. **Cargar noticias desde contenido actual**
   - Copiar datos de `useI18nContent.js`
   - Crear entries en Strapi para cada noticia
   - Subir imágenes correspondientes

2. **Cargar galería**
   - Subir imágenes de `/public/images/gallery-*.jpg`
   - Crear entries con alt text

3. **Cargar servicios**
   - Migrar datos de climbing services
   - Migrar offerings
   - Migrar service items

4. **Verificar localización**
   - Cada entrada debe tener versión EN y ES

---

### Fase 5: Integración Frontend (2-3 horas)

#### ✅ Tareas:

1. **Instalar dependencias**
   ```bash
   npm install axios
   ```

2. **Crear servicio API**
   - Implementar `/src/services/strapi.js`

3. **Actualizar composable**
   - Modificar `useI18nContent.js`
   - Añadir loading states
   - Añadir error handling

4. **Actualizar componentes**
   - NewsSection
   - GallerySection
   - ClimbingCenterSection
   - OfferingsSection
   - ServiceSection

5. **Testing local**
   ```bash
   # Terminal 1: Strapi local
   cd rock-vibes-strapi
   npm run develop

   # Terminal 2: Vue app
   cd rock-vibes
   VITE_STRAPI_URL=http://localhost:1337 npm run dev
   ```

6. **Testing producción**
   ```bash
   VITE_STRAPI_URL=https://rock-vibes-strapi.onrender.com npm run dev
   ```

---

### Fase 6: Configurar Strapi MCP (30 min)

#### ✅ Tareas:

1. **Actualizar `.claude/mcp_settings.json`**
   - Añadir configuración Strapi MCP
   - Usar URL de producción
   - Usar API token generado

2. **Probar desde Claude Code**:
   ```
   "Show me all news entries in Strapi"
   "Create a new news entry: Title 'Test', Date today, Excerpt 'Test news'"
   "Delete the test entry"
   ```

---

### Fase 7: Optimizaciones (1-2 horas)

#### ✅ Tareas:

1. **Caché en frontend**
   ```javascript
   // localStorage cache con TTL
   const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

   const getCachedData = (key) => {
     const cached = localStorage.getItem(key)
     if (!cached) return null

     const { data, timestamp } = JSON.parse(cached)
     if (Date.now() - timestamp > CACHE_DURATION) {
       localStorage.removeItem(key)
       return null
     }

     return data
   }
   ```

2. **Lazy loading de imágenes**
   ```vue
   <img
     :src="image"
     loading="lazy"
     class="object-cover w-full h-full"
   />
   ```

3. **Optimización de queries Strapi**
   - Solo popular campos necesarios
   - Usar paginación si hay muchas noticias

4. **Configurar CORS en Strapi**
   ```javascript
   // config/middleware.js
   module.exports = {
     settings: {
       cors: {
         origin: ['https://rock-vibes.netlify.app', 'http://localhost:5173']
       }
     }
   }
   ```

---

### Fase 8: Capacitación Cliente (1 hora)

#### ✅ Entregables:

1. **Manual de usuario** (crear documento separado)
   - Cómo acceder al admin panel
   - Cómo crear una noticia
   - Cómo subir imágenes
   - Cómo cambiar idiomas
   - Cómo publicar/despublicar

2. **Video tutorial** (grabación de pantalla)
   - Login
   - Crear noticia paso a paso
   - Subir imagen
   - Publicar
   - Ver cambios en web

3. **Contactos de soporte**
   - Email de desarrollador
   - Documentación Strapi oficial

---

## 💰 Costos y Escalabilidad

### Costos Iniciales (Mes 1-6)

| Servicio | Plan | Costo |
|----------|------|-------|
| Render | Free (con sleep) | $0/mes |
| Supabase | Free (500MB DB + 1GB Storage) | $0/mes |
| Netlify/Vercel | Free | $0/mes |
| **TOTAL** | | **$0/mes** |

### Límites Free Tier

#### Render:
- ✅ 750 horas/mes (suficiente)
- ⚠️ Sleep después de 15 min inactividad
- ✅ 100GB bandwidth/mes
- ⚠️ Primera carga puede tardar 30-60s

#### Supabase:
- ✅ 500 MB PostgreSQL
- ✅ 1 GB Storage
- ✅ 50,000 monthly active users
- ✅ 2 GB bandwidth

### Estimación de Crecimiento

#### Contenido:
- **News**: ~50 noticias/año × 200KB imagen = 10MB
- **Gallery**: ~100 imágenes × 500KB = 50MB
- **Database**: ~1MB metadata
- **Total año 1**: ~60MB (12% del límite)

#### Tráfico:
- **Visitas estimadas**: 1,000/mes
- **Requests API**: ~5,000/mes
- **Bandwidth**: ~2GB/mes
- Dentro de límites free

---

### Cuándo Escalar (Costos Futuros)

#### Escenario 1: Sitio se vuelve popular (5,000 visitas/mes)

**Problema**: Cold start molesta a usuarios

**Solución**: Render Starter Plan
- Costo: **$7/mes**
- Sin cold start
- 400 horas incluidas (suficiente)

**Total**: $7/mes

---

#### Escenario 2: Mucho contenido (>500MB DB o >1GB storage)

**Solución**: Supabase Pro
- Costo: **$25/mes**
- 8GB DB + 100GB Storage
- Sin throttling

**Total**: $7 (Render) + $25 (Supabase) = **$32/mes**

---

#### Escenario 3: Sitio profesional con alto tráfico

**Stack recomendado**:
- Frontend: Vercel Pro ($20/mes) o Netlify Pro ($19/mes)
- Backend: Render Standard ($20/mes) - más potente
- Database: Supabase Pro ($25/mes)

**Total**: ~**$65/mes**

---

### ROI (Retorno de Inversión)

#### Sin Strapi (actual):
- Cambio de noticia: $50-100 (desarrollo)
- Cambio de imagen: $30-50
- Actualización de ofertas: $50-100
- **Costo por mes** (4 cambios): ~**$200-400**

#### Con Strapi:
- Hosting: $0-7/mes
- Cambios ilimitados: $0
- **Costo por mes**: **$0-7**

**Ahorro anual**: $2,400 - $4,800 💰

---

## 🔧 Mantenimiento

### Tareas Mensuales

- [ ] Verificar estado de servicios (Render, Supabase)
- [ ] Revisar logs de errores en Strapi
- [ ] Backup de base de datos (Supabase hace automático)
- [ ] Actualizar contenido obsoleto

### Tareas Trimestrales

- [ ] Actualizar Strapi a última versión
- [ ] Revisar y optimizar queries lentas
- [ ] Limpiar imágenes no utilizadas
- [ ] Revisar analytics de uso

### Tareas Anuales

- [ ] Revisar plan de hosting (¿necesitamos escalar?)
- [ ] Auditoría de seguridad
- [ ] Actualizar dependencias (npm audit)
- [ ] Renovar API tokens si es necesario

---

## 🚨 Troubleshooting

### Problema: Strapi no arranca en Render

**Solución**:
1. Verificar logs en Render dashboard
2. Verificar variables de entorno
3. Verificar conexión a Supabase DB
4. Desde Claude Code: `"Show me logs of rock-vibes-strapi service"`

---

### Problema: Imágenes no cargan

**Solución**:
1. Verificar SUPABASE_URL y SUPABASE_KEY
2. Verificar bucket existe en Supabase
3. Verificar permisos públicos en bucket
4. Verificar CORS en Supabase Storage

---

### Problema: Cold start muy lento

**Solución temporal**:
```javascript
// Implementar "keep-alive" ping cada 10 minutos
// Desde cliente o servicio externo como UptimeRobot (gratis)
setInterval(() => {
  fetch('https://rock-vibes-strapi.onrender.com/api/news')
}, 10 * 60 * 1000)
```

**Solución permanente**:
- Upgrade a Render Starter ($7/mes)

---

### Problema: Contenido no actualiza en frontend

**Solución**:
1. Verificar caché de navegador (Ctrl+Shift+R)
2. Verificar localStorage cache
3. Verificar permisos públicos en Strapi
4. Verificar CORS
5. Desde Claude Code: `"Check if news API is returning data"`

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Strapi Documentation](https://docs.strapi.io/)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)

### Comunidad

- [Strapi Discord](https://discord.strapi.io/)
- [Render Community](https://community.render.com/)
- [Supabase Discord](https://discord.supabase.com/)

### Tutoriales Recomendados

- [Strapi + Vue 3 Integration](https://strapi.io/blog/how-to-build-a-blog-with-vue-js-strapi)
- [Deploy Strapi to Render](https://render.com/docs/deploy-strapi)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)

---

## ✅ Checklist Final

### Pre-implementación

- [ ] Leer y entender toda la documentación
- [ ] Crear cuenta en Render
- [ ] Verificar acceso a Supabase
- [ ] Configurar Render MCP
- [ ] Hacer backup del código actual

### Durante implementación

- [ ] Seguir plan fase por fase
- [ ] Probar cada integración antes de continuar
- [ ] Documentar problemas encontrados
- [ ] Hacer commits frecuentes

### Post-implementación

- [ ] Verificar todas las secciones funcionan
- [ ] Probar en mobile y desktop
- [ ] Probar cambio de idiomas
- [ ] Capacitar al cliente
- [ ] Entregar documentación

---

## 📞 Contacto y Soporte

### Desarrollador
- Email: [tu-email@ejemplo.com]
- GitHub: [tu-usuario]

### Recursos de Emergencia
- Strapi Support: [support@strapi.io]
- Render Support: [support@render.com]

---

**Última actualización**: Noviembre 2025
**Versión**: 1.0
**Proyecto**: Rock Vibes - Climbing Center Website
