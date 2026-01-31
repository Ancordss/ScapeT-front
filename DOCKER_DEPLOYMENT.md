# ScapeT Frontend - Docker Deployment

## 🐳 Deployment Options

### Option 1: Dokploy (Recommended)

1. **En Dokploy, crea una nueva aplicación:**
   - Tipo: Docker
   - Repositorio: Tu repo de Git o upload local
   - Branch: main

2. **Configurar Build Settings:**
   - Dockerfile path: `Dockerfile`
   - Build context: `.`

3. **Configurar Environment Variables:**
   ```
   VITE_API_URL=https://tu-backend-api.com
   ```
   ⚠️ **IMPORTANTE**: Cambia `https://tu-backend-api.com` por la URL real de tu backend

4. **Port Mapping:**
   - Container Port: `80`
   - Host Port: `3000` (o el que prefieras)

5. **Deploy:**
   - Click en "Deploy"
   - Dokploy construirá y desplegará automáticamente

### Option 2: Docker Build Manual

```bash
# Build con URL del API
docker build --build-arg VITE_API_URL=https://tu-backend-api.com -t scapet-front .

# Run
docker run -d -p 3000:80 --name scapet-frontend scapet-front

# Verify
curl http://localhost:3000/health
```

### Option 3: Docker Compose

```bash
# Crear .env con VITE_API_URL
echo "VITE_API_URL=https://tu-backend-api.com" > .env

# Build and run
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📋 Prerequisitos

- Docker instalado
- Acceso al repositorio
- URL del backend API configurada

## 🔧 Configuración en Dokploy

### 1. Variables de Entorno

En Dokploy, agregar en "Environment Variables":

```env
VITE_API_URL=https://api.tudominio.com
```

### 2. Build Args (si es necesario)

Si Dokploy lo soporta, agregar en "Build Arguments":

```
VITE_API_URL=https://api.tudominio.com
```

### 3. Port Configuration

- **Container Port**: 80
- **Public Port**: 80 o 443 (con SSL)
- Dokploy manejará automáticamente el routing

### 4. Health Check

Dokploy usará el health check definido en el Dockerfile:
- Endpoint: `/health`
- Intervalo: 30s
- Timeout: 3s

## 🌐 Nginx Configuration

El contenedor usa nginx para:
- Servir archivos estáticos optimizados
- Compresión gzip automática
- Cache de assets (1 año)
- React Router support (SPA routing)
- Security headers

## 📊 Build Information

- **Base Image**: node:20-alpine (build), nginx:alpine (production)
- **Build Time**: ~2-3 minutos
- **Final Image Size**: ~50-60 MB (muy optimizado)
- **Exposed Port**: 80

## 🚀 Testing Deployment

### Después del deploy, verifica:

1. **Health check:**
   ```bash
   curl https://tu-dominio.com/health
   # Debería retornar: healthy
   ```

2. **Frontend carga:**
   ```bash
   curl https://tu-dominio.com
   # Debería retornar HTML
   ```

3. **API connection:**
   - Abre el sitio en el navegador
   - Abre la consola (F12)
   - Intenta login/register
   - Verifica que los requests vayan a tu backend API

## 🔐 SSL/HTTPS

Dokploy automáticamente manejará SSL si:
- Tienes un dominio configurado
- Let's Encrypt está habilitado

No necesitas configurar nada adicional en el Dockerfile.

## 📝 Environment Variables

### Build Time (VITE_API_URL)

Esta variable se usa durante el BUILD:
```bash
VITE_API_URL=https://api.tudominio.com
```

⚠️ **IMPORTANTE**: Vite requiere que la URL del API se configure en BUILD TIME, no en runtime. Si cambias la URL del backend, necesitas hacer un rebuild.

### Runtime Variables

Si necesitas cambiar la URL del API sin rebuild, considera usar:
1. Un archivo de configuración en `/public/config.js`
2. O implementar runtime environment variable injection

## 🐛 Troubleshooting

### "API requests failing"
→ Verifica que `VITE_API_URL` esté configurada correctamente
→ Asegúrate que el backend permite CORS desde tu dominio frontend

### "Build failing in Dokploy"
→ Revisa los logs de build
→ Verifica que `package.json` y `package-lock.json` estén committeados
→ Asegúrate que node_modules no esté en el repo

### "404 on page refresh"
→ Esto está manejado por nginx.conf (React Router)
→ Si persiste, verifica que nginx.conf esté incluido en el build

### "Health check failing"
→ Verifica que nginx esté corriendo: `docker exec <container> ps aux`
→ Chequea logs: `docker logs <container>`

## 📦 Multi-Stage Build

El Dockerfile usa multi-stage build:
1. **Stage 1 (builder)**: Construye la aplicación con npm
2. **Stage 2 (production)**: Copia solo los archivos necesarios a nginx

Esto resulta en una imagen final muy pequeña y eficiente.

## 🔄 CI/CD

Para automatizar deploys en Dokploy:
1. Conecta tu repositorio Git
2. Habilita auto-deploy en push to main
3. Dokploy rebuildeará automáticamente

## 📚 Additional Resources

- [Dokploy Documentation](https://docs.dokploy.com)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

---

**Ready to deploy!** 🚀
