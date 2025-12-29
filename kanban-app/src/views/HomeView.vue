<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">✨</span>
          <span>Gestion de projets simplifiée</span>
        </div>
        
        <h1 class="hero-title">
          Organisez vos projets avec 
          <span class="gradient-text">TaskFlow</span>
        </h1>
        
        <p class="hero-description">
          Une application Kanban moderne pour gérer vos tâches en toute simplicité. 
          Créez, organisez et suivez vos projets en temps réel avec une interface élégante.
        </p>

        <div class="hero-buttons">
          <button @click="goToAuth" class="btn-primary">
            <span>Commencer gratuitement</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <button @click="scrollToFeatures" class="btn-secondary">
            En savoir plus
          </button>
        </div>

        <!-- Stats -->
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">2.5K+</div>
            <div class="stat-label">Utilisateurs actifs</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Projets créés</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">50K+</div>
            <div class="stat-label">Tâches terminées</div>
          </div>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="hero-visual">
        <div class="floating-card card-1">
          <div class="card-header">
            <span class="card-status status-todo">À faire</span>
            <span class="card-count">3</span>
          </div>
          <div class="card-title">Refonte Site Web</div>
        </div>
        
        <div class="floating-card card-2">
          <div class="card-header">
            <span class="card-status status-doing">En cours</span>
            <span class="card-count">2</span>
          </div>
          <div class="card-title">Application Mobile</div>
        </div>
        
        <div class="floating-card card-3">
          <div class="card-header">
            <span class="card-status status-done">Terminé</span>
            <span class="card-count">5</span>
          </div>
          <div class="card-title">Marketing Digital</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section">
      <div class="section-header">
        <span class="section-badge">Fonctionnalités</span>
        <h2 class="section-title">Tout ce dont vous avez besoin</h2>
        <p class="section-description">
          Une suite complète d'outils pour gérer vos projets efficacement
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon icon-purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <h3 class="feature-title">Tableau Kanban</h3>
          <p class="feature-description">
            Visualisez vos tâches avec un système de colonnes intuitif : À faire, En cours, Terminé.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon icon-pink">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3 class="feature-title">Sécurisé</h3>
          <p class="feature-description">
            Authentification robuste avec Firebase. Vos données sont protégées et privées.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon icon-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h3 class="feature-title">Temps Réel</h3>
          <p class="feature-description">
            Synchronisation instantanée. Travaillez depuis plusieurs appareils sans délai.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon icon-green">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3 class="feature-title">Gestion du Temps</h3>
          <p class="feature-description">
            Définissez des dates limites et suivez la progression de vos projets facilement.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon icon-orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <h3 class="feature-title">Projets Multiples</h3>
          <p class="feature-description">
            Créez autant de projets que nécessaire avec des couleurs personnalisées.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon icon-cyan">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3 class="feature-title">Responsive</h3>
          <p class="feature-description">
            Interface adaptative qui fonctionne parfaitement sur mobile, tablette et desktop.
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-section">
      <div class="section-header">
        <span class="section-badge">Comment ça marche</span>
        <h2 class="section-title">Trois étapes simples</h2>
      </div>

      <div class="steps-container">
        <div class="step-card">
          <div class="step-number">01</div>
          <div class="step-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h3 class="step-title">Créez votre compte</h3>
          <p class="step-description">
            Inscrivez-vous gratuitement avec votre email ou compte Google en quelques secondes.
          </p>
        </div>

        <div class="step-connector"></div>

        <div class="step-card">
          <div class="step-number">02</div>
          <div class="step-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3 class="step-title">Créez vos projets</h3>
          <p class="step-description">
            Ajoutez vos projets avec une description et une couleur pour mieux les organiser.
          </p>
        </div>

        <div class="step-connector"></div>

        <div class="step-card">
          <div class="step-number">03</div>
          <div class="step-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <h3 class="step-title">Gérez vos tâches</h3>
          <p class="step-description">
            Organisez vos tâches en colonnes et suivez leur progression en temps réel.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Prêt à optimiser votre productivité ?</h2>
        <p class="cta-description">
          Rejoignez des milliers d'utilisateurs qui gèrent leurs projets avec TaskFlow
        </p>
        <button @click="goToAuth" class="btn-cta">
          Commencer maintenant
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">✦</span>
            <span class="logo-text">TaskFlow</span>
          </div>
          <p class="footer-tagline">Gérez vos projets avec style</p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4 class="footer-heading">Produit</h4>
            <a href="#features" class="footer-link">Fonctionnalités</a>
            <a href="#" class="footer-link">Prix</a>
            <a href="#" class="footer-link">Documentation</a>
          </div>

          <div class="footer-column">
            <h4 class="footer-heading">Entreprise</h4>
            <a href="#" class="footer-link">À propos</a>
            <a href="#" class="footer-link">Blog</a>
            <a href="#" class="footer-link">Carrières</a>
          </div>

          <div class="footer-column">
            <h4 class="footer-heading">Support</h4>
            <a href="#" class="footer-link">Aide</a>
            <a href="#" class="footer-link">Contact</a>
            <a href="#" class="footer-link">Statut</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">© 2024 TaskFlow. Tous droits réservés.</p>
        <div class="footer-legal">
          <a href="#" class="footer-link-small">Confidentialité</a>
          <span class="footer-dot">•</span>
          <a href="#" class="footer-link-small">Conditions</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAuth = () => {
  router.push('/auth')
}

