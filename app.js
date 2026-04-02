// ─────────────────────────────────────────────────────────────
//  app.js  —  State, routing, sidebar, and page renderers
//  Depends on: data.js (LIBS, COLLS)
// ─────────────────────────────────────────────────────────────


// ── STATE ─────────────────────────────────────────────────────

let PAGE  = 'home';   // current page key
let LIB   = 'all';   // active library filter
let COLL  = null;    // active collection id
let _SH   = '';      // cached search results HTML

// Detect current page from URL
function _detectPage() {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  
  if (path.includes('libraries.html')) {
    PAGE = 'libraries';
  } else if (path.includes('collections.html')) {
    PAGE = 'collections';
  } else if (path.includes('collection.html')) {
    PAGE = 'coll';
    COLL = params.get('id');
  } else if (path.includes('lists.html')) {
    PAGE = 'lists';
  } else {
    PAGE = 'home';
    // Check for library filter
    const libParam = params.get('lib');
    if (libParam) {
      LIB = libParam;
    }
  }
}


// ── NAV HELPERS ───────────────────────────────────────────────

/** Navigate to a named page (home | libraries | collections | lists). */
function gp(p) {
  if (p === 'home') window.location.href = 'index.html';
  else if (p === 'libraries') window.location.href = 'libraries.html';
  else if (p === 'collections') window.location.href = 'collections.html';
  else if (p === 'lists') window.location.href = 'lists.html';
}

/** Filter the home page by a library id. */
function gl(id) {
  // If we're not on home page, go to home page with filter
  if (PAGE !== 'home') {
    window.location.href = `index.html?lib=${encodeURIComponent(id)}`;
  } else {
    LIB = id;
    renderSidebar();
    renderContent();
  }
}

/** Open a collection detail view. */
function gc(id) {
  window.location.href = `collection.html?id=${encodeURIComponent(id)}`;
}

/** Highlight the correct top-nav button. */
function _setActiveNav(page) {
  ['home', 'libraries', 'collections', 'lists'].forEach(x => {
    const el = document.getElementById('nb-' + x);
    if (el) el.classList.toggle('on', x === page);
  });
}


// ── SIDEBAR ───────────────────────────────────────────────────

function renderSidebar() {
  const totalEntries = Object.keys(COLLS).length;
  const sb = document.getElementById('sb');
  if (!sb) return;
  
  let h = '';

  // Library filter buttons
  h += '<span class="sbl">Libraries</span>';
  h += _sidebarBtn(
    `gl('all')`,
    '📁', 'All Libraries', totalEntries,
    LIB === 'all' && PAGE === 'home'
  );

  LIBS.forEach(lib => {
    const count = lib.colls.reduce((sum, id) => sum + (COLLS[id]?.sites.length ?? 0), 0);
    h += _sidebarBtn(
      `gl('${lib.id}')`,
      lib.ico, lib.name, count,
      LIB === lib.id && PAGE === 'home'
    );
  });

  h += '<div class="sb-sep"></div>';

  // Browse links
  h += '<span class="sbl">Browse</span>';
  h += _sidebarBtn(`gp('libraries')`,   '', 'All Libraries',   '', PAGE === 'libraries');
  h += _sidebarBtn(`gp('collections')`, '', 'All Collections', '', PAGE === 'collections');
  h += _sidebarBtn(`gp('lists')`,       '', 'User Lists',      '', PAGE === 'lists');

  sb.innerHTML = h;
  
  // Add click event listeners
  sb.querySelectorAll('.sbi').forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      if (action) eval(action);
    });
  });
}

/** Build one sidebar button element string. */
function _sidebarBtn(onclick, ico, label, count, active) {
  const countBadge = count !== '' ? `<span class="sbn">${count}</span>` : '';
  const icoSpan    = ico ? `<span class="sbi-ico">${ico}</span>` : '';
  return `<button class="sbi${active ? ' on' : ''}" data-action="${onclick.replace(/"/g, '&quot;')}">
    <span class="sbd"></span>${icoSpan}${label}${countBadge}
  </button>`;
}


// ── CONTENT ROUTER ────────────────────────────────────────────

