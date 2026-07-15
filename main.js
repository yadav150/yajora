/* ============================================================
   YAJORA — index.js
   Homepage interactivity: products, search, cart, UI.
   ============================================================ */

(function () {
    'use strict';

    // ----- PRODUCT DATA (static demo) -----
    // Structure mirrors a future API response.
    const products = [
        {
            id: 1,
            slug: 'organic-avocado',
            name: 'Organic Avocado',
            category: 'Fresh Produce',
            subcategory: 'Fruit',
            keywords: ['avocado', 'organic', 'fruit', 'healthy fat'],
            images: ['https://placecats.com/300/300?random=1'],
            variants: [
                { name: 'Small (4 ct)', price: 4.99 },
                { name: 'Large (4 ct)', price: 6.99 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Creamy, organic avocados perfect for toast or guacamole.'
        },
        {
            id: 2,
            slug: 'whole-grain-bread',
            name: 'Whole Grain Bread',
            category: 'Bakery',
            subcategory: 'Bread',
            keywords: ['bread', 'whole grain', 'bakery', 'fresh'],
            images: ['https://placecats.com/300/300?random=2'],
            variants: [
                { name: '1 Loaf', price: 3.49 },
                { name: '2 Loaves', price: 6.29 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Hearty whole grain bread baked fresh daily.'
        },
        {
            id: 3,
            slug: 'free-range-eggs',
            name: 'Free-Range Eggs',
            category: 'Dairy & Eggs',
            subcategory: 'Eggs',
            keywords: ['eggs', 'free-range', 'protein', 'breakfast'],
            images: ['https://placecats.com/300/300?random=3'],
            variants: [
                { name: '12 ct', price: 4.49 },
                { name: '18 ct', price: 6.29 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Pasture-raised, free-range brown eggs.'
        },
        {
            id: 4,
            slug: 'organic-milk',
            name: 'Organic Whole Milk',
            category: 'Dairy & Eggs',
            subcategory: 'Milk',
            keywords: ['milk', 'organic', 'dairy', 'calcium'],
            images: ['https://placecats.com/300/300?random=4'],
            variants: [
                { name: '1/2 gal', price: 3.99 },
                { name: '1 gal', price: 5.99 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Fresh organic whole milk from grass-fed cows.'
        },
        {
            id: 5,
            slug: 'wild-caught-salmon',
            name: 'Wild-Caught Salmon',
            category: 'Meat & Seafood',
            subcategory: 'Seafood',
            keywords: ['salmon', 'wild-caught', 'fish', 'omega-3'],
            images: ['https://placecats.com/300/300?random=5'],
            variants: [
                { name: '1 lb fillet', price: 12.99 },
                { name: '2 lb fillet', price: 23.99 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Sustainable wild-caught salmon fillet.'
        },
        {
            id: 6,
            slug: 'quinoa',
            name: 'Organic Quinoa',
            category: 'Pantry Staples',
            subcategory: 'Grains',
            keywords: ['quinoa', 'organic', 'grain', 'protein', 'pantry'],
            images: ['https://placecats.com/300/300?random=6'],
            variants: [
                { name: '1 lb bag', price: 4.99 },
                { name: '2 lb bag', price: 8.49 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Nutty, protein-rich organic quinoa.'
        },
        {
            id: 7,
            slug: 'green-kale',
            name: 'Green Kale',
            category: 'Fresh Produce',
            subcategory: 'Greens',
            keywords: ['kale', 'green', 'leafy', 'superfood'],
            images: ['https://placecats.com/300/300?random=7'],
            variants: [
                { name: '1 bunch', price: 2.49 },
                { name: '2 bunches', price: 4.29 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Fresh, crisp green kale packed with nutrients.'
        },
        {
            id: 8,
            slug: 'almond-butter',
            name: 'Creamy Almond Butter',
            category: 'Pantry Staples',
            subcategory: 'Nut Butters',
            keywords: ['almond butter', 'nut butter', 'protein', 'pantry'],
            images: ['https://placecats.com/300/300?random=8'],
            variants: [
                { name: '12 oz jar', price: 6.99 },
                { name: '24 oz jar', price: 11.99 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Smooth, roasted almond butter with no added sugar.'
        },
        {
            id: 9,
            slug: 'sparkling-water',
            name: 'Sparkling Water (Lime)',
            category: 'Beverages',
            subcategory: 'Water',
            keywords: ['sparkling water', 'lime', 'beverage', 'hydration'],
            images: ['https://placecats.com/300/300?random=9'],
            variants: [
                { name: '6 pack', price: 3.99 },
                { name: '12 pack', price: 6.99 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Refreshing lime-flavoured sparkling water.'
        },
        {
            id: 10,
            slug: 'chicken-breast',
            name: 'Boneless Chicken Breast',
            category: 'Meat & Seafood',
            subcategory: 'Poultry',
            keywords: ['chicken', 'breast', 'boneless', 'protein'],
            images: ['https://placecats.com/300/300?random=10'],
            variants: [
                { name: '1 lb', price: 5.99 },
                { name: '2 lb', price: 10.99 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Fresh, boneless skinless chicken breast.'
        },
        {
            id: 11,
            slug: 'greek-yogurt',
            name: 'Greek Yogurt (Plain)',
            category: 'Dairy & Eggs',
            subcategory: 'Yogurt',
            keywords: ['yogurt', 'greek', 'protein', 'breakfast'],
            images: ['https://placecats.com/300/300?random=11'],
            variants: [
                { name: '16 oz tub', price: 4.49 },
                { name: '32 oz tub', price: 7.49 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Thick, creamy plain Greek yogurt.'
        },
        {
            id: 12,
            slug: 'banana-bunch',
            name: 'Organic Bananas',
            category: 'Fresh Produce',
            subcategory: 'Fruit',
            keywords: ['banana', 'organic', 'fruit', 'potassium'],
            images: ['https://placecats.com/300/300?random=12'],
            variants: [
                { name: '1 bunch (5-6)', price: 2.29 },
                { name: '2 bunches', price: 3.99 }
            ],
            defaultVariantIndex: 0,
            stock: true,
            description: 'Sweet organic bananas, perfect for snacking.'
        }
    ];

    // ----- DOM REFS -----
    const productGrid = document.getElementById('product-grid');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchToggle = document.querySelector('.search-toggle');
    const searchClose = document.querySelector('.search-close');
    const searchForm = document.querySelector('.search-form');
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const cartCountEl = document.querySelector('.cart-count');

    // ----- CART (localStorage) -----
    function getCart() {
        try {
            const data = localStorage.getItem('yajora_cart');
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('yajora_cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountEl) {
            cartCountEl.textContent = total;
            // trigger pop animation
            cartCountEl.classList.remove('pop');
            // force reflow
            void cartCountEl.offsetWidth;
            cartCountEl.classList.add('pop');
        }
    }

    function addToCart(productId, variantIndex, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return false;
        const variant = product.variants[variantIndex] || product.variants[0];
        const cart = getCart();
        const existing = cart.find(item =>
            item.productId === productId &&
            item.variantIndex === variantIndex
        );
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                productId: productId,
                variantIndex: variantIndex,
                quantity: quantity,
                name: product.name,
                variantName: variant.name,
                price: variant.price,
                image: product.images[0] || ''
            });
        }
        saveCart(cart);
        return true;
    }

    // Expose cart functions globally for inline button usage
    window.Yajora = window.Yajora || {};
    window.Yajora.addToCart = addToCart;

    // ----- IMAGE FALLBACK -----
    function createFallbackImage(container, productName) {
        const fallback = document.createElement('div');
        fallback.className = 'fallback-text';
        fallback.textContent = productName || 'Yajora';
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.width = '100%';
        fallback.style.height = '100%';
        fallback.style.background = 'linear-gradient(135deg, #eef3e7, #dce4ce)';
        fallback.style.color = '#4a5b5b';
        fallback.style.fontWeight = '500';
        fallback.style.fontSize = '0.875rem';
        fallback.style.textTransform = 'uppercase';
        fallback.style.letterSpacing = '0.05em';
        fallback.style.textAlign = 'center';
        fallback.style.padding = 'var(--spacing-md, 1rem)';
        container.innerHTML = '';
        container.appendChild(fallback);
    }

    function setupProductImage(imgElement, src, productName) {
        if (!src || src.trim() === '') {
            createFallbackImage(imgElement.parentElement, productName);
            return;
        }
        imgElement.src = src;
        imgElement.alt = productName || 'Product image';
        imgElement.loading = 'lazy';
        imgElement.addEventListener('error', function onError() {
            imgElement.removeEventListener('error', onError);
            createFallbackImage(imgElement.parentElement, productName);
        });
    }

    // ----- RENDER PRODUCTS -----
    function renderProducts(productList, container) {
        if (!container) return;
        if (!productList || productList.length === 0) {
            container.innerHTML = `
                <div class="search-empty" style="grid-column:1/-1;text-align:center;padding:var(--spacing-2xl) 0;">
                    <p style="font-size:1.25rem;color:var(--color-text-muted);">No products found</p>
                    <p style="color:var(--color-text-light);">Try adjusting your search.</p>
                </div>
            `;
            return;
        }

        let html = '';
        productList.forEach(product => {
            const variant = product.variants[product.defaultVariantIndex] || product.variants[0];
            const price = variant ? variant.price.toFixed(2) : '0.00';
            const imageSrc = product.images && product.images.length > 0 ? product.images[0] : '';

            html += `
                <article class="product-card" data-product-id="${product.id}">
                    <div class="product-image-wrapper">
                        <img src="${imageSrc}" alt="${product.name}" loading="lazy" />
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-price">$${price}</span>
                        <div class="product-actions">
                            <button class="btn-add-cart" data-id="${product.id}" data-variant="0">Add to Cart</button>
                            <a href="/product.html?slug=${product.slug}" class="btn-view-product">View</a>
                        </div>
                    </div>
                </article>
            `;
        });

        container.innerHTML = html;

        // Attach event listeners for Add to Cart buttons
        container.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id, 10);
                const variant = parseInt(this.dataset.variant, 10) || 0;
                addToCart(id, variant, 1);
                // Provide subtle feedback
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.style.backgroundColor = 'var(--color-success, #2D6A4F)';
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 1200);
            });
        });

        // Setup image fallbacks for each product card
        container.querySelectorAll('.product-card').forEach(card => {
            const img = card.querySelector('.product-image-wrapper img');
            const name = card.querySelector('.product-name')?.textContent || 'Product';
            if (img) {
                const src = img.getAttribute('src');
                setupProductImage(img, src, name);
            }
        });
    }

    // ----- SEARCH -----
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            return [];
        }
        const q = query.trim().toLowerCase();
        return products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(q);
            const catMatch = product.category.toLowerCase().includes(q);
            const subMatch = product.subcategory ? product.subcategory.toLowerCase().includes(q) : false;
            const keywordMatch = product.keywords ? product.keywords.some(k => k.toLowerCase().includes(q)) : false;
            return nameMatch || catMatch || subMatch || keywordMatch;
        });
    }

    function renderSearchResults(query) {
        const results = performSearch(query);
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto var(--spacing-md);color:var(--color-text-light);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <p style="font-weight:500;">No results for “${query.trim()}”</p>
                    <p style="font-size:var(--font-size-sm);color:var(--color-text-light);">Try different keywords or browse our categories.</p>
                </div>
            `;
            return;
        }

        // Render as a mini grid inside search results
        let html = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:var(--spacing-md);">`;
        results.slice(0, 8).forEach(product => {
            const variant = product.variants[product.defaultVariantIndex] || product.variants[0];
            const price = variant ? variant.price.toFixed(2) : '0.00';
            const imageSrc = product.images && product.images.length > 0 ? product.images[0] : '';
            html += `
                <div class="product-card" style="margin:0;">
                    <div class="product-image-wrapper" style="aspect-ratio:1/1;">
                        <img src="${imageSrc}" alt="${product.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-name" style="font-size:var(--font-size-sm);">${product.name}</h3>
                        <span class="product-price" style="font-size:var(--font-size-base);">$${price}</span>
                        <button class="btn-add-cart" data-id="${product.id}" data-variant="0" style="width:100%;">Add</button>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        if (results.length > 8) {
            html += `<p style="text-align:center;margin-top:var(--spacing-md);font-size:var(--font-size-sm);color:var(--color-text-light);">Showing 8 of ${results.length} results</p>`;
        }
        searchResults.innerHTML = html;

        // Attach cart events to search results
        searchResults.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id, 10);
                const variant = parseInt(this.dataset.variant, 10) || 0;
                addToCart(id, variant, 1);
                const orig = this.textContent;
                this.textContent = '✓ Added';
                setTimeout(() => { this.textContent = orig; }, 1000);
            });
        });

        // Setup fallback images in search results
        searchResults.querySelectorAll('.product-image-wrapper img').forEach(img => {
            const parent = img.parentElement;
            const card = parent.closest('.product-card');
            const name = card?.querySelector('.product-name')?.textContent || 'Product';
            const src = img.getAttribute('src');
            setupProductImage(img, src, name);
        });
    }

    // ----- UI TOGGLES -----
    function toggleNav() {
        const isOpen = primaryNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    }

    function openSearch() {
        searchOverlay.classList.add('is-open');
        searchOverlay.setAttribute('aria-hidden', 'false');
        searchToggle.setAttribute('aria-expanded', 'true');
        setTimeout(() => searchInput.focus(), 100);
        // Clear previous results
        searchResults.innerHTML = '';
        searchInput.value = '';
    }

    function closeSearch() {
        searchOverlay.classList.remove('is-open');
        searchOverlay.setAttribute('aria-hidden', 'true');
        searchToggle.setAttribute('aria-expanded', 'false');
        searchResults.innerHTML = '';
    }

    // ----- SCROLL REVEAL (IntersectionObserver) -----
    function initScrollReveal() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const elements = document.querySelectorAll('.category-card, .product-card, .about-content, .about-visual');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        elements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // ----- INIT -----
    function init() {
        // Render products
        renderProducts(products, productGrid);

        // Cart count
        updateCartCount();

        // Nav toggle
        if (navToggle && primaryNav) {
            navToggle.addEventListener('click', toggleNav);
            // Close nav on link click (mobile)
            primaryNav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 1024) {
                        primaryNav.classList.remove('is-open');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }

        // Search toggle
        if (searchToggle) {
            searchToggle.addEventListener('click', openSearch);
        }
        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }
        // Close search on overlay background click
        if (searchOverlay) {
            searchOverlay.addEventListener('click', function (e) {
                if (e.target === this) {
                    closeSearch();
                }
            });
            // ESC key to close
            searchOverlay.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    closeSearch();
                }
            });
        }

        // Search input live filtering
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', function () {
                clearTimeout(debounceTimer);
                const val = this.value;
                debounceTimer = setTimeout(() => {
                    if (val.trim().length >= 2) {
                        renderSearchResults(val);
                    } else {
                        searchResults.innerHTML = '';
                    }
                }, 200);
            });
        }

        // Search form submit: prevent default and use live search
        if (searchForm) {
            searchForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const val = searchInput.value.trim();
                if (val.length >= 2) {
                    renderSearchResults(val);
                }
            });
        }

        // Scroll reveal
        initScrollReveal();

        // Re-run fallback setup for any dynamically added images (e.g., after search)
        // The render functions already handle it, but we observe for any late additions.
        // Use MutationObserver for safety on product grid.
        if (productGrid) {
            const observer = new MutationObserver(() => {
                productGrid.querySelectorAll('.product-image-wrapper img').forEach(img => {
                    // Only process if not already processed (no fallback div)
                    if (!img.closest('.product-image-wrapper')?.querySelector('.fallback-text')) {
                        const card = img.closest('.product-card');
                        const name = card?.querySelector('.product-name')?.textContent || 'Product';
                        const src = img.getAttribute('src');
                        setupProductImage(img, src, name);
                    }
                });
            });
            observer.observe(productGrid, { childList: true, subtree: true });
        }

        console.log('Yajora — Homepage ready.');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