const scrollToFeatures = () => {
  const featuresSection = document.getElementById('features')
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0626 0%, #1a0b2e 50%, #2d1b4e 100%);
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 8rem 6rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  width: fit-content;
  color: #a78bfa;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-icon {
  font-size: 1rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin: 0;
}

.gradient-text {
  background: linear-gradient(135deg, #60efff 0%, #ec4899 50%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: #a78bfa;
  line-height: 1.6;
  margin: 0;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(236, 72, 153, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(236, 72, 153, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #a78bfa;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(167, 139, 250, 0.3);
}

/* Hero Visual */
.hero-visual {
  position: relative;
  height: 500px;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  width: 280px;
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 50px;
  left: 0;
  animation-delay: 0s;
}

.card-2 {
  top: 200px;
  right: 50px;
  animation-delay: 2s;
}

.card-3 {
  bottom: 50px;
  left: 100px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-todo {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.status-doing {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.status-done {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.card-count {
  color: white;
  font-weight: 600;
}

.card-title {
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
}

/* Features Section */
.features-section {
  padding: 6rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: #a78bfa;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 1rem 0;
}

.section-description {
  font-size: 1.125rem;
  color: #a78bfa;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-8px);
  border-color: rgba(139, 92, 246, 0.3);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.icon-purple {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
}

.icon-pink {
  background: rgba(236, 72, 153, 0.2);
  color: #ec4899;
}

.icon-blue {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.icon-green {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.icon-orange {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.icon-cyan {
  background: rgba(6, 182, 212, 0.2);
  color: #06b6d4;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.75rem 0;
}

.feature-description {
  color: #a78bfa;
  line-height: 1.6;
  margin: 0;
}

/* How It Works Section */
.how-section {
  padding: 6rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
}

.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.step-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.step-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-8px);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.step-icon {
  width: 80px;
  height: 80px;
  margin: 2rem auto 1.5rem;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 1rem 0;
}

.step-description {
  color: #a78bfa;
  line-height: 1.6;
  margin: 0;
}

.step-connector {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%);
  flex-shrink: 0;
}

/* CTA Section */
.cta-section {
  padding: 6rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
}

.cta-content {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 30px;
  padding: 5rem 3rem;
  text-align: center;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
}

.cta-description {
  font-size: 1.25rem;
  color: #a78bfa;
  margin: 0 0 2.5rem 0;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 1.25rem 3rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(236, 72, 153, 0.4);
}

.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(236, 72, 153, 0.6);
}

/* Footer */
.footer {
  padding: 4rem 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.5rem;
  color: #8b5cf6;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.footer-tagline {
  color: #a78bfa;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 4rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-heading {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.footer-link {
  color: #a78bfa;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
}

.footer-copyright {
  color: #a78bfa;
  font-size: 0.875rem;
  margin: 0;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-link-small {
  color: #a78bfa;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-link-small:hover {
  color: white;
}

.footer-dot {
  color: #a78bfa;
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-section {
    grid-template-columns: 1fr;
    padding: 6rem 3rem;
    text-align: center;
  }

  .hero-content {
    align-items: center;
  }

  .hero-badge,
  .hero-buttons,
  .hero-stats {
    justify-content: center;
  }

  .hero-visual {
    display: none;
  }

  .hero-title {
    font-size: 3rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps-container {
    flex-direction: column;
  }

  .step-connector {
    width: 2px;
    height: 60px;
    background: linear-gradient(180deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%);
  }
}

@media (max-width: 768px) {
  .hero-section,
  .features-section,
  .how-section,
  .cta-section,
  .footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-divider {
    display: none;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
    font-size: 2rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>