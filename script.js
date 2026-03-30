// ===== DARK / LIGHT MODE =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme  = localStorage.getItem('tf-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  if (themeToggle) themeToggle.textContent = '☀️';
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('tf-theme', isLight ? 'light' : 'dark');
  });
}

// ===== SEARCH =====
const searchBtn     = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput   = document.getElementById('searchInput');
const searchClose   = document.getElementById('searchClose');
const searchResults = document.getElementById('searchResults');

const searchData = [
  { title: 'Carlos Alcaraz', type: 'Player', url: 'players.html' },
  { title: 'Jannik Sinner', type: 'Player', url: 'players.html' },
  { title: 'Novak Djokovic', type: 'Player', url: 'players.html' },
  { title: 'Alexander Zverev', type: 'Player', url: 'players.html' },
  { title: 'Lorenzo Musetti', type: 'Player', url: 'players.html' },
  { title: 'Alex de Minaur', type: 'Player', url: 'players.html' },
  { title: 'Taylor Fritz', type: 'Player', url: 'players.html' },
  { title: 'Daniil Medvedev', type: 'Player', url: 'players.html' },
  { title: 'Aryna Sabalenka', type: 'Player', url: 'players.html' },
  { title: 'Iga Swiatek', type: 'Player', url: 'players.html' },
  { title: 'Coco Gauff', type: 'Player', url: 'players.html' },
  { title: 'Elena Rybakina', type: 'Player', url: 'players.html' },
  { title: 'Jessica Pegula', type: 'Player', url: 'players.html' },
  { title: 'Roger Federer', type: 'Legend', url: 'players.html' },
  { title: 'Rafael Nadal', type: 'Legend', url: 'players.html' },
  { title: 'Serena Williams', type: 'Legend', url: 'players.html' },
  { title: 'Pete Sampras', type: 'Legend', url: 'players.html' },
  { title: 'Andre Agassi', type: 'Legend', url: 'players.html' },
  { title: 'Australian Open', type: 'Tournament', url: 'tournaments.html' },
  { title: 'Roland Garros', type: 'Tournament', url: 'tournaments.html' },
  { title: 'Wimbledon', type: 'Tournament', url: 'tournaments.html' },
  { title: 'US Open', type: 'Tournament', url: 'tournaments.html' },
  { title: 'ATP Rankings', type: 'Rankings', url: 'players.html' },
  { title: 'WTA Rankings', type: 'Rankings', url: 'players.html' },
  { title: 'Live Scores', type: 'Scores', url: 'scores.html' },
  { title: 'Tennis Quiz', type: 'Quiz', url: 'quiz.html' },
  { title: 'GOAT Comparison', type: 'Feature', url: 'players.html' },
  { title: 'Head to Head', type: 'Feature', url: 'players.html' },
  { title: 'Sinner Wins Australian Open', type: 'News', url: 'news.html' },
  { title: 'Alcaraz Wins Roland Garros', type: 'News', url: 'news.html' },
  { title: 'Alcaraz Wins Wimbledon', type: 'News', url: 'news.html' },
  { title: 'Sabalenka Wins US Open', type: 'News', url: 'news.html' },
];

function openSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput && searchInput.focus(), 100);
}

function closeSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.remove('active');
  document.body.style.overflow = '';
  if (searchInput) searchInput.value = '';
  if (searchResults) searchResults.innerHTML = '';
}

if (searchBtn) searchBtn.addEventListener('click', openSearch);
if (searchClose) searchClose.addEventListener('click', closeSearch);
if (searchOverlay) {
  searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { searchResults.innerHTML = ''; return; }
    const matches = searchData.filter(d => d.title.toLowerCase().includes(q)).slice(0, 8);
    if (matches.length === 0) {
      searchResults.innerHTML = '<p class="search-no-results">No results found.</p>';
    } else {
      searchResults.innerHTML = matches.map(m =>
        `<a class="search-result-item" href="${m.url}">
          <span class="search-result-type">${m.type}</span>
          <span>${m.title}</span>
        </a>`
      ).join('');
    }
  });
  searchInput.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
}

// ===== SOCIAL SHARING =====
function shareArticle(platform, btn) {
  const article = btn.closest('.article-card, .article-body') || btn.closest('article');
  const titleEl = article ? (article.querySelector('h2') || article.querySelector('h3')) : null;
  const title   = titleEl ? titleEl.textContent.trim() : 'TennisFan News';
  const url     = encodeURIComponent(window.location.href);
  const text    = encodeURIComponent(title + ' — TennisFan');
  let link = '';
  if (platform === 'x')         link = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  if (platform === 'facebook')  link = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  if (platform === 'whatsapp')  link = `https://wa.me/?text=${text}%20${url}`;
  window.open(link, '_blank', 'width=600,height=400');
}

