# Plan Infalible: Páginas de Noticias Profesionales para Rock Vibes

## Resumen Ejecutivo

Este plan transforma las páginas de detalle de noticias actuales en un sistema profesional de artículos siguiendo estándares de la industria (inspirado en Medium, NYTimes, TechCrunch). La implementación balancea apariencia profesional con esfuerzo de desarrollo práctico, aprovechando tu stack existente de Strapi v5 + Vue 3.

## Estado Actual

### Lo que Funciona Bien
- ✅ Strapi v5 con soporte i18n (EN/ES)
- ✅ Campos básicos: title, date, excerpt, content (richtext), image, slug
- ✅ Supabase Storage para imágenes
- ✅ Frontend Vue 3 con Composition API
- ✅ Routing por slug limpio (`/news/slug-name`)
- ✅ Sistema de carga reactivo con estados de loading/error

### Lo que Falta para Ser Profesional
- ❌ Información de autor (nombre, bio, foto, redes sociales)
- ❌ Categorías y tags para organización
- ❌ Metadata SEO (descripción, keywords, Open Graph)
- ❌ Tiempo de lectura estimado
- ❌ Diseño tipográfico profesional
- ❌ Jerarquía visual clara
- ❌ Sección de artículos relacionados
- ❌ Bio del autor al final del artículo
- ❌ Botones de compartir en redes sociales
- ❌ Barra de progreso de lectura
- ❌ Pie de foto y créditos de imagen

---

## PARTE 1: ESTÁNDARES DE LA INDUSTRIA

### Qué Hace que una Página de Artículo Sea Profesional

Basado en análisis de Medium, NYTimes, TechCrunch:

#### Jerarquía Visual y Tipografía
- **Imagen Hero**: Grande, alta calidad (ratio 16:9 o 21:9)
- **Escala Tipográfica**:
  - Título del artículo: 42-56px (desktop), negrita, máx 60-80 caracteres
  - Subtítulo/excerpt: 20-24px, peso ligero
  - Texto del cuerpo: 18-21px para legibilidad óptima
  - Altura de línea: 1.6-1.8 para cuerpo, más ajustado para títulos (1.1-1.3)
  - Longitud de línea: 60-80 caracteres (óptimo ~66)

#### Estructura de Contenido
1. **Zona de Encabezado del Artículo**:
   - Píldora de categoría/tag
   - Título principal
   - Subtítulo/excerpt
   - Barra de metadata: Autor, fecha, tiempo de lectura, botones de compartir
   - Imagen hero con pie de foto y crédito fotográfico

2. **Zona del Cuerpo del Artículo**:
   - Espaciado generoso (max-width: 680-740px)
   - Citas destacadas (pull quotes)
   - Media embebida (imágenes, videos)
   - Tabla de contenidos (para artículos largos)

3. **Zona del Pie del Artículo**:
   - Tarjeta de bio del autor
   - Tags/categorías
   - Artículos relacionados
   - Botones de compartir en redes sociales

#### Patrones UX
- **Progreso de Lectura**: Barra superior mostrando progreso del scroll
- **Tiempo de Lectura Estimado**: Basado en conteo de palabras (265 palabras/minuto promedio)
- **Compartir en Redes**: Barra lateral fija o botones flotantes
- **Pies de Foto**: Siempre presentes, estilizados distintamente

---

## PARTE 2: MEJORAS AL ESQUEMA DE BASE DE DATOS (Strapi v5)

### Campos Nuevos a Agregar al Content Type "News"

**Archivo**: `/rock-vibes-strapi/src/api/single-news/content-types/single-news/schema.json`

```json
{
  "attributes": {
    // CAMPOS EXISTENTES (mantener tal cual)
    "title": { "type": "string", "required": true },
    "date": { "type": "date", "required": true },
    "excerpt": { "type": "text", "required": true },
    "content": { "type": "richtext", "required": false },
    "image": { "type": "media", "multiple": true },
    "slug": { "type": "uid", "targetField": "title" },

    // CAMPOS NUEVOS:

    // Información del Autor
    "author": {
      "type": "component",
      "repeatable": false,
      "component": "article.author"
    },

    // SEO & Metadata
    "metaDescription": {
      "type": "string",
      "maxLength": 160,
      "pluginOptions": { "i18n": { "localized": true } }
    },
    "readingTime": {
      "type": "integer",
      "default": 5,
      "min": 1
    },

    // Categorización
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::article-category.article-category"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::article-tag.article-tag"
    },

    // Mejoras de Imagen
    "featuredImageCaption": {
      "type": "string",
      "pluginOptions": { "i18n": { "localized": true } }
    },
    "featuredImageCredit": {
      "type": "string"
    },

    // Configuración del Artículo
    "featured": {
      "type": "boolean",
      "default": false
    }
  }
}
```

