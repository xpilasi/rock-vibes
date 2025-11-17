# Configuración de Deploy en Netlify

## Problema: Página en blanco después del deploy

### Soluciones aplicadas:

1. **Archivo `netlify.toml` creado** - Configura el build y las redirecciones para SPA
2. **Variables de entorno requeridas** - Deben configurarse en Netlify

## Pasos para configurar en Netlify:

### 1. Configurar Variables de Entorno

Ir a: `Site configuration > Environment variables` en tu dashboard de Netlify

Agregar la siguiente variable:

```
Key: VITE_STRAPI_URL
Value: https://rock-vibes-strapi.onrender.com
```

**IMPORTANTE**: Las variables de entorno con prefijo `VITE_` se incluyen en el bundle del frontend y son públicas.

### 2. Verificar configuración de Build

En `Site configuration > Build & deploy > Build settings`:

- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 3. Re-deployar el sitio

Después de configurar la variable de entorno:

1. Ir a `Deploys`
2. Click en `Trigger deploy > Clear cache and deploy site`

### 4. Verificar en consola del navegador

Si sigue en blanco, abre DevTools (F12) y revisa:
- Console: Busca errores de JavaScript
- Network: Verifica que los archivos `.js` y `.css` se carguen correctamente
- Verifica que la URL de Strapi esté correcta

## Archivos de configuración

- `netlify.toml` - Configuración de build y redirects
- `.env.example` - Template de variables de entorno
- `.env` - Variables locales (NO committed a git)

## Troubleshooting adicional

Si después de esto sigue en blanco:

1. **Verificar que Strapi esté accesible**:
   ```bash
   curl https://rock-vibes-strapi.onrender.com/api
   ```

2. **Build local para verificar**:
   ```bash
   npm run build
   npm run preview
   ```

3. **Revisar errores de CORS** en Strapi:
   - El frontend debe estar en la whitelist de CORS en Strapi
   - Agregar el dominio de Netlify en la configuración de CORS de Strapi
