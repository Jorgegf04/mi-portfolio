# Portfolio de Jorge Guijarro Fuentes

Portfolio personal en español para presentar experiencia Full Stack con foco en backend. El frontend está desarrollado con Vue 3, TypeScript y Vite; la API de contacto usa Java 21 y Spring Boot 4.1.1.

## Contenido

- Presentación, sobre mí, experiencia profesional, proyectos, tecnologías, formación, idiomas y contacto.
- Proyectos iniciales: [BookSocial](https://github.com/Jorgegf04/booksocial) y [este portfolio](https://github.com/Jorgegf04/mi-portfolio).
- Los datos editables de experiencias, proyectos y tecnologías están en `frontend/src/content.ts`.
- El CV descargable está en `frontend/public/Jorge-Guijarro-Fuentes-CV.pdf`.

## Requisitos

- Node.js 24 y npm 11 para el frontend.
- Java 21 y Maven 3.9 para la API.
- Docker Desktop, opcional para ejecutar la aplicación completa con SMTP de pruebas.

## Desarrollo local

En una terminal:

```powershell
cd backend
mvn spring-boot:run
```

En otra terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Abre `http://localhost:5173`. El servidor de Vite redirige `/api` a `http://localhost:8080`. `GET /api/health` responde `{"status":"ok"}`. Sin SMTP configurado, `POST /api/contact` responde `503` y la interfaz muestra el enlace directo al correo.

### Aplicación completa con correo de pruebas

Con Docker Desktop iniciado, desde la raíz:

```powershell
Copy-Item .env.example .env
docker compose --profile dev up --build
```

- Web: `http://localhost:8081`
- Bandeja de Mailpit: `http://localhost:8025`
- API: `http://localhost:8081/api/health`

El formulario envía por SMTP a Mailpit en esta configuración. Los mensajes se pueden comprobar en su bandeja sin usar una cuenta real.

## Gmail SMTP

Para entregar los mensajes a `jgfestudios@gmail.com`, configura estas variables **fuera del repositorio**, en tu entorno privado o en un `.env` ignorado por Git:

```text
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=jgfestudios@gmail.com
MAIL_PASSWORD=<contraseña de aplicación de Google>
MAIL_SMTP_AUTH=true
MAIL_SMTP_STARTTLS=true
CONTACT_SENDER=jgfestudios@gmail.com
CONTACT_RECIPIENT=jgfestudios@gmail.com
```

El servidor usa la cuenta configurada como remitente y pone el correo del visitante en `Reply-To`. La contraseña de aplicación requiere verificación en dos pasos y nunca debe guardarse en el código ni enviarse por el formulario. Si Gmail o el servidor SMTP rechazan la entrega, la API responde `503`; no muestra éxito falso.

## API de contacto

`POST /api/contact` acepta JSON con `name`, `email`, `subject`, `message` y `website` (campo trampa que la interfaz deja vacío). Devuelve `200` después del envío, `400` para datos inválidos, `413` para cuerpos mayores de 8 KiB, `429` tras cinco solicitudes de la misma IP en 15 minutos y `503` si el correo no está disponible. La API no almacena mensajes.

El backend solo confía en `X-Real-IP` cuando `CONTACT_TRUST_PROXY=true`; el contenedor frontend fija ese encabezado y el backend no publica un puerto al host. En ejecución directa el límite usa la dirección de conexión.

## Pruebas

```powershell
cd backend
mvn test
```

```powershell
cd frontend
npm test
npm run build
npm run test:e2e
```

Las pruebas de la API cubren validación, errores, límites y un envío SMTP real contra GreenMail en local. Playwright comprueba navegación, teclado, descarga del CV y formulario en escritorio y móvil con la respuesta de API simulada. Docker Compose y Mailpit permiten además inspeccionar manualmente los mensajes. GitHub Actions ejecuta el conjunto automatizado en cada cambio.

## Publicación futura

La primera entrega funciona en local y deja preparada su publicación. Para un servidor con Docker y un dominio:

1. Comprueba que el proveedor permite conexiones SMTP salientes al puerto 587 y configura el DNS del dominio.
2. Configura las variables de Gmail como secretos del servidor; no publiques `.env` ni la contraseña de aplicación.
3. Ejecuta `docker compose up -d --build` **sin** el perfil `dev`; así Mailpit no se inicia. El frontend escucha solo en `127.0.0.1:8081`.
4. Instala un proxy HTTPS delante de `127.0.0.1:8081` (por ejemplo, Caddy) y configura el dominio. Comprueba `https://tu-dominio/api/health` y realiza un envío real de prueba.
5. Ajusta la URL pública en los metadatos Open Graph si la plataforma de destino exige URL absoluta para la imagen social.

Ejemplo mínimo de Caddyfile para el dominio que elijas:

```text
tu-dominio.example {
    reverse_proxy 127.0.0.1:8081
}
```

La web y la API usan el mismo origen; no requieren configuración CORS. La publicación y el dominio no forman parte de esta primera entrega.