### Nuevos Content Types a Crear

#### 1. Article Category
**Ubicación**: `/rock-vibes-strapi/src/api/article-category/`

```json
{
  "kind": "collectionType",
  "collectionName": "article_categories",
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "pluginOptions": { "i18n": { "localized": true } }
    },
    "slug": { "type": "uid", "targetField": "name" },
    "color": { "type": "string", "default": "#FFD23F" },
    "description": {
      "type": "text",
      "pluginOptions": { "i18n": { "localized": true } }
    }
  }
}
```

**Categorías sugeridas**:
- Events (Eventos) - Color: #FFD23F (amarillo)
- Tips & Training (Consejos y Entrenamiento) - Color: #FF6B35 (naranja)
- Community (Comunidad) - Color: #6C63FF (morado)
- News (Noticias) - Color: #2E86AB (azul)

#### 2. Article Tag
**Ubicación**: `/rock-vibes-strapi/src/api/article-tag/`

```json
{
  "kind": "collectionType",
  "collectionName": "article_tags",
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "pluginOptions": { "i18n": { "localized": true } }
    },
    "slug": { "type": "uid", "targetField": "name" }
  }
}
```

**Tags sugeridos**:
- climbing, bouldering, training, gear, equipment, competitions, kids, beginners, advanced, routes, safety

### Componente para Author

**Archivo**: `/rock-vibes-strapi/src/components/article/author.json`

```json
{
  "collectionName": "components_article_authors",
  "info": {
    "displayName": "Author",
    "description": "Author information for articles"
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "bio": { "type": "text" },
    "avatar": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "role": {
      "type": "string",
      "default": "Staff Writer"
    },
    "socialLinks": {
      "type": "component",
      "repeatable": true,
      "component": "article.social-link"
    }
  }
}
```

**Archivo**: `/rock-vibes-strapi/src/components/article/social-link.json`

```json
{
  "collectionName": "components_article_social_links",
  "info": { "displayName": "Social Link" },
  "attributes": {
    "platform": {
      "type": "enumeration",
      "enum": ["twitter", "linkedin", "instagram", "facebook", "website"],
      "required": true
    },
    "url": { "type": "string", "required": true }
  }
}
```

---

## PARTE 3: DISEÑO DEL FRONTEND

### Estructura del Layout Profesional

```
┌─────────────────────────────────────────┐
│  Barra de Progreso de Lectura (fixed)  │
├─────────────────────────────────────────┤
│                                         │
│  ZONA DE ENCABEZADO (full width)       │
│  - Categoría badge                      │
│  - Título del artículo                  │
│  - Subtítulo/excerpt                    │
│  - Metadata (autor, fecha, tiempo)      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  IMAGEN HERO (full width)               │
│  - Pie de foto                          │
│  - Crédito fotográfico                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────┬──────────────┐    │
│  │                 │              │    │
│  │  CUERPO DEL     │  SIDEBAR     │    │
│  │  ARTÍCULO       │  - Share     │    │
│  │  (max 740px)    │  - Tags      │    │
│  │                 │              │    │
│  │                 │              │    │
│  └─────────────────┴──────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  PIE DEL ARTÍCULO                       │
│  - Bio del autor                        │
│  - Artículos relacionados (3 cards)    │
│  - Botón "More News"                    │
│                                         │
└─────────────────────────────────────────┘
```

### Jerarquía Tipográfica

**Actualizar**: `/rock-vibes/src/assets/main.css`

```css
/* Tipografía específica para artículos */
.article-title {
  font-family: var(--font-heading);
  font-size: 2.5rem; /* 40px móvil */
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ki-black);
}

@media (min-width: 768px) {
  .article-title { font-size: 3rem; } /* 48px tablet */
}

@media (min-width: 1024px) {
  .article-title { font-size: 3.5rem; } /* 56px desktop */
}

.article-subtitle {
  font-family: var(--font-body);
  font-size: 1.25rem; /* 20px */
  line-height: 1.6;
  font-weight: 400;
  color: var(--ki-medium-gray);
}

.article-prose {
  font-family: var(--font-body);
  font-size: 1.125rem; /* 18px */
  line-height: 1.75;
  color: #374151;
  max-width: 740px;
  margin: 0 auto;
}

.article-prose p {
  margin-bottom: 1.5em;
}

.article-prose h2 {
  font-size: 2rem;
  line-height: 1.3;
  margin-top: 2em;
  margin-bottom: 0.75em;
  font-weight: 700;
}

.article-prose blockquote {
  border-left: 4px solid var(--ki-yellow);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  font-size: 1.25rem;
  color: var(--ki-medium-gray);
}

.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(to right, var(--ki-yellow), var(--ki-warm-orange));
  z-index: 1000;
  transition: width 0.1s ease;
}
```

### Componentes Nuevos a Crear

