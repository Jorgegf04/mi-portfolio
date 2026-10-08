<script setup lang="ts">
import { ref } from 'vue'
import ContactForm from './ContactForm.vue'
import { education, experiences, languages, links, projects, softSkills, technologyGroups } from './content'

const menuOpen = ref(false)
const year = new Date().getFullYear()
const nav = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#tecnologias', label: 'Tecnologías' },
  { href: '#contacto', label: 'Contacto' },
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header">
    <div class="container nav-shell">
      <a class="brand" href="#inicio" aria-label="Jorge Guijarro Fuentes, ir al inicio" @click="closeMenu">
        <span class="brand-mark">JG<span>.</span></span>
        <span class="brand-name">JORGE GUIJARRO</span>
      </a>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="main-nav" :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>
      <nav id="main-nav" class="main-nav" :class="{ open: menuOpen }" aria-label="Navegación principal">
        <a v-for="item in nav" :key="item.href" :href="item.href" @click="closeMenu">{{ item.label }}</a>
        <a class="nav-cv" :href="links.cv" download @click="closeMenu">Descargar CV <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>

  <main id="contenido">
    <section id="inicio" class="hero section">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-line"></span> DESARROLLADOR FULL STACK · FOCO EN BACKEND</div>
          <h1>Hola, soy <span>Jorge Guijarro.</span><br />Construyo soluciones que funcionan de verdad.</h1>
          <p class="hero-intro">Diseño aplicaciones web con especial atención a las APIs, las integraciones y el despliegue. Trabajo con Java, Spring Boot, PHP y Vue para convertir ideas en productos completos.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#proyectos">Ver proyectos <span aria-hidden="true">↗</span></a>
            <a class="button button-outline" href="#contacto">Hablemos <span aria-hidden="true">→</span></a>
          </div>
          <div class="hero-socials" aria-label="Perfiles profesionales">
            <a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <span aria-hidden="true">/</span>
            <a :href="links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <span aria-hidden="true">/</span>
            <span>Mutxamel, Alicante</span>
          </div>
        </div>
        <div class="hero-visual" aria-label="Esquema de una API de contacto con validación y envío de correo">
          <div class="visual-grid" aria-hidden="true"></div>
          <div class="orbit orbit-one" aria-hidden="true"></div>
          <div class="orbit orbit-two" aria-hidden="true"></div>
          <div class="api-panel">
            <div class="api-topbar"><span class="api-dots"><i></i><i></i><i></i></span><span>portfolio / backend</span><span class="api-live"><span></span> online</span></div>
            <div class="api-body">
              <div class="api-route"><span class="method">POST</span><span>/api/contact</span></div>
              <div class="api-code"><span class="code-comment">// Del formulario a mi bandeja de entrada</span><br /><span class="code-purple">const</span> message = <span class="code-cyan">validate</span>(request)<br /><span class="code-purple">await</span> mailService.<span class="code-cyan">send</span>(message)<br /><span class="code-purple">return</span> <span class="code-green">&#123; status: 'sent' &#125;</span></div>
              <div class="api-pipeline"><div><span class="pipeline-icon">01</span><span>Entrada</span></div><span class="pipeline-connector"></span><div><span class="pipeline-icon">02</span><span>Validación</span></div><span class="pipeline-connector"></span><div><span class="pipeline-icon">03</span><span>Entrega</span></div></div>
            </div>
          </div>
          <div class="floating-label floating-label-top">JAVA <span>+</span> SPRING BOOT</div>
          <div class="floating-label floating-label-bottom"><span class="tiny-square"></span> SOLUCIONES END TO END</div>
        </div>
      </div>
      <div class="container hero-bottom"><span>01 / PRESENTACIÓN</span><a href="#sobre-mi">Sigue explorando <span aria-hidden="true">↓</span></a></div>
    </section>

    <section id="sobre-mi" class="section about-section">
      <div class="container section-grid">
        <div class="section-intro"><span class="section-kicker">01 / SOBRE MÍ</span><h2>El código es el medio.<br /><em>La solución, el objetivo.</em></h2></div>
        <div class="about-content">
          <p class="lead">Soy desarrollador Full Stack con una inclinación clara hacia el backend. Me interesa cómo se conectan los sistemas, cómo se organizan los datos y cómo llevar una aplicación del desarrollo al despliegue.</p>
          <p>Durante mi experiencia en la Asociación Reinas del Biberón trabajé en APIs e integraciones entre PHP, WordPress y Odoo. En BookSocial llevé a la práctica una solución web con Spring Boot, Vue y Docker.</p>
          <p>Mi formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes me ayuda a mirar cada proyecto desde el código hasta el entorno donde se ejecuta.</p>
          <div class="about-points"><span><b>01</b> APIs e integraciones</span><span><b>02</b> Desarrollo web completo</span><span><b>03</b> Despliegue con Docker</span></div>
        </div>
      </div>
    </section>

    <section id="experiencia" class="section experience-section">
      <div class="container">
        <div class="section-heading"><div><span class="section-kicker">02 / TRAYECTORIA</span><h2>Experiencia <em>profesional.</em></h2></div><p>Aprendizaje técnico y experiencia de trabajo en distintos entornos.</p></div>
        <div class="timeline">
          <article v-for="(job, index) in experiences" :key="job.company" class="experience-card" :class="{ featured: job.featured }">
            <div class="experience-index">0{{ index + 1 }}</div>
            <div class="experience-main"><div class="experience-title"><div><h3>{{ job.role }}</h3><p>{{ job.company }} <span>·</span> {{ job.location }}</p></div><span v-if="job.featured" class="featured-badge">EXPERIENCIA EN DESARROLLO</span></div><ul><li v-for="item in job.highlights" :key="item">{{ item }}</li></ul></div>
            <div class="experience-date">{{ job.period }}</div>
          </article>
        </div>
      </div>
    </section>

    <section id="proyectos" class="section projects-section">
      <div class="container">
        <div class="section-heading"><div><span class="section-kicker">03 / TRABAJO SELECCIONADO</span><h2>Proyectos que <em>me definen.</em></h2></div><p>Dos proyectos hoy. Una base preparada para seguir construyendo.</p></div>
        <div class="project-grid">
          <article v-for="project in projects" :key="project.name" class="project-card">
            <div class="project-top"><span class="project-number">{{ project.number }} / PROYECTO</span><span class="project-arrow" aria-hidden="true">↗</span></div>
            <div class="project-graphic" :class="`project-graphic-${project.number}`" aria-hidden="true"><span v-if="project.number === '01'" class="book-stack"><i></i><i></i><i></i></span><span v-else class="portfolio-window"><i></i><i></i><i></i><b></b></span></div>
            <div class="project-content"><span class="project-kind">{{ project.kind }}</span><h3>{{ project.name }}</h3><p>{{ project.description }}</p><ul class="project-highlights"><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul><div class="tech-tags"><span v-for="tech in project.technologies" :key="tech">{{ tech }}</span></div><a class="project-link" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" :aria-label="`Ver código de ${project.name} en GitHub`">Ver repositorio en GitHub <span aria-hidden="true">↗</span></a></div>
          </article>
        </div>
      </div>
    </section>

    <section id="tecnologias" class="section stack-section">
      <div class="container">
        <div class="section-heading"><div><span class="section-kicker">04 / HERRAMIENTAS</span><h2>Tecnologías con las que <em>trabajo.</em></h2></div><p>Desde la lógica de negocio hasta la interfaz y el despliegue.</p></div>
        <div class="stack-grid"><div v-for="(group, index) in technologyGroups" :key="group.label" class="stack-card"><div class="stack-card-top"><span>0{{ index + 1 }}</span><span class="stack-symbol" aria-hidden="true">{{ ['{ }', '</>', '◫', '✓', '↗'][index] }}</span></div><h3>{{ group.label }}</h3><div class="stack-items"><span v-for="item in group.items" :key="item">{{ item }}</span></div></div></div>
        <div class="soft-skills"><div><span class="section-kicker">MÁS ALLÁ DEL STACK</span><h3>Habilidades en contexto.</h3></div><div class="soft-skill-list"><div v-for="skill in softSkills" :key="skill.name"><h4>{{ skill.name }}</h4><p>{{ skill.evidence }}</p></div></div></div>
      </div>
    </section>

    <section class="section education-section" aria-labelledby="education-title">
      <div class="container education-grid"><div><span class="section-kicker">05 / BASE</span><h2 id="education-title">Formación <em>e idiomas.</em></h2><p>Una base técnica que sigo aplicando y ampliando en cada proyecto.</p></div><div class="education-details"><h3>Formación</h3><div v-for="item in education" :key="item.title" class="education-item"><div><h4>{{ item.title }}</h4><p>{{ item.level }} · {{ item.institution }}</p></div><span>{{ item.period }}</span></div><h3 class="language-heading">Idiomas</h3><div class="language-list"><div v-for="item in languages" :key="item.name"><span>{{ item.name }}</span><strong>{{ item.level }}</strong></div></div></div></div>
    </section>

    <section id="contacto" class="section contact-section">
      <div class="container contact-grid"><div class="contact-copy"><span class="section-kicker">06 / CONTACTO</span><h2>¿Hablamos de tu <em>próximo proyecto?</em></h2><p>Si buscas un desarrollador con interés por el backend y ganas de construir soluciones completas, estaré encantado de conversar.</p><div class="contact-direct"><span>O escríbeme directamente</span><a :href="`mailto:${links.email}`">{{ links.email }} <span aria-hidden="true">↗</span></a><a :href="links.phoneHref">{{ links.phone }}</a></div><div class="contact-links"><a :href="links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a :href="links.cv" download>Descargar CV ↓</a></div></div><div class="contact-panel"><div class="contact-panel-top"><span>ENVIAR UN MENSAJE</span><span>↗</span></div><ContactForm /></div></div>
    </section>
  </main>

  <footer class="site-footer"><div class="container footer-inner"><a class="footer-brand" href="#inicio">JG<span>.</span></a><p>© {{ year }} Jorge Guijarro Fuentes. Hecho con Vue y Spring Boot.</p><a href="#inicio">Volver arriba ↑</a></div></footer>
</template>
