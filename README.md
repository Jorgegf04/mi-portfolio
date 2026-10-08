# Portfolio de Jorge Guijarro Fuentes

Portfolio personal bilingüe (español e inglés), creado con Vue 3, TypeScript y Vite. La API de contacto está hecha con Java 21 y Spring Boot.

## Requisitos

- Node.js 24 y npm 11
- Java 21 y Maven 3.9
- Docker Desktop, solo para ejecutar todo el proyecto con correo de pruebas

## Ejecutar en local

Inicia la API:

```powershell
cd backend
mvn spring-boot:run
```

En otra terminal, inicia la web:

```powershell
cd frontend
npm ci
npm run dev
```

Abre <http://localhost:5173>. La web redirige las peticiones `/api` a la API local. Sin configurar SMTP, el formulario de contacto no puede enviar mensajes.

## Ejecutar con Docker

Desde la raíz del proyecto:

```powershell
Copy-Item .env.example .env
```

Para enviar mensajes a Gmail, añade tu contraseña de aplicación a `MAIL_PASSWORD` en `.env` y ejecuta:

```powershell
docker compose up --build
```

- Web y API: <http://localhost:8081>
- Swagger UI: <http://localhost:8081/swagger-ui.html>
- Especificación OpenAPI: <http://localhost:8081/v3/api-docs>

Para probar sin enviar correos reales, configura `MAIL_HOST=mailpit`, `MAIL_PORT=1025`, `MAIL_SMTP_AUTH=false` y `MAIL_SMTP_STARTTLS=false` en `.env`. Después inicia el perfil de desarrollo:

```powershell
docker compose --profile dev up --build
```

La bandeja de Mailpit estará disponible en <http://localhost:8025>.

## Configurar el correo

Para enviar mensajes a través de Gmail, configura estas variables en tu entorno o en el archivo `.env` local:

```text
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=jgfestudios@gmail.com
MAIL_PASSWORD=<contraseña de aplicación>
MAIL_SMTP_AUTH=true
MAIL_SMTP_STARTTLS=true
CONTACT_SENDER=jgfestudios@gmail.com
CONTACT_RECIPIENT=jgfestudios@gmail.com
```

Usa una contraseña de aplicación de Google y no la compartas ni la guardes en el código. El correo del visitante se añade como dirección de respuesta.

## API

- `GET /api/health`: comprueba que la API está disponible.
- `POST /api/contact`: envía un mensaje con `name`, `email`, `subject`, `message` y `website`.

El formulario limita el cuerpo a 8 KiB y acepta hasta cinco solicitudes por IP cada 15 minutos. Devuelve `400` si los datos no son válidos, `429` si se alcanza el límite y `503` si no se puede enviar el correo. Los mensajes no se guardan.

Consulta todos los detalles y prueba los endpoints en [Swagger UI](http://localhost:8081/swagger-ui.html).

## Pruebas

Backend:

```powershell
cd backend
mvn test
```

Frontend:

```powershell
cd frontend
npm test
npm run build
npm run test:e2e
```

## Despliegue gratuito en Render

El archivo `render.yaml` configura solo la web estática. Para publicarla, sube el proyecto a GitHub, crea una cuenta gratuita en Render y selecciona **New > Blueprint**, eligiendo este repositorio. Render construirá la web y publicará el contenido de `frontend/dist`.

El formulario abre un borrador dirigido a `jgfestudios@gmail.com` en la aplicación de correo del visitante. El visitante debe revisar y enviar ese correo. La web no lo envía por su cuenta ni puede confirmar su entrega. Esta opción no necesita dominio propio, servidor de correo ni claves secretas.

La API Spring Boot se mantiene para el desarrollo local y se puede desplegar más adelante si necesitas envío automático desde la web.

## Contenido

- `frontend/src/content.ts`: proyectos, experiencia y tecnologías.
- `frontend/src/i18n.ts`: textos y metadatos en español e inglés.
- `frontend/public/`: imágenes y CV descargable.
- `backend/src/main/java/com/jorgeguijarro/portfolio/`: código de la API, organizado por módulos y responsabilidades.
