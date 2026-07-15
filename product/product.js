/* ============================================================
   YAJORA — product/product.js
   Product details page: gallery, variants, quantity, cart, similar.
   ============================================================ */

(function () {
    'use strict';

    // ----- PRODUCT DATA (shared with index.js) -----
    const products = [
        {
            id: 1,
            slug: 'organic-avocado',
            name: 'Organic Avocado',
            category: 'Fresh Produce',
            subcategory: 'Fruit',
            keywords: ['avocado', 'organic', 'fruit', 'healthy fat'],
            images: [
                'https://placecats.com/600/600?random=1',
                'https://placecats.com/600/600?random=2',
                'https://placecats.com/600/600?random=3'
            ],
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
            images: [
                'https://placecats.com/600/600?random=4',
                'https://placecats.com/600/600?random=5'
            ],
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
            images: [
                'https://placecats.com/600/600?random=6',
                'https://placecats.com/600/600?random=7'
            ],
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
            images: [
                'https://placecats.com/600/600?random=8',
                'https://placecats.com/600/600?random=9'
            ],
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
            images: [
                'https://placecats.com/600/600?random=10',
                'https://placecats.com/600/600?random=11'
            ],
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
            images: [
                'https://placecats.com/600/600?random=12',
                'https://placecats.com/600/600?random=13'
            ],
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
            images: [
                'https://placecats.com/600/600?random=14',
                'https://placecats.com/600/600?random=15'
            ],
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
            images: [
                'https://placecats.com/600/600?random=16',
                'https://placecats.com/600/600?random=17'
            ],
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
            images: [
                'https://placecats.com/600/600?random=18',
                'https://placecats.com/600/600?random=19'
            ],
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
            images: [
                'https://placecats.com/600/600?random=20',
                'https://placecats.com/600/600?random=21'
            ],
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
            images: [
                'https://placecats.com/600/600?random=22',
                'https://placecats.com/600/600?random=23'
            ],
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
            images: [
                'https://placecats.com/600/600?random=24',
                'https://placecats.com/600/600?random=25'
            ],
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
    const container = document.getElementById('product-detail');
    const similarGrid = document.getElementById('similar-products-grid');
    const cartCountEl = document.querySelector('.cart-count');

    // ----- CART FUNCTIONS -----
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
            cartCountEl.classList.remove('pop');
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

    window.Yajora = window.Yajora || {};
    window.Yajora.addToCart = addToCart;

    // ----- IMAGE FALLBACK -----
    function createFallbackImage(containerEl, productName) {
        const fallback = document.createElement('div');
        fallback.className = 'fallback-text';
        fallback.textContent = productName || 'Yajora';
        fallback.style.cssText = `
            display: flex; align-items: center; justify-content: center;
            width: 100%; height: 100%;
            background: linear-gradient(135deg, #eef3e7, #dce4ce);
            color: #4a5b5b; font-weight: 500; font-size: 0.875rem;
            text-transform: uppercase; letter-spacing: 0.05em;
            text-align: center; padding: 1rem;
        `;
        containerEl.innerHTML = '';
        containerEl.appendChild(fallback);
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

    // ----- GET PRODUCT FROM URL -----
    function getProductFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');
        if (!slug) return null;
        return products.find(p => p.slug === slug) || null;
    }

    // ----- RENDER PRODUCT DETAIL -----
    function renderProductDetail(product) {
        if (!product) {
            container.innerHTML = `
                <div class="product-not-found" style="padding:var(--spacing-3xl) 0;text-align:center;">
                    <h2 style="font-size:var(--font-size-2xl);color:var(--color-text);">Product not found</h2>
                    <p style="color:var(--color-text-light);margin-top:var(--spacing-sm);">The product you're looking for doesn't exist.</p>
                    <a href="/" class="btn btn-primary" style="margin-top:var(--spacing-lg);">Return to Home</a>
                </div>
            `;
            return;
        }

        const variantIndex = product.defaultVariantIndex || 0;
        const variant = product.variants[variantIndex] || product.variants[0];
        const price = variant ? variant.price.toFixed(2) : '0.00';
        const stockClass = product.stock ? 'in-stock' : 'out-of-stock';
        const stockText = product.stock ? 'In Stock' : 'Out of Stock';

        const images = product.images && product.images.length > 0 ? product.images : [];

        let thumbnailsHtml = '';
        if (images.length === 0) {
            thumbnailsHtml = '<p style="font-size:var(--font-size-sm);color:var(--color-text-light);">No additional images</p>';
        } else {
            images.forEach((imgSrc, idx) => {
                thumbnailsHtml += `
                    <button class="${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="View image ${idx + 1}">
                        <img src="${imgSrc}" alt="${product.name} thumbnail ${idx + 1}" loading="lazy" />
                    </button>
                `;
            });
        }

        let variantsHtml = '';
        if (product.variants && product.variants.length > 1) {
            variantsHtml = `
                <div class="product-variants">
                    <label for="variant-select">Variant</label>
                    <select id="variant-select">
                        ${product.variants.map((v, i) =>
                            `<option value="${i}" ${i === product.defaultVariantIndex ? 'selected' : ''}>${v.name} — $${v.price.toFixed(2)}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
        }

        const html = `
            <div class="product-detail">
                <div class="product-gallery">
                    <div class="product-gallery-main">
                        <img src="${images[0] || ''}" alt="${product.name}" id="main-image" />
                    </div>
                    <div class="product-gallery-thumbnails" id="thumbnails-container">
                        ${thumbnailsHtml}
                    </div>
                </div>

                <div class="product-info-detail">
                    <span class="product-category">${product.category}</span>
                    <h1>${product.name}</h1>
                    <div class="product-price-detail">$${price}</div>
                    <p class="product-description">${product.description || ''}</p>

                    <div class="product-stock ${stockClass}">
                        <span class="stock-dot"></span> ${stockText}
                    </div>

                    ${variantsHtml}

                    <div class="product-quantity">
                        <label for="quantity-input">Quantity</label>
                        <div class="quantity-control">
                            <button type="button" id="qty-decrease" aria-label="Decrease quantity">−</button>
                            <input type="number" id="quantity-input" value="1" min="1" max="99" step="1" />
                            <button type="button" id="qty-increase" aria-label="Increase quantity">+</button>
                        </div>
                    </div>

                    <div class="product-actions-detail">
                        <button class="btn btn-primary" id="add-to-cart-btn">Add to Cart</button>
                        <button class="btn btn-order-now" id="order-now-btn">Order Now</button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Gallery
        const mainImg = document.getElementById('main-image');
        const thumbContainer = document.getElementById('thumbnails-container');
        const thumbButtons = thumbContainer ? thumbContainer.querySelectorAll('button') : [];

        if (mainImg) {
            setupProductImage(mainImg, images[0] || '', product.name);
        }

        thumbButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = parseInt(this.dataset.index, 10);
                if (images[idx]) {
                    mainImg.src = images[idx];
                    mainImg.alt = `${product.name} image ${idx + 1}`;
                    const parent = mainImg.parentElement;
                    const fallback = parent.querySelector('.fallback-text');
                    if (fallback) fallback.remove();
                    mainImg.style.display = 'block';
                    thumbButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Variant change
        const variantSelect = document.getElementById('variant-select');
        const priceDisplay = document.querySelector('.product-price-detail');
        if (variantSelect) {
            variantSelect.addEventListener('change', function () {
                const idx = parseInt(this.value, 10);
                const variant = product.variants[idx];
                if (variant) {
                    priceDisplay.textContent = `$${variant.price.toFixed(2)}`;
                }
            });
        }

        // Quantity
        const qtyInput = document.getElementById('quantity-input');
        const qtyDecrease = document.getElementById('qty-decrease');
        const qtyIncrease = document.getElementById('qty-increase');

        if (qtyInput) {
            qtyInput.addEventListener('change', function () {
                let val = parseInt(this.value, 10);
                if (isNaN(val) || val < 1) val = 1;
                if (val > 99) val = 99;
                this.value = val;
            });
        }

        if (qtyDecrease) {
            qtyDecrease.addEventListener('click', function () {
                let val = parseInt(qtyInput.value, 10);
                if (isNaN(val) || val <= 1) return;
                qtyInput.value = val - 1;
                qtyInput.dispatchEvent(new Event('change'));
            });
        }

        if (qtyIncrease) {
            qtyIncrease.addEventListener('click', function () {
                let val = parseInt(qtyInput.value, 10);
                if (isNaN(val)) val = 0;
                if (val >= 99) return;
                qtyInput.value = val + 1;
                qtyInput.dispatchEvent(new Event('change'));
            });
        }

        // Add to Cart
        const addBtn = document.getElementById('add-to-cart-btn');
        if (addBtn) {
            addBtn.addEventListener('click', function () {
                const variantIdx = variantSelect ? parseInt(variantSelect.value, 10) : (product.defaultVariantIndex || 0);
                const qty = parseInt(qtyInput.value, 10) || 1;
                const success = addToCart(product.id, variantIdx, qty);
                if (success) {
                    const originalText = this.textContent;
                    this.textContent = 'Added!';
                    this.style.backgroundColor = 'var(--color-success, #2D6A4F)';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = '';
                    }, 1200);
                }
            });
        }

        // Order Now
        const orderBtn = document.getElementById('order-now-btn');
        if (orderBtn) {
            orderBtn.addEventListener('click', function () {
                const variantIdx = variantSelect ? parseInt(variantSelect.value, 10) : (product.defaultVariantIndex || 0);
                const qty = parseInt(qtyInput.value, 10) || 1;
                window.location.href = `/order.html?slug=${product.slug}&variant=${variantIdx}&qty=${qty}`;
            });
        }
    }

    // ----- RENDER SIMILAR PRODUCTS -----
    function renderSimilarProducts(currentProduct) {
        if (!similarGrid) return;
        if (!currentProduct) {
            similarGrid.innerHTML = '';
            return;
        }

        const similar = products
            .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, 4);

        if (similar.length === 0) {
            similarGrid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:var(--spacing-xl) 0;color:var(--color-text-light);">
                    No similar products found.
                </div>
            `;
            return;
        }

        let html = '';
        similar.forEach(product => {
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
                            <a href="/product/product.html?slug=${product.slug}" class="btn-view-product">View</a>
                        </div>
                    </div>
                </article>
            `;
        });

        similarGrid.innerHTML = html;

        similarGrid.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const id = parseInt(this.dataset.id, 10);
                const variant = parseInt(this.dataset.variant, 10) || 0;
                addToCart(id, variant, 1);
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.style.backgroundColor = 'var(--color-success, #2D6A4F)';
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 1200);
            });
        });

        similarGrid.querySelectorAll('.product-image-wrapper img').forEach(img => {
            const card = img.closest('.product-card');
            const name = card?.querySelector('.product-name')?.textContent || 'Product';
            const src = img.getAttribute('src');
            setupProductImage(img, src, name);
        });
    }

    // ----- INIT -----
    function init() {
        const product = getProductFromUrl();
        renderProductDetail(product);
        renderSimilarProducts(product);
        updateCartCount();

        // Navigation toggle (same as index)
        const navToggle = document.querySelector('.nav-toggle');
        const primaryNav = document.getElementById('primary-nav');
        if (navToggle && primaryNav) {
            navToggle.addEventListener('click', function () {
                const isOpen = primaryNav.classList.toggle('is-open');
                this.setAttribute('aria-expanded', isOpen);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
