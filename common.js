function SimpleNav({ active = 'Media' }){
    return (
        <header className="top-nav">
            <a className="nav-brand" href="index.html">
                <span className="brand-mark">SL</span>
                <span>SkyLink</span>
            </a>
            <nav className="nav-links" aria-label="Primary navigation">
                <a className={active === 'Home' ? 'active' : ''} href="index.html">Home</a>
                <a className={active === 'Media' ? 'active' : ''} href="media.html">Media</a>
                <a className={active === 'Flight' ? 'active' : ''} href="flight.html">Flight Info</a>
                <a className={active === 'Interactive' ? 'active' : ''} href="interactive.html">Interactive</a>
            </nav>
        </header>
    );
}