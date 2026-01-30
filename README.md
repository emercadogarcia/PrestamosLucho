# 🏦 PRÉSTAMOS LUCHO - Sistema de Gestión de Préstamos

Sistema de gestión de préstamos multi-empresa, multi-país y multi-moneda de nivel empresarial.

## 📋 Características Principales

### ✨ Funcionalidades Clave

- **Multi-tenant (Multi-empresa)**: Arquitectura que soporta múltiples empresas con aislamiento completo de datos
- **Multi-país y Multi-moneda**: Gestión de operaciones en diferentes países y monedas (USD, EUR, PEN, COP, MXN, ARS)
- **Gestión de Clientes**: ABM completo con referencias personales, geolocalización y calificación crediticia
- **Sistema de Préstamos**: 
  - Interés simple y compuesto
  - Pago en cuotas o al final del período
  - Cálculo automático de intereses
  - Estados: activo, cancelado, vencido, en mora
- **Sistema de Mora Automático**:
  - Período de gracia configurable
  - Recargos automáticos por atraso
  - Bloqueo automático de clientes morosos
- **Registro de Cobros**: Cobros manuales y digitales con registro completo
- **Roles de Usuario**:
  - Administrador: Acceso total
  - Prestamista: Gestión de préstamos
  - Cobrador: Registro de cobros
  - Reporting: Solo visualización y reportes
- **Sistema de Reportes**:
  - Cobros realizados y pendientes
  - Préstamos activos y en mora
  - Productividad por cobrador
  - Exportación a PDF y Excel
- **Auditoría Completa**: Registro de todas las acciones (quién, qué, cuándo)
- **Multi-idioma**: Español e Inglés

### 🔐 Seguridad

- Autenticación JWT
- OAuth Google (preparado)
- 2FA opcional por empresa
- Aislamiento de datos por empresa
- Auditoría de acciones

## 🚀 Stack Tecnológico

### Frontend
- **React 19** con TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Zustand** - State Management
- **Lucide React** - Iconos
- **date-fns** - Manejo de fechas
- **Recharts** - Gráficos

### Backend (Node.js)
- **Express.js** - Framework web
- **PostgreSQL/MySQL** - Base de datos
- **Prisma** - ORM
- **JWT** - Autenticación
- **Bcrypt** - Encriptación
- **Winston** - Logging

## 📁 Estructura del Proyecto

```
prestamos-lucho/
├── frontend/                  # Aplicación React (este directorio)
│   ├── src/
│   │   ├── components/       # Componentes de UI
│   │   │   ├── auth/        # Autenticación
│   │   │   ├── dashboard/   # Panel principal
│   │   │   ├── clients/     # Gestión de clientes
│   │   │   ├── loans/       # Gestión de préstamos
│   │   │   ├── payments/    # Registro de cobros
│   │   │   ├── reports/     # Reportes
│   │   │   ├── settings/    # Configuración
│   │   │   └── layout/      # Layout (Header, Sidebar)
│   │   ├── store/           # Estado global (Zustand)
│   │   ├── types/           # Definiciones TypeScript
│   │   ├── utils/           # Utilidades
│   │   ├── i18n/            # Traducciones
│   │   └── data/            # Datos mock
│   ├── public/
│   └── package.json
│
├── backend/                  # API Node.js (ver estructura abajo)
│   ├── src/
│   │   ├── config/          # Configuración
│   │   ├── controllers/     # Controladores
│   │   ├── services/        # Lógica de negocio
│   │   ├── repositories/    # Acceso a datos
│   │   ├── middleware/      # Middleware (auth, error handling)
│   │   ├── routes/          # Rutas de la API
│   │   ├── models/          # Modelos de datos
│   │   ├── utils/           # Utilidades
│   │   └── server.ts        # Punto de entrada
│   ├── prisma/
│   │   ├── schema.prisma    # Schema de base de datos
│   │   └── migrations/      # Migraciones
│   ├── .env.example
│   └── package.json
│
├── database/                 # Scripts de base de datos
│   ├── schema.sql           # Schema completo
│   ├── migrations/          # Migraciones SQL
│   └── seeds/               # Datos de ejemplo
│
└── docs/                    # Documentación adicional
    ├── API.md              # Documentación de API
    ├── DEPLOYMENT.md       # Guía de despliegue
    └── ARCHITECTURE.md     # Arquitectura del sistema
```

## 🔧 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- PostgreSQL 14+ o MySQL 8+
- npm o yarn
- Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/prestamos-lucho.git
cd prestamos-lucho
```

### 2. Instalar Frontend

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

El frontend estará disponible en `http://localhost:5173`

### 3. Configurar Backend

Ver archivo `backend/README.md` para instrucciones detalladas del backend.

Resumen rápido:

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run migrate
npm run seed
npm run dev
```

### 4. Configurar Base de Datos

```bash
# PostgreSQL
psql -U postgres -f database/schema.sql

# O ejecutar las migraciones con Prisma
cd backend
npx prisma migrate dev
npx prisma db seed
```

## 🌍 Variables de Entorno

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=tu-google-client-id
```