function renderContent() {
  const ct = document.getElementById('ct');

  switch (PAGE) {
    case 'home':        ct.innerHTML = renderHome();         break;
    case 'libraries':   ct.innerHTML = renderLibraries();    break;
    case 'collections': ct.innerHTML = renderAllCollections(); break;
    case 'lists':       ct.innerHTML = renderLists();        break;
    case 'coll':        ct.innerHTML = renderCollection(COLL); break;
    case 'search':      ct.innerHTML = _SH;                  break;
    default:            ct.innerHTML = renderHome();
  }

  ct.scrollTop = 0;
}


// ── HOME ──────────────────────────────────────────────────────

function renderHome() {
  const filteredLibs = LIB === 'all' ? LIBS : LIBS.filter(l => l.id === LIB);

  const totalColls   = Object.keys(COLLS).length;
  const totalEntries = Object.values(COLLS).reduce((s, c) => s + c.sites.length, 0);

  let h = `
    <div class="hero">
      <div class="hero-ico"> <img src="images/Pink rodamrix.jpeg" alt="Pink rodamrix" width="50" height="50" /> </div>
      <div>
        <div class="hero-title">Pirated Lib</div>
        <div class="hero-desc">
          A curated index listing and comparing all types of websites, applications,
          and services for consuming Japanese media. Browse by library, collection,
          or search for something specific.
        </div>
        <div class="hero-meta">
          <span class="hero-st">📁 ${totalColls} collections</span>
          <span class="hero-st">🔗 ${totalEntries}+ entries</span>
          <span class="hero-st">📅 Community maintained</span>
        </div>
      </div>
    </div>`;

  filteredLibs.forEach(lib => {
    const colls = lib.colls.map(id => ({ id, c: COLLS[id] })).filter(x => x.c);

    h += `
      <div class="sh">
        <div>
          <div class="sh-t">${lib.ico} ${lib.name}</div>
          <div class="sh-s">${lib.desc}</div>
        </div>
        <button class="sh-lnk" onclick="gl('${lib.id}')">View all →</button>
      </div>
      <div class="cg">`;

    colls.forEach(({ id, c }) => {
      const previewTags = c.sites.slice(0, 3).map(s => `<span class="tag">${s.n}</span>`).join('');
      const moreBadge   = c.sites.length > 3 ? `<span class="tag">+${c.sites.length - 3}</span>` : '';
      
      // Extract image src from c.ico HTML
      const imgMatch = c.ico.match(/src="([^"]+)"/);
      const imgSrc = imgMatch ? imgMatch[1] : '';

      h += `
        <a class="cc" onclick="gc('${id}')">
          <div class="cc-img-wrap">
            <img class="cc-img" src="${imgSrc}" alt="${c.name}" onerror="this.style.display='none'">
            <div class="cc-overlay"></div>
          </div>
          <div class="cc-body">
            <div class="cc-h">
              <div class="cc-ico">${c.ico}</div>
              <div>
                <div class="cc-n">${c.name}</div>
                <div class="cc-c">${c.sites.length} entries</div>
              </div>
            </div>
            <div class="cc-d">${c.desc}</div>
            <div class="tags">${previewTags}${moreBadge}</div>
          </div>
        </a>`;
    });

    h += '</div>';
  });

  return h;
}


// ── LIBRARIES ────────────────────────────────────────────────

function renderLibraries() {
  let h = buildBreadcrumb([['Home', "gp('home')"]]);

  h += `
    <div class="sh">
      <div>
        <div class="sh-t">All Libraries</div>
        <div class="sh-s">Libraries are over-categories of a bunch of collections that fit into their category</div>
      </div>
    </div>
    <div class="lg">`;

  LIBS.forEach(lib => {
    const entries = lib.colls.reduce((sum, id) => sum + (COLLS[id]?.sites.length ?? 0), 0);
    h += `
      <div class="lc" onclick="gl('${lib.id}')">
        <div class="lc-ico">${lib.ico}</div>
        <div class="lc-n">${lib.name}</div>
        <div class="lc-d">${lib.desc}</div>
        <div class="lc-pills">
          <span class="lc-p">${lib.colls.length} collections</span>
          <span class="lc-p">${entries} entries</span>
        </div>
      </div>`;
  });

  h += '</div>';
  return h;
}