// ===== QUIZ =====
const quizQuestions = [
  { q: "How many Grand Slam titles did Rafael Nadal win at Roland Garros?", options: ["10","12","14","16"], answer: 2, fact: "Nadal won Roland Garros a record 14 times — an achievement many consider the greatest individual record in sport." },
  { q: "Which surface is Wimbledon played on?", options: ["Clay","Hard","Grass","Carpet"], answer: 2, fact: "Wimbledon is the only Grand Slam still played on natural grass, making it the most traditional major." },
  { q: "Who holds the record for most weeks at World No. 1 in ATP history?", options: ["Roger Federer","Pete Sampras","Novak Djokovic","Rafael Nadal"], answer: 2, fact: "Djokovic has spent over 428 weeks at No. 1 — more than any other player in history." },
  { q: "In what year was the first Wimbledon Championships held?", options: ["1872","1875","1877","1881"], answer: 2, fact: "The first Wimbledon was held in 1877 with only 22 players competing in the men's singles." },
  { q: "What does 'bagel' mean in tennis slang?", options: ["A net cord winner","Winning a set 6-0","An ace serve","A double fault"], answer: 1, fact: "A 'bagel' is winning a set 6-0. The zero looks like a bagel — hence the name!" },
  { q: "Which player won the most Australian Open men's titles?", options: ["Roger Federer","Rafael Nadal","Novak Djokovic","Andre Agassi"], answer: 2, fact: "Djokovic has won the Australian Open a record 10 times, making Melbourne his most successful Grand Slam venue." },
  { q: "What is the maximum number of sets in a men's Grand Slam match?", options: ["3","4","5","6"], answer: 2, fact: "Men's Grand Slam matches are best-of-five sets, meaning the maximum is 5 sets." },
  { q: "Carlos Alcaraz became the youngest World No. 1 in ATP history in what year?", options: ["2021","2022","2023","2024"], answer: 1, fact: "Alcaraz reached No. 1 in September 2022 at age 19 years and 4 months — the youngest in ATP history." },
  { q: "Which Grand Slam is played on red clay?", options: ["Australian Open","US Open","Wimbledon","Roland Garros"], answer: 3, fact: "Roland Garros uses crushed red brick (clay), which slows the ball and creates high bounces favoring baseliners." },
  { q: "How many Grand Slam titles did Roger Federer win?", options: ["18","19","20","21"], answer: 2, fact: "Federer retired in 2022 with 20 Grand Slam titles, including a record 8 Wimbledon titles." },
  { q: "What score is called a 'golden set' in tennis?", options: ["6-0 without losing a point","Winning a tiebreak 7-0","6-0 in under 15 minutes","Winning all 4 Slams in a year"], answer: 0, fact: "A golden set means winning all 24 points in a set — without losing a single point. Extremely rare." },
  { q: "Aryna Sabalenka is from which country?", options: ["Russia","Ukraine","Belarus","Poland"], answer: 2, fact: "Sabalenka is from Minsk, Belarus. She won three consecutive Australian Open titles (2023, 2024, 2025) — wait, AO 2025 was won by Madison Keys!" },
  { q: "What is a 'let' in tennis?", options: ["A ball that hits the net on a serve and lands in","A serve that misses the box","A double fault","Winning a point without the opponent touching the ball"], answer: 0, fact: "A let is called when a serve clips the net cord but still lands in the correct service box. The serve is replayed." },
  { q: "Who was the first player to win all four Grand Slams in a calendar year?", options: ["Rod Laver","Don Budge","Pete Sampras","Jimmy Connors"], answer: 1, fact: "Don Budge achieved the Calendar Grand Slam in 1938. Rod Laver did it twice — in 1962 and 1969." },
  { q: "What surface is the US Open played on?", options: ["Clay","Grass","Hard (DecoTurf)","Carpet"], answer: 2, fact: "The US Open uses DecoTurf, a hard acrylic surface at the USTA Billie Jean King National Tennis Center in New York." },
];

const quizStart    = document.getElementById('quizStart');
const quizPlay     = document.getElementById('quizPlay');
const quizResult   = document.getElementById('quizResult');
const startQuizBtn = document.getElementById('startQuizBtn');
const retryBtn     = document.getElementById('retryBtn');

