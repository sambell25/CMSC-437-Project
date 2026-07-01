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

function SubTabs({ tabs, active, onChange, ariaLabel = "Section tabs" }) {
    function getTabId(tab) {
        return typeof tab === "string" ? tab : tab.id;
    }

    function getTabLabel(tab) {
        return typeof tab === "string" ? tab : tab.label;
    }

    return (
        <div className="card panel p-0 border-0 shadow-sm mb-4 mx-auto" style={{ maxWidth: "1180px" }}>
            <div className="card-body">
                <div className="nav nav-pills gap-2" role="tablist" aria-label={ariaLabel}>
                    {tabs.map((tab) => {
                        const tabId = getTabId(tab);
                        const tabLabel = getTabLabel(tab);

                        return (
                            <button
                                key={tabId}
                                className={`nav-link fw-bold ${active === tabId ? "active" : ""}`}
                                type="button"
                                role="tab"
                                aria-selected={active === tabId}
                                onClick={() => onChange(tabId)}
                            >
                                {tabLabel}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
