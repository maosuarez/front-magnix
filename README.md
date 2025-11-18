# Magnix - Plataforma Deportiva

Plataforma completa para gestión de torneos, reservas de espacios deportivos y comunidad deportiva.

## Configuración

### Variables de Entorno Requeridas

Crea un archivo `.env.local` con las siguientes variables:

#### Firebase Authentication
\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=tu_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
\`\`\`

#### Backend API
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

## Estructura del Proyecto

\`\`\`
magnix/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Rutas de autenticación
│   ├── dashboard/           # Panel de usuario
│   ├── admin/               # Panel de administrador
│   ├── tournaments/         # Módulo de torneos
│   ├── reservations/        # Módulo de reservas
│   └── community/           # Módulo de comunidad
├── components/              # Componentes reutilizables
│   ├── ui/                  # Componentes UI base
│   ├── auth-provider.tsx    # Provider de autenticación
│   └── ...
├── hooks/                   # Custom hooks
│   ├── use-auth.ts          # Hook de autenticación
│   └── ...
├── lib/                     # Utilidades
│   ├── firebase.ts          # Configuración Firebase
│   ├── api-client.ts        # Cliente API REST
│   └── utils.ts            # Utilidades generales
└── types/                   # Definiciones TypeScript
    └── index.ts            # Tipos principales
\`\`\`

## Endpoints del Backend (Spring Boot)

### Autenticación
- `GET /api/users/profile` - Obtener perfil del usuario actual

### Torneos
- `GET /api/tournaments` - Listar torneos
- `POST /api/tournaments` - Crear torneo (Admin)
- `GET /api/tournaments/{id}` - Obtener torneo
- `PUT /api/tournaments/{id}` - Actualizar torneo (Admin)
- `DELETE /api/tournaments/{id}` - Eliminar torneo (Admin)
- `POST /api/tournaments/{id}/register` - Inscribirse en torneo

### Equipos
- `GET /api/teams` - Listar equipos
- `POST /api/teams` - Crear equipo
- `GET /api/teams/{id}` - Obtener equipo
- `PUT /api/teams/{id}` - Actualizar equipo
- `POST /api/teams/{id}/members` - Agregar miembro

### Reservas
- `GET /api/reservations` - Listar reservas del usuario
- `POST /api/reservations` - Crear reserva
- `GET /api/reservations/{id}` - Obtener reserva
- `PUT /api/reservations/{id}/cancel` - Cancelar reserva
- `GET /api/spaces` - Listar espacios disponibles
- `GET /api/spaces/{id}/availability` - Ver disponibilidad

### Comunidad
- `GET /api/posts` - Listar publicaciones (filtro por deporte)
- `POST /api/posts` - Crear publicación
- `GET /api/posts/{id}` - Obtener publicación
- `DELETE /api/posts/{id}` - Eliminar publicación
- `POST /api/posts/{id}/like` - Like a publicación
- `GET /api/posts/{id}/comments` - Listar comentarios
- `POST /api/posts/{id}/comments` - Crear comentario

### Admin
- `GET /api/admin/stats` - Obtener métricas
- `GET /api/admin/users` - Listar usuarios
- `PUT /api/admin/users/{id}` - Actualizar usuario
- `DELETE /api/admin/posts/{id}` - Moderar publicación

## Instalación

\`\`\`bash
npm install
npm run dev
\`\`\`

## Características

✅ Autenticación con Firebase
✅ Integración con API REST (Spring Boot + MySQL)
✅ Sistema de roles (Usuario/Admin)
✅ Gestión de torneos con brackets
✅ Sistema de reservas con calendario
✅ Comunidad por deporte
✅ Panel de administración completo
✅ Diseño responsive
✅ Tema verde, negro y blanco