if (startQuizBtn) {
  let currentQ = 0, score = 0;

  function showQuestion() {
    const q = quizQuestions[currentQ];
    document.getElementById('quizQNum').textContent = `Question ${currentQ + 1} / ${quizQuestions.length}`;
    document.getElementById('quizScore').textContent = `Score: ${score}`;
    document.getElementById('quizProgressFill').style.width = `${(currentQ / quizQuestions.length) * 100}%`;
    document.getElementById('quizQuestion').textContent = q.q;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizNextBtn').style.display = 'none';

    const optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = q.options.map((opt, i) =>
      `<button class="quiz-option" data-index="${i}">${opt}</button>`
    ).join('');

    optionsEl.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = parseInt(btn.dataset.index);
        optionsEl.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        if (chosen === q.answer) {
          btn.classList.add('correct');
          score++;
          document.getElementById('quizFeedback').textContent = '✅ Correct! ' + q.fact;
          document.getElementById('quizFeedback').style.color = 'var(--green-light)';
        } else {
          btn.classList.add('wrong');
          optionsEl.querySelectorAll('.quiz-option')[q.answer].classList.add('correct');
          document.getElementById('quizFeedback').textContent = '❌ Wrong. ' + q.fact;
          document.getElementById('quizFeedback').style.color = '#ef4444';
        }
        document.getElementById('quizScore').textContent = `Score: ${score}`;
        document.getElementById('quizNextBtn').style.display = 'inline-block';
      });
    });
  }

  function showResult() {
    quizPlay.style.display = 'none';
    quizResult.style.display = 'block';
    const pct = score / quizQuestions.length;
    let emoji, title, subtitle;
    if (pct === 1)       { emoji='🏆'; title='Perfect Score!'; subtitle='You are a true tennis expert!'; }
    else if (pct >= 0.8) { emoji='🎾'; title='Excellent!'; subtitle='You really know your tennis!'; }
    else if (pct >= 0.6) { emoji='👏'; title='Well Done!'; subtitle='Good knowledge — keep learning!'; }
    else if (pct >= 0.4) { emoji='📚'; title='Not Bad!'; subtitle='There\'s still more to discover about tennis.'; }
    else                 { emoji='💪'; title='Keep Practising!'; subtitle='Explore the site to learn more!'; }
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultSubtitle').textContent = subtitle;
    document.getElementById('resultScore').textContent = score;
    document.getElementById('resultBreakdown').innerHTML = `
      <div><strong>${score}</strong> Correct</div>
      <div><strong>${quizQuestions.length - score}</strong> Wrong</div>
      <div><strong>${Math.round(pct * 100)}%</strong> Score</div>
    `;
  }

  startQuizBtn.addEventListener('click', () => {
    currentQ = 0; score = 0;
    quizStart.style.display = 'none';
    quizResult.style.display = 'none';
    quizPlay.style.display = 'block';
    showQuestion();
  });

  document.addEventListener('click', e => {
    if (e.target && e.target.id === 'quizNextBtn') {
      currentQ++;
      if (currentQ < quizQuestions.length) showQuestion();
      else showResult();
    }
  });

  if (retryBtn) retryBtn.addEventListener('click', () => {
    quizResult.style.display = 'none';
    quizPlay.style.display = 'block';
    currentQ = 0; score = 0;
    showQuestion();
  });
}

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== SCROLL FADE-UP ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.surface-card, .featured-card, .news-card, .article-card, ' +
  '.legend-card, .calendar-item, .slam-profile, .stat'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ===== COUNTER ANIMATION (stats bar) =====
