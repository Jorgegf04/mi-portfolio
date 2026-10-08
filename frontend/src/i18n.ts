import { ref } from 'vue'

export type Locale = 'es' | 'en'

const storageKey = 'portfolio-locale'

export const messages = {
  es: {
    skip: 'Saltar al contenido',
    brandHome: 'Jorge Guijarro Fuentes, ir al inicio',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    navLabel: 'Navegación principal',
    navProjects: 'Proyectos',
    navAbout: 'Sobre mí',
    navExperience: 'Experiencia',
    navTechnologies: 'Tecnologías',
    navContact: 'Contacto',
    languageLabel: 'Idioma del portfolio',
    downloadCv: 'Descargar CV',
    heroEyebrow: 'DESARROLLADOR FULL STACK · FOCO EN BACKEND',
    heroHello: 'Hola, soy',
    heroHeadline: 'Conecto sistemas y construyo productos.',
    heroIntro: 'Desarrollo aplicaciones web con especial atención a las APIs, las integraciones y el despliegue. De la idea al producto completo, con Java, Spring Boot, PHP y Vue.',
    heroProjects: 'Ver proyectos',
    heroContact: 'Hablemos',
    socialLabel: 'Perfiles profesionales',
    apiVisualLabel: 'Formulario de contacto que prepara un correo',
    apiComment: '// Del formulario al borrador de correo',
    apiInput: 'Entrada',
    apiValidation: 'Validación',
    apiDelivery: 'Borrador',
    endToEnd: 'SOLUCIONES END TO END',
    heroIndex: '00 / PRESENTACIÓN',
    heroExplore: 'Explorar proyectos',
    projectsKicker: '01 / TRABAJO SELECCIONADO',
    projectsTitle: 'Trabajo que',
    projectsTitleEm: 'puedes explorar.',
    projectsIntro: 'Dos proyectos donde se ve cómo conecto la interfaz, la lógica y el despliegue.',
    bookCaption: 'BOOKSOCIAL / CAPTURA REAL DEL CATÁLOGO',
    bookAlt: 'Catálogo de BookSocial con filtros y portadas de libros',
    bookNote: 'CATÁLOGO · FILTROS · BÚSQUEDA',
    portfolioCaption: 'ESTE PORTFOLIO / IMPLEMENTACIÓN',
    portfolioDiagram: 'Portfolio y contacto',
    featuredProject: 'PROYECTO DESTACADO',
    personalProject: 'PROYECTO PERSONAL',
    projectCode: 'Ver código de {name} en GitHub',
    projectRepository: 'Ver repositorio en GitHub',
    aboutKicker: '02 / SOBRE MÍ',
    aboutTitle: 'El código es el medio.',
    aboutTitleEm: 'La solución, el objetivo.',
    aboutSignature: 'Desarrollo backend',
    portraitAlt: 'Retrato de Jorge Guijarro Fuentes',
    aboutLead: 'Soy desarrollador Full Stack con una inclinación clara hacia el backend. Me interesa cómo se conectan los sistemas, cómo se organizan los datos y cómo llevar una aplicación del desarrollo al despliegue.',
    aboutP2: 'Durante mi experiencia en la Asociación Reinas del Biberón trabajé en APIs e integraciones entre PHP, WordPress y Odoo. En BookSocial llevé a la práctica una solución web con Spring Boot, Vue y Docker.',
    aboutP3: 'Mi formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes me ayuda a mirar cada proyecto desde el código hasta el entorno donde se ejecuta.',
    aboutPoint1: 'APIs e integraciones',
    aboutPoint2: 'Desarrollo web completo',
    aboutPoint3: 'Despliegue con Docker',
    experienceKicker: '03 / TRAYECTORIA',
    experienceTitle: 'Experiencia',
    experienceTitleEm: 'profesional.',
    experienceIntro: 'Aprendizaje técnico y experiencia de trabajo en distintos entornos.',
    developmentExperience: 'EXPERIENCIA EN DESARROLLO',
    technologiesKicker: '04 / HERRAMIENTAS',
    technologiesTitle: 'Tecnologías con las que',
    technologiesTitleEm: 'trabajo.',
    technologiesIntro: 'Una base sólida en backend, con herramientas para construir el producto completo.',
    mainFocus: 'FOCO PRINCIPAL',
    tools: 'HERRAMIENTAS',
    beyondStack: 'MÁS ALLÁ DEL STACK',
    softSkillsTitle: 'Habilidades en contexto.',
    educationKicker: '05 / BASE',
    educationTitle: 'Formación',
    educationTitleEm: 'e idiomas.',
    educationIntro: 'Una base técnica que sigo aplicando y ampliando en cada proyecto.',
    educationHeading: 'Formación',
    languagesHeading: 'Idiomas',
    contactKicker: '06 / CONTACTO',
    contactTitle: '¿Hablamos de tu',
    contactTitleEm: 'próximo proyecto?',
    contactIntro: 'Si buscas un desarrollador con interés por el backend y ganas de construir soluciones completas, estaré encantado de conversar.',
    contactDirect: 'O escríbeme directamente',
    contactPanel: 'ENVIAR UN MENSAJE',
    footerMadeWith: 'Hecho con Vue y Spring Boot.',
    footerTop: 'Volver arriba',
    formName: 'Nombre',
    formEmail: 'Correo electrónico',
    formSubject: 'Asunto',
    formMessage: 'Mensaje',
    formPlaceholder: 'Cuéntame en qué puedo ayudarte...',
    formHint: 'Entre 20 y 3000 caracteres.',
    formSubmit: 'Preparar correo',
    formNote: 'Se abrirá tu aplicación de correo. Revisa el mensaje y pulsa Enviar.',
    formPrepared: 'El borrador está listo. El mensaje aún no se ha enviado.',
    formOpenEmail: 'Abrir correo para enviar',
    metaTitle: 'Jorge Guijarro Fuentes | Desarrollador Full Stack',
    metaDescription: 'Portfolio de Jorge Guijarro Fuentes, desarrollador Full Stack con foco en backend. Java, Spring Boot, PHP, Vue y Docker. Experiencia, proyectos y contacto.',
    metaOgDescription: 'Desarrollo aplicaciones web con foco en APIs, integraciones y despliegue. Descubre mi experiencia y proyectos.',
  },
  en: {
    skip: 'Skip to content',
    brandHome: 'Jorge Guijarro Fuentes, go to home',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    navLabel: 'Main navigation',
    navProjects: 'Projects',
    navAbout: 'About me',
    navExperience: 'Experience',
    navTechnologies: 'Technologies',
    navContact: 'Contact',
    languageLabel: 'Portfolio language',
    downloadCv: 'Download CV (Spanish)',
    heroEyebrow: 'FULL STACK DEVELOPER · BACKEND FOCUS',
    heroHello: 'Hi, I’m',
    heroHeadline: 'I connect systems and build products.',
    heroIntro: 'I build web applications with a focus on APIs, integrations, and deployment. From idea to complete product, using Java, Spring Boot, PHP, and Vue.',
    heroProjects: 'View projects',
    heroContact: 'Let’s talk',
    socialLabel: 'Professional profiles',
    apiVisualLabel: 'Contact form that prepares an email draft',
    apiComment: '// From the form to an email draft',
    apiInput: 'Input',
    apiValidation: 'Validation',
    apiDelivery: 'Draft',
    endToEnd: 'END-TO-END SOLUTIONS',
    heroIndex: '00 / INTRODUCTION',
    heroExplore: 'Explore projects',
    projectsKicker: '01 / SELECTED WORK',
    projectsTitle: 'Work you can',
    projectsTitleEm: 'explore.',
    projectsIntro: 'Two projects that show how I connect the interface, application logic, and deployment.',
    bookCaption: 'BOOKSOCIAL / REAL CATALOG SCREENSHOT',
    bookAlt: 'BookSocial catalog with filters and book covers',
    bookNote: 'CATALOG · FILTERS · SEARCH',
    portfolioCaption: 'THIS PORTFOLIO / IMPLEMENTATION',
    portfolioDiagram: 'Portfolio and contact',
    featuredProject: 'FEATURED PROJECT',
    personalProject: 'PERSONAL PROJECT',
    projectCode: 'View {name} code on GitHub',
    projectRepository: 'View repository on GitHub',
    aboutKicker: '02 / ABOUT ME',
    aboutTitle: 'Code is the means.',
    aboutTitleEm: 'The solution is the goal.',
    aboutSignature: 'Backend development',
    portraitAlt: 'Portrait of Jorge Guijarro Fuentes',
    aboutLead: 'I’m a Full Stack developer with a strong preference for backend work. I’m interested in how systems connect, how data is organized, and how to take an application from development through deployment.',
    aboutP2: 'At Asociación Reinas del Biberón, I worked on APIs and integrations between PHP, WordPress, and Odoo. With BookSocial, I built a web solution using Spring Boot, Vue, and Docker.',
    aboutP3: 'My training in Web Application Development and Computer Systems and Networks helps me consider every project from the code to the environment it runs in.',
    aboutPoint1: 'APIs and integrations',
    aboutPoint2: 'Full web development',
    aboutPoint3: 'Deployment with Docker',
    experienceKicker: '03 / CAREER',
    experienceTitle: 'Professional',
    experienceTitleEm: 'experience.',
    experienceIntro: 'Technical learning and work experience across different environments.',
    developmentExperience: 'DEVELOPMENT EXPERIENCE',
    technologiesKicker: '04 / TOOLS',
    technologiesTitle: 'Technologies I',
    technologiesTitleEm: 'work with.',
    technologiesIntro: 'A strong backend foundation, with tools to build the complete product.',
    mainFocus: 'MAIN FOCUS',
    tools: 'TOOLS',
    beyondStack: 'BEYOND THE STACK',
    softSkillsTitle: 'Skills in context.',
    educationKicker: '05 / FOUNDATION',
    educationTitle: 'Education',
    educationTitleEm: 'and languages.',
    educationIntro: 'A technical foundation that I continue to apply and expand with every project.',
    educationHeading: 'Education',
    languagesHeading: 'Languages',
    contactKicker: '06 / CONTACT',
    contactTitle: 'Let’s talk about your',
    contactTitleEm: 'next project.',
    contactIntro: 'If you’re looking for a developer with a passion for backend work and building complete solutions, I’d be glad to talk.',
    contactDirect: 'Or contact me directly',
    contactPanel: 'SEND A MESSAGE',
    footerMadeWith: 'Built with Vue and Spring Boot.',
    footerTop: 'Back to top',
    formName: 'Name',
    formEmail: 'Email address',
    formSubject: 'Subject',
    formMessage: 'Message',
    formPlaceholder: 'Tell me how I can help...',
    formHint: 'Between 20 and 3000 characters.',
    formSubmit: 'Prepare email',
    formNote: 'Your email app will open. Review the draft and press Send.',
    formPrepared: 'Your draft is ready. The message has not been sent yet.',
    formOpenEmail: 'Open email to send',
    metaTitle: 'Jorge Guijarro Fuentes | Full Stack Developer',
    metaDescription: 'Portfolio of Jorge Guijarro Fuentes, a Full Stack developer focused on backend work. Java, Spring Boot, PHP, Vue, and Docker. Experience, projects, and contact.',
    metaOgDescription: 'I build web applications focused on APIs, integrations, and deployment. Explore my experience and projects.',
  },
} as const

