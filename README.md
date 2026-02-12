# Cafeteria Intelligence - AWOS EC1

Sistema de Inteligencia de Negocios para Cafetería desarrollado con Next.js 15 y PostgreSQL.

## 🚀 Inicio Rápido (Instrucciones Claras)

Sigue estos pasos exactos para levantar el proyecto sin errores.

### 1. Requisitos Previos
*   Tener **Docker Desktop** instalado y corriendo.
*   Tener **Git** instalado.

### 2. Instalación y Ejecución

Abre tu terminal (PowerShell, CMD o Git Bash) en la carpeta del proyecto y ejecuta:

**Para iniciar por primera vez (o limpiar errores):**

```bash
# 1. Detener versiones anteriores y borrar volúmenes de base de datos (IMPORTANTE)
docker compose down -v

# 2. Construir la imagen ignorando caché vieja y levantar
docker compose up --build
```

> **Nota:** La primera vez que corras esto, tardará un momento mientras descarga las imágenes y configura la base de datos PostgreSQL.

### 3. Acceder a la Aplicación

Una vez que veas el mensaje `Ready in ... ms` en la terminal:

👉 Abre tu navegador en: **[http://localhost:3000](http://localhost:3000)**

---

## 🛠 Solución de Problemas Comunes

Si tienes problemas, prueba estos comandos de "Reinicio Total":

**Opción A: El puerto 3000 está ocupado**
Si ves el error `Bind for 0.0.0.0:3000 failed`, es porque otro programa lo está usando. Ejecuta esto para liberar el puerto:
```bash
docker stop $(docker ps -q)
docker rm $(docker ps -aq)
docker compose up --build
```

**Opción B: La base de datos da errores (ej. "relation does not exist")**
Significa que la base de datos tiene datos viejos. Bórrala y recréalos:
```bash
docker compose down -v
docker compose up --build
```

---

## 📂 Estructura del Proyecto

*   **`app-cafeteria/`**: Código fuente del Frontend (Next.js, React, Tailwind).
    *   `src/services/reports.ts`: Lógica de conexión a Base de Datos (Backend).
    *   `src/app/reports/`: Páginas de reportes.
*   **`db/`**: Scripts SQL para la base de datos.
    *   `schema.sql`: Creación de tablas.
    *   `reports_vw.sql`: Vistas SQL para reportes.
    *   `seed.sql`: Datos de prueba.
*   **`docker-compose.yml`**: Configuración de contenedores (App + Base de Datos).

---

## 👤 Autor
*   **Nombre:** De Hoyos Hernandez Antonio
*   **Matrícula:** 243776
*   **Materia:** Aplicaciones WEB
*   **Fecha:** 12 de Febrero de 2026
