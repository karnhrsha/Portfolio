document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Close' : 'Menu';
  });
}

document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

const file = (location.pathname.split('/').filter(Boolean).pop() || 'index.html').replace('.html','');
const visualMap = {
  index:'hero', amd:'amd', 'jpmorgan-chase':'jpmorgan', research:'research',
  'facial-keypoint-detection':'facial-keypoint-detection',
  'breast-cancer-prediction':'breast-cancer-prediction',
  chordchat:'chordchat',
  'tourist-sentiment-analysis':'tourist-sentiment-analysis',
  onmart:'onmart',
  'spark-weather-analytics':'spark-weather-analytics',
  'ssis-etl-pipeline':'ssis-etl-pipeline',
  'project-template':'hero'
};
const depth = /\/(experience|work)\/[^/]+\.html$/.test(location.pathname) ? '../' : '';
const visual = visualMap[file];

document.querySelectorAll('.placeholder-visual').forEach(box => {
  if (!visual) return;
  box.classList.remove('placeholder-visual');
  box.classList.add('archive-visual');
  box.innerHTML = `<img src="${depth}assets/illustrations/${visual}.svg" alt="" ${file==='index'?'fetchpriority="high"':'loading="lazy"'}>`;
  const img = box.querySelector('img');
  const loaded = () => box.classList.add('loaded');
  img.addEventListener('load', loaded);
  if (img.complete) loaded();
});

const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden','true');
document.body.appendChild(progress);
const updateProgress = () => {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${total > 0 ? scrollY/total : 0})`;
};
addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

const items = document.querySelectorAll('.reveal,.project-section,.research-themes article,.work-row,.experience-card-link,.balanced-project-card,.contact-links a');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
  items.forEach((el,i) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${(i%5)*55}ms`);
    observer.observe(el);
  });
} else items.forEach(el => el.classList.add('visible'));

document.querySelectorAll('a[href$=".html"],a[href*=".html#"]').forEach(link => {
  link.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => location.href = link.href, 180);
  });
});

if (matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.experience-card-link,.work-row,.contact-links a').forEach(item => {
    item.addEventListener('pointermove', e => {
      const r = item.getBoundingClientRect();
      item.style.setProperty('--mx', `${e.clientX-r.left}px`);
      item.style.setProperty('--my', `${e.clientY-r.top}px`);
    });
  });
}

document.querySelectorAll('.archive-visual img').forEach(img => {
  const box = img.closest('.archive-visual');
  const ready = () => box && box.classList.add('loaded');
  img.addEventListener('load', ready, { once: true });
  if (img.complete) ready();
});

document.querySelectorAll('.balanced-project-image img').forEach((img) => {
  const ready = () => img.classList.add('loaded');
  img.addEventListener('load', ready, { once: true });
  if (img.complete) ready();
});


document.querySelectorAll('.hero-portrait img, .balanced-project-image img').forEach((img) => {
  const markReady = () => {
    img.classList.add('loaded');
    img.closest('.archive-visual, .balanced-project-card')?.classList.add('loaded');
  };
  img.addEventListener('load', markReady, { once: true });
  if (img.complete) markReady();
});


document.querySelectorAll('.hero-portrait img, .balanced-project-image img, .archive-visual img').forEach((img) => {
  const markReady = () => {
    img.classList.add('loaded');
    img.closest('.hero-portrait, .balanced-project-card, .archive-visual')?.classList.add('loaded');
  };
  img.addEventListener('load', markReady, { once: true });
  if (img.complete) markReady();
});
