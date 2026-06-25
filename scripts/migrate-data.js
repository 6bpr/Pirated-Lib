const fs = require('fs');
const path = require('path');

const dataJs = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf-8');
const tmpFile = path.join(__dirname, '..', 'data-wrapper.js');
fs.writeFileSync(tmpFile, dataJs + '\nmodule.exports = { LIBS, COLLS };\n');

const { LIBS, COLLS } = require(tmpFile);
fs.unlinkSync(tmpFile);

const sites = [];
const categories = [];

LIBS.forEach(lib => {
  const catId = lib.id;
  const subcategories = [];

  lib.colls.forEach(collId => {
    const coll = COLLS[collId];
    if (!coll) return;

    const subId = collId;
    subcategories.push({ id: subId, name: coll.name });

    (coll.sites || []).forEach(site => {
      const id = site.n
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const statusMap = { g: 'online', y: 'partial', r: 'down' };

      const existingIdx = sites.findIndex(s => s.id === id);
      if (existingIdx !== -1) {
        return;
      }

      sites.push({
        id,
        name: site.n,
        description: site.d,
        shortDescription: site.d.split('.')[0],
        url: site.u,
        category: catId,
        subcategory: subId,
        tags: site.t || [],
        featured: false,
        status: statusMap[site.s] || 'unknown',
        language: 'en',
        requires: 'none',
        curatorNote: site.note || '',
        addedAt: '2024-01-01',
        updatedAt: new Date().toISOString().split('T')[0],
      });
    });
  });

  categories.push({
    id: catId,
    name: lib.name,
    description: lib.desc,
    icon: lib.ico.replace(/<img[^>]*src="([^"]+)"[^>]*>/g, '$1').trim(),
    subcategories,
  });
});

const sitesPath = path.join(__dirname, '..', 'data', 'sites.json');
const catsPath = path.join(__dirname, '..', 'data', 'categories.json');
fs.writeFileSync(sitesPath, JSON.stringify(sites, null, 2));
fs.writeFileSync(catsPath, JSON.stringify(categories, null, 2));

console.log(`Migrated ${sites.length} sites and ${categories.length} categories`);
console.log(`  → ${sitesPath}`);
console.log(`  → ${catsPath}`);
