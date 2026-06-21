
const CATALOG = [
    {
        id: 'm1',
        type: 'Movie',
        title: 'Oceanic Journey',
        synopsis: 'A sweeping drama about a transatlantic flight and the people on board.',
        cast: ['A. Actor', 'B. Actress'],
        duration: '2h 12m',
        rating: 'PG-13',
        tags: ['Drama', 'Trending']
    },
    {
        id: 'm2',
        type: 'TV',
        title: 'Skyline Detectives S1E1',
        synopsis: 'Pilot episode of a detective drama set in a coastal city.',
        cast: ['Detective A', 'Detective B'],
        duration: '48m',
        rating: 'TV-14',
        tags: ['Crime']
    },
    {
        id: 's1',
        type: 'Music',
        title: 'Clouds Over London — Single',
        synopsis: 'A mellow instrumental perfect for descending into the city.',
        cast: ['The Altimeters'],
        duration: '3:45',
        rating: '',
        tags: ['Instrumental', 'Chill']
    },
    {
        id: 'm3',
        type: 'Movie',
        title: 'Heathrow Nights',
        synopsis: 'A romantic comedy about two travelers who meet at the terminal.',
        cast: ['C. Star', 'D. Starlet'],
        duration: '1h 38m',
        rating: 'PG',
        tags: ['RomCom']
    }
];

const ATTRACTIONS = {
    'London': [
        { name: 'Tower of London', description: 'Historic castle on the north bank of the River Thames.' },
        { name: 'British Museum', description: 'World-famous museum of human history and culture.' },
        { name: 'Big Ben & Westminster', description: 'Iconic clock tower and nearby Parliament.' }
    ],
    'Baltimore': [
        { name: 'Inner Harbor', description: 'Waterfront with shops, museums, and aquarium.' },
        { name: 'Fort McHenry', description: 'Historic fort that inspired the U.S. national anthem.' }
    ]
};

const PLAYLISTS = [
    { name: 'Chill Instrumentals', items: ['Clouds Over London'] },
    { name: 'In-Flight Drama', items: ['Oceanic Journey', 'Skyline Detectives S1E1'] },
    { name: 'Easy Landing Mix', items: ['Heathrow Nights'] }
];

function MediaPage(){
    const [route, setRoute] = React.useState('catalog');
    const [favorites, setFavorites] = React.useState([]);
    return (
        <div>
            <SimpleNav active="Media" />
            <main className="dashboard">
                <section className="dashboard-hero guest-hero panel">
                    <div>
                        <p className="eyebrow">In-flight Entertainment</p>
                        <h1>Media & Attractions</h1>
                        <p>Browse movies, TV shows, and music. Save favorites and explore attractions at your destination.</p>
                        <div className="guest-actions" style={{marginTop:12}}>
                            <button className="secondary-button" type="button" onClick={() => setRoute('catalog')}>Catalog</button>
                            <button className="secondary-button" type="button" onClick={() => setRoute('playlists')}>Playlists</button>
                            <button className="secondary-button" type="button" onClick={() => setRoute('favorites')}>Favorites</button>
                            <button className="secondary-button" type="button" onClick={() => setRoute('attractions')}>Attractions</button>
                        </div>
                    </div>
                </section>

                <section style={{maxWidth:1180, margin:'18px auto'}}>
                    {route === 'catalog' && <Catalog favorites={favorites} setFavorites={setFavorites} onSelectRoute={setRoute} />}
                    {route === 'playlists' && <Playlists />}
                    {route === 'favorites' && <FavoritesView favorites={favorites} />}
                    {route === 'attractions' && <AttractionsView />}
                </section>
            </main>
        </div>
    );
}

