export type Experience = {
  role: string
  company: string
  period: string
  location: string
  featured?: boolean
  highlights: string[]
}

export type Project = {
  number: string
  name: string
  kind: string
  description: string
  highlights: string[]
  technologies: string[]
  githubUrl: string
}

export const links = {
  github: 'https://github.com/Jorgegf04',
  linkedin: 'https://www.linkedin.com/in/jorge-guijarro-fuentes-289966216',
  email: 'jgfestudios@gmail.com',
  phone: '+34 633 45 74 53',
  phoneHref: 'tel:+34633457453',
  cv: '/Jorge-Guijarro-Fuentes-CV.pdf',
}

export const experiences: Experience[] = [
  {
    role: 'Desarrollador Full Stack',
    company: 'Asociación Reinas del Biberón',
    period: 'Marzo 2026 — julio 2026',
    location: 'Alicante, España',
    featured: true,
    highlights: [
      'Diseño y desarrollo de una API en PHP para gestionar e integrar la plataforma de cursos.',
      'Integración de la aplicación web con una solución externa desarrollada en Odoo.',
      'Implementación de webhooks en PHP para comunicar funcionalidades entre WordPress y Odoo.',
      'Desarrollo de filtros y lógica interactiva en JavaScript, y personalización de páginas con Divi y CSS.',
    ],
  },
  {
    role: 'Operario de fábrica',
    company: 'Monbake',
    period: 'Septiembre 2023 — septiembre 2025',
    location: 'Alicante, España',
    highlights: [
      'Envasado y preparación de productos alimenticios congelados conforme a los procedimientos de producción.',
      'Manejo de maquinaria industrial y supervisión básica del proceso de formado.',
    ],
  },
  {
    role: 'Técnico informático',
    company: 'PC BOX',
    period: 'Marzo 2019 — junio 2019',
    location: 'Alicante, España',
    highlights: [
      'Montaje, diagnóstico, reparación y mantenimiento de ordenadores y dispositivos electrónicos.',
      'Gestión del stock y resolución de consultas e incidencias de clientes en persona y por teléfono.',
    ],
  },
]

export const projects: Project[] = [
  {
    number: '01',
    name: 'BookSocial',
    kind: 'Proyecto de Desarrollo de Aplicaciones Web',
    description:
      'Aplicación web alrededor del mundo de los libros, desarrollada con una API REST en Java y una interfaz que consume sus servicios.',
    highlights: [
      'Persistencia con Hibernate/JPA, H2 y MySQL.',
      'Interfaz con Thymeleaf, Bootstrap y Vue.js; integración con Axios y Pinia.',
      'Pruebas con JUnit y Cucumber, y ejecución con Docker Compose.',
    ],
    technologies: ['Java', 'Spring Boot', 'Hibernate/JPA', 'MySQL', 'Vue.js', 'Docker'],
    githubUrl: 'https://github.com/Jorgegf04/booksocial',
  },
  {
    number: '02',
    name: 'Este portfolio',
    kind: 'Proyecto personal',
    description:
      'Una web para presentar mi experiencia y proyectos, con un frontend en Vue y una API en Spring Boot que gestiona el contacto por correo.',
    highlights: [
      'Frontend adaptable y accesible, con contenido fácil de ampliar.',
      'API de contacto con validación, protección frente a abuso y envío SMTP.',
      'Pruebas automatizadas y ejecución local con Docker Compose.',
    ],
    technologies: ['Vue 3', 'TypeScript', 'Spring Boot', 'Java', 'SMTP', 'Docker'],
    githubUrl: 'https://github.com/Jorgegf04/mi-portfolio',
  },
]

export const technologyGroups = [
  { label: 'Backend', items: ['Java', 'Spring Boot', 'PHP', 'API REST', 'Hibernate / JPA', 'Webhooks'] },
  { label: 'Frontend', items: ['Vue.js', 'Quasar', 'JavaScript', 'Thymeleaf', 'Bootstrap', 'CSS'] },
  { label: 'Bases de datos', items: ['MySQL', 'H2'] },
  { label: 'Pruebas', items: ['JUnit', 'Cucumber'] },
  { label: 'Despliegue y flujo', items: ['Docker', 'Docker Compose', 'Trello'] },
]

export const softSkills = [
  {
    name: 'Resolución de problemas',
    evidence: 'Diagnóstico y reparación de equipos e incidencias en PC BOX.',
  },
  {
    name: 'Comunicación con clientes',
    evidence: 'Atención presencial y telefónica a consultas técnicas.',
  },
  {
    name: 'Trabajo con procedimientos',
    evidence: 'Preparación y supervisión de procesos de producción en Monbake.',
  },
]

export const education = [
  {
    title: 'Desarrollo de Aplicaciones Web',
    level: 'Ciclo Formativo de Grado Superior',
    institution: 'IES Mutxamel',
    period: '2023 — 2026',
  },
  {
    title: 'Sistemas Microinformáticos y Redes',
    level: 'Ciclo Formativo de Grado Medio',
    institution: 'IES San Vicente',
    period: '2017 — 2019',
  },
]

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Valenciano / Catalán', level: 'Nativo' },
  { name: 'Inglés', level: 'B1' },
]
