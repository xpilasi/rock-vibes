# Configuración de MCP (Model Context Protocol) en Claude Code

## Introducción

Este documento describe cómo configurar y conectar servidores MCP (Model Context Protocol) con Claude Code en el proyecto Rock Vibes. La configuración actual ya incluye el servidor de Render funcionando correctamente.

## Ubicación del Archivo de Configuración

El archivo de configuración MCP se encuentra en la raíz del proyecto:

```
/rock-vibes/.mcp.json
```

Este archivo define todos los servidores MCP que Claude Code puede utilizar durante las sesiones de trabajo.

## Estructura del Archivo `.mcp.json`

```json
{
  "mcpServers": {
    "nombre-del-servidor": {
      "command": "comando-a-ejecutar",
      "args": ["argumentos", "del", "comando"],
      "env": {
        "VARIABLE_ENTORNO": "valor"
      }
    }
  }
}
```

### Campos Principales

- **`mcpServers`**: Objeto contenedor de todos los servidores MCP
- **`nombre-del-servidor`**: Identificador único del servidor (ej: "render", "notion", "github")
- **`command`**: Comando base para ejecutar el servidor (ej: "npx", "node", "python")
- **`args`**: Array de argumentos para el comando
- **`env`**: Variables de entorno necesarias para el servidor

## Configuración Actual: Render MCP

### Ejemplo Funcionando

```json
{
  "mcpServers": {
    "render": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.render.com/mcp",
        "--header",
        "Authorization: Bearer ${RENDER_API_KEY}"
      ],
      "env": {
        "RENDER_API_KEY": "rnd_AiHca6ZJjQnmdOHWRbTpB4dDcQR5"
      }
    }
  }
}
```

### Desglose de la Configuración

1. **Comando**: `npx` - Ejecuta paquetes npm sin necesidad de instalación global
2. **Paquete**: `mcp-remote` - Cliente para conectarse a servidores MCP remotos
3. **URL del servidor**: `https://mcp.render.com/mcp` - Endpoint del servidor MCP de Render
4. **Autenticación**: Se pasa mediante header `Authorization` con el API key
5. **API Key**: Almacenada en la variable de entorno `RENDER_API_KEY`

## Cómo Agregar Nuevos Servidores MCP

### Paso 1: Identificar el Tipo de Servidor

Existen tres tipos principales de servidores MCP:

1. **Servidor HTTP remoto**: Para servicios en la nube (como Render)
2. **Servidor SSE remoto**: Para conexiones Server-Sent Events
3. **Servidor stdio local**: Para aplicaciones locales en tu máquina

### Paso 2: Obtener las Credenciales

Cada servicio MCP requiere autenticación. Ejemplos:

- **Render**: API Key desde https://dashboard.render.com/
- **Notion**: Integration Token desde https://www.notion.so/my-integrations
- **GitHub**: Personal Access Token desde GitHub Settings

### Paso 3: Agregar la Configuración

Edita el archivo `.mcp.json` agregando el nuevo servidor dentro del objeto `mcpServers`:

```json
{
  "mcpServers": {
    "render": {
      // Configuración existente de Render...
    },
    "nuevo-servidor": {
      "command": "npx",
      "args": [
        // Argumentos del nuevo servidor
      ],
      "env": {
        // Variables de entorno necesarias
      }
    }
  }
}
```

## Ejemplos de Configuración para Otros Servicios

### Notion MCP

```json
{
  "mcpServers": {
    "render": {
      // Configuración existente...
    },
    "notion": {
      "command": "npx",
      "args": [
        "-y",
        "@notionhq/client-mcp"
      ],
      "env": {
        "NOTION_API_KEY": "tu_notion_integration_token_aqui"
      }
    }
  }
}
```

### GitHub MCP

```json
{
  "mcpServers": {
    "render": {
      // Configuración existente...
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "tu_github_token_aqui"
      }
    }
  }
}
```

### PostgreSQL MCP (Local)

```json
{
  "mcpServers": {
    "render": {
      // Configuración existente...
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://usuario:password@localhost:5432/nombre_db"
      ]
    }
  }
}
```

### Filesystem MCP (Acceso Local a Archivos)

```json
{
  "mcpServers": {
    "render": {
      // Configuración existente...
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/ruta/al/directorio/permitido"
      ]
    }
  }
}
```

## Buenas Prácticas

### 1. Gestión de Secrets

**❌ No hacer (inseguro):**
```json
{
  "env": {
    "API_KEY": "clave_directamente_en_el_archivo"
  }
}
```

**✅ Hacer (recomendado):**
```json
{
  "env": {
    "API_KEY": "${API_KEY}"
  }
}
```

Y definir la variable en tu sistema:
```bash
# En ~/.bashrc, ~/.zshrc, o equivalente
export API_KEY="tu_clave_real_aqui"
```

**Nota**: En el caso actual de Render, la clave está directamente en el archivo para simplificar. Para proyectos de producción o compartidos, usa variables de entorno del sistema.

### 2. Nomenclatura Clara

Usa nombres descriptivos para tus servidores:
- ✅ `render`, `notion-workspace`, `github-personal`
- ❌ `srv1`, `test`, `temp`

### 3. Documentación Interna

Agrega comentarios en el JSON cuando sea necesario:
```json
{
  "mcpServers": {
    "// Servidor para deployment y monitoring": "",
    "render": {
      // Configuración...
    }
  }
}
```

### 4. Validación

Después de agregar un nuevo servidor, verifica que funciona:

```bash
# Reinicia Claude Code
# Luego, en una conversación con Claude, pregunta:
# "¿Qué servidores MCP tienes disponibles?"
```

## Solución de Problemas

### El servidor MCP no aparece

1. Verifica que el archivo `.mcp.json` tenga formato JSON válido
2. Reinicia Claude Code completamente
3. Verifica los logs de Claude Code para errores

### Error de autenticación

1. Verifica que el API key/token sea válido
2. Confirma que las variables de entorno estén definidas
3. Revisa los permisos del token (algunos servicios requieren scopes específicos)

### El comando npx falla

1. Asegúrate de tener Node.js instalado: `node --version`
2. Verifica que npx esté disponible: `npx --version`
3. Prueba ejecutar el comando manualmente en la terminal

## Recursos Adicionales

- **Documentación oficial de MCP**: https://modelcontextprotocol.io/
- **Servidores MCP disponibles**: https://github.com/modelcontextprotocol/servers
- **Claude Code Docs**: https://code.claude.com/docs/en/mcp.md
- **Render MCP Server**: https://github.com/render-oss/render-mcp-server

## Verificación de Servidor Activo

Para verificar que el MCP de Render está funcionando correctamente, puedes pedirle a Claude que:

- Liste los servicios de Render
- Obtenga métricas de un servicio
- Revise logs recientes
- Gestione deployments

Ejemplo:
```
"Claude, ¿puedes listar mis servicios de Render?"
```

---

**Última actualización**: Noviembre 2025
**Proyecto**: Rock Vibes
**Configuración verificada**: ✅ Render MCP funcionando
