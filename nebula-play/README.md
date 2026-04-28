# Nebula Play

Proyecto web completo base para Nebula Play, desarrollado con:

- HTML
- CSS
- JavaScript
- Node.js
- Express
- PostgreSQL
- Visual Studio Code

## Lo que incluye esta versión

- Inicio de sesión para postulante, empresa y administrador
- Registro de postulante
- Registro de empresa
- Perfil de postulante
- Gestión de currículums con límite de 8 archivos
- Bolsa de trabajo
- Detalle de vacante + postulación
- Compatibilidad inicial tipo IA basada en coincidencia entre título de CV, vacante y experiencia
- Acerca de nosotros
- Comunícate con nosotros
- Atención al cliente
- Panel de empresa
- Panel de administrador
- Integración directa con la base de datos PostgreSQL basada en tu script SQL

## Estructura del proyecto

```txt
nebula-play/
  public/
    assets/
      styles.css
    js/
      app.js
    pages/
      about.html
      admin.html
      company.html
      contact.html
      job.html
      jobs.html
      profile.html
      register-company.html
      register-user.html
      support.html
    index.html
  src/
    db.js
    middleware.js
    server.js
  .env.example
  package.json
```

## 1. Importar tu base de datos

Primero importa tu archivo SQL en PostgreSQL. Ejemplo:

```bash
psql -U postgres -d BDNebulaPlay -f BDNebulaPlay.sql
```

Si tu base aún no existe:

```sql
CREATE DATABASE BDNebulaPlay;
```

## 2. Configurar variables de entorno

Copia `.env.example` y renómbralo como `.env`

Ejemplo:

```env
PORT=4000
SESSION_SECRET=nebula_super_secreto_cambiar
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/BDNebulaPlay
```

## 3. Instalar dependencias

Abre el proyecto en Visual Studio Code y en la terminal ejecuta:

```bash
npm install
```

## 4. Ejecutar el proyecto

```bash
npm run dev
```

Luego abre:

```txt
http://localhost:4000
```

## Usuarios demo que vienen en tu SQL

- Postulante: `juan@email.com` / `clave123`
- Postulante: `maria@email.com` / `clave456`
- Empresa: `empresa1@empresa.com` / `clave789`
- Admin: `admin@plataforma.com` / `admin123`

## Nota sobre contraseñas

Tu SQL actual tiene usuarios demo con contraseñas sin hash. Este proyecto acepta:

- contraseñas antiguas en texto plano, para que tus datos de prueba funcionen
- nuevas cuentas con contraseña cifrada usando bcrypt

## Recomendación de publicación gratuita

La opción más simple para este proyecto es:

- **Render** para publicar la app Node + Express
- **Neon** para PostgreSQL en la nube

Ventaja: puedes subir todo como una sola aplicación web sin separar frontend y backend.

## Flujo recomendado para publicar

1. Subir proyecto a GitHub
2. Crear base de datos PostgreSQL en Neon
3. Cambiar `DATABASE_URL` por la conexión de Neon
4. Crear un servicio web en Render conectado a GitHub
5. Configurar en Render:
   - Build command: `npm install`
   - Start command: `npm start`
6. Agregar variables de entorno en Render
7. Probar rutas públicas y sesiones

## Siguientes mejoras recomendadas

- Guardar foto de perfil y logo empresarial en la base de datos o almacenamiento externo
- Integrar matching con IA real usando embeddings o análisis de CV
- Migrar archivos grandes a almacenamiento externo como Cloudinary o Supabase Storage
- Agregar recuperación de contraseña
- Agregar auditoría completa de acciones del administrador
