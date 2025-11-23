# Guía de Instalación y Configuración

## Requisitos del Sistema

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior (o yarn/pnpm)
- **Backend**: Spring Boot corriendo en http://localhost:9090
- **Base de Datos**: MySQL 8.0 o superior

## Instalación Paso a Paso

### 1. Clonar el Repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/magnix.git
cd magnix
\`\`\`

### 2. Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar Variables de Entorno

Crear archivo `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Editar `.env.local` con tus configuraciones:

\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:9090/api
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 4. Ejecutar en Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Acceder a http://localhost:3000

## Compilación para Producción

### Build

\`\`\`bash
npm run build
\`\`\`

### Ejecutar en Modo Producción

\`\`\`bash
npm start
\`\`\`

## Verificar Conexión con Backend

1. Asegurarse que el backend Spring Boot esté corriendo:
\`\`\`bash
# En terminal del backend
java -jar magnix-backend.jar
\`\`\`

2. Probar conexión:
\`\`\`bash
curl http://localhost:9090/api/health
\`\`\`

3. Si no responde, verificar:
   - Puerto 9090 disponible
   - Base de datos MySQL conectada
   - Variables de conexión en backend

## Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev       # Inicia servidor de desarrollo

# Producción
npm run build     # Compila para producción
npm start         # Inicia servidor de producción

# Lint y formato
npm run lint      # Verifica código
\`\`\`

## Troubleshooting

### Error: "Cannot reach API"

1. Verificar que backend está corriendo
2. Verificar NEXT_PUBLIC_API_BASE_URL
3. Verificar CORS en backend

### Error: "Token inválido"

1. Limpiar localStorage: `localStorage.clear()`
2. Hacer login nuevamente
3. Verificar token en backend

### Puerto 3000 en uso

\`\`\`bash
# Usar puerto diferente
npm run dev -- -p 3001
\`\`\`

## Estructura de Directorios

\`\`\`
magnix/
├── app/                 # App Router de Next.js
├── components/          # Componentes React reutilizables
├── hooks/              # Custom hooks
├── lib/                # Utilidades y funciones
├── public/             # Archivos estáticos
├── docs/               # Documentación
├── .env.example        # Variables de entorno ejemplo
├── middleware.ts       # Middleware de Next.js
├── next.config.mjs     # Configuración de Next.js
├── tailwind.config.js  # Configuración de Tailwind
└── tsconfig.json       # Configuración de TypeScript
\`\`\`

## Configuración de IDE

### VS Code

Extensiones recomendadas:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Prettier - Code formatter

Archivo `.vscode/settings.json`:
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
\`\`\`

## Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