### Backend (.env)
```env
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/prestamos_lucho"

# JWT
JWT_SECRET=tu-jwt-secret-muy-seguro-aqui
JWT_EXPIRES_IN=24h

# OAuth Google
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# Servidor
PORT=3000
NODE_ENV=production

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-password

# AWS S3 (opcional - para almacenar documentos)
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
AWS_BUCKET_NAME=prestamos-lucho-docs
```

## 🐳 Despliegue con Docker

### Docker Compose (Recomendado)

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Dockerfile Manual

```bash
# Frontend
docker build -t prestamos-lucho-frontend .
docker run -p 80:80 prestamos-lucho-frontend

# Backend
cd backend
docker build -t prestamos-lucho-backend .
docker run -p 3000:3000 prestamos-lucho-backend
```

## 🖥️ Despliegue en Servidor Linux

### Opción 1: Nginx + PM2 (Recomendado)

```bash
# 1. Instalar dependencias
sudo apt update
sudo apt install nginx postgresql nodejs npm

# 2. Instalar PM2
sudo npm install -g pm2

# 3. Configurar PostgreSQL
sudo -u postgres psql
CREATE DATABASE prestamos_lucho;
CREATE USER lucho_user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE prestamos_lucho TO lucho_user;

# 4. Clonar y configurar proyecto
git clone https://github.com/tu-usuario/prestamos-lucho.git
cd prestamos-lucho

# 5. Backend
cd backend
npm install
cp .env.example .env
# Editar .env
npm run build
pm2 start dist/server.js --name prestamos-api
pm2 save
pm2 startup

# 6. Frontend
cd ../
npm install
npm run build

# 7. Configurar Nginx
sudo nano /etc/nginx/sites-available/prestamos-lucho
```

**Configuración Nginx:**

```nginx
server {
    listen 80;
    server_name tudominio.com;

    # Frontend
    location / {
        root /var/www/prestamos-lucho/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/prestamos-lucho /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL con Let's Encrypt (recomendado)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com
```

### Opción 2: Docker en Servidor

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clonar proyecto y ejecutar
git clone https://github.com/tu-usuario/prestamos-lucho.git
cd prestamos-lucho
docker-compose up -d
```

## 👤 Credenciales por Defecto

**Administrador:**
- Email: admin@prestamoslucho.com
- Password: admin123

**⚠️ IMPORTANTE:** Cambiar estas credenciales en producción.

## 📊 Uso del Sistema

### 1. Login
Acceder con las credenciales de administrador o usar Google OAuth.

### 2. Crear Cliente
1. Ir a "Clientes" → "Nuevo Cliente"
2. Completar datos personales
3. Agregar referencias personales
4. Asignar cobrador
5. Guardar

### 3. Crear Préstamo
1. Ir a "Préstamos" → "Nuevo Préstamo"
2. Seleccionar cliente
3. Ingresar monto, plazo y moneda
4. Configurar tasa de interés
5. Elegir tipo de interés (simple/compuesto)
6. Elegir forma de pago (cuotas/final)
7. Sistema calcula automáticamente el total
8. Guardar y desembolsar

### 4. Registrar Cobro
1. Ir a "Cobros" → "Registrar Cobro"
2. Seleccionar préstamo
3. Ingresar monto
4. Elegir método de pago
5. Agregar notas (opcional)
6. Guardar

### 5. Generar Reportes
1. Ir a "Reportes"
2. Seleccionar tipo de reporte
3. Configurar filtros de fecha
4. Generar
5. Exportar a PDF o Excel

## 🔄 Actualizaciones

```bash
# Actualizar código
git pull origin main

# Frontend
npm install
npm run build

# Backend
cd backend
npm install
npm run build
pm2 restart prestamos-api
```

## 🐛 Troubleshooting

### Error de conexión a base de datos
- Verificar que PostgreSQL esté corriendo: `sudo systemctl status postgresql`
- Verificar credenciales en `.env`
- Verificar firewall: `sudo ufw allow 5432`

### Error 502 Bad Gateway
- Verificar que el backend esté corriendo: `pm2 status`
- Ver logs: `pm2 logs prestamos-api`
- Reiniciar: `pm2 restart prestamos-api`

### Build falla
- Limpiar caché: `npm run clean && npm install`
- Verificar versión de Node: `node --version` (debe ser 18+)

## 📝 Licencia

Copyright © 2024 Préstamos LUCHO. Todos los derechos reservados.

## 👥 Soporte

Para soporte técnico o consultas:
- Email: soporte@prestamoslucho.com
- Documentación: [docs.prestamoslucho.com](https://docs.prestamoslucho.com)
- Issues: [GitHub Issues](https://github.com/tu-usuario/prestamos-lucho/issues)

## 🚧 Roadmap

- [ ] Integración con pasarelas de pago (Stripe, PayPal)
- [ ] App móvil (React Native)
- [ ] Firma digital de contratos
- [ ] Scoring crediticio automático con ML
- [ ] Notificaciones por WhatsApp
- [ ] Integración con sistemas contables
- [ ] Reportes avanzados con BI

---

**Desarrollado con ❤️ por el equipo de Préstamos LUCHO**