export type MessageKey = keyof typeof messages.es

export function resolveLocale(preferredLanguages: readonly string[], savedLocale?: string | null): Locale {
  if (savedLocale === 'es' || savedLocale === 'en') return savedLocale
  for (const language of preferredLanguages) {
    const code = language.toLowerCase().split('-')[0]
    if (code === 'es' || code === 'en') return code
  }
  return 'en'
}

function savedLocale(): string | null {
  try { return localStorage.getItem(storageKey) } catch { return null }
}

export const locale = ref<Locale>(resolveLocale(navigator.languages?.length ? navigator.languages : [navigator.language], savedLocale()))

export function t(key: MessageKey, params?: { name: string }): string {
  const value: string = messages[locale.value][key]
  return params ? value.replace('{name}', params.name) : value
}

function setMeta(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value)
}

function updateDocumentLanguage() {
  document.documentElement.lang = locale.value
  document.title = t('metaTitle')
  setMeta('meta[name="description"]', t('metaDescription'))
  setMeta('meta[property="og:title"]', t('metaTitle'))
  setMeta('meta[property="og:description"]', t('metaOgDescription'))
  setMeta('meta[property="og:locale"]', locale.value === 'es' ? 'es_ES' : 'en_US')
}

export function setLocale(next: Locale) {
  locale.value = next
  updateDocumentLanguage()
  try { localStorage.setItem(storageKey, next) } catch { /* Language still changes in memory. */ }
}

updateDocumentLanguage()