```
src/components/article/
├── ArticleHeader.vue         → Título, metadata, autor
├── ArticleHero.vue           → Imagen destacada con pie de foto
├── ArticleBody.vue           → Contenido rich text
├── ArticleMeta.vue           → Fecha, tiempo de lectura, categoría
├── ArticleAuthor.vue         → Tarjeta bio del autor
├── ArticleTags.vue           → Píldoras de tags
├── ArticleShare.vue          → Botones de compartir
├── ReadingProgress.vue       → Barra de progreso
└── RelatedArticles.vue       → Contenido similar
```

---

## PARTE 4: PASOS DE IMPLEMENTACIÓN

### Fase 1: Backend Strapi (Días 1-2)

#### Paso 1.1: Crear Componentes
```bash
cd /Users/macbook/Desktop/proyectos/rock-vibes/rock-vibes-strapi
mkdir -p src/components/article
```

Crear archivos:
- `src/components/article/author.json`
- `src/components/article/social-link.json`

#### Paso 1.2: Crear Content Types
```bash
npm run strapi generate
# Seleccionar: content-type → article-category
# Seleccionar: content-type → article-tag
```

#### Paso 1.3: Actualizar Schema de News
1. Hacer backup del schema actual
2. Agregar nuevos campos al schema.json
3. Reiniciar Strapi
4. Verificar en admin panel

#### Paso 1.4: Poblar Datos Iniciales
1. Crear 3-4 categorías de ejemplo
2. Crear 8-10 tags de ejemplo
3. Actualizar artículos existentes con:
   - Información de autor
   - Categorías
   - Tags
   - Meta descripciones
   - Tiempo de lectura (calcular: palabras ÷ 265)
   - Pies de foto

### Fase 2: Capa de Servicio Frontend (Día 3)

#### Paso 2.1: Actualizar Servicio Strapi

**Archivo**: `/rock-vibes/src/services/strapi.js`

Agregar:
- Función `extractArticleData()` mejorada con nuevos campos
- Función `calculateReadingTime()` para calcular minutos de lectura
- Actualizar `getNewsBySlug()` para popular todas las relaciones
- Nueva función `getRelatedNews()` para artículos relacionados

```javascript
// Ejemplo de populate mejorado
export const getNewsBySlug = async (slug, locale = 'en') => {
  const response = await api.get(`/plural-news`, {
    params: {
      locale,
      'filters[slug][$eq]': slug,
      populate: {
        image: true,
        author: {
          populate: ['avatar', 'socialLinks']
        },
        category: true,
        tags: true
      }
    }
  })
  // ...
}
```

### Fase 3: Componentes Vue (Días 4-6)

#### Crear cada componente en orden:

1. **ReadingProgress.vue** (más simple, sin dependencias)
2. **ArticleMeta.vue** (metadata bar)
3. **ArticleShare.vue** (botones de compartir)
4. **ArticleTags.vue** (tags pills)
5. **ArticleHero.vue** (imagen hero)
6. **ArticleBody.vue** (contenido rich text)
7. **ArticleHeader.vue** (encabezado completo)
8. **ArticleAuthor.vue** (bio del autor)
9. **RelatedArticles.vue** (artículos relacionados)

#### Actualizar NewsDetail.vue

Reemplazar el template actual con la nueva estructura usando todos los componentes creados.

### Fase 4: SEO & Performance (Día 7)

1. Agregar structured data (JSON-LD) para artículos
2. Implementar meta tags dinámicos (Open Graph, Twitter Cards)
3. Optimizar imágenes (lazy loading, responsive)
4. Agregar canonical URLs
5. Testing de rendimiento con Lighthouse

### Fase 5: Testing & Refinamiento (Día 8)

#### Checklist de Testing
- [ ] Artículo carga correctamente desde Strapi
- [ ] Todos los campos se muestran apropiadamente
- [ ] Artículos relacionados cargan
- [ ] Compartir en redes funciona
- [ ] Barra de progreso se actualiza
- [ ] Imágenes muestran pies de foto
- [ ] Cambio de idioma funciona
- [ ] Responsive en móvil, tablet, desktop
- [ ] Accesibilidad (teclado, screen reader)
- [ ] SEO (meta tags, structured data)

---

## PARTE 5: ESTRATEGIA DE MIGRACIÓN DE DATOS

### Enfoque Recomendado

1. **Valores por Defecto Automáticos**:
   - Tiempo de lectura: Calcular desde longitud de contenido
   - Autor: Default a "Rock Vibes Staff"
   - Categoría: Crear categoría "General"
   - Tags: Dejar vacío inicialmente

2. **Mejora Gradual**:
   - Actualizar artículos mientras los editas
   - Sin cambios breaking para contenido existente
   - Nuevos campos son opcionales

3. **Script de Actualización Masiva** (Opcional):

