/* Home: busca client-side + filtro de idioma + paginação.
   Progressive enhancement: sem JS, todos os posts aparecem normalmente. */
(function () {
  'use strict';

  var PAGE_SIZE = 10;

  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var postsList = document.getElementById('posts-list');
  var pagination = document.getElementById('pagination');
  var pageStatus = document.getElementById('page-status');
  var prevBtn = document.getElementById('prev-page');
  var nextBtn = document.getElementById('next-page');
  var noResults = document.getElementById('no-results');
  var langButtons = document.querySelectorAll('.lang-btn');

  if (!postsList) { return; }

  var allPosts = Array.prototype.slice.call(postsList.querySelectorAll('.post'));
  var currentLang = 'all';
  var currentPage = 1;

  // Pré-seleciona o idioma via ?lang=pt|en (usado pelos atalhos do menu)
  var params = new URLSearchParams(window.location.search);
  var initialLang = params.get('lang');
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

    var posts = visiblePosts();
    var totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    if (currentPage > totalPages) { currentPage = totalPages; }

    var start = (currentPage - 1) * PAGE_SIZE;
    var end = start + PAGE_SIZE;
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
      var isActive = b === activeBtn;
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
  var searchData = [];
  var searchReady = false;

  function langMatches(item) {
    return currentLang === 'all' || item.lang === currentLang;
  }

  function runSearch(query) {
    var q = query.trim().toLowerCase();
    if (q === '') { showList(); return; }

    showSearch();
    var matches = searchData.filter(function (item) {
      if (!langMatches(item)) { return false; }
      var haystack = (item.title + ' ' + item.tags + ' ' + item.category + ' ' + item.excerpt).toLowerCase();
      return haystack.indexOf(q) !== -1;
    });

    if (matches.length === 0) {
      searchResults.innerHTML = '';
      noResults.hidden = false;
      return;
    }
    noResults.hidden = true;

    searchResults.innerHTML = matches.map(function (item) {
      return '<article class="post">' +
        '<h2><a href="' + item.url + '">' + escapeHtml(item.title) + '</a> ' +
        '<span class="lang-tag">' + item.lang.toUpperCase() + '</span></h2>' +
        '<div class="entry"><p>' + escapeHtml(item.excerpt) + '</p></div>' +
        '</article>';
    }).join('');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Carrega o índice de busca sob demanda (no primeiro foco/typing)
  function loadSearchData() {
    if (searchReady) { return Promise.resolve(); }
    var searchUrl = (postsList.getAttribute('data-search-url')) ||
      (document.body.getAttribute('data-baseurl') || '') + '/search.json';
    return fetch(searchUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) { searchData = data; searchReady = true; });
  }

  searchInput.addEventListener('input', function () {
    var value = searchInput.value;
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
