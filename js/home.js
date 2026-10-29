/* Home: busca client-side + filtro de idioma + paginação.
   Progressive enhancement: sem JS, todos os posts aparecem normalmente. */
(function () {
  'use strict';

  const PAGE_SIZE = 10;

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const postsList = document.getElementById('posts-list');
  const pagination = document.getElementById('pagination');
  const pageStatus = document.getElementById('page-status');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const noResults = document.getElementById('no-results');
  const langButtons = document.querySelectorAll('.lang-btn');

  if (!postsList) { return; }

  const allPosts = Array.prototype.slice.call(postsList.querySelectorAll('.post'));
  let currentLang = 'all';
  let currentPage = 1;

  // Pré-seleciona o idioma via ?lang=pt|en (usado pelos atalhos do menu)
  const params = new URLSearchParams(window.location.search);
  const initialLang = params.get('lang');
  if (initialLang === 'pt' || initialLang === 'en') {
    currentLang = initialLang;
  }

  function visiblePosts() {
    return allPosts.filter(function (el) {
      return currentLang === 'all' || el.getAttribute('data-lang') === currentLang;
    });
  }

  function renderPage() {
    // Esconde tudo primeiro
    allPosts.forEach(function (el) { el.style.display = 'none'; });

    const posts = visiblePosts();
    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    if (currentPage > totalPages) { currentPage = totalPages; }

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    posts.slice(start, end).forEach(function (el) { el.style.display = ''; });

    if (posts.length === 0) {
      noResults.hidden = false;
      pagination.hidden = true;
      return;
    }
    noResults.hidden = true;

    if (totalPages > 1) {
      pagination.hidden = false;
      pageStatus.textContent = 'Página ' + currentPage + ' de ' + totalPages;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    } else {
      pagination.hidden = true;
    }
  }

  function showList() {
    searchResults.hidden = true;
    searchResults.innerHTML = '';
    postsList.hidden = false;
    renderPage();
  }

  function showSearch() {
    postsList.hidden = true;
    pagination.hidden = true;
    searchResults.hidden = false;
  }

  // ----- Filtro de idioma -----
  function setActiveButton(activeBtn) {
    langButtons.forEach(function (b) {
      const isActive = b === activeBtn;
      b.classList.toggle('is-active', isActive);
      b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setActiveButton(btn);
      currentLang = btn.getAttribute('data-lang');
      currentPage = 1;
      if (searchInput.value.trim() === '') {
        showList();
      } else {
        runSearch(searchInput.value);
      }
    });
  });

  // ----- Paginação -----
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) { currentPage--; renderPage(); window.scrollTo(0, 0); }
  });
  nextBtn.addEventListener('click', function () {
    currentPage++; renderPage(); window.scrollTo(0, 0);
  });

  // ----- Busca -----
  let searchData = [];
  let searchReady = false;

  function langMatches(item) {
    return currentLang === 'all' || item.lang === currentLang;
  }

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (q === '') { showList(); return; }

    showSearch();
    const matches = searchData.filter(function (item) {
      if (!langMatches(item)) { return false; }
      const haystack = (
        item.title + ' ' +
        item.tags + ' ' +
        item.category + ' ' +
        item.excerpt + ' ' +
        (item.content || '')
      ).toLowerCase();
      return haystack.indexOf(q) !== -1;
    });

    if (matches.length === 0) {
      searchResults.innerHTML = '';
      noResults.hidden = false;
      return;
    }
    noResults.hidden = true;

    searchResults.textContent = '';
    matches.forEach(function (item) {
      const article = document.createElement('article');
      article.className = 'post';

      const h2 = document.createElement('h2');

      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      h2.appendChild(a);

      h2.appendChild(document.createTextNode(' '));

      const span = document.createElement('span');
      span.className = 'lang-tag';
      span.textContent = String(item.lang || '').toUpperCase();
      h2.appendChild(span);

      article.appendChild(h2);

      const div = document.createElement('div');
      div.className = 'entry';

      const p = document.createElement('p');
      p.textContent = item.excerpt;
      div.appendChild(p);

      article.appendChild(div);
      searchResults.appendChild(article);
    });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Carrega o índice de busca sob demanda (no primeiro foco/typing)
  function loadSearchData() {
    if (searchReady) { return Promise.resolve(); }
    const searchUrl = (postsList.getAttribute('data-search-url')) ||
      (document.body.getAttribute('data-baseurl') || '') + '/search.json';
    return fetch(searchUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) { searchData = data; searchReady = true; });
  }

  searchInput.addEventListener('input', function () {
    const value = searchInput.value;
    // Se o índice falhar ao carregar, cai no filtro sobre a lista já renderizada.
    loadSearchData()
      .then(function () { runSearch(value); })
      .catch(function () { showList(); });
  });
  searchInput.addEventListener('focus', function () {
    loadSearchData().catch(function () { /* silencioso: busca indisponível */ });
  });

  // Sincroniza o botão ativo com o idioma inicial (?lang=)
  langButtons.forEach(function (b) {
    if (b.getAttribute('data-lang') === currentLang) { setActiveButton(b); }
  });

  // Estado inicial
  showList();
})();
