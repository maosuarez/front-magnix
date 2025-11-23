# Magnix - Plataforma de Gestión de Torneos y Reservas Deportivas

Magnix es una plataforma completa para gestión de torneos, reservas de espacios deportivos y comunidad deportiva. Desarrollada con Next.js, React, TypeScript y Tailwind CSS.

## 🎯 Características

- **Autenticación JWT**: Sistema de login/registro seguro con tokens JWT
- **Dashboard de Usuario**: Panel personalizado con estadísticas y actividad
- **Gestión de Reservas**: Calendario interactivo y sistema de reservas de espacios
- **Módulo de Torneos**: Crear y gestionar torneos con equipos, fixtures y brackets
- **Comunidad Deportiva**: Red social con publicaciones, comentarios y likes por deporte
- **Panel de Administración**: CRUD completo de usuarios, torneos, espacios y moderación
- **Diseño Responsive**: Interfaz adaptable a todos los dispositivos
- **Sistema de Roles**: Protección de rutas según roles (usuario/administrador)

## 🏗️ Estructura del Proyecto

\`\`\`
magnix/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── usuarios/page.tsx
│   │   ├── torneos/page.tsx
│   │   ├── espacios/page.tsx
│   │   ├── reservas/page.tsx
│   │   └── moderacion/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── profile/page.tsx
│   │   ├── reservas/
│   │   │   ├── page.tsx
│   │   │   └── nueva/page.tsx
│   │   ├── torneos/
│   │   │   ├── page.tsx
│   │   │   ├── crear/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── comunidad/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── sidebar.tsx
│   ├── dashboard-layout.tsx
│   ├── admin-layout.tsx
│   ├── booking-calendar.tsx
│   ├── bookings-list.tsx
│   ├── tournament-card.tsx
│   ├── tournament-bracket.tsx
│   ├── community-feed.tsx
│   ├── community-post.tsx
│   └── community-post-form.tsx
├── hooks/
│   └── use-auth.ts
├── lib/
│   ├── api-client.ts
│   └── utils.ts
├── middleware.ts
└── .env.example
\`\`\`

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js 18+ y npm/yarn
- Backend Spring Boot corriendo en `http://localhost:9090`
- Base de datos MySQL configurada en el backend

### Instalación

