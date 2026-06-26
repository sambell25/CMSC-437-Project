function SimpleNav({ active = "Media" }) {
    const navItems = [
        { label: "Flight", href: "flight.html" },
        { label: "Media", href: "media.html" },
        { label: "Ordering", href: "ordering.html" },
        { label: "Services", href: "interactive.html" },
    ];
    const normalizedActive = active === "Interactive" ? "Services" : active;

    return (
        <header className="top-nav shadow-sm">
            <a className="nav-brand" href="index.html" aria-label="SkyLink login page">
                <span className="brand-mark">SL</span>
                <span>SkyLink</span>
            </a>

            <nav className="nav-links" aria-label="Primary navigation">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        className={normalizedActive === item.label ? "active" : ""}
                        href={item.href}
                        aria-current={normalizedActive === item.label ? "page" : undefined}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            <a className="attendant-button btn btn-primary" href="interactive.html#attendant">
                Call Attendant
            </a>
        </header>
    );
}
