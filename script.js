document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     NAVBAR — scroll shadow
  ============================================================ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ============================================================
     INTERSECTION OBSERVER — scroll reveal
     Correção: threshold baixo + rootMargin generoso para garantir
     que todos os elementos recebam a classe .visible ao entrar
     na viewport, independente do tamanho ou posição.
  ============================================================ */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ============================================================
     FALLBACK DE SEGURANÇA — força .visible em elementos que
     já estão na viewport ao carregar a página (acima do fold)
  ============================================================ */
  const forceVisible = () => {
    document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  };

  // Executa imediatamente e após pequeno delay para garantir layout completo
  forceVisible();
  setTimeout(forceVisible, 300);
  setTimeout(forceVisible, 800);

  /* ============================================================
     ACTIVE NAV LINK — highlight on scroll
  ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--accent)';
            }
          });
        }
      });
    }, {
      threshold: 0.0,
      rootMargin: '-40% 0px -55% 0px'
    });

    sections.forEach(s => navObserver.observe(s));
  }

  /* ============================================================
     TECH CARDS — tilt 3D no hover (apenas desktop)
  ============================================================ */
  const techCards = document.querySelectorAll('.tech-card');
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (techCards.length > 0 && !isTouch) {
    techCards.forEach(card => {

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
        card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.4s ease';
        card.style.transform = '';
        setTimeout(() => {
          card.style.transition = '';
        }, 400);
      });

    });
  }

  /* ============================================================
     SCROLL LISTENER — revela elementos ao rolar a página
  ============================================================ */
  window.addEventListener('scroll', forceVisible, { passive: true });

}); // fim DOMContentLoaded