function IndexPage() {
    return (
        <main className="guest-page">
            <section
                className="guest-hero hero-image"
                style={{
                    backgroundImage:
                        "linear-gradient(135deg, rgba(16, 35, 63, 0.84), rgba(13, 110, 253, 0.48)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop')",
                }}
            >
                <div className="brand-lockup">
                    <span className="brand-mark">SL</span>
                    <span>SkyLink In-Flight</span>
                </div>

                <div className="guest-copy">
                    <p className="eyebrow">CMSC 437 Group 7 Prototype</p>
                    <h1>Welcome Aboard</h1>
                    <p>
                        Continue as a guest to view flight status, entertainment,
                        onboard ordering, and passenger services from your own device.
                    </p>
                </div>

                <div className="guest-actions">
                    <a className="primary-button" href="flight.html">Continue as Guest</a>
                    <button className="secondary-button" type="button">Log In</button>
                </div>

                <div className="service-preview" aria-label="Available services">
                    <span>Flight dashboard</span>
                    <span>Entertainment</span>
                    <span>Food and duty-free</span>
                    <span>Passenger services</span>
                </div>
            </section>
        </main>
    );
}
