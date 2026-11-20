(function () {
  'use strict';

  var GRID_ID = 'tmdb-movie-grid';
  var JSON_PATH = '/_data/tmdbList.json'; // 根据你的实际路径调整
  var IMG_BASE = 'https://image.tmdb.org/t/p/w500';

  function createCard(movie) {
    var card = document.createElement('div');
    card.className = 'tmdb-movie-card';

    var posterPath = movie.poster || '';
    var imgSrc = posterPath
      ? IMG_BASE + posterPath
      : '/img/placeholder-poster.png'; // 准备一张本地占位图

    var title = movie.title || movie.name || '未知标题';
    var rating =
      typeof movie.vote_average === 'number'
        ? movie.vote_average.toFixed(1)
        : 'N/A';
    var year = (movie.release_date || '').slice(0, 4);
    var genres = Array.isArray(movie.genres)
      ? movie.genres.map(function (g) { return typeof g === 'string' ? g : g.name; }).join(' ')
      : '';

    card.innerHTML =
      '<img src="' + imgSrc + '" alt="' + escapeHtml(title) + '" loading="lazy">' +
      '<div class="tmdb-movie-info">' +
        '<h3>' + escapeHtml(title) + '</h3>' +
        '<div class="tmdb-movie-meta">' +
          '<span class="tmdb-movie-rating">★ ' + rating + '</span>' +
          (year ? '<span>' + year + '</span>' : '') +
          (genres ? '<span class="tmdb-movie-genres">' + escapeHtml(genres) + '</span>' : '') +
        '</div>' +
      '</div>';

    img.onerror = function () {
      this.src = '/img/placeholder-poster.png';
      this.onerror = null; // 防止死循环
    };

    return card;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function render(data) {
    var grid = document.getElementById(GRID_ID);
    if (!grid) return;

    // 如果 JSON 是 { results: [...] } 结构，做兼容处理
    var movies = Array.isArray(data) ? data : (data.results || []);

    if (!movies.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:.6;">暂无电影数据</p>';
      return;
    }

    var fragment = document.createDocumentFragment();
    movies.forEach(function (movie) {
      fragment.appendChild(createCard(movie));
    });
    grid.appendChild(fragment);
  }

  function init() {
    var grid = document.getElementById(GRID_ID);
    if (!grid) return; // 非电影页面，静默退出

    fetch(JSON_PATH)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(render)
      .catch(function (err) {
        console.error('[TMDB Gallery] 加载数据失败:', err);
        grid.innerHTML =
          '<p style="grid-column:1/-1;text-align:center;opacity:.6;">数据加载失败，请检查 JSON 路径。</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();