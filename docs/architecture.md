# Arquitectura y decisiones

```text
Navegador
  └── Vue 3 + TypeScript (sitio estático)
      └── /api/contact → Nginx → Spring Boot
                              ├── validación del JSON
                              ├── límite por IP y tamaño
                              └── JavaMailSender → SMTP → Gmail
```

La separación permite presentar una aplicación Full Stack sin añadir una base de datos que el formulario no necesita. El backend conserva la lógica de contacto y la configuración SMTP; el frontend solo conoce `/api/contact`. Los datos del portfolio están tipados y separados de la presentación, por lo que añadir un proyecto requiere una nueva entrada en `projects`.

El correo se construye en texto plano. `From` siempre es la cuenta configurada; `Reply-To` es la dirección validada del visitante. Las credenciales se inyectan en tiempo de ejecución. El formulario incluye límites de tamaño, frecuencia y un campo trampa. El límite por IP es local a una instancia de la API: si en el futuro hay varias réplicas, habrá que usar un almacenamiento compartido para el contador.

El CV es la fuente principal de las afirmaciones biográficas y técnicas. No se incluyen porcentajes de dominio, cifras de impacto o certificaciones no documentadas. Las habilidades personales se muestran junto a las tareas que las respaldan.

## Criterios de calidad

- HTML semántico, etiquetas de formulario, foco visible, navegación por teclado y respeto a movimiento reducido.
- Comprobación de tipos, pruebas de comportamiento del formulario, API y navegación móvil.
- Errores de API sin trazas ni detalles del proveedor SMTP.
- Contenido y pasos de ejecución documentados para que el sitio pueda ampliarse y publicarse más adelante.