1. Clonar el repositorio:
\`\`\`bash
git clone <repository-url>
cd magnix
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar variables de entorno (ver sección de Configuración)

4. Ejecutar en desarrollo:
\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

### Compilación para Producción

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:9090/api

# JWT
# El JWT se almacena en localStorage después del login

# Redirección para desarrollo
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

## 📡 API Endpoints

La aplicación consume los siguientes endpoints del backend:

### Autenticación
- `POST /auth/login` - Login de usuario
- `POST /auth/register` - Registro de nuevo usuario

### Usuarios
- `GET /usuarios` - Listar usuarios (admin)
- `GET /usuarios/:id` - Obtener usuario
- `PUT /usuarios/:id` - Actualizar usuario
- `DELETE /usuarios/:id` - Eliminar usuario (admin)

### Reservas
- `GET /reservas` - Listar reservas del usuario
- `POST /reservas` - Crear nueva reserva
- `PUT /reservas/:id` - Actualizar reserva
- `DELETE /reservas/:id` - Cancelar reserva
- `GET /espacios` - Listar espacios disponibles
- `GET /espacios/:id/disponibilidad` - Verificar disponibilidad

### Torneos
- `GET /torneos` - Listar torneos
- `POST /torneos` - Crear torneo (admin)
- `GET /torneos/:id` - Obtener detalles del torneo
- `POST /torneos/:id/inscribir` - Inscribirse en torneo
- `DELETE /torneos/:id/desinscribir` - Desinscribirse
- `GET /torneos/:id/equipos` - Listar equipos
- `GET /torneos/:id/fixtures` - Obtener fixtures

### Comunidad
- `GET /comunidad/publicaciones` - Listar publicaciones
- `POST /comunidad/publicaciones` - Crear publicación
- `POST /comunidad/publicaciones/:id/like` - Dar like
- `DELETE /comunidad/publicaciones/:id/like` - Quitar like
- `POST /comunidad/publicaciones/:id/comentarios` - Comentar
- `POST /comunidad/publicaciones/:id/reportar` - Reportar publicación (moderación)

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens) para autenticación:

1. El usuario se autentica enviando email y contraseña
2. El backend retorna un token JWT
3. El token se almacena en localStorage
4. En cada request, el token se incluye en el header `Authorization: Bearer <token>`
5. El middleware verifica el token en rutas protegidas

### Flujo de Autenticación

\`\`\`typescript
// Login
const { text } = await post('/auth/login', { email, password });
// Respuesta: { token: "...", user: { id, email, nombre, rol } }

// Token se almacena automáticamente
localStorage.setItem('magnix_token', token);

// En requests posteriores
headers.Authorization = `Bearer ${token}`;
\`\`\`

## 👥 Roles y Permisos

### Usuario Regular
- Crear y gestionar sus propias reservas
- Ver su perfil
- Participar en torneos
- Crear publicaciones en comunidad
- Dar likes y comentar

### Administrador
- Acceso al panel de administración
- CRUD de usuarios
- CRUD de torneos
- CRUD de espacios deportivos
- Gestión de reservas
- Moderación de comunidad

## 🎨 Sistema de Colores

El diseño utiliza un sistema de colores verde, blanco y negro:

- **Color Primario (Verde)**: `hsl(142.5, 50%, 50%)`
- **Fondo**: Blanco/Negro según modo
- **Texto**: Negro/Blanco según modo
- **Acentos**: Variaciones del verde

## 📱 Responsive Design

La aplicación es completamente responsive:
- Móvil: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔄 Flujos Principales

### Crear Reserva
1. Usuario accede a `/dashboard/reservas/nueva`
2. Selecciona deporte, fecha
3. Sistema muestra disponibilidad
4. Usuario selecciona horario
5. Confirma reserva
6. Se guarda en backend

### Crear Torneo
1. Administrador accede a `/admin/torneos`
2. Crea nuevo torneo con detalles
3. Sistema valida datos
4. Torneo se crea en estado "registracion"
5. Usuarios pueden inscribirse

### Moderar Comunidad
1. Usuarios reportan publicaciones ofensivas
2. Administrador ve reportes en `/admin/moderacion`
3. Puede aprobar o rechazar publicación
4. Se notifica al autor

## 🧪 Testing

Los endpoints están listos para ser testeados. Recomendamos:

1. **Postman/Insomnia**: Para testear endpoints del backend
2. **Jest**: Para testing unitario de componentes React
3. **Cypress/Playwright**: Para testing E2E de la aplicación

## 📚 Componentes Reutilizables

- `Button`: Botones con variantes (primary, outline, destructive)
- `Card`: Contenedor básico de contenido
- `Input`: Campo de entrada de texto
- `Label`: Etiquetas para formularios
- `Select`: Selectores personalizados
- `Sidebar`: Barra lateral de navegación
- `DashboardLayout`: Layout para páginas de usuario
- `AdminLayout`: Layout para páginas de administrador

## 🚀 Deployment

### A Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Variables de Entorno en Producción

En Vercel, añadir variables de entorno en Settings > Environment Variables:

\`\`\`
NEXT_PUBLIC_API_BASE_URL=https://api.tudominio.com/api
\`\`\`

## 📝 Notas de Desarrollo

- Los datos actualmente son mock. Integrar con backend Spring Boot
- Implementar paginación en listas largas
- Añadir validación de formularios más robusta
- Implementar notificaciones push
- Añadir sistema de pagos con Stripe para reservas premium

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 📞 Soporte

Para reportar bugs o sugerir mejoras, crear un issue en el repositorio.
