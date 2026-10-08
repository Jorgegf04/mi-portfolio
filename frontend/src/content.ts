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
    description: 'Desarrollo de aplicaciones web de principio a fin: APIs REST con Java y Spring Boot, persistencia con JPA y MySQL, e interfaces con Vue, JavaScript y TypeScript. También he trabajado con pruebas automatizadas, Git y despliegues con Docker.',
  },
  {
    title: 'Sistemas Microinformáticos y Redes',
    level: 'Ciclo Formativo de Grado Medio',
    institution: 'IES San Vicente',
    period: '2017 — 2019',
    description: 'Montaje, configuración y mantenimiento de equipos; instalación de sistemas operativos, diagnóstico de incidencias y administración básica de redes locales, dispositivos y servicios.',
  },
]

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Valenciano / Catalán', level: 'Nativo' },
  { name: 'Inglés', level: 'B1' },
]

export const contentByLocale = {
  es: { experiences, projects, technologyGroups, softSkills, education, languages },
  en: {
    experiences: [
      {
        role: 'Full Stack Developer', company: 'Asociación Reinas del Biberón',
        period: 'March 2026 — July 2026', location: 'Alicante, Spain', featured: true,
        highlights: [
          'Designed and developed a PHP API to manage and integrate the course platform.',
          'Integrated the web application with an external solution built in Odoo.',
          'Implemented PHP webhooks to connect WordPress and Odoo functionality.',
          'Built interactive filters and logic in JavaScript and customized pages with Divi and CSS.',
        ],
      },
      {
        role: 'Factory Operator', company: 'Monbake',
        period: 'September 2023 — September 2025', location: 'Alicante, Spain',
        highlights: [
          'Packaged and prepared frozen food products according to production procedures.',
          'Operated industrial machinery and monitored the forming process.',
        ],
      },
      {
        role: 'IT Technician', company: 'PC BOX',
        period: 'March 2019 — June 2019', location: 'Alicante, Spain',
        highlights: [
          'Assembled, diagnosed, repaired, and maintained computers and electronic devices.',
          'Managed stock and resolved customer questions and issues in person and by phone.',
        ],
      },
    ] satisfies Experience[],
    projects: [
      {
        number: '01', name: 'BookSocial', kind: 'Web Application Development project',
        description: 'A web application built around books, with a Java REST API and a frontend that consumes its services.',
        highlights: [
          'Persistence with Hibernate/JPA, H2, and MySQL.',
          'Interface with Thymeleaf, Bootstrap, and Vue.js; integration with Axios and Pinia.',
          'Tests with JUnit and Cucumber, and deployment with Docker Compose.',
        ],
        technologies: ['Java', 'Spring Boot', 'Hibernate/JPA', 'MySQL', 'Vue.js', 'Docker'],
        githubUrl: 'https://github.com/Jorgegf04/booksocial',
      },
      {
        number: '02', name: 'This portfolio', kind: 'Personal project',
        description: 'A website that presents my experience and projects, with a Vue frontend and a Spring Boot API that handles email contact.',
        highlights: [
          'Responsive and accessible frontend with content that is easy to expand.',
          'Contact API with validation, abuse protection, and SMTP delivery.',
          'Automated tests and local setup with Docker Compose.',
        ],
        technologies: ['Vue 3', 'TypeScript', 'Spring Boot', 'Java', 'SMTP', 'Docker'],
        githubUrl: 'https://github.com/Jorgegf04/mi-portfolio',
      },
    ] satisfies Project[],
    technologyGroups: [
      { label: 'Backend', items: ['Java', 'Spring Boot', 'PHP', 'REST APIs', 'Hibernate / JPA', 'Webhooks'] },
      { label: 'Frontend', items: ['Vue.js', 'Quasar', 'JavaScript', 'Thymeleaf', 'Bootstrap', 'CSS'] },
      { label: 'Databases', items: ['MySQL', 'H2'] },
      { label: 'Testing', items: ['JUnit', 'Cucumber'] },
      { label: 'Deployment and workflow', items: ['Docker', 'Docker Compose', 'Trello'] },
    ],
    softSkills: [
      { name: 'Problem solving', evidence: 'Diagnosed and repaired devices and resolved technical issues at PC BOX.' },
      { name: 'Customer communication', evidence: 'Handled technical questions in person and by phone.' },
      { name: 'Working with procedures', evidence: 'Prepared and monitored production processes at Monbake.' },
    ],
    education: [
      { title: 'Web Application Development', level: 'Higher Vocational Training', institution: 'IES Mutxamel', period: '2023 — 2026', description: 'Building web applications end to end: REST APIs with Java and Spring Boot, data persistence with JPA and MySQL, and interfaces with Vue, JavaScript, and TypeScript. Coursework also covered automated testing, Git, and Docker deployments.' },
      { title: 'Computer Systems and Networks', level: 'Intermediate Vocational Training', institution: 'IES San Vicente', period: '2017 — 2019', description: 'Assembling, configuring, and maintaining computers; installing operating systems; diagnosing issues; and setting up the fundamentals of local networks, devices, and services.' },
    ],
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'Valencian / Catalan', level: 'Native' },
      { name: 'English', level: 'B1' },
    ],
  },
}