```javascript
// scripts/migrate-news.js
const calculateReadingTime = (content) => {
  const text = content.replace(/<[^>]*>/g, '')
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / 265)
}

// Actualizar artículos en lote
```

---

## PARTE 6: CRONOGRAMA DE IMPLEMENTACIÓN

### Semana 1: Backend
- **Días 1-2**: Actualización de schemas Strapi, componentes, content types
- **Día 3**: Capa de servicio frontend, testing

### Semana 2: Frontend
- **Días 4-6**: Crear componentes Vue
- **Día 7**: Implementación SEO, optimización de rendimiento
- **Día 8**: Testing y corrección de bugs

### Semana 3: Contenido & Lanzamiento
- **Días 9-10**: Migrar artículos existentes, agregar metadata
- **Días 11-12**: QA testing, auditoría de accesibilidad
- **Día 13**: Despliegue a staging
- **Día 14**: Despliegue a producción
- **Día 15**: Monitoreo, recopilación de feedback

---

## ARCHIVOS CRÍTICOS A MODIFICAR

### Backend (Strapi)
1. `/rock-vibes-strapi/src/api/single-news/content-types/single-news/schema.json`
   - Schema principal de News con todos los campos

2. `/rock-vibes-strapi/src/components/article/author.json`
   - Componente de autor

3. `/rock-vibes-strapi/src/components/article/social-link.json`
   - Componente de redes sociales

4. `/rock-vibes-strapi/src/api/article-category/content-types/article-category/schema.json`
   - Content type de categorías (nuevo)

5. `/rock-vibes-strapi/src/api/article-tag/content-types/article-tag/schema.json`
   - Content type de tags (nuevo)

### Frontend (Vue)
1. `/rock-vibes/src/services/strapi.js`
   - Capa de datos, transformación, API calls

2. `/rock-vibes/src/views/NewsDetail.vue`
   - Componente principal de página de artículo

3. `/rock-vibes/src/assets/main.css`
   - Estilos globales y tipografía de artículos

4. `/rock-vibes/src/components/article/*.vue`
   - Todos los componentes nuevos de artículo (9 componentes)

---

## MÉTRICAS DE ÉXITO

### KPIs Clave
- **Engagement**: Tiempo en página > 2 minutos
- **Legibilidad**: Tasa de rebote < 40%
- **SEO**: Incremento en tráfico de búsqueda orgánica
- **Performance**: Score de Lighthouse > 90
- **Accesibilidad**: Cumplimiento WCAG AA
- **Mobile**: Tráfico móvil > 60%

---

## MEJORAS FUTURAS (Opcional - Fase 2)

1. **Tabla de Contenidos** (para artículos largos)
2. **Modo Oscuro** (dark mode toggle)
3. **Sistema de Marcadores** (bookmarking)
4. **Newsletter signup** CTA
5. **Sección de Comentarios** (Disqus o custom)
6. **Series de Artículos** (artículos multi-parte)
7. **Soporte para Videos Embebidos**
8. **Funcionalidad de Búsqueda**
9. **Generación de RSS Feed**
10. **Integración de Analytics** (tiempo en página, scroll depth)

---

## VENTAJAS DE ESTE ENFOQUE

### Por qué este plan es "infalible":

1. **Incremental**: No rompe nada existente, se agrega gradualmente
2. **Basado en Estándares**: Sigue patrones probados de sitios líderes
3. **Compatible con i18n**: Todos los nuevos campos soportan multilenguaje
4. **SEO-First**: Structured data y meta tags desde el inicio
5. **Responsive**: Mobile-first desde el diseño
6. **Accesible**: Cumplimiento WCAG AA built-in
7. **Performante**: Optimización de imágenes y lazy loading
8. **Escalable**: Fácil agregar nuevos campos/features después
9. **Backward Compatible**: Artículos existentes siguen funcionando
10. **Bien Documentado**: Plan paso a paso con ejemplos de código

---

## RESUMEN DE CAMBIOS

### Base de Datos (Strapi)
- ➕ 10 campos nuevos al content type News
- ➕ 2 content types nuevos (Category, Tag)
- ➕ 2 componentes nuevos (Author, Social Link)

### Frontend (Vue)
- ➕ 9 componentes nuevos en /components/article/
- ✏️ 1 vista actualizada (NewsDetail.vue)
- ✏️ 1 servicio actualizado (strapi.js)
- ➕ Estilos CSS para artículos profesionales

### Resultado Final
- ✨ Páginas de artículos con diseño profesional
- ✨ SEO optimizado con structured data
- ✨ Experiencia de lectura de calidad
- ✨ Sistema de categorías y tags
- ✨ Información de autor completa
- ✨ Artículos relacionados
- ✨ Compartir en redes sociales
- ✨ Responsive y accesible
