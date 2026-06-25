const navItems = [
    { label: "Flight", href: "flight.html", active: true },
    { label: "Media", href: "media.html" },
    { label: "Ordering", href: "ordering.html" },
    { label: "Services", href: "interactive.html" },
];

const flightStats = [
    { label: "Altitude", value: "36,000 ft" },
    { label: "Airspeed", value: "548 mph" },
    { label: "ETA", value: "5h 42m" },
    { label: "Arrival Gate", value: "B32" },
];

const messages = [
    {
        title: "Pilot announcement",
        time: "10:42 AM",
        body: "We are cruising smoothly over the Atlantic and expect an on-time arrival in London.",
    },
    {
        title: "Cabin service",
        time: "10:55 AM",
        body: "Meal and beverage service will begin shortly in the forward cabin.",
    },
];

function FlightPage() {
    React.useEffect(() => {
        if (!window.L) {
            return;
        }

        const baltimore = [39.1754, -76.6684];
        const london = [51.47, -0.4543];
        const map = L.map("routeMap", {
            attributionControl: false,
            scrollWheelZoom: false,
            zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 7,
        }).addTo(map);

        const route = L.polyline([baltimore, london], {
            color: "#0d6efd",
            dashArray: "10 8",
            weight: 4,
        }).addTo(map);

        L.circleMarker(baltimore, {
            color: "#0d6efd",
            fillColor: "#ffffff",
            fillOpacity: 1,
            radius: 7,
            weight: 3,
        }).addTo(map).bindTooltip("Baltimore/Washington International");

        L.circleMarker(london, {
            color: "#198754",
            fillColor: "#ffffff",
            fillOpacity: 1,
            radius: 7,
            weight: 3,
        }).addTo(map).bindTooltip("London Heathrow");

        L.marker([47.2, -34.5]).addTo(map).bindTooltip("Current aircraft location");
        map.fitBounds(route.getBounds(), { padding: [28, 28] });

        return () => map.remove();
    }, []);

    return (
        <div className="app-shell">
            <header className="top-nav shadow-sm">
                <a className="nav-brand" href="flight.html" aria-label="SkyLink flight dashboard">
                    <span className="brand-mark">SL</span>
                    <span>SkyLink</span>
                </a>

                <nav className="nav-links" aria-label="Primary navigation">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            className={item.active ? "active" : ""}
                            href={item.href}
                            aria-current={item.active ? "page" : undefined}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button className="attendant-button btn btn-primary" type="button">Call Attendant</button>
            </header>

            <main className="dashboard container-fluid">
                <section className="dashboard-hero hero-card shadow-sm">
                    <div>
                        <p className="eyebrow">Flight IF 437</p>
                        <h1>Baltimore to London</h1>
                        <p>
                            Track your route, arrival estimate, local times, and important
                            flight updates from one touch-friendly dashboard.
                        </p>
                    </div>
                    <div className="flight-status badge text-bg-success">
                        <span className="status-dot"></span>
                        On time
                    </div>
                </section>

                <section className="dashboard-grid" aria-label="Flight dashboard">
                    <div className="panel route-panel shadow-sm">
                        <div className="panel-heading">
                            <h2>Route Map</h2>
                            <span>BWI to LHR</span>
                        </div>
                        <div className="route-map" aria-label="Flight route from Baltimore to London">
                            <div id="routeMap" className="leaflet-map"></div>
                            <div className="map-chip origin">BWI</div>
                            <div className="map-chip destination">LHR</div>
                        </div>
                        <div className="route-summary">
                            <div>
                                <span>Departed</span>
                                <strong>Baltimore, MD</strong>
                                <small>6:45 PM local</small>
                            </div>
                            <div>
                                <span>Arriving</span>
                                <strong>London, UK</strong>
                                <small>6:55 AM local</small>
                            </div>
                        </div>
                    </div>

                    <div className="panel stats-panel shadow-sm">
                        <div className="panel-heading">
                            <h2>Live Flight Info</h2>
                            <span>Updated now</span>
                        </div>
                        <div className="stat-grid">
                            {flightStats.map((stat) => (
                                <article className="stat-card" key={stat.label}>
                                    <span>{stat.label}</span>
                                    <strong>{stat.value}</strong>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="panel weather-panel shadow-sm">
                        <div className="panel-heading">
                            <h2>Arrival Weather</h2>
                            <span>London</span>
                        </div>
                        <div className="weather-content">
                            <strong>58 F</strong>
                            <span>Cloudy, light rain</span>
                            <p>Plan for wet ground transportation after arrival at Heathrow.</p>
                        </div>
                    </div>

                    <div className="panel messages-panel shadow-sm">
                        <div className="panel-heading">
                            <h2>Announcements</h2>
                            <span>Accessible message log</span>
                        </div>
                        <div className="message-list">
                            {messages.map((message) => (
                                <article className="message-card" key={message.title}>
                                    <div>
                                        <strong>{message.title}</strong>
                                        <time>{message.time}</time>
                                    </div>
                                    <p>{message.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="panel safety-panel shadow-sm">
                        <div className="panel-heading">
                            <h2>Safety Info</h2>
                            <span>Always available</span>
                        </div>
                        <ul className="safety-list">
                            <li>Nearest exits are forward left and rear right from this cabin zone.</li>
                            <li>Keep seat belt fastened whenever seated.</li>
                            <li>Review the seatback safety card before landing.</li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}
