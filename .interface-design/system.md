# Sistema visual del portfolio

## Intención

Una persona que evalúa el perfil debe reconocer en pocos segundos quién es Jorge, ver trabajo concreto y poder llegar al código o al contacto. La interfaz expresa ingeniería aplicada: clara, humana y precisa.

## Dirección

- Territorio: APIs, integración de sistemas, flujos de datos, despliegue, libros y producto web.
- Firma: panel de la API de contacto en la portada y captura auténtica del catálogo de BookSocial sobre una superficie oscura.
- Jerarquía: presentación breve → proyectos → perfil → trayectoria → herramientas → formación → contacto. BookSocial es el caso principal.
- Evitar: tarjetas de proyecto de igual peso, una pared de etiquetas de tecnologías y visualizaciones conceptuales presentadas como capturas reales.

## Tokens

La fuente de verdad para colores y radios está en `frontend/src/design.css`.

- Fondo: `--canvas: #f4f7f3`; superficie: `--paper: #ffffff`.
- Texto: `--ink: #17372f`; secundario: `--muted: #526c60`.
- Acento: `--accent: #0d785f`; oscuro: `--accent-strong: #075b47`; suave: `--accent-soft: #dceee4`.
- Líneas: `--line: #d9e5dc`; panel oscuro: `--dark: #163c33`.
- Radios: 8 px para controles y etiquetas, 14 px para paneles, 20 px para casos de proyecto.
- Espaciado base: 4 px; intervalos habituales de 8, 12, 16, 24, 32, 48, 64 y 96 px.

## Tipografía y profundidad

- Manrope para títulos, navegación y etiquetas; DM Sans para lectura. Consolas solo en fragmentos técnicos.
- Título principal de 44–66 px en escritorio y 38–46 px en móvil; titulares de sección de 34–48 px.
- Texto de lectura de 15–16 px; listas de proyectos de 13–14 px; microetiquetas reservadas para información no esencial.
- La profundidad se expresa sobre todo con cambios suaves de superficie y líneas discretas. Las sombras se reservan para paneles que flotan, como la API, la fotografía y el formulario.

## Componentes

- Botón principal: fondo `--accent`, texto blanco, alto mínimo 50 px, radio de 8 px. Secundario: borde suave y fondo transparente.
- Caso de proyecto: visual y contenido en dos columnas; BookSocial usa una captura real, una superficie oscura y mayor presencia. En móvil se apilan visual y contenido.
- Tarjetas de tecnologías: Backend destaca en oscuro; Frontend ocupa un segundo plano suave; los otros grupos son compactos y de altura natural.
- Panel de contacto: superficie clara sobre fondo oscuro con controles de fondo ligeramente entintado y foco verde.

## Comprobaciones de consistencia

- Un único acento verde para enlaces, etiquetas y acciones.
- El título del proyecto y sus resultados deben leerse antes que sus tecnologías.
- Ninguna vista debe tener desbordamiento horizontal a 390 px o 1440 px.
- Las visualizaciones conceptuales no deben presentarse como capturas reales del producto.