// ── ALL COLLECTIONS ───────────────────────────────────────────

function renderAllCollections() {
  let h = buildBreadcrumb([['Home', "gp('home')"]]);

  h += `
    <div class="sh">
      <div>
        <div class="sh-t">All Collections</div>
        <div class="sh-s">Collections are curated tables of entries — every entry is done by hand.</div>
      </div>
    </div>
    <div class="cg">`;

  Object.entries(COLLS).forEach(([id, c]) => {
    // Extract image src from c.ico HTML
    const imgMatch = c.ico.match(/src="([^"]+)"/);
    const imgSrc = imgMatch ? imgMatch[1] : '';

    h += `
      <a class="cc" onclick="gc('${id}')">
        <div class="cc-img-wrap">
          <img class="cc-img" src="${imgSrc}" alt="${c.name}" onerror="this.style.display='none'">
          <div class="cc-overlay"></div>
        </div>
        <div class="cc-body">
          <div class="cc-h">
            <div class="cc-ico">${c.ico}</div>
            <div>
              <div class="cc-n">${c.name}</div>
              <div class="cc-c">${c.sites.length} entries · ${c.lib}</div>
            </div>
          </div>
          <div class="cc-d">${c.desc}</div>
          <div class="tags"><span class="tag p">${c.lib}</span></div>
        </div>
      </a>`;
  });

  h += '</div>';
  return h;
}


// ── COLLECTION DETAIL ─────────────────────────────────────────

