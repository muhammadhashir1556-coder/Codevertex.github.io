// script.js - with percentage charts and form handling
document.addEventListener('DOMContentLoaded', function() {
  // ===== circular percentage chart (about page) with visible percentages =====
  const chartContainer = document.getElementById('chartContainer');
  if (chartContainer) {
    // skills data: label, percentage (0-100) - focused on figma, html, css, js
    const skills = [
      { name: 'Figma design', percent: 92 },
      { name: 'HTML', percent: 98 },
      { name: 'CSS', percent: 96 },
      { name: 'JavaScript', percent: 88 },
      { name: 'Responsive', percent: 95 },
      { name: 'Dark themes', percent: 97 }
    ];

    chartContainer.innerHTML = '';
    skills.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'chart-item';

      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 120 120');
      svg.classList.add('circular-chart');

      // background circle
      const bgCircle = document.createElementNS(svgNS, 'circle');
      bgCircle.classList.add('circle-bg');
      bgCircle.setAttribute('cx', '60');
      bgCircle.setAttribute('cy', '60');
      bgCircle.setAttribute('r', '54');
      bgCircle.setAttribute('stroke-width', '8');
      bgCircle.setAttribute('fill', 'none');
      svg.appendChild(bgCircle);

      // progress circle
      const progressCircle = document.createElementNS(svgNS, 'circle');
      progressCircle.classList.add('circle-progress');
      progressCircle.setAttribute('cx', '60');
      progressCircle.setAttribute('cy', '60');
      progressCircle.setAttribute('r', '54');
      progressCircle.setAttribute('stroke-width', '8');
      progressCircle.setAttribute('fill', 'none');
      progressCircle.setAttribute('stroke-linecap', 'round');
      progressCircle.style.strokeDasharray = '345';
      progressCircle.style.strokeDashoffset = '345';
      svg.appendChild(progressCircle);

      // percentage text (visible inside chart)
      const text = document.createElementNS(svgNS, 'text');
      text.classList.add('percentage-text');
      text.setAttribute('x', '60');
      text.setAttribute('y', '60');
      text.textContent = skill.percent + '%';
      svg.appendChild(text);

      item.appendChild(svg);

      const label = document.createElement('div');
      label.className = 'chart-label';
      label.textContent = skill.name;
      item.appendChild(label);

      chartContainer.appendChild(item);

      // animate after a tiny delay to show percentage fill
      setTimeout(() => {
        const circumference = 345;
        const offset = circumference - (skill.percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
      }, 200);
    });
  }

  // ===== active nav link based on current page =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ===== contact form handler (demo) =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('✨ Thank you for reaching out! I\'ll get back to you within 24 hours. (This is a demo form.)');
      contactForm.reset();
    });
  }

  // ===== smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});