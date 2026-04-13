# Proyecto Veterinaria - Full Stack

Este es un proyecto de gestión veterinaria con backend en NestJS y frontend en React (Vite).

## Requisitos Previos

- Node.js (v18+)
- Acceso a la base de datos RDS (configurado en el backend)

## Configuración del Backend

1. Navega a la carpeta del backend:
   ```bash
   cd backend/veterinaria-backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`:
     ```bash
     cp .env.example .env
     ```
   - (Opcional) Ajusta las variables si es necesario.
4. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```
5. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```

## Configuración del Frontend

1. Navega a la carpeta del frontend:
   ```bash
   cd learning-all-with-ia
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el frontend en modo desarrollo:
   ```bash
   npm run dev
   ```

## Notas Importantes

- **Base de Datos**: El proyecto está configurado para usar una instancia de AWS RDS. Asegúrate de que tu dirección IP esté permitida en el **Security Group** de la instancia de RDS en el puerto `5432`.
- **API**: El frontend consume el backend localmente en `http://localhost:5004`.
