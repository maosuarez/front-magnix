# Guía de Integración con API Backend

## Base URL

\`\`\`
http://localhost:9090/api
\`\`\`

## Headers Requeridos

\`\`\`typescript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <JWT_TOKEN>'
}
\`\`\`

## Autenticación (Sin JWT requerido)

### Login

\`\`\`
POST /auth/login
\`\`\`

**Request:**
\`\`\`json
{
  "email": "usuario@example.com",
  "password": "contraseña"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "1",
    "email": "usuario@example.com",
    "nombre": "Juan Pérez",
    "rol": "usuario"
  }
}
\`\`\`

### Register

\`\`\`
POST /auth/register
\`\`\`

**Request:**
\`\`\`json
{
  "email": "nuevo@example.com",
  "password": "contraseña",
  "nombre": "Nuevo Usuario"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "2",
    "email": "nuevo@example.com",
    "nombre": "Nuevo Usuario",
    "rol": "usuario"
  }
}
\`\`\`

## Usuarios

### Listar Usuarios (Admin)

\`\`\`
GET /usuarios
\`\`\`

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "1",
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "rol": "usuario",
      "estado": "activo"
    }
  ],
  "total": 1
}
\`\`\`

### Obtener Perfil

\`\`\`
GET /usuarios/perfil
\`\`\`

### Actualizar Perfil

\`\`\`
PUT /usuarios/perfil
\`\`\`

**Request:**
\`\`\`json
{
  "nombre": "Juan Actualizado",
  "telefono": "1234567890",
  "ciudad": "Madrid"
}
\`\`\`

## Reservas

### Listar Mis Reservas

\`\`\`
GET /reservas
\`\`\`

### Crear Reserva

\`\`\`
POST /reservas
\`\`\`

**Request:**
\`\`\`json
{
  "espacioId": "1",
  "fecha": "2025-02-15",
  "horaInicio": "14:00",
  "horaFin": "15:00"
}
\`\`\`

### Verificar Disponibilidad

\`\`\`
GET /espacios/:id/disponibilidad?fecha=2025-02-15
\`\`\`

## Torneos

### Listar Torneos

\`\`\`
GET /torneos
\`\`\`

### Obtener Torneo

\`\`\`
GET /torneos/:id
\`\`\`

### Inscribirse en Torneo

\`\`\`
POST /torneos/:id/inscribir
\`\`\`

### Listar Equipos del Torneo

\`\`\`
GET /torneos/:id/equipos
\`\`\`

### Obtener Fixtures

\`\`\`
GET /torneos/:id/fixtures
\`\`\`

## Comunidad

### Listar Publicaciones

\`\`\`
GET /comunidad/publicaciones?deporte=futbol
\`\`\`

### Crear Publicación

\`\`\`
POST /comunidad/publicaciones
\`\`\`

**Request:**
\`\`\`json
{
  "contenido": "¡Great game today!",
  "deporte": "futbol",
  "imagen": "base64_encoded_image"
}
\`\`\`

### Dar Like

\`\`\`
POST /comunidad/publicaciones/:id/like
\`\`\`

### Comentar

\`\`\`
POST /comunidad/publicaciones/:id/comentarios
\`\`\`

**Request:**
\`\`\`json
{
  "contenido": "Excelente publicación!"
}
\`\`\`

### Reportar Publicación

\`\`\`
POST /comunidad/publicaciones/:id/reportar
\`\`\`

**Request:**
\`\`\`json
{
  "razon": "Acoso",
  "descripcion": "Esta publicación contiene lenguaje ofensivo"
}
\`\`\`

## Códigos de Error

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Ejemplo de Implementación

\`\`\`typescript
import { post, get } from '@/lib/api-client';

// Login
const { token, user } = await post('/auth/login', {
  email: 'usuario@example.com',
  password: 'contraseña'
});

// Guardar token
localStorage.setItem('magnix_token', token);

// Hacer request autenticado
const reservas = await get('/reservas');

// Crear reserva
const nuevaReserva = await post('/reservas', {
  espacioId: '1',
  fecha: '2025-02-15',
  horaInicio: '14:00',
  horaFin: '15:00'
});
