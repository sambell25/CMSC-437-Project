const navItems = [
    { label: "Flight", href: "flight.html" },
    { label: "Media", href: "media.html" },
    { label: "Ordering", href: "ordering.html", active: true },
    { label: "Services", href: "interactive.html" },
];

const MENU = {
    Meals: [
        { id: 1, name: "Grilled Chicken & Rice", desc: "Seasonal vegetables and garlic bread.", price: 15.00, img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=80&h=80&fit=crop" },
        { id: 2, name: "Margherita Pizza", desc: "Tomato sauce, mozzarella, fresh basil.", price: 13.00, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop" },
        { id: 3, name: "Caesar Salad", desc: "Romaine, parmesan, croutons, house dressing.", price: 9.00, img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=80&h=80&fit=crop" },
        { id: 4, name: "Fruit Platter", desc: "Assorted fresh seasonal fruits.", price: 6.00, img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=80&h=80&fit=crop" },
    ],
    Snacks: [
        { id: 5, name: "Mixed Nuts", desc: "Lightly salted roasted nut blend.", price: 4.00, img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=80&h=80&fit=crop" },
        { id: 6, name: "Cheese & Crackers", desc: "Aged cheddar with assorted crackers.", price: 5.00, img: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=80&h=80&fit=crop" },
        { id: 7, name: "Chocolate Bar", desc: "Premium dark chocolate, 70% cacao.", price: 3.00, img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=80&h=80&fit=crop" },
    ],
    Drinks: [
        { id: 8, name: "Orange Juice", desc: "Fresh-squeezed orange juice.", price: 3.00, img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=80&h=80&fit=crop" },
        { id: 9, name: "Sparkling Water", desc: "San Pellegrino mineral water.", price: 2.00, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=80&h=80&fit=crop" },
        { id: 10, name: "Coffee", desc: "Freshly brewed Arabica coffee.", price: 3.50, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop" },
    ],
    "Duty-Free": [
        { id: 11, name: "Perfume - Lumière", desc: "Elegant floral scent, 50 ml.", price: 45.00, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=80&h=80&fit=crop" },
        { id: 12, name: "Whisky - Glen Reserve", desc: "12-year single malt Scotch.", price: 38.00, img: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=80&h=80&fit=crop" },
        { id: 13, name: "Aviator Sunglasses", desc: "Polarized UV400 protection frames.", price: 29.00, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop" },
    ],
};

const TABS = Object.keys(MENU);
const TAX_RATE = 0.10;

function OrderingPage() {
    const [view, setView] = React.useState("shop");
    const [activeTab, setActiveTab] = React.useState("Meals");
    const [cart, setCart] = React.useState({});
    const [payment, setPayment] = React.useState({ name: "", card: "", expiry: "", cvv: "" });
    const [errors, setErrors] = React.useState({});

    function addToCart(item) {
        const newCart = { ...cart };
        if (newCart[item.id]) {
            newCart[item.id].qty = newCart[item.id].qty + 1;
        } else {
            newCart[item.id] = { ...item, qty: 1 };
        }
        setCart(newCart);
    }

    function changeQty(id, delta) {
        const newCart = { ...cart };
        const newQty = newCart[id].qty + delta;
        if (newQty <= 0) {
            delete newCart[id];
        } else {
            newCart[id].qty = newQty;
        }
        setCart(newCart);
    }

    function validate() {
        const newErrors = {};
        if (!payment.name.trim()) {
            newErrors.name = "Required";
        }
        if (!/^\d{16}$/.test(payment.card.replace(/\s/g, ""))) {
            newErrors.card = "Enter a valid 16-digit number";
        }
        if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
            newErrors.expiry = "MM/YY format";
        }
        if (!/^\d{3,4}$/.test(payment.cvv)) {
            newErrors.cvv = "3-4 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleConfirm() {
        const isValid = validate();
        if (isValid) {
            setView("confirmed");
        }
    }

    function handleCardInput(e) {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
        const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
        setPayment({ ...payment, card: formatted });
    }

    function handleExpiryInput(e) {
        let val = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (val.length > 2) {
            val = val.slice(0, 2) + "/" + val.slice(2);
        }
        setPayment({ ...payment, expiry: val });
    }

    function handleCvvInput(e) {
        const val = e.target.value.replace(/\D/g, "").slice(0, 4);
        setPayment({ ...payment, cvv: val });
    }

    function resetPage() {
        setView("shop");
        setCart({});
        setPayment({ name: "", card: "", expiry: "", cvv: "" });
    }

    // Calculate totals
    const cartItems = Object.values(cart);
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        subtotal += cartItems[i].price * cartItems[i].qty;
    }
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    let cartCount = 0;
    for (let i = 0; i < cartItems.length; i++) {
        cartCount += cartItems[i].qty;
    }

    // Shared navbar used on all three views
    function Nav() {
        return (
            <header className="top-nav shadow-sm">
                <a className="nav-brand" href="flight.html">
                    <span className="brand-mark">SL</span>
                    <span>SkyLink</span>
                </a>
                <nav className="nav-links">
                    {navItems.map(function(item) {
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                className={item.active ? "active" : ""}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </nav>
                <button className="attendant-button btn btn-primary" type="button">
                    Call Attendant
                </button>
            </header>
        );
    }

    // ── Confirmed view ──────────────────────────────────────────────────────
    if (view === "confirmed") {
        return (
            <div className="app-shell">
                <Nav />
                <main className="dashboard container-fluid">
                    <div className="order-confirmed-wrap">
                        <div className="panel shadow-sm confirmed-panel">
                            <div className="confirmed-icon">✅</div>
                            <h1>Order Confirmed</h1>
                            <p className="confirmed-sub">
                                Your order is in. Our cabin crew will deliver your items shortly.
                                A receipt is available in the Services section.
                            </p>

                            <div className="confirmed-receipt">
                                <div className="panel-heading">
                                    <h2>Receipt</h2>
                                    <span>Flight IF 437</span>
                                </div>
                                {cartItems.map(function(item) {
                                    return (
                                        <div key={item.id} className="receipt-row">
                                            <span>
                                                <img src={item.img} alt={item.name} className="cart-emoji" />
                                                {item.name} × {item.qty}
                                            </span>
                                            <strong>${(item.price * item.qty).toFixed(2)}</strong>
                                        </div>
                                    );
                                })}
                                <div className="receipt-row muted">
                                    <span>Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="receipt-row total-row">
                                    <span>Total charged</span>
                                    <strong>${total.toFixed(2)}</strong>
                                </div>
                            </div>

                            <button className="primary-button" onClick={resetPage}>
                                Back to Menu
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // ── Checkout view ──────────────────────────────────────────────────────
    if (view === "checkout") {
        return (
            <div className="app-shell">
                <Nav />
                <main className="dashboard container-fluid">
                    <section className="dashboard-hero hero-card shadow-sm">
                        <div>
                            <p className="eyebrow">Checkout</p>
                            <h1>Review &amp; Pay</h1>
                            <p>Confirm your order and enter payment details below.</p>
                        </div>
                        <button className="secondary-button" onClick={() => setView("shop")}>
                            ← Back to Menu
                        </button>
                    </section>

                    <div className="checkout-grid">

                        {/* Order summary */}
                        <div className="panel shadow-sm">
                            <div className="panel-heading">
                                <h2>Order Summary</h2>
                                <span>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
                            </div>
                            {cartItems.map(function(item) {
                                return (
                                    <div key={item.id} className="receipt-row">
                                        <span>
                                            <img src={item.img} alt={item.name} className="cart-emoji" />
                                            {item.name} × {item.qty}
                                        </span>
                                        <strong>${(item.price * item.qty).toFixed(2)}</strong>
                                    </div>
                                );
                            })}
                            <div className="receipt-row muted">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="receipt-row muted">
                                <span>Tax (10%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="receipt-row total-row">
                                <span>Total</span>
                                <strong>${total.toFixed(2)}</strong>
                            </div>
                            <div className="security-note">
                                🔒 Your payment information is encrypted and secure.
                            </div>
                        </div>

                        {/* Payment form */}
                        <div className="panel shadow-sm">
                            <div className="panel-heading">
                                <h2>Payment Information</h2>
                            </div>

                            <label className="field-label">Cardholder Name</label>
                            <input
                                className={errors.name ? "field-input field-error" : "field-input"}
                                placeholder="Jane Smith"
                                value={payment.name}
                                onChange={e => setPayment({ ...payment, name: e.target.value })}
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}

                            <label className="field-label">Card Number</label>
                            <input
                                className={errors.card ? "field-input field-error" : "field-input"}
                                placeholder="4242 4242 4242 4242"
                                value={payment.card}
                                maxLength={19}
                                onChange={handleCardInput}
                            />
                            {errors.card && <p className="error-text">{errors.card}</p>}

                            <div className="field-row">
                                <div>
                                    <label className="field-label">Expiry</label>
                                    <input
                                        className={errors.expiry ? "field-input field-error" : "field-input"}
                                        placeholder="MM/YY"
                                        value={payment.expiry}
                                        maxLength={5}
                                        onChange={handleExpiryInput}
                                    />
                                    {errors.expiry && <p className="error-text">{errors.expiry}</p>}
                                </div>
                                <div>
                                    <label className="field-label">CVV</label>
                                    <input
                                        className={errors.cvv ? "field-input field-error" : "field-input"}
                                        placeholder="···"
                                        value={payment.cvv}
                                        maxLength={4}
                                        onChange={handleCvvInput}
                                    />
                                    {errors.cvv && <p className="error-text">{errors.cvv}</p>}
                                </div>
                            </div>

                            <button className="primary-button confirm-btn" onClick={handleConfirm}>
                                🔒 Confirm Purchase — ${total.toFixed(2)}
                            </button>
                            <button className="secondary-button cancel-btn" onClick={() => setView("shop")}>
                                Cancel
                            </button>

                            <p className="payment-footnote">
                                After payment, your order status is available in the Services section.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // ── Shop view (default) ─────────────────────────────────────────────────
    const items = MENU[activeTab];

    return (
        <div className="app-shell">
            <Nav />
            <main className="dashboard container-fluid">

                <section className="dashboard-hero hero-card shadow-sm">
                    <div>
                        <p className="eyebrow">Food &amp; Duty-Free</p>
                        <h1>Order Onboard</h1>
                        <p>Meals, snacks, drinks, and duty-free delivered to your seat.</p>
                    </div>
                    <div className="flight-status badge text-bg-success">
                        <span className="status-dot"></span>
                        Seat 14C
                    </div>
                </section>

                <div className="shop-layout">

                    {/* Menu panel */}
                    <div>
                        <div className="tab-bar">
                            {TABS.map(function(tab) {
                                return (
                                    <button
                                        key={tab}
                                        className={activeTab === tab ? "tab-btn tab-btn--active" : "tab-btn"}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="panel shadow-sm">
                            {items.map(function(item, idx) {
                                return (
                                    <article
                                        key={item.id}
                                        className={idx < items.length - 1 ? "menu-row menu-row--bordered" : "menu-row"}
                                    >
                                        <img src={item.img} alt={item.name} className="menu-emoji" />
                                        <div className="menu-info">
                                            <strong className="menu-name">{item.name}</strong>
                                            <span className="menu-desc">{item.desc}</span>
                                        </div>
                                        <span className="menu-price">${item.price.toFixed(2)}</span>
                                        {cart[item.id] ? (
                                            <div className="qty-control">
                                                <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                                                <span className="qty-val">{cart[item.id].qty}</span>
                                                <button className="qty-btn" onClick={() => changeQty(item.id, +1)}>+</button>
                                            </div>
                                        ) : (
                                            <button className="add-btn" onClick={() => addToCart(item)}>Add</button>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    {/* Cart panel */}
                    <aside>
                        <div className="panel shadow-sm cart-panel">
                            <div className="panel-heading">
                                <h2>Your Cart</h2>
                                {cartCount > 0 && <span>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>}
                            </div>

                            {cartItems.length === 0 ? (
                                <p className="cart-empty">
                                    Your cart is empty.<br />Add items from the menu.
                                </p>
                            ) : (
                                <div>
                                    {cartItems.map(function(item) {
                                        return (
                                            <div key={item.id} className="cart-row">
                                                <img src={item.img} alt={item.name} className="cart-emoji" />
                                                <div className="cart-info">
                                                    <strong>{item.name}</strong>
                                                    <span>${item.price.toFixed(2)} each</span>
                                                </div>
                                                <div className="qty-control">
                                                    <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                                                    <span className="qty-val">{item.qty}</span>
                                                    <button className="qty-btn" onClick={() => changeQty(item.id, +1)}>+</button>
                                                </div>
                                                <strong className="cart-line-total">${(item.price * item.qty).toFixed(2)}</strong>
                                            </div>
                                        );
                                    })}

                                    <div className="receipt-row muted" style={{ marginTop: 12 }}>
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="receipt-row muted">
                                        <span>Tax (10%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="receipt-row total-row">
                                        <span>Total</span>
                                        <strong>${total.toFixed(2)}</strong>
                                    </div>

                                    <button className="primary-button review-btn" onClick={() => setView("checkout")}>
                                        Review Order →
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

            </main>
        </div>
    );
}