function renderCollection(id) {
  const c = COLLS[id];
  if (!c) {
    return `<div class="empty">
      <div class="empty-i">🔍</div>
      <div class="empty-t">Collection not found</div>
    </div>`;
  }

  const lib = LIBS.find(l => l.name === c.lib) ?? LIBS[0];
  const libPage = `libraries.html`;

  let h = buildBreadcrumb([
    ['Home',      "gp('home')"],
    ['Libraries', libPage],
    [c.lib,       `gl('${lib.id}')`],
  ]);

  h += `
    <div class="hero">
      <div class="hero-ico">${c.ico}</div>
      <div>
        <div class="hero-title">${c.name}</div>
        <div class="hero-desc">${c.desc}</div>
        <div class="hero-meta">
          <span class="hero-st">🔗 ${c.sites.length} entries</span>
          <span class="hero-st">📁 ${c.lib}</span>
        </div>
      </div>
    </div>
    <div class="st">
      <table>
        <thead>
          <tr>
            <th style="width:28%">Site</th>
            <th style="width:7%">Status</th>
            <th>Description</th>
            <th style="width:22%">Tags</th>
          </tr>
        </thead>
        <tbody>`;

  c.sites.forEach(site => {
    const statusLabel = site.s === 'g' ? 'Online' : site.s === 'y' ? 'Partial' : 'Down';
    const noteHtml    = site.note ? `<span class="snote">ⓘ ${site.note}</span>` : '';
    const tagHtml     = site.t.map(t => `<span class="tag">${t}</span>`).join('');
    const cleanUrl    = site.u.replace(/^https?:\/\//, '');

    h += `
          <tr>
            <td>
              <a class="sn" href="${site.u}" target="_blank" rel="noopener noreferrer">${site.n}</a>
              <span class="su">${cleanUrl}</span>
              ${noteHtml}
            </td>
            <td class="sc"><span class="dot ${site.s}"></span>${statusLabel}</td>
            <td><span class="sd">${site.d}</span></td>
            <td><div class="tags">${tagHtml}</div></td>
          </tr>`;
  });

  h += `
        </tbody>
      </table>
    </div>`;

  return h;
}


// ── USER LISTS ────────────────────────────────────────────────

function renderLists() {
  return buildBreadcrumb([['Home', "gp('home')"]]) + `
    <div class="sh">
      <div>
        <div class="sh-t">User Lists</div>
        <div class="sh-s">User lists are created collections with user-selected items, ranking, and columns to display</div>
      </div>
    </div>
    <div class="empty">
      <div class="empty-i">📋</div>
      <div class="empty-t">No lists yet</div>
      <div class="empty-d">User list functionality coming soon.</div>
    </div>`;
}


// ── SEARCH ────────────────────────────────────────────────────

function doSearch(query) {
  if (!query.trim()) {
    gp(PAGE === 'search' ? 'home' : PAGE);
    return;
  }

  const lq  = query.toLowerCase();
  const hits = [];

  Object.entries(COLLS).forEach(([id, c]) => {
    const collMatch = (
      c.name.toLowerCase().includes(lq) ||
      c.desc.toLowerCase().includes(lq) ||
      c.lib.toLowerCase().includes(lq)
    );
    const siteMatches = c.sites.filter(s =>
      s.n.toLowerCase().includes(lq) ||
      s.d.toLowerCase().includes(lq) ||
      s.u.toLowerCase().includes(lq) ||
      s.t.some(t => t.toLowerCase().includes(lq))
    );

    if (collMatch || siteMatches.length) {
      hits.push({ id, c, siteMatches, collMatch });
    }
  });

  // Build results HTML
  let h = `
    <div class="sh">
      <div>
        <div class="sh-t">Results for "${query}"</div>
        <div class="sh-s">${hits.length} collection(s) matched</div>
      </div>
    </div>`;

  if (!hits.length) {
    h += `
      <div class="empty">
        <div class="empty-i">🔍</div>
        <div class="empty-t">No results found</div>
        <div class="empty-d">Try a different search term.</div>
      </div>`;
  } else {
    hits.forEach(({ id, c, siteMatches, collMatch }) => {
      const show = collMatch ? c.sites : siteMatches;

      h += `
        <div class="sh" style="margin-top:16px">
          <div><div class="sh-t">${c.ico} ${c.name}</div></div>
          <button class="sh-lnk" onclick="gc('${id}')">View all ${c.sites.length} →</button>
        </div>
        <div class="st">
          <table>
            <thead>
              <tr>
                <th style="width:28%">Site</th>
                <th style="width:7%">Status</th>
                <th>Description</th>
                <th style="width:22%">Tags</th>
              </tr>
            </thead>
            <tbody>`;

      show.slice(0, 6).forEach(s => {
        const statusLabel = s.s === 'g' ? 'Online' : s.s === 'y' ? 'Partial' : 'Down';
        const tagHtml     = s.t.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('');
        const cleanUrl    = s.u.replace(/^https?:\/\//, '');

        h += `
              <tr>
                <td>
                  <a class="sn" href="${s.u}" target="_blank" rel="noopener noreferrer">${s.n}</a>
                  <span class="su">${cleanUrl}</span>
                </td>
                <td class="sc"><span class="dot ${s.s}"></span>${statusLabel}</td>
                <td><span class="sd">${s.d}</span></td>
                <td><div class="tags">${tagHtml}</div></td>
              </tr>`;
      });

      h += `
            </tbody>
          </table>
        </div>`;
    });
  }

  // Commit search state
  PAGE = 'search';
  _SH  = h;

  _setActiveNav(null);
  renderSidebar();

  const ct = document.getElementById('ct');
  ct.innerHTML  = h;
  ct.scrollTop  = 0;
}


// ── BREADCRUMB HELPER ─────────────────────────────────────────

/**
 * @param {Array<[string, string]>} crumbs  — [[label, onclickFnOrHref], …]
 * @returns {string} HTML string
 */
function buildBreadcrumb(crumbs) {
  const parts = crumbs.map(([label, action]) => {
    // Check if it's a page navigation (gp('...'))
    if (action.startsWith("gp('")) {
      const page = action.match(/gp\('([^']+)'\)/)[1];
      const href = page === 'home' ? 'index.html' : `${page}.html`;
      return `<button class="bcl" onclick="window.location.href='${href}'">${label}</button>`;
    }
    // Otherwise use onclick directly
    return `<button class="bcl" onclick="${action}">${label}</button>`;
  });
  return `<div class="bc">${parts.join('<span class="bc-sep">›</span>')}</div>`;
}


// ── INIT ──────────────────────────────────────────────────────

_detectPage();
_setActiveNav(PAGE === 'coll' ? null : PAGE);
renderSidebar();
renderContent();
