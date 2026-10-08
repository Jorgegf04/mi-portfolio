<script setup lang="ts">
import { computed, ref } from 'vue'
import ContactForm from './ContactForm.vue'
import { contentByLocale, links } from './content'
import { locale, setLocale, t } from './i18n'

const menuOpen = ref(false)
const year = new Date().getFullYear()
const nav = computed(() => [
  { href: '#proyectos', label: t('navProjects') },
  { href: '#sobre-mi', label: t('navAbout') },
  { href: '#experiencia', label: t('navExperience') },
  { href: '#tecnologias', label: t('navTechnologies') },
  { href: '#contacto', label: t('navContact') },
])
const content = computed(() => contentByLocale[locale.value])

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <a class="skip-link" href="#contenido">{{ t('skip') }}</a>
  <header class="site-header">
    <div class="container nav-shell">
      <a class="brand" href="#inicio" :aria-label="t('brandHome')" @click="closeMenu">
        <span class="brand-mark">JG<span>.</span></span>
        <span class="brand-name">JORGE GUIJARRO</span>
      </a>
      <nav id="main-nav" class="main-nav" :class="{ open: menuOpen }" :aria-label="t('navLabel')">
        <a v-for="item in nav" :key="item.href" :href="item.href" @click="closeMenu">{{ item.label }}</a>
        <a class="nav-cv" :href="links.cv" download @click="closeMenu">{{ t('downloadCv') }} <span aria-hidden="true">↗</span></a>
      </nav>
      <div class="nav-actions">
        <div class="language-switch" role="group" :aria-label="t('languageLabel')">
          <button type="button" lang="es" :aria-pressed="locale === 'es'" aria-label="Español" @click="setLocale('es')">ES</button>
          <button type="button" lang="en" :aria-pressed="locale === 'en'" aria-label="English" @click="setLocale('en')">EN</button>
        </div>
        <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="main-nav" :aria-label="menuOpen ? t('menuClose') : t('menuOpen')" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <main id="contenido">
    <section id="inicio" class="hero section">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-line"></span> {{ t('heroEyebrow') }}</div>
          <h1>{{ t('heroHello') }} <span>Jorge Guijarro.</span><br />{{ t('heroHeadline') }}</h1>
          <p class="hero-intro">{{ t('heroIntro') }}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#proyectos">{{ t('heroProjects') }} <span aria-hidden="true">↗</span></a>
            <a class="button button-outline" href="#contacto">{{ t('heroContact') }} <span aria-hidden="true">→</span></a>
          </div>
          <div class="hero-socials" :aria-label="t('socialLabel')">
            <a :href="links.github" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <span aria-hidden="true">/</span>
            <a :href="links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <span aria-hidden="true">/</span>
            <span>Mutxamel, Alicante</span>
          </div>
        </div>
        <div class="hero-visual" :aria-label="t('apiVisualLabel')">
          <div class="visual-grid" aria-hidden="true"></div>
          <div class="orbit orbit-one" aria-hidden="true"></div>
          <div class="orbit orbit-two" aria-hidden="true"></div>
          <div class="api-panel">
            <div class="api-topbar"><span class="api-dots"><i></i><i></i><i></i></span><span>portfolio / contacto</span><span class="api-live"><span></span> online</span></div>
            <div class="api-body">
              <div class="api-route"><span class="method">EMAIL</span><span>jgfestudios@gmail.com</span></div>
              <div class="api-code"><span class="code-comment">{{ t('apiComment') }}</span><br /><span class="code-purple">const</span> draft = <span class="code-cyan">createMailto</span>(message)<br /><span class="code-purple">open</span>(draft, emailApp)<br /><span class="code-purple">return</span> <span class="code-green">&#123; status: 'prepared' &#125;</span></div>
              <div class="api-pipeline"><div><span class="pipeline-icon">01</span><span>{{ t('apiInput') }}</span></div><span class="pipeline-connector"></span><div><span class="pipeline-icon">02</span><span>{{ t('apiValidation') }}</span></div><span class="pipeline-connector"></span><div><span class="pipeline-icon">03</span><span>{{ t('apiDelivery') }}</span></div></div>
            </div>
          </div>
          <div class="floating-label floating-label-top">JAVA <span>+</span> SPRING BOOT</div>
          <div class="floating-label floating-label-bottom"><span class="tiny-square"></span> {{ t('endToEnd') }}</div>
        </div>
      </div>
      <div class="container hero-bottom"><span>{{ t('heroIndex') }}</span><a href="#proyectos">{{ t('heroExplore') }} <span aria-hidden="true">↓</span></a></div>
    </section>

    <section id="proyectos" class="section projects-section">
      <div class="container">
        <div class="section-heading">
          <div><span class="section-kicker">{{ t('projectsKicker') }}</span><h2>{{ t('projectsTitle') }} <em>{{ t('projectsTitleEm') }}</em></h2></div>
          <p>{{ t('projectsIntro') }}</p>
        </div>
        <div class="project-stories">
          <article v-for="(project, index) in content.projects" :key="project.number" class="project-story" :class="{ 'project-story-featured': index === 0 }">
            <div class="project-story-visual" :class="index === 0 ? 'book-visual' : 'portfolio-visual'" :aria-hidden="index !== 0">
              <template v-if="index === 0">
                <span class="visual-caption">{{ t('bookCaption') }}</span>
                <div class="book-screen"><img src="/booksocial-catalog.jpg" :alt="t('bookAlt')" width="1181" height="521" loading="lazy" decoding="async" /></div>
                <span class="book-screen-note">{{ t('bookNote') }}</span>
              </template>
              <template v-else>
                <span class="visual-caption">{{ t('portfolioCaption') }}</span>
                <div class="portfolio-browser">
                  <div class="portfolio-browser-bar" aria-hidden="true"><span class="portfolio-browser-dots"><i></i><i></i><i></i></span><span>jorgeguijarro.dev</span></div>
                  <img src="/og-card.png" :alt="t('portfolioCaption')" width="1200" height="630" loading="lazy" decoding="async" />
                </div>
              </template>
            </div>
            <div class="project-story-content">
              <span class="project-number">{{ project.number }} / {{ index === 0 ? t('featuredProject') : t('personalProject') }}</span>
              <h3>{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <ul class="project-highlights"><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul>
              <div class="tech-tags"><span v-for="tech in project.technologies" :key="tech">{{ tech }}</span></div>
              <a class="project-link" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" :aria-label="t('projectCode', { name: project.name })">
                <svg class="action-icon github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.54 2.35 3.87 1.64.1-.72.4-1.2.7-1.47-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.72.78 1.15 1.77 1.15 2.99 0 4.3-2.61 5.24-5.1 5.52.4.34.75 1 .75 2.02v3c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>
                <span>{{ t('projectRepository') }}</span><span class="action-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="sobre-mi" class="section about-section">
      <div class="container about-layout">
        <div class="about-content">
          <span class="section-kicker">{{ t('aboutKicker') }}</span>
          <h2>{{ t('aboutTitle') }} <em>{{ t('aboutTitleEm') }}</em></h2>
          <div class="about-signature">
            <span class="signature-mark" aria-hidden="true">{ }</span>
            <span class="signature-copy"><strong>Java · Spring Boot</strong><small>{{ t('aboutSignature') }}</small></span>
            <span class="signature-status" aria-hidden="true"></span>
          </div>
          <p class="lead">{{ t('aboutLead') }}</p>
          <p>{{ t('aboutP2') }}</p>
          <p>{{ t('aboutP3') }}</p>
          <div class="about-points"><span><b>01</b> {{ t('aboutPoint1') }}</span><span><b>02</b> {{ t('aboutPoint2') }}</span><span><b>03</b> {{ t('aboutPoint3') }}</span></div>
        </div>
        <img class="about-portrait" src="/jorge-guijarro.jpg" :alt="t('portraitAlt')" width="2048" height="1536" loading="lazy" decoding="async" />
      </div>
    </section>

    <section id="experiencia" class="section experience-section">
      <div class="container">
        <div class="section-heading"><div><span class="section-kicker">{{ t('experienceKicker') }}</span><h2>{{ t('experienceTitle') }} <em>{{ t('experienceTitleEm') }}</em></h2></div><p>{{ t('experienceIntro') }}</p></div>
        <div class="timeline">
          <article v-for="(job, index) in content.experiences" :key="job.company" class="experience-card" :class="{ featured: job.featured }">
            <div class="experience-index">0{{ index + 1 }}</div>
            <div class="experience-main"><div class="experience-title"><div><h3>{{ job.role }}</h3><p>{{ job.company }} <span>·</span> {{ job.location }}</p></div><span v-if="job.featured" class="featured-badge">{{ t('developmentExperience') }}</span></div><ul><li v-for="item in job.highlights" :key="item">{{ item }}</li></ul></div>
            <div class="experience-date">{{ job.period }}</div>
          </article>
        </div>
      </div>
    </section>

    <section id="tecnologias" class="section stack-section">
      <div class="container">
        <div class="section-heading"><div><span class="section-kicker">{{ t('technologiesKicker') }}</span><h2>{{ t('technologiesTitle') }} <em>{{ t('technologiesTitleEm') }}</em></h2></div><p>{{ t('technologiesIntro') }}</p></div>
        <div class="stack-grid"><div v-for="(group, index) in content.technologyGroups" :key="group.label" class="stack-card" :class="{ 'stack-card-featured': index === 0, 'stack-card-wide': index === 1, 'stack-card-frontend': index === 1 }"><div class="stack-card-top"><span>0{{ index + 1 }} / {{ index === 0 ? t('mainFocus') : t('tools') }}</span><span class="stack-symbol" aria-hidden="true">{{ ['{ }', '</>', '◫', '✓', '↗'][index] }}</span></div><h3>{{ group.label }}</h3><div class="stack-items"><span v-for="item in group.items" :key="item">{{ item }}</span></div></div></div>
        <div class="soft-skills"><div><span class="section-kicker">{{ t('beyondStack') }}</span><h3>{{ t('softSkillsTitle') }}</h3></div><div class="soft-skill-list"><div v-for="skill in content.softSkills" :key="skill.name"><h4>{{ skill.name }}</h4><p>{{ skill.evidence }}</p></div></div></div>
      </div>
    </section>

    <section class="section education-section" aria-labelledby="education-title">
      <div class="container education-layout">
        <div class="education-intro">
          <span class="section-kicker">{{ t('educationKicker') }}</span>
          <h2 id="education-title">{{ t('educationTitle') }} <em>{{ t('educationTitleEm') }}</em></h2>
          <p>{{ t('educationIntro') }}</p>
        </div>
        <div class="education-block">
          <h3>{{ t('educationHeading') }}</h3>
          <div class="education-cards">
            <article v-for="(item, index) in content.education" :key="item.title" class="education-item" :class="{ 'education-item-featured': index === 0 }">
              <div class="education-card-top"><span>{{ item.level }}</span><time>{{ item.period }}</time></div>
              <h4>{{ item.title }}</h4>
              <p class="education-institution">{{ item.institution }}</p>
              <p class="education-description">{{ item.description }}</p>
            </article>
          </div>
        </div>
        <div class="languages-block">
          <h3 class="language-heading">{{ t('languagesHeading') }}</h3>
          <div class="language-list">
            <article v-for="item in content.languages" :key="item.name" class="language-card">
              <div><span class="language-name">{{ item.name }}</span><span class="language-level">{{ item.level }}</span></div>
              <span class="language-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="contacto" class="section contact-section">
      <div class="container contact-grid"><div class="contact-copy"><span class="section-kicker">{{ t('contactKicker') }}</span><h2>{{ t('contactTitle') }} <em>{{ t('contactTitleEm') }}</em></h2><p>{{ t('contactIntro') }}</p><div class="contact-direct"><span>{{ t('contactDirect') }}</span><a class="contact-action contact-action-primary" :href="`mailto:${links.email}`"><svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 5.5h16.5A1.75 1.75 0 0 1 22 7.25v9.5a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 16.75v-9.5A1.75 1.75 0 0 1 3.75 5.5Zm.1 2 8.15 5.83 8.15-5.83H3.85Zm16.15 9V9.93l-7.27 5.2a1.25 1.25 0 0 1-1.46 0L4 9.93v6.82c0 .14.11.25.25.25h15.5c.14 0 .25-.11.25-.25Z"/></svg><span>{{ links.email }}</span><span class="action-arrow" aria-hidden="true">↗</span></a><a class="contact-action" :href="links.phoneHref"><svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg><span>{{ links.phone }}</span></a></div><div class="contact-links"><a class="contact-action" :href="links.linkedin" target="_blank" rel="noopener noreferrer"><svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.34H4.96V9.02h2.97v9.32ZM6.45 7.75a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.6 10.59h-2.96v-4.53c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.61H9.9V9.02h2.84v1.27h.04c.4-.73 1.36-1.5 2.8-1.5 3 0 3.56 1.98 3.56 4.55v5Z"/></svg><span>LinkedIn</span><span class="action-arrow" aria-hidden="true">↗</span></a><a class="contact-action" :href="links.github" target="_blank" rel="noopener noreferrer"><svg class="action-icon github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.54 2.35 3.87 1.64.1-.72.4-1.2.7-1.47-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.72.78 1.15 1.77 1.15 2.99 0 4.3-2.61 5.24-5.1 5.52.4.34.75 1 .75 2.02v3c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg><span>GitHub</span><span class="action-arrow" aria-hidden="true">↗</span></a><a class="contact-action" :href="links.cv" download><svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.8V8h4.2L13 3.8ZM6 4v16h11V10h-5a1 1 0 0 1-1-1V4H6Zm5.3 7.3a1 1 0 0 1 1.4 0l2.5 2.5a1 1 0 1 1-1.4 1.4l-.8-.8V18a1 1 0 1 1-2 0v-3.6l-.8.8a1 1 0 1 1-1.4-1.4l2.5-2.5Z"/></svg><span>{{ t('downloadCv') }}</span></a></div></div><div class="contact-panel"><div class="contact-panel-top"><span>{{ t('contactPanel') }}</span><span>↗</span></div><ContactForm /></div></div>
    </section>
  </main>

  <footer class="site-footer"><div class="container footer-inner"><a class="footer-brand" href="#inicio">JG<span>.</span></a><p>© {{ year }} Jorge Guijarro Fuentes. {{ t('footerMadeWith') }}</p><a href="#inicio">{{ t('footerTop') }} ↑</a></div></footer>
</template>
