/* ============================================================
   YAJORA — cart/cart.js
   Shopping cart page: display items, update quantities, totals, checkout.
   ============================================================ */

(function () {
    'use strict';

    // ----- DOM REFS -----
    const cartContent = document.getElementById('cart-content');
    const cartItemCount = document.getElementById('cart-item-count');
    const cartCountEl = document.querySelector('.cart-count');

    // ----- PRODUCT DATA (shared) -----
    // This should match the product data from index.js and product.js
    // In a real project, this would be imported from a shared file.
    const products = [
        {
            id: 1,
            slug: 'organic-avocado',
            name: 'Organic Avocado',
            category: 'Fresh Produce',
            images: ['https://placecats.com/300/300?random=1'],
            variants: [
                { name: 'Small (4 ct)', price: 4.99 },
                { name: 'Large (4 ct)', price: 6.99 }
            ]
        },
        {
            id: 2,
            slug: 'whole-grain-bread',
            name: 'Whole Grain Bread',
            category: 'Bakery',
            images: ['https://placecats.com/300/300?random=2'],
            variants: [
                { name: '1 Loaf', price: 3.49 },
                { name: '2 Loaves', price: 6.29 }
            ]
        },
        {
            id: 3,
            slug: 'free-range-eggs',
            name: 'Free-Range Eggs',
            category: 'Dairy & Eggs',
            images: ['https://placecats.com/300/300?random=3'],
            variants: [
                { name: '12 ct', price: 4.49 },
                { name: '18 ct', price: 6.29 }
            ]
        },
        {
            id: 4,
            slug: 'organic-milk',
            name: 'Organic Whole Milk',
            category: 'Dairy & Eggs',
            images: ['https://placecats.com/300/300?random=4'],
            variants: [
                { name: '1/2 gal', price: 3.99 },
                { name: '1 gal', price: 5.99 }
            ]
        },
        {
            id: 5,
            slug: 'wild-caught-salmon',
            name: 'Wild-Caught Salmon',
            category: 'Meat & Seafood',
            images: ['https://placecats.com/300/300?random=5'],
            variants: [
                { name: '1 lb fillet', price: 12.99 },
                { name: '2 lb fillet', price: 23.99 }
            ]
        },
        {
            id: 6,
            slug: 'quinoa',
            name: 'Organic Quinoa',
            category: 'Pantry Staples',
            images: ['https://placecats.com/300/300?random=6'],
            variants: [
                { name: '1 lb bag', price: 4.99 },
                { name: '2 lb bag', price: 8.49 }
            ]
        },
        {
            id: 7,
            slug: 'green-kale',
            name: 'Green Kale',
            category: 'Fresh Produce',
            images: ['https://placecats.com/300/300?random=7'],
            variants: [
                { name: '1 bunch', price: 2.49 },
                { name: '2 bunches', price: 4.29 }
            ]
        },
        {
            id: 8,
            slug: 'almond-butter',
            name: 'Creamy Almond Butter',
            category: 'Pantry Staples',
            images: ['https://placecats.com/300/300?random=8'],
            variants: [
                { name: '12 oz jar', price: 6.99 },
                { name: '24 oz jar', price: 11.99 }
            ]
        },
        {
            id: 9,
            slug: 'sparkling-water',
            name: 'Sparkling Water (Lime)',
            category: 'Beverages',
            images: ['https://placecats.com/300/300?random=9'],
            variants: [
                { name: '6 pack', price: 3.99 },
                { name: '12 pack', price: 6.99 }
            ]
        },
        {
            id: 10,
            slug: 'chicken-breast',
            name: 'Boneless Chicken Breast',
            category: 'Meat & Seafood',
            images: ['https://placecats.com/300/300?random=10'],
            variants: [
                { name: '1 lb', price: 5.99 },
                { name: '2 lb', price: 10.99 }
            ]
        },
        {
            id: 11,
            slug: 'greek-yogurt',
            name: 'Greek Yogurt (Plain)',
            category: 'Dairy & Eggs',
            images: ['https://placecats.com/300/300?random=11'],
            variants: [
                { name: '16 oz tub', price: 4.49 },
                { name: '32 oz tub', price: 7.49 }
            ]
        },
        {
            id: 12,
            slug: 'banana-bunch',
            name: 'Organic Bananas',
            category: 'Fresh Produce',
            images: ['https://placecats.com/300/300?random=12'],
            variants: [
                { name: '1 bunch (5-6)', price: 2.29 },
                { name: '2 bunches', price: 3.99 }
            ]
        }
    ];

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
        renderCart();
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
        if (cartItemCount) {
            cartItemCount.textContent = total + ' ' + (total === 1 ? 'item' : 'items');
        }
    }

    function getProductById(id) {
        return products.find(p => p.id === id);
    }

    // ----- IMAGE FALLBACK -----
    function createFallbackImage(containerEl, productName) {
        const fallback = document.createElement('div');
        fallback.className = 'fallback-text';
        fallback.textContent = productName || 'Yajora';
        fallback.style.cssText = `
            display: flex; align-items: center; justify-content: center;
            width: 100%; height: 100%;
            background: linear-gradient(135deg, #eef3e7, #dce4ce);
            color: #4a5b5b; font-weight: 500; font-size: 0.6rem;
            text-transform: uppercase; letter-spacing: 0.05em;
            text-align: center; padding: 0.25rem;
        `;
        containerEl.innerHTML = '';
        containerEl.appendChild(fallback);
    }

    function setupCartImage(imgElement, src, productName) {
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

    // ----- RENDER CART -----
    function renderCart() {
        const cart = getCart();

        if (cart.length === 0) {
            cartContent.innerHTML = `
                <div class="cart-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any items yet.</p>
                    <a href="/" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            updateCartCount();
            return;
        }

        let itemsHtml = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const product = getProductById(item.productId);
            const productName = product ? product.name : item.name || 'Unknown Product';
            const variantName = item.variantName || 'Variant';
            const price = item.price || 0;
            const quantity = item.quantity || 0;
            const totalPrice = price * quantity;
            subtotal += totalPrice;
            const imageSrc = item.image || (product && product.images && product.images[0]) || '';

            itemsHtml += `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item-image">
                        <img src="${imageSrc}" alt="${productName}" />
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-name">${productName}</span>
                        <span class="cart-item-variant">${variantName}</span>
                        <span class="cart-item-price">$${price.toFixed(2)}</span>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="qty-decrease" data-index="${index}" aria-label="Decrease quantity">−</button>
                            <input type="number" class="qty-input" data-index="${index}" value="${quantity}" min="1" max="99" step="1" />
                            <button class="qty-increase" data-index="${index}" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="cart-item-remove" data-index="${index}" aria-label="Remove item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        });

        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : 5.99) : 0;
        const total = subtotal + tax + shipping;

        cartContent.innerHTML = `
            <div class="cart-items">
                ${itemsHtml}
            </div>
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row">
                    <span>Tax (8%)</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row total">
                    <span>Total</span>
                    <span class="cart-total-amount">$${total.toFixed(2)}</span>
                </div>
                <button class="cart-checkout-btn" id="checkout-btn">Proceed to Checkout</button>
            </div>
        `;

        // ----- Attach event listeners -----
        // Quantity decrease buttons
        document.querySelectorAll('.qty-decrease').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.dataset.index, 10);
                const input = document.querySelector(`.qty-input[data-index="${index}"]`);
                if (input) {
                    let val = parseInt(input.value, 10);
                    if (isNaN(val) || val <= 1) return;
                    input.value = val - 1;
                    input.dispatchEvent(new Event('change'));
                }
            });
        });

        // Quantity increase buttons
        document.querySelectorAll('.qty-increase').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.dataset.index, 10);
                const input = document.querySelector(`.qty-input[data-index="${index}"]`);
                if (input) {
                    let val = parseInt(input.value, 10);
                    if (isNaN(val)) val = 0;
                    if (val >= 99) return;
                    input.value = val + 1;
                    input.dispatchEvent(new Event('change'));
                }
            });
        });

        // Quantity input change
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', function () {
                const index = parseInt(this.dataset.index, 10);
                let val = parseInt(this.value, 10);
                if (isNaN(val) || val < 1) val = 1;
                if (val > 99) val = 99;
                this.value = val;
                updateCartItemQuantity(index, val);
            });

            // Also update on blur to catch any invalid values
            input.addEventListener('blur', function () {
                const index = parseInt(this.dataset.index, 10);
                let val = parseInt(this.value, 10);
                if (isNaN(val) || val < 1) val = 1;
                if (val > 99) val = 99;
                this.value = val;
                updateCartItemQuantity(index, val);
            });
        });

        // Remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.dataset.index, 10);
                removeCartItem(index);
            });
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function () {
                const cart = getCart();
                if (cart.length === 0) return;
                // Build order URL with cart data
                // We'll pass the cart as a query parameter or use localStorage
                // For simplicity, we use localStorage which the order page can read
                window.location.href = '/order/order.html';
            });
        }

        // Setup image fallbacks for cart items
        document.querySelectorAll('.cart-item-image img').forEach(img => {
            const parent = img.parentElement;
            const item = img.closest('.cart-item');
            const name = item?.querySelector('.cart-item-name')?.textContent || 'Product';
            const src = img.getAttribute('src');
            setupCartImage(img, src, name);
        });

        updateCartCount();
    }

    // ----- UPDATE CART ITEM QUANTITY -----
    function updateCartItemQuantity(index, quantity) {
        const cart = getCart();
        if (index < 0 || index >= cart.length) return;
        if (quantity < 1) {
            removeCartItem(index);
            return;
        }
        cart[index].quantity = quantity;
        saveCart(cart);
    }

    // ----- REMOVE CART ITEM -----
    function removeCartItem(index) {
        const cart = getCart();
        if (index < 0 || index >= cart.length) return;
        cart.splice(index, 1);
        saveCart(cart);
    }

    // ----- NAVIGATION TOGGLE (same as index) -----
    function initNavToggle() {
        const navToggle = document.querySelector('.nav-toggle');
        const primaryNav = document.getElementById('primary-nav');
        if (navToggle && primaryNav) {
            navToggle.addEventListener('click', function () {
                const isOpen = primaryNav.classList.toggle('is-open');
                this.setAttribute('aria-expanded', isOpen);
            });
        }
    }

    // ----- INIT -----
    function init() {
        renderCart();
        initNavToggle();
        updateCartCount();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