const counters = document.querySelectorAll('.stat-number[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== NEWS FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const articles   = document.querySelectorAll('.article-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    articles.forEach(card => {
      const cats = card.dataset.category || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.style.display = '';
        // Reset span for featured
        if (card.classList.contains('article-featured')) {
          card.style.gridColumn = filter === 'all' ? '' : 'span 1';
        }
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== LIGHTBOX =====
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.surface-img, .player-avatar-sm, .legend-avatar').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ===== GRAND SLAM CHAMPIONS MODAL =====
const championsData = {
  ao: {
    name: "🏆 Australian Open — All Champions",
    years: [
      { year: 2025, men: "J. Sinner 🇮🇹", women: "M. Keys 🇺🇸" },
      { year: 2024, men: "J. Sinner 🇮🇹", women: "A. Sabalenka 🇧🇾" },
      { year: 2023, men: "N. Djokovic 🇷🇸", women: "A. Sabalenka 🇧🇾" },
      { year: 2022, men: "R. Nadal 🇪🇸", women: "A. Barty 🇦🇺" },
      { year: 2021, men: "N. Djokovic 🇷🇸", women: "N. Osaka 🇯🇵" },
      { year: 2020, men: "N. Djokovic 🇷🇸", women: "S. Kenin 🇺🇸" },
      { year: 2019, men: "N. Djokovic 🇷🇸", women: "N. Osaka 🇯🇵" },
      { year: 2018, men: "R. Federer 🇨🇭", women: "C. Wozniacki 🇩🇰" },
      { year: 2017, men: "R. Federer 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2016, men: "N. Djokovic 🇷🇸", women: "A. Kerber 🇩🇪" },
      { year: 2015, men: "N. Djokovic 🇷🇸", women: "S. Williams 🇺🇸" },
      { year: 2014, men: "S. Wawrinka 🇨🇭", women: "Li Na 🇨🇳" },
      { year: 2013, men: "N. Djokovic 🇷🇸", women: "V. Azarenka 🇧🇾" },
      { year: 2012, men: "N. Djokovic 🇷🇸", women: "V. Azarenka 🇧🇾" },
      { year: 2011, men: "N. Djokovic 🇷🇸", women: "K. Clijsters 🇧🇪" },
      { year: 2010, men: "R. Federer 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2009, men: "R. Nadal 🇪🇸", women: "S. Williams 🇺🇸" },
      { year: 2008, men: "N. Djokovic 🇷🇸", women: "M. Sharapova 🇷🇺" },
      { year: 2007, men: "R. Federer 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2006, men: "R. Federer 🇨🇭", women: "A. Mauresmo 🇫🇷" },
      { year: 2005, men: "M. Safin 🇷🇺", women: "S. Williams 🇺🇸" },
      { year: 2004, men: "R. Federer 🇨🇭", women: "J. Henin 🇧🇪" },
      { year: 2003, men: "A. Agassi 🇺🇸", women: "S. Williams 🇺🇸" },
      { year: 2002, men: "T. Johansson 🇸🇪", women: "J. Capriati 🇺🇸" },
      { year: 2001, men: "A. Agassi 🇺🇸", women: "J. Capriati 🇺🇸" },
      { year: 2000, men: "A. Agassi 🇺🇸", women: "L. Davenport 🇺🇸" },
      { year: 1999, men: "Y. Kafelnikov 🇷🇺", women: "M. Hingis 🇨🇭" },
      { year: 1998, men: "P. Korda 🇨🇿", women: "M. Hingis 🇨🇭" },
      { year: 1997, men: "P. Sampras 🇺🇸", women: "M. Hingis 🇨🇭" },
      { year: 1996, men: "B. Becker 🇩🇪", women: "M. Seles 🇺🇸" },
      { year: 1995, men: "A. Agassi 🇺🇸", women: "M. Pierce 🇫🇷" },
      { year: 1994, men: "P. Sampras 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1993, men: "J. Courier 🇺🇸", women: "M. Seles 🇺🇸" },
      { year: 1992, men: "J. Courier 🇺🇸", women: "M. Seles 🇺🇸" },
      { year: 1991, men: "B. Becker 🇩🇪", women: "M. Seles 🇺🇸" },
      { year: 1990, men: "I. Lendl 🇨🇿", women: "S. Graf 🇩🇪" },
      { year: 1989, men: "I. Lendl 🇨🇿", women: "S. Graf 🇩🇪" },
      { year: 1988, men: "M. Wilander 🇸🇪", women: "S. Graf 🇩🇪" },
      { year: 1987, men: "S. Edberg 🇸🇪", women: "H. Mandlikova 🇨🇿" },
      { year: 1985, men: "S. Edberg 🇸🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1984, men: "M. Wilander 🇸🇪", women: "C. Evert 🇺🇸" },
      { year: 1983, men: "M. Wilander 🇸🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1982, men: "J. Kriek 🇿🇦", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1981, men: "J. Kriek 🇿🇦", women: "M. Navratilova 🇺🇸" },
      { year: 1980, men: "B. Teacher 🇺🇸", women: "H. Mandlikova 🇨🇿" },
      { year: 1979, men: "G. Vilas 🇦🇷", women: "B. Jordan 🇺🇸" },
      { year: 1978, men: "G. Vilas 🇦🇷", women: "C. O'Neil 🇦🇺" },
      { year: "1977 (Dec)", men: "V. Gerulaitis 🇺🇸", women: "E. Goolagong 🇦🇺" },
      { year: "1977 (Jan)", men: "R. Tanner 🇺🇸", women: "K.M. Reid 🇦🇺" },
      { year: 1976, men: "M. Edmondson 🇦🇺", women: "E. Goolagong 🇦🇺" },
      { year: 1975, men: "J. Newcombe 🇦🇺", women: "E. Goolagong 🇦🇺" },
      { year: 1974, men: "J. Connors 🇺🇸", women: "E. Goolagong 🇦🇺" },
      { year: 1973, men: "J. Newcombe 🇦🇺", women: "M. Court 🇦🇺" },
      { year: 1972, men: "K. Rosewall 🇦🇺", women: "V. Wade 🇬🇧" },
      { year: 1971, men: "K. Rosewall 🇦🇺", women: "M. Court 🇦🇺" },
      { year: 1970, men: "A. Ashe 🇺🇸", women: "M. Court 🇦🇺" },
      { year: 1969, men: "R. Laver 🇦🇺", women: "M. Court 🇦🇺" },
    ]
  },
  rg: {
    name: "🏆 Roland Garros — All Champions",
    years: [
      { year: 2025, men: "C. Alcaraz 🇪🇸", women: "C. Gauff 🇺🇸" },
      { year: 2024, men: "C. Alcaraz 🇪🇸", women: "I. Swiatek 🇵🇱" },
      { year: 2023, men: "N. Djokovic 🇷🇸", women: "I. Swiatek 🇵🇱" },
      { year: 2022, men: "R. Nadal 🇪🇸", women: "I. Swiatek 🇵🇱" },
      { year: 2021, men: "N. Djokovic 🇷🇸", women: "B. Krejcikova 🇨🇿" },
      { year: 2020, men: "R. Nadal 🇪🇸", women: "I. Swiatek 🇵🇱" },
      { year: 2019, men: "R. Nadal 🇪🇸", women: "A. Barty 🇦🇺" },
      { year: 2018, men: "R. Nadal 🇪🇸", women: "S. Halep 🇷🇴" },
      { year: 2017, men: "R. Nadal 🇪🇸", women: "J. Ostapenko 🇱🇻" },
      { year: 2016, men: "N. Djokovic 🇷🇸", women: "G. Muguruza 🇪🇸" },
      { year: 2015, men: "S. Wawrinka 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2014, men: "R. Nadal 🇪🇸", women: "M. Sharapova 🇷🇺" },
      { year: 2013, men: "R. Nadal 🇪🇸", women: "S. Williams 🇺🇸" },
      { year: 2012, men: "R. Nadal 🇪🇸", women: "M. Sharapova 🇷🇺" },
      { year: 2011, men: "R. Nadal 🇪🇸", women: "Li Na 🇨🇳" },
      { year: 2010, men: "R. Nadal 🇪🇸", women: "F. Schiavone 🇮🇹" },
      { year: 2009, men: "R. Federer 🇨🇭", women: "S. Kuznetsova 🇷🇺" },
      { year: 2008, men: "R. Nadal 🇪🇸", women: "A. Ivanovic 🇷🇸" },
      { year: 2007, men: "R. Nadal 🇪🇸", women: "J. Henin 🇧🇪" },
      { year: 2006, men: "R. Nadal 🇪🇸", women: "J. Henin 🇧🇪" },
      { year: 2005, men: "R. Nadal 🇪🇸", women: "J. Henin 🇧🇪" },
      { year: 2004, men: "G. Gaudio 🇦🇷", women: "A. Myskina 🇷🇺" },
      { year: 2003, men: "J.C. Ferrero 🇪🇸", women: "J. Henin 🇧🇪" },
      { year: 2002, men: "A. Costa 🇪🇸", women: "S. Williams 🇺🇸" },
      { year: 2001, men: "G. Kuerten 🇧🇷", women: "J. Capriati 🇺🇸" },
      { year: 2000, men: "G. Kuerten 🇧🇷", women: "M. Pierce 🇫🇷" },
      { year: 1999, men: "A. Agassi 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1998, men: "C. Moya 🇪🇸", women: "A. Sanchez 🇪🇸" },
      { year: 1997, men: "G. Bruguera 🇪🇸", women: "I. Majoli 🇭🇷" },
      { year: 1996, men: "Y. Kafelnikov 🇷🇺", women: "S. Graf 🇩🇪" },
      { year: 1995, men: "T. Muster 🇦🇹", women: "S. Graf 🇩🇪" },
      { year: 1994, men: "G. Bruguera 🇪🇸", women: "A. Sanchez 🇪🇸" },
      { year: 1993, men: "G. Bruguera 🇪🇸", women: "S. Graf 🇩🇪" },
      { year: 1992, men: "J. Courier 🇺🇸", women: "M. Seles 🇺🇸" },
      { year: 1991, men: "J. Courier 🇺🇸", women: "M. Seles 🇺🇸" },
      { year: 1990, men: "A. Gomez 🇪🇨", women: "M. Seles 🇺🇸" },
      { year: 1989, men: "M. Chang 🇺🇸", women: "A. Sanchez 🇪🇸" },
      { year: 1988, men: "M. Wilander 🇸🇪", women: "S. Graf 🇩🇪" },
      { year: 1987, men: "I. Lendl 🇨🇿", women: "S. Graf 🇩🇪" },
      { year: 1986, men: "I. Lendl 🇨🇿", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1985, men: "M. Wilander 🇸🇪", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1984, men: "I. Lendl 🇨🇿", women: "M. Navratilova 🇺🇸" },
      { year: 1983, men: "Y. Noah 🇫🇷", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1982, men: "M. Wilander 🇸🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1981, men: "B. Borg 🇸🇪", women: "H. Mandlikova 🇨🇿" },
      { year: 1980, men: "B. Borg 🇸🇪", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1979, men: "B. Borg 🇸🇪", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1978, men: "B. Borg 🇸🇪", women: "V. Ruzici 🇷🇴" },
      { year: 1977, men: "G. Vilas 🇦🇷", women: "M. Jausovec 🇾🇺" },
      { year: 1976, men: "A. Panatta 🇮🇹", women: "S. Barker 🇬🇧" },
      { year: 1975, men: "B. Borg 🇸🇪", women: "C. Evert 🇺🇸" },
      { year: 1974, men: "B. Borg 🇸🇪", women: "C. Evert 🇺🇸" },
      { year: 1973, men: "I. Nastase 🇷🇴", women: "M. Court 🇦🇺" },
      { year: 1972, men: "A. Gimeno 🇪🇸", women: "B.J. King 🇺🇸" },
      { year: 1971, men: "J. Kodes 🇨🇿", women: "E. Goolagong 🇦🇺" },
      { year: 1970, men: "J. Kodes 🇨🇿", women: "M. Court 🇦🇺" },
      { year: 1969, men: "R. Laver 🇦🇺", women: "A.H. Jones 🇬🇧" },
      { year: 1968, men: "K. Rosewall 🇦🇺", women: "N. Richey 🇺🇸" },
    ]
  },
  w: {
    name: "🏆 Wimbledon — All Champions",
    years: [
      { year: 2025, men: "J. Sinner 🇮🇹", women: "I. Swiatek 🇵🇱" },
      { year: 2024, men: "C. Alcaraz 🇪🇸", women: "B. Krejcikova 🇨🇿" },
      { year: 2023, men: "C. Alcaraz 🇪🇸", women: "M. Vondrousova 🇨🇿" },
      { year: 2022, men: "N. Djokovic 🇷🇸", women: "E. Rybakina 🇰🇿" },
      { year: 2021, men: "N. Djokovic 🇷🇸", women: "A. Barty 🇦🇺" },
      { year: 2020, men: "Not held (COVID-19)", women: "—" },
      { year: 2019, men: "N. Djokovic 🇷🇸", women: "S. Halep 🇷🇴" },
      { year: 2018, men: "N. Djokovic 🇷🇸", women: "A. Kerber 🇩🇪" },
      { year: 2017, men: "R. Federer 🇨🇭", women: "G. Muguruza 🇪🇸" },
      { year: 2016, men: "A. Murray 🇬🇧", women: "S. Williams 🇺🇸" },
      { year: 2015, men: "N. Djokovic 🇷🇸", women: "S. Williams 🇺🇸" },
      { year: 2014, men: "N. Djokovic 🇷🇸", women: "P. Kvitova 🇨🇿" },
      { year: 2013, men: "A. Murray 🇬🇧", women: "M. Bartoli 🇫🇷" },
      { year: 2012, men: "R. Federer 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2011, men: "N. Djokovic 🇷🇸", women: "P. Kvitova 🇨🇿" },
      { year: 2010, men: "R. Nadal 🇪🇸", women: "S. Williams 🇺🇸" },
      { year: 2009, men: "R. Federer 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2008, men: "R. Nadal 🇪🇸", women: "V. Williams 🇺🇸" },
      { year: 2007, men: "R. Federer 🇨🇭", women: "V. Williams 🇺🇸" },
      { year: 2006, men: "R. Federer 🇨🇭", women: "A. Mauresmo 🇫🇷" },
      { year: 2005, men: "R. Federer 🇨🇭", women: "V. Williams 🇺🇸" },
      { year: 2004, men: "R. Federer 🇨🇭", women: "M. Sharapova 🇷🇺" },
      { year: 2003, men: "R. Federer 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2002, men: "L. Hewitt 🇦🇺", women: "S. Williams 🇺🇸" },
      { year: 2001, men: "G. Ivanisevic 🇭🇷", women: "V. Williams 🇺🇸" },
      { year: 2000, men: "P. Sampras 🇺🇸", women: "V. Williams 🇺🇸" },
      { year: 1999, men: "P. Sampras 🇺🇸", women: "L. Davenport 🇺🇸" },
      { year: 1998, men: "P. Sampras 🇺🇸", women: "J. Novotna 🇨🇿" },
      { year: 1997, men: "P. Sampras 🇺🇸", women: "M. Hingis 🇨🇭" },
      { year: 1996, men: "R. Krajicek 🇳🇱", women: "S. Graf 🇩🇪" },
      { year: 1995, men: "P. Sampras 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1994, men: "P. Sampras 🇺🇸", women: "C. Martinez 🇪🇸" },
      { year: 1993, men: "P. Sampras 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1992, men: "A. Agassi 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1991, men: "M. Stich 🇩🇪", women: "S. Graf 🇩🇪" },
      { year: 1990, men: "S. Edberg 🇸🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1989, men: "B. Becker 🇩🇪", women: "S. Graf 🇩🇪" },
      { year: 1988, men: "S. Edberg 🇸🇪", women: "S. Graf 🇩🇪" },
      { year: 1987, men: "P. Cash 🇦🇺", women: "M. Navratilova 🇺🇸" },
      { year: 1986, men: "B. Becker 🇩🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1985, men: "B. Becker 🇩🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1984, men: "J. McEnroe 🇺🇸", women: "M. Navratilova 🇺🇸" },
      { year: 1983, men: "J. McEnroe 🇺🇸", women: "M. Navratilova 🇺🇸" },
      { year: 1982, men: "J. Connors 🇺🇸", women: "M. Navratilova 🇺🇸" },
      { year: 1981, men: "J. McEnroe 🇺🇸", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1980, men: "B. Borg 🇸🇪", women: "E. Goolagong 🇦🇺" },
      { year: 1979, men: "B. Borg 🇸🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1978, men: "B. Borg 🇸🇪", women: "M. Navratilova 🇺🇸" },
      { year: 1977, men: "B. Borg 🇸🇪", women: "V. Wade 🇬🇧" },
      { year: 1976, men: "B. Borg 🇸🇪", women: "C. Evert 🇺🇸" },
      { year: 1975, men: "A. Ashe 🇺🇸", women: "B.J. King 🇺🇸" },
      { year: 1974, men: "J. Connors 🇺🇸", women: "C. Evert 🇺🇸" },
      { year: 1973, men: "J. Kodes 🇨🇿", women: "B.J. King 🇺🇸" },
      { year: 1972, men: "S. Smith 🇺🇸", women: "B.J. King 🇺🇸" },
      { year: 1971, men: "J. Newcombe 🇦🇺", women: "E. Goolagong 🇦🇺" },
      { year: 1970, men: "J. Newcombe 🇦🇺", women: "M. Court 🇦🇺" },
      { year: 1969, men: "R. Laver 🇦🇺", women: "A.H. Jones 🇬🇧" },
      { year: 1968, men: "R. Laver 🇦🇺", women: "B.J. King 🇺🇸" },
    ]
  },
  uso: {
    name: "🏆 US Open — All Champions",
    years: [
      { year: 2025, men: "—", women: "A. Sabalenka 🇧🇾" },
      { year: 2024, men: "J. Sinner 🇮🇹", women: "A. Sabalenka 🇧🇾" },
      { year: 2023, men: "N. Djokovic 🇷🇸", women: "C. Gauff 🇺🇸" },
      { year: 2022, men: "C. Alcaraz 🇪🇸", women: "I. Swiatek 🇵🇱" },
      { year: 2021, men: "D. Medvedev 🇷🇺", women: "E. Raducanu 🇬🇧" },
      { year: 2020, men: "D. Thiem 🇦🇹", women: "N. Osaka 🇯🇵" },
      { year: 2019, men: "R. Nadal 🇪🇸", women: "B. Andreescu 🇨🇦" },
      { year: 2018, men: "N. Djokovic 🇷🇸", women: "N. Osaka 🇯🇵" },
      { year: 2017, men: "R. Nadal 🇪🇸", women: "S. Stephens 🇺🇸" },
      { year: 2016, men: "S. Wawrinka 🇨🇭", women: "A. Kerber 🇩🇪" },
      { year: 2015, men: "N. Djokovic 🇷🇸", women: "F. Pennetta 🇮🇹" },
      { year: 2014, men: "M. Cilic 🇭🇷", women: "S. Williams 🇺🇸" },
      { year: 2013, men: "R. Nadal 🇪🇸", women: "S. Williams 🇺🇸" },
      { year: 2012, men: "A. Murray 🇬🇧", women: "S. Williams 🇺🇸" },
      { year: 2011, men: "N. Djokovic 🇷🇸", women: "S. Stosur 🇦🇺" },
      { year: 2010, men: "R. Nadal 🇪🇸", women: "K. Clijsters 🇧🇪" },
      { year: 2009, men: "J.M. del Potro 🇦🇷", women: "K. Clijsters 🇧🇪" },
      { year: 2008, men: "R. Federer 🇨🇭", women: "S. Williams 🇺🇸" },
      { year: 2007, men: "R. Federer 🇨🇭", women: "J. Henin 🇧🇪" },
      { year: 2006, men: "R. Federer 🇨🇭", women: "M. Sharapova 🇷🇺" },
      { year: 2005, men: "R. Federer 🇨🇭", women: "K. Clijsters 🇧🇪" },
      { year: 2004, men: "R. Federer 🇨🇭", women: "S. Kuznetsova 🇷🇺" },
      { year: 2003, men: "A. Roddick 🇺🇸", women: "J. Henin 🇧🇪" },
      { year: 2002, men: "P. Sampras 🇺🇸", women: "S. Williams 🇺🇸" },
      { year: 2001, men: "L. Hewitt 🇦🇺", women: "V. Williams 🇺🇸" },
      { year: 2000, men: "M. Safin 🇷🇺", women: "V. Williams 🇺🇸" },
      { year: 1999, men: "A. Agassi 🇺🇸", women: "S. Williams 🇺🇸" },
      { year: 1998, men: "P. Rafter 🇦🇺", women: "L. Davenport 🇺🇸" },
      { year: 1997, men: "P. Rafter 🇦🇺", women: "M. Hingis 🇨🇭" },
      { year: 1996, men: "P. Sampras 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1995, men: "P. Sampras 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1994, men: "A. Agassi 🇺🇸", women: "A. Sanchez 🇪🇸" },
      { year: 1993, men: "P. Sampras 🇺🇸", women: "S. Graf 🇩🇪" },
      { year: 1992, men: "S. Edberg 🇸🇪", women: "M. Seles 🇺🇸" },
      { year: 1991, men: "S. Edberg 🇸🇪", women: "M. Seles 🇺🇸" },
      { year: 1990, men: "P. Sampras 🇺🇸", women: "G. Sabatini 🇦🇷" },
      { year: 1989, men: "B. Becker 🇩🇪", women: "S. Graf 🇩🇪" },
      { year: 1988, men: "M. Wilander 🇸🇪", women: "S. Graf 🇩🇪" },
      { year: 1987, men: "I. Lendl 🇨🇿", women: "M. Navratilova 🇺🇸" },
      { year: 1986, men: "I. Lendl 🇨🇿", women: "M. Navratilova 🇺🇸" },
      { year: 1985, men: "I. Lendl 🇨🇿", women: "H. Mandlikova 🇨🇿" },
      { year: 1984, men: "J. McEnroe 🇺🇸", women: "M. Navratilova 🇺🇸" },
      { year: 1983, men: "J. Connors 🇺🇸", women: "M. Navratilova 🇺🇸" },
      { year: 1982, men: "J. Connors 🇺🇸", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1981, men: "J. McEnroe 🇺🇸", women: "T. Austin 🇺🇸" },
      { year: 1980, men: "J. McEnroe 🇺🇸", women: "C. Evert Lloyd 🇺🇸" },
      { year: 1979, men: "J. McEnroe 🇺🇸", women: "T. Austin 🇺🇸" },
      { year: 1978, men: "J. Connors 🇺🇸", women: "C. Evert 🇺🇸" },
      { year: 1977, men: "G. Vilas 🇦🇷", women: "C. Evert 🇺🇸" },
      { year: 1976, men: "J. Connors 🇺🇸", women: "C. Evert 🇺🇸" },
      { year: 1975, men: "M. Orantes 🇪🇸", women: "C. Evert 🇺🇸" },
      { year: 1974, men: "J. Connors 🇺🇸", women: "B.J. King 🇺🇸" },
      { year: 1973, men: "J. Newcombe 🇦🇺", women: "M. Court 🇦🇺" },
      { year: 1972, men: "I. Nastase 🇷🇴", women: "B.J. King 🇺🇸" },
      { year: 1971, men: "S. Smith 🇺🇸", women: "B.J. King 🇺🇸" },
      { year: 1970, men: "K. Rosewall 🇦🇺", women: "M. Court 🇦🇺" },
      { year: 1969, men: "R. Laver 🇦🇺", women: "M. Court 🇦🇺" },
      { year: 1968, men: "A. Ashe 🇺🇸", women: "V. Wade 🇬🇧" },
    ]
  }
};

const champModal       = document.getElementById('champModal');
const champModalTitle  = document.getElementById('champModalTitle');
const champTableBody   = document.getElementById('champTableBody');
const champModalClose  = document.getElementById('champModalClose');

document.querySelectorAll('.champions-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const slam = btn.dataset.slam;
    const data = championsData[slam];
    champModalTitle.textContent = data.name;
    champTableBody.innerHTML = data.years.map(r => `
      <tr>
        <td>${r.year}</td>
        <td>${r.men}</td>
        <td>${r.women}</td>
      </tr>`).join('');
    champModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeChampModal() {
  champModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (champModalClose) champModalClose.addEventListener('click', closeChampModal);
if (champModal) {
  champModal.addEventListener('click', e => {
    if (e.target === champModal) closeChampModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeChampModal();
  });
}

// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
