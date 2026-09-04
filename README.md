# LaravelStack

Aplicación base construida con Laravel, Inertia y React, preparada para ejecutarse de forma local en contenedores y pensada principalmente para desplegarse en la arquitectura cloud definida en el repositorio `aws-deployment`.

## Objetivo principal

El objetivo de este repositorio no es quedarse solo como entorno local de desarrollo. Su finalidad principal es servir como la aplicación que desplegamos en AWS sobre la infraestructura que ya fue creada con `aws-deployment`.

En otras palabras:

- Este repositorio contiene el código de la aplicación.
- `aws-deployment` contiene la infraestructura cloud donde esta aplicación vive.
- El trabajo de ambos repositorios debe mantenerse alineado para que el despliegue sea repetible, estable y fácil de operar.

## Rol de este repositorio dentro de la arquitectura

Este proyecto concentra la capa de aplicación:

- Backend en Laravel 13.
- Frontend con React 19, Inertia.js y Vite.
- Contenerizacion con PHP-FPM y Nginx.
- Base de datos MySQL para el entorno local con Docker Compose.

La infraestructura cloud se resuelve fuera de este repositorio, en `aws-deployment`. Por eso, los cambios aquí deben pensarse con mentalidad de despliegue:

- configuración por variables de entorno,
- compatibilidad con contenedores,
- dependencia explícita de servicios externos,
- y separación clara entre aplicación e infraestructura.

## Stack actual

- PHP 8.3+ en Composer y contenedor PHP 8.4 FPM.
- Laravel `^13.17`.
- Inertia Laravel `^3.3`.
- React `^19.1`.
- Vite `^8`.
- Tailwind CSS `^4`.
- Nginx como servidor web del contenedor.
- MySQL 8 para desarrollo local.

## Arquitectura local

El proyecto incluye una configuración Docker pensada para levantar un entorno parecido al runtime de despliegue:

- `app`: contenedor PHP-FPM con Composer, Node.js y npm.
- `webserver`: contenedor Nginx que publíca la aplicación.
- `db`: contenedor MySQL 8 con volumen persistente.

Archivo principal:

- [docker/compose.yml](docker/compose.yml)

configuración web:

- [docker/Dockerfile](docker/Dockerfile)
- [nginx/default.conf](nginx/default.conf)

La aplicación queda expuesta localmente en `http://localhost:8084` Sí se usan los valores por defecto del compose.

## Puesta en marcha local

### 1. Preparar variables de entorno

Sí todavía no existe `.env`, crea uno a partir de `.env.example`.

```powershell
Copy-Item .env.example .env
```

Nota: `.env.example` viene con SQLite por defecto, pero la ejecución con Docker Compose ya inyecta valores compatibles con MySQL para el contenedor local.

### 2. Levantar contenedores

```powershell
docker compose -f docker/compose.yml up --build -d
```

### 3. Instalar dependencias y preparar la app

Sí es la primera vez que se ejecuta el proyecto, corre:

```powershell
docker compose -f docker/compose.yml exec app composer setup
```

Ese script instala dependencias PHP y Node, genera la clave de Laravel, ejecuta migraciones y compila assets.

### 4. Acceder a la aplicación

Abre:

- `http://localhost:8084`

## Desarrollo diario

Para trabajar sobre la aplicación ya levantada:

```powershell
docker compose -f docker/compose.yml exec app composer test
```

```powershell
docker compose -f docker/compose.yml exec app npm run build
```

Sí necesitas desarrollo frontend con recarga más rápida, puedes ejecutar Vite dentro del contenedor `app` o desde el host según tu flujo de trabajo.

## Consideraciones para despliegue en AWS

Como este proyecto esta orientado a desplegarse sobre la infraestructura creada con `aws-deployment`, cualquier cambio debería validar al menos estos puntos:

- La aplicación debe configurarse completamente por variables de entorno.
- `APP_ENV`, `APP_DEBUG`, `APP_URL` y credenciales no deben quedar fijas en código.
- La conexión a base de datos debe apuntar al servicio administrado definido por la infraestructura cloud.
- El almacenamiento persistente y los secretos deben resolverse con servicios AWS definidos fuera de este repo.
- El contenedor debe seguir siendo una unidad de despliegue portable entre local y cloud.

## Relacion con `aws-deployment`

Se recomienda mantener sincronizados ambos lados del sistema:

- Cuando cambie la topología de infraestructura en `aws-deployment`, revisar esta aplicación para asegurar compatibilidad.
- Cuando esta aplicación requiera nuevos secretos, variables, dominios, buckets, colas o dependencias externas, reflejar esos cambios en `aws-deployment`.
- Cuando cambie el runtime o el modelo de despliegue, validar que `Dockerfile`, Nginx y configuración Laravel sigan siendo consistente con AWS.

## Estructura relevante

- [app](app)
- [config](config)
- [docker](docker)
- [nginx](nginx)
- [resources/js](resources/js)
- [routes](routes)

## Estado actual

Hoy el proyecto funciona como base Laravel + React con Inertia, contenerizada para entorno local y lista para seguir evolucionando hacia un flujo de despliegue cloud más formal sobre AWS.

La documentación de este repositorio debe seguir reforzando esa idea: este código es la aplicación; `aws-deployment` es la infraestructura objetivo.
