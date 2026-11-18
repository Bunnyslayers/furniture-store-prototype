// One shared catalog for every Shop view. Add new designs here.
const products = [
    { id: 'modern-credenza', name: 'Modern Credenza', category: 'storage', type: 'credenza', illustration: 'cabinet', startingPrice: 100 },
    { id: 'lounge-chair', name: 'Lounge Chair', category: 'seating', type: 'chair', illustration: 'chair', startingPrice: 50 },
    { id: 'open-bookshelf', name: 'Open Bookshelf', category: 'storage', type: 'shelf', illustration: 'shelf' },
    { id: 'two-seat-sofa', name: 'Two-Seat Sofa', category: 'seating', type: 'sofa', illustration: 'sofa', startingPrice: 150 },
    { id: 'classic-credenza', name: 'Classic Credenza', category: 'storage', type: 'credenza', illustration: 'cabinet', startingPrice: 100 },
    { id: 'accent-chair', name: 'Accent Chair', category: 'seating', type: 'chair', illustration: 'chair', startingPrice: 50 },
    { id: 'tall-bookshelf', name: 'Tall Bookshelf', category: 'storage', type: 'shelf', illustration: 'shelf' },
    { id: 'three-seat-sofa', name: 'Three-Seat Sofa', category: 'seating', type: 'sofa', illustration: 'sofa', startingPrice: 150 }
];

const validFilters = new Set(['all', 'storage', 'seating', 'credenza', 'shelf', 'chair', 'sofa']);
const labels = { all: 'All Furniture', storage: 'Storage Furniture', seating: 'Seating Furniture', credenza: 'Credenzas', shelf: 'Shelves', chair: 'Chairs', sofa: 'Sofas' };
const filterSelect = document.getElementById('catalog-filter');
const productContainer = document.getElementById('catalog-products');
const categoryGrid = document.getElementById('category-grid');
const categoryToggle = document.getElementById('category-toggle');
const clearFilter = document.getElementById('clear-filter');

function filterFromUrl() {
    const type = new URLSearchParams(window.location.search).get('type') || 'all';
    return validFilters.has(type) ? type : 'all';
}

function setCategoriesVisible(visible) {
    categoryGrid.hidden = !visible;
    categoryToggle.setAttribute('aria-expanded', String(visible));
    categoryToggle.textContent = visible ? 'Hide Categories' : 'Show Categories';
}

function renderCatalog(filter) {
    filterSelect.value = filter;
    document.getElementById('catalog-heading').textContent = labels[filter];
    clearFilter.hidden = filter === 'all';
    const visible = products.filter(product => filter === 'all' || product.category === filter || product.type === filter);
    productContainer.replaceChildren();

    visible.forEach(product => {
        const article = document.createElement('article');
        article.className = 'product';
        const heading = document.createElement('h3');
        heading.textContent = product.name;
        const illustration = document.createElement('div');
        illustration.className = 'furniture ' + product.illustration;
        illustration.setAttribute('role', 'img');
        illustration.setAttribute('aria-label', product.type + ' illustration');
        illustration.appendChild(document.createElement('i'));
        const info = document.createElement('p');
        info.textContent = product.startingPrice ? 'Starting at $' + product.startingPrice : 'Preview only';
        article.append(heading, illustration, info);
        if (product.type === 'credenza') {
            const link = document.createElement('a');
            link.className = 'button';
            link.href = 'inspiration.html#credenza';
            link.textContent = 'Customize';
            article.appendChild(link);
        } else {
            const note = document.createElement('p');
            note.className = 'prototype-note';
            note.textContent = 'Customization not available in this prototype';
            article.appendChild(note);
        }
        productContainer.appendChild(article);
    });
    document.getElementById('catalog-count').textContent = 'Showing ' + visible.length + ' of ' + products.length + ' designs';
}

function applyFilter(filter, updateHistory = true) {
    if (!validFilters.has(filter)) filter = 'all';
    if (updateHistory) {
        const url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete('type');
        else url.searchParams.set('type', filter);
        if (url.href !== window.location.href) history.pushState({ filter }, '', url);
    }
    renderCatalog(filter);
    setCategoriesVisible(filter === 'all');
}

filterSelect.addEventListener('change', () => applyFilter(filterSelect.value));
clearFilter.addEventListener('click', () => applyFilter('all'));
categoryToggle.addEventListener('click', () => setCategoriesVisible(categoryGrid.hidden));

document.querySelectorAll('[data-catalog-filter]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        applyFilter(link.dataset.catalogFilter);
    });
});

// Keep navigation menu shortcuts on this page in the same browser history.
document.querySelectorAll('#main-navigation a[href^="shop.html?type="]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const url = new URL(link.href);
        applyFilter(url.searchParams.get('type'));
        document.getElementById('menu-toggle').click();
    });
});

window.addEventListener('popstate', () => applyFilter(filterFromUrl(), false));
applyFilter(filterFromUrl(), false);