function Catalog({ favorites, setFavorites, onSelectRoute }){
    const firstItem = CATALOG[0];
    const secondItem = CATALOG[1];
    const thirdItem = CATALOG[2];
    const fourthItem = CATALOG[3];

    function toggleFav(id){
        const index = favorites.indexOf(id);

        if (index === -1) {
            setFavorites([...favorites, id]);
            return;
        }

        const nextFavorites = favorites.slice();
        nextFavorites.splice(index, 1);
        setFavorites(nextFavorites);
    }

    function favoriteText(id){
        if (favorites.indexOf(id) !== -1) {
            return 'Favorited';
        }

        return 'Save';
    }

    return (
        <div className="dashboard-grid">
            <div className="panel">
                <div className="panel-heading"><h2>Catalog</h2><span>Movies, TV & Music</span></div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
                    <article className="panel" style={{cursor:'pointer'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                            <div>
                                <strong>{firstItem.title}</strong>
                                <div style={{color:'#667085',fontSize:13}}>{firstItem.type} • {firstItem.duration} • {firstItem.rating}</div>
                                <p style={{color:'#667085'}}>{firstItem.synopsis}</p>
                            </div>
                            <div style={{marginLeft:12}}>
                                <button className="secondary-button" onClick={() => toggleFav(firstItem.id)}>{favoriteText(firstItem.id)}</button>
                            </div>
                        </div>
                    </article>

                    <article className="panel" style={{cursor:'pointer'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                            <div>
                                <strong>{secondItem.title}</strong>
                                <div style={{color:'#667085',fontSize:13}}>{secondItem.type} • {secondItem.duration} • {secondItem.rating}</div>
                                <p style={{color:'#667085'}}>{secondItem.synopsis}</p>
                            </div>
                            <div style={{marginLeft:12}}>
                                <button className="secondary-button" onClick={() => toggleFav(secondItem.id)}>{favoriteText(secondItem.id)}</button>
                            </div>
                        </div>
                    </article>

                    <article className="panel" style={{cursor:'pointer'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                            <div>
                                <strong>{thirdItem.title}</strong>
                                <div style={{color:'#667085',fontSize:13}}>{thirdItem.type} • {thirdItem.duration} • {thirdItem.rating}</div>
                                <p style={{color:'#667085'}}>{thirdItem.synopsis}</p>
                            </div>
                            <div style={{marginLeft:12}}>
                                <button className="secondary-button" onClick={() => toggleFav(thirdItem.id)}>{favoriteText(thirdItem.id)}</button>
                            </div>
                        </div>
                    </article>

                    <article className="panel" style={{cursor:'pointer'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                            <div>
                                <strong>{fourthItem.title}</strong>
                                <div style={{color:'#667085',fontSize:13}}>{fourthItem.type} • {fourthItem.duration} • {fourthItem.rating}</div>
                                <p style={{color:'#667085'}}>{fourthItem.synopsis}</p>
                            </div>
                            <div style={{marginLeft:12}}>
                                <button className="secondary-button" onClick={() => toggleFav(fourthItem.id)}>{favoriteText(fourthItem.id)}</button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className="panel">
                <div className="panel-heading"><h2>Recommendations</h2><span>Trending now</span></div>
                <ul style={{margin:0,paddingLeft:18}}>
                    <li style={{marginBottom:8}}><strong>{firstItem.title}</strong> — {firstItem.type}</li>
                </ul>
                <div style={{marginTop:12}}>
                    <h3>Curated Playlists</h3>
                    <div style={{display:'grid',gap:8}}>
                        <button className="secondary-button" type="button" onClick={() => onSelectRoute('playlists')}>Chill Instrumentals</button>
                        <button className="secondary-button" type="button" onClick={() => onSelectRoute('playlists')}>In-Flight Drama</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Playlists(){
    const firstPlaylist = PLAYLISTS[0];
    const secondPlaylist = PLAYLISTS[1];
    const thirdPlaylist = PLAYLISTS[2];

    return (
        <div className="dashboard-grid">
            <div className="panel">
                <div className="panel-heading"><h2>Playlists</h2><span>Ready to play</span></div>
                <div style={{display:'grid',gap:8}}>
                    <article className="panel">
                        <strong>{firstPlaylist.name}</strong>
                        <div style={{color:'#667085'}}>{firstPlaylist.items.length} items</div>
                    </article>

                    <article className="panel">
                        <strong>{secondPlaylist.name}</strong>
                        <div style={{color:'#667085'}}>{secondPlaylist.items.length} items</div>
                    </article>

                    <article className="panel">
                        <strong>{thirdPlaylist.name}</strong>
                        <div style={{color:'#667085'}}>{thirdPlaylist.items.length} items</div>
                    </article>
                </div>
            </div>
            <div className="panel">
                <div className="panel-heading"><h2>Featured</h2><span>Staff picks</span></div>
                <ul style={{paddingLeft:18}}>
                    <li>Chill Instrumentals — curated for landing</li>
                    <li>Heathrow Nights — romantic comedies</li>
                </ul>
            </div>
        </div>
    );
}

function FavoritesView({ favorites }){
    const firstSaved = favorites.indexOf(CATALOG[0].id) !== -1;
    const secondSaved = favorites.indexOf(CATALOG[1].id) !== -1;
    const thirdSaved = favorites.indexOf(CATALOG[2].id) !== -1;
    const fourthSaved = favorites.indexOf(CATALOG[3].id) !== -1;
    const hasFavorites = firstSaved || secondSaved || thirdSaved || fourthSaved;

    return (
        <div className="panel">
            <div className="panel-heading"><h2>Favorites</h2><span>Saved for later</span></div>
            {!hasFavorites ? <p style={{color:'#667085'}}>No favorites yet. Save items from the catalog.</p> : (
                <div style={{display:'grid',gap:12}}>
                    {firstSaved && (
                        <article className="panel">
                            <strong>{CATALOG[0].title}</strong>
                            <div style={{color:'#667085'}}>{CATALOG[0].type} • {CATALOG[0].duration}</div>
                        </article>
                    )}

                    {secondSaved && (
                        <article className="panel">
                            <strong>{CATALOG[1].title}</strong>
                            <div style={{color:'#667085'}}>{CATALOG[1].type} • {CATALOG[1].duration}</div>
                        </article>
                    )}

                    {thirdSaved && (
                        <article className="panel">
                            <strong>{CATALOG[2].title}</strong>
                            <div style={{color:'#667085'}}>{CATALOG[2].type} • {CATALOG[2].duration}</div>
                        </article>
                    )}

                    {fourthSaved && (
                        <article className="panel">
                            <strong>{CATALOG[3].title}</strong>
                            <div style={{color:'#667085'}}>{CATALOG[3].type} • {CATALOG[3].duration}</div>
                        </article>
                    )}
                </div>
            )}
        </div>
    );
}

function AttractionsView(){
    const dest = 'London';
    const list = ATTRACTIONS['London'];
    const firstAttraction = list[0];
    const secondAttraction = list[1];
    const thirdAttraction = list[2];

    return (
        <div className="panel">
            <div className="panel-heading"><h2>Attractions — {dest}</h2><span>What to see after landing</span></div>
            <ul style={{paddingLeft:18}}>
                {firstAttraction && (
                    <li style={{marginBottom:10}}>
                        <strong>{firstAttraction.name}</strong>
                        <div style={{color:'#667085'}}>{firstAttraction.description}</div>
                    </li>
                )}

                {secondAttraction && (
                    <li style={{marginBottom:10}}>
                        <strong>{secondAttraction.name}</strong>
                        <div style={{color:'#667085'}}>{secondAttraction.description}</div>
                    </li>
                )}

                {thirdAttraction && (
                    <li style={{marginBottom:10}}>
                        <strong>{thirdAttraction.name}</strong>
                        <div style={{color:'#667085'}}>{thirdAttraction.description}</div>
                    </li>
                )}
            </ul>
        </div>
    );
}

