const navItems = [
    { label: "Flight", href: "flight.html", active: true },
    { label: "Media", href: "media.html" },
    { label: "Ordering", href: "ordering.html" },
    { label: "Services", href: "interactive.html" },
];

const routeStartProgress = 0.18;
const routeEndProgress = 0.82;
const maxEtaMinutes = 342;
const simulatedMinuteMs = 60000;
const simulatedLoopMs = maxEtaMinutes * simulatedMinuteMs;
const telemetryRefreshMs = 5000;

function interpolatePoint(start, end, progress) {
    return [
        start[0] + (end[0] - start[0]) * progress,
        start[1] + (end[1] - start[1]) * progress,
    ];
}

function getRoutePhase(elapsedMs) {
    return (elapsedMs % simulatedLoopMs) / simulatedLoopMs;
}

function getRouteProgress(elapsedMs) {
    const phase = getRoutePhase(elapsedMs);
    return routeStartProgress + phase * (routeEndProgress - routeStartProgress);
}

function formatEta(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

function getSimulatedFlightInfo(elapsedMs) {
    const elapsedMinutes = Math.floor((elapsedMs % simulatedLoopMs) / simulatedMinuteMs);
    const routeProgress = getRouteProgress(elapsedMs);
    const altitude =
        36000 +
        Math.round(Math.sin(elapsedMs / 45000) * 160) +
        Math.round(Math.sin(elapsedMs / 13000) * 45);
    const airspeed =
        548 +
        Math.round(Math.cos(elapsedMs / 52000) * 8) +
        Math.round(Math.sin(elapsedMs / 17000) * 4);
    const etaMinutes = Math.max(0, maxEtaMinutes - elapsedMinutes);

    return {
        progress: routeProgress,
        stats: [
            { label: "Altitude", value: `${altitude.toLocaleString()} ft` },
            { label: "Airspeed", value: `${airspeed} mph` },
            { label: "ETA", value: formatEta(etaMinutes) },
            { label: "Route Progress", value: `${(routeProgress * 100).toFixed(1)}%` },
        ],
    };
}

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
    const [simulationElapsedMs, setSimulationElapsedMs] = React.useState(0);
    const simulatedFlightInfo = getSimulatedFlightInfo(simulationElapsedMs);

    React.useEffect(() => {
        const telemetryTimer = window.setInterval(() => {
            setSimulationElapsedMs((currentElapsedMs) =>
                (currentElapsedMs + telemetryRefreshMs) % simulatedLoopMs
            );
        }, telemetryRefreshMs);

        return () => window.clearInterval(telemetryTimer);
    }, []);

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

        const aircraftIcon = L.divIcon({
            className: "aircraft-marker",
            html: "<span aria-hidden=\"true\">&#9992;</span>",
            iconAnchor: [16, 16],
            iconSize: [32, 32],
        });

        let routeElapsedMs = 0;
        const aircraftMarker = L.marker(
            interpolatePoint(baltimore, london, getRouteProgress(routeElapsedMs)),
            { icon: aircraftIcon }
        ).addTo(map).bindTooltip("Current aircraft location");

        const routeTimer = window.setInterval(() => {
            routeElapsedMs = (routeElapsedMs + telemetryRefreshMs) % simulatedLoopMs;
            aircraftMarker.setLatLng(interpolatePoint(baltimore, london, getRouteProgress(routeElapsedMs)));
        }, telemetryRefreshMs);

        map.fitBounds(route.getBounds(), { padding: [28, 28] });

        return () => {
            window.clearInterval(routeTimer);
            map.remove();
        };
    }, []);

    return (
        <div className="app-shell">
            <header className="top-nav shadow-sm">
                <a className="nav-brand" href="index.html" aria-label="SkyLink login page">
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

                <a className="attendant-button btn btn-primary" href="interactive.html#attendant">
                    Call Attendant
                </a>
            </header>

            <main className="dashboard container-fluid">
                <section
                    className="dashboard-hero hero-card hero-image shadow-sm"
                    style={{
                        backgroundPosition: "center 46%",
                        backgroundImage:
                            "linear-gradient(135deg, rgba(16, 35, 63, 0.78), rgba(13, 110, 253, 0.42)), url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&h=700&fit=crop')",
                    }}
                >
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
                            <span>Simulated Live</span>
                        </div>
                        <div className="stat-grid">
                            {simulatedFlightInfo.stats.map((stat) => (
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
