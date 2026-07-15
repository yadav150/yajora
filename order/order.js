/* ============================================================
   YAJORA — order/order.js
   Checkout page: customer details, order review, place order.
   ============================================================ */

(function () {
    'use strict';

    // ----- DOM REFS -----
    const orderContent = document.getElementById('order-content');
    const cartCountEl = document.querySelector('.cart-count');

    // ----- PRODUCT DATA (shared) -----
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

    function clearCart() {
        localStorage.removeItem('yajora_cart');
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

    function getProductById(id) {
        return products.find(p => p.id === id);
    }

    // ----- GENERATE ORDER NUMBER -----
    function generateOrderNumber() {
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return 'YAJ-' + timestamp + '-' + random;
    }

    // ----- SIMULATE ORDER SUBMISSION (DEMO MODE) -----
    function submitOrder(orderData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay (1.5 - 2.5 seconds)
            const delay = 1500 + Math.random() * 1000;
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() < 0.95) {
                    resolve({
                        success: true,
                        orderNumber: generateOrderNumber(),
                        message: 'Order placed successfully!'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Something went wrong. Please try again.'
                    });
                }
            }, delay);
        });
    }

    // ----- RENDER ORDER PAGE -----
    function renderOrder() {
        const cart = getCart();

        // Check if cart is empty
        if (cart.length === 0) {
            // Try to get product from URL params (direct order from product page)
            const params = new URLSearchParams(window.location.search);
            const slug = params.get('slug');
            const variantIdx = parseInt(params.get('variant'), 10) || 0;
            const qty = parseInt(params.get('qty'), 10) || 1;

            if (slug) {
                // Direct order from product page — build a single-item cart
                const product = products.find(p => p.slug === slug);
                if (product) {
                    const variant = product.variants[variantIdx] || product.variants[0];
                    const tempCart = [{
                        productId: product.id,
                        variantIndex: variantIdx,
                        quantity: qty,
                        name: product.name,
                        variantName: variant.name,
                        price: variant.price,
                        image: product.images[0] || ''
                    }];
                    renderOrderForm(tempCart);
                    return;
                }
            }

            // Empty cart with no direct product — show empty state
            orderContent.innerHTML = `
                <div class="order-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <h2>Your cart is empty</h2>
                    <p>Add some items to your cart before checking out.</p>
                    <a href="/" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
            return;
        }

        renderOrderForm(cart);
    }

    // ----- RENDER ORDER FORM -----
    function renderOrderForm(cart) {
        // Calculate totals
        let subtotal = 0;
        let itemsHtml = '';

        cart.forEach(item => {
            const totalPrice = item.price * item.quantity;
            subtotal += totalPrice;
            itemsHtml += `
                <div class="order-summary-item">
                    <span class="item-name">${item.name} (${item.variantName})</span>
                    <span class="item-qty">×${item.quantity}</span>
                    <span class="item-price">$${totalPrice.toFixed(2)}</span>
                </div>
            `;
        });

        const tax = subtotal * 0.08;
        const shipping = subtotal >= 50 ? 0 : 5.99;
        const total = subtotal + tax + shipping;

        const html = `
            <div class="order-content">
                <!-- Customer Details Form -->
                <div class="order-form-section">
                    <h2>Customer Details</h2>
                    <form class="order-form" id="order-form" novalidate>
                        <div class="form-group">
                            <label for="full-name">Full Name <span class="required">*</span></label>
                            <input type="text" id="full-name" name="fullName" placeholder="John Doe" required autocomplete="name" />
                            <span class="error-message">Please enter your full name</span>
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address <span class="required">*</span></label>
                            <input type="email" id="email" name="email" placeholder="john@example.com" required autocomplete="email" />
                            <span class="error-message">Please enter a valid email address</span>
                        </div>

                        <div class="form-group">
                            <label for="phone">Phone Number <span class="required">*</span></label>
                            <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567" required autocomplete="tel" />
                            <span class="error-message">Please enter a valid phone number</span>
                        </div>

                        <div class="form-group">
                            <label for="address">Delivery Address <span class="required">*</span></label>
                            <textarea id="address" name="address" placeholder="123 Main Street, Apt 4B, City, State, ZIP" required></textarea>
                            <span class="error-message">Please enter your delivery address</span>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="delivery-date">Preferred Delivery Date</label>
                                <input type="date" id="delivery-date" name="deliveryDate" />
                            </div>
                            <div class="form-group">
                                <label for="delivery-time">Preferred Delivery Time</label>
                                <select id="delivery-time" name="deliveryTime">
                                    <option value="">Any time</option>
                                    <option value="morning">Morning (8am – 12pm)</option>
                                    <option value="afternoon">Afternoon (12pm – 5pm)</option>
                                    <option value="evening">Evening (5pm – 9pm)</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="notes">Order Notes</label>
                            <textarea id="notes" name="notes" placeholder="Special instructions, delivery notes, etc." rows="3"></textarea>
                        </div>
                    </form>
                </div>

                <!-- Order Summary -->
                <div class="order-summary-section">
                    <h2>Order Summary</h2>
                    <div class="order-summary-items">
                        ${itemsHtml}
                    </div>
                    <div class="order-summary-totals">
                        <div class="total-row">
                            <span>Subtotal</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="total-row">
                            <span>Tax (8%)</span>
                            <span>$${tax.toFixed(2)}</span>
                        </div>
                        <div class="total-row">
                            <span>Shipping</span>
                            <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                        </div>
                        <div class="total-row grand-total">
                            <span>Total</span>
                            <span class="grand-total-amount">$${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="order-actions">
                        <button class="btn-place-order" id="place-order-btn">Place Order</button>
                        <a href="/cart/cart.html" class="btn btn-outline" style="text-align:center;">Return to Cart</a>
                    </div>
                </div>
            </div>
        `;

        orderContent.innerHTML = html;

        // ----- ATTACH EVENT LISTENERS -----
        const form = document.getElementById('order-form');
        const placeOrderBtn = document.getElementById('place-order-btn');

        // Set default delivery date to tomorrow
        const dateInput = document.getElementById('delivery-date');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const year = tomorrow.getFullYear();
            const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const day = String(tomorrow.getDate()).padStart(2, '0');
            dateInput.min = `${year}-${month}-${day}`;
        }

        // Real-time validation on blur
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', function () {
                validateField(this);
            });
            field.addEventListener('input', function () {
                if (this.closest('.form-group')?.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Place order button
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', function (e) {
                e.preventDefault();
                handlePlaceOrder(this, form, cart);
            });
        }

        // Allow Enter key to submit
        form.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const btn = document.getElementById('place-order-btn');
                if (btn && !btn.disabled) {
                    btn.click();
                }
            }
        });
    }

    // ----- FIELD VALIDATION -----
    function validateField(field) {
        const group = field.closest('.form-group');
        if (!group) return true;

        let isValid = true;

        if (field.hasAttribute('required')) {
            const value = field.value.trim();
            if (value === '') {
                isValid = false;
            } else if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                }
            } else if (field.type === 'tel') {
                // Basic phone validation: at least 7 digits
                const digits = value.replace(/\D/g, '');
                if (digits.length < 7) {
                    isValid = false;
                }
            }
        }

        if (isValid) {
            group.classList.remove('error');
        } else {
            group.classList.add('error');
        }

        return isValid;
    }

    // ----- VALIDATE ENTIRE FORM -----
    function validateForm(form) {
        const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
        let allValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                allValid = false;
            }
        });

        return allValid;
    }

    // ----- HANDLE PLACE ORDER -----
    async function handlePlaceOrder(button, form, cart) {
        // Validate form
        if (!validateForm(form)) {
            // Scroll to first error
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const input = firstError.querySelector('input, textarea, select');
                if (input) input.focus();
            }
            return;
        }

        // Disable button and show loading state
        button.disabled = true;
        button.classList.add('loading');
        const originalText = button.textContent;
        button.textContent = 'Processing...';

        // Gather order data
        const formData = new FormData(form);
        const customerData = {
            fullName: formData.get('fullName') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            address: formData.get('address') || '',
            deliveryDate: formData.get('deliveryDate') || '',
            deliveryTime: formData.get('deliveryTime') || '',
            notes: formData.get('notes') || ''
        };

        // Calculate totals
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        const tax = subtotal * 0.08;
        const shipping = subtotal >= 50 ? 0 : 5.99;
        const total = subtotal + tax + shipping;

        const orderData = {
            customer: customerData,
            items: cart.map(item => ({
                productId: item.productId,
                name: item.name,
                variant: item.variantName,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            totals: {
                subtotal: subtotal,
                tax: tax,
                shipping: shipping,
                total: total
            },
            orderDate: new Date().toISOString()
        };

        try {
            // Submit order (demo mode)
            const result = await submitOrder(orderData);

            // Order successful
            button.classList.remove('loading');
            button.textContent = 'Order Placed!';
            button.style.backgroundColor = 'var(--color-success, #2D6A4F)';

            // Clear cart
            clearCart();

            // Show success message after brief delay
            setTimeout(() => {
                showOrderSuccess(result.orderNumber, orderData);
            }, 600);

        } catch (error) {
            // Order failed
            button.disabled = false;
            button.classList.remove('loading');
            button.textContent = originalText;
            button.style.backgroundColor = '';

            // Show error message
            alert(error.message || 'Something went wrong. Please try again.');
        }
    }

    // ----- SHOW ORDER SUCCESS -----
    function showOrderSuccess(orderNumber, orderData) {
        const customer = orderData.customer;

        orderContent.innerHTML = `
            <div class="order-success">
                <div class="success-icon">✓</div>
                <h2>Order Successful!</h2>
                <p>Thank you, ${customer.fullName || 'Customer'}! Your order has been placed successfully.</p>
                <div class="order-number">Order #${orderNumber}</div>
                <p style="font-size:var(--font-size-sm);color:var(--color-text-light);">
                    A confirmation email has been sent to ${customer.email || 'your email'}.
                </p>
                <div style="margin-top:var(--spacing-lg);display:flex;gap:var(--spacing-md);flex-wrap:wrap;justify-content:center;">
                    <a href="/" class="btn btn-primary">Continue Shopping</a>
                    <a href="/cart/cart.html" class="btn btn-outline">View Orders</a>
                </div>
            </div>
        `;

        // Update cart count
        updateCartCount();
    }

    // ----- NAVIGATION TOGGLE -----
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
        renderOrder();
        initNavToggle();
        updateCartCount();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
