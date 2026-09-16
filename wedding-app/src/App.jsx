import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import BackgroundAnimation from './BackgroundAnimation';

function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const revealRefs = useRef([]);
  const iframeRef = useRef(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Add hover effect detection for links and buttons
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Ref for scroll animation
  useEffect(() => {
    // Intersection Observer for scroll reveal animations
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealRefs.current.forEach(el => {
      if (el) revealObserver.observe(el);
    });

    return () => {
      if (revealObserver) revealObserver.disconnect();
    };
  }, [isOpen]); // Re-run when open state changes to observe newly rendered content

  const handleOpen = () => {
    // Play envelope animation first
    setEnvelopeOpen(true);

    // Attempt to play background music when user interacts
    if (iframeRef.current) {
      iframeRef.current.play().catch(e => console.log("Audio play prevented:", e));
      setIsPlaying(true);
    }

    // Hide envelope completely after animation finishes
    setTimeout(() => {
      setIsOpen(true);
    }, 1400); // 1.4s matches the CSS transform duration
  };

  const toggleMusic = () => {
    if (iframeRef.current) {
      if (isPlaying) {
        iframeRef.current.pause();
      } else {
        iframeRef.current.play().catch(e => console.log("Audio play prevented:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddToCalendar = (e) => {
    // We are now using a direct Google Calendar link to avoid file downloads on Android
  };

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      {/* Custom Mouse Cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      {/* Background with Reference Animation */}
      <div className="bg-animation"></div>

      {/* Interactive Gold Dust Background */}
      <BackgroundAnimation />

      {/* Grain overlay for texture */}
      <div className="grain"></div>

      {/* Premium Vertical Envelope */}
      <div id="envelope" className={isOpen ? 'gone' : ''}>
        <div className={`env-wrap ${envelopeOpen ? 'open' : ''}`} onClick={handleOpen}>
          <div className="env-body">
            <div className="env-monogram">بِسْمِ اللَّهِ</div>
            <div className="env-rule"></div>
            <div className="env-names" style={{ marginTop: '75px' }}>
              Raeza <br />
              <span style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--gold)' }}>&amp;</span> <br />
              Ashwin
            </div>
            <div className="env-date">20 OCTOBER 2026</div>
          </div>
          <div className="env-flap"></div>
          <div className="env-seal">وليمة</div>
          <div className="env-cta">TAP TO OPEN</div>
        </div>
      </div>

      {/* Main Content */}
      <main className={isOpen ? 'visible' : 'hidden'}>

        {/* Hero Section */}
        <section id="home" className="section hero">
          <div className="hero-frame"></div>

          <div className={`bismillah fade-in-up delay-1 ${isOpen ? 'is-visible' : ''}`}>
            <div className="arabic-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <p className="bismillah-translation">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          <div className={`hero-gline fade-in delay-3 ${isOpen ? 'is-visible' : ''}`}></div>

          <p className={`eyebrow fade-in-up delay-3 ${isOpen ? 'is-visible' : ''}`} style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
            WE CORDIALLY REQUEST THE HONOR OF YOUR PRESENCE<br />
            AT THE RECEPTION OF OUR BELOVED CHILDREN
          </p>

          <div className={`couple-section fade-in-up delay-5 ${isOpen ? 'is-visible' : ''}`}>
            <h1 className="name uppercase">FATHIMA RAEZA PC</h1>

            <div className="with-text" style={{ margin: '1.5rem 0' }}>With</div>

            <h1 className="name uppercase">MOHAMED ASHWIN PT</h1>
          </div>

          <div className={`hero-date fade-in-up delay-6 ${isOpen ? 'is-visible' : ''}`}>
            TUESDAY | 20 | OCTOBER | 2026
          </div>
          <div className={`hero-time fade-in-up delay-6 ${isOpen ? 'is-visible' : ''}`}>
            5:00 PM - 8:00 PM
          </div>
        </section>

        {/* Quran Verse Section */}
        <section className="section quran-section">
          <div className="container reveal" ref={addToRefs}>
            <div className="quran-content">
              <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>
                FROM THE HOLY QURAN
              </p>
              <div className="arabic-verse">وَخَلَقۡنَاكُمۡ أَزۡوَاجًا</div>
              <p className="verse-translation">"And We created you in pairs."</p>
              <p className="verse-citation">HOLY QURAN · 78:08</p>
            </div>
          </div>
        </section>

        {/* Families Section */}
        <section className="section families-section" id="families">
          <div className="container reveal" ref={addToRefs}>
            <p className="eyebrow">WITH THE BLESSINGS OF</p>
            <h2 className="section-title">Our Families</h2>

            <div className="family-cards">
              {/* Bride Family */}
              <div className="fam-card">
                <div className="fam-role">BRIDE</div>
                <h3 className="fam-name">Fathima Raeza PC</h3>
                <div className="fam-rel">Daughter of</div>
                <p className="fam-parents">Dr. Mohamed Shabeer PC &amp; Mrs. Sufaija Mandayappuram</p>
                <div className="fam-divider"></div>
                <p className="fam-grandparents">
                  Granddaughter of (Late) Mr. PC Abdurahman &amp; (Late) Mrs. Fathima Mulanthala (Valavannur)<br />
                  &amp; Mr. Ali Mandayappuram &amp; Mrs. Rasiya Karuvally Pathikkal (Kottakkal)
                </p>
              </div>

              {/* Groom Family */}
              <div className="fam-card">
                <div className="fam-role">GROOM</div>
                <h3 className="fam-name">Mohamed Ashwin PT</h3>
                <div className="fam-rel">Son of</div>
                <p className="fam-parents">Mr. Abdul Rahiman PT &amp; Mrs. Sheeba</p>
                <div className="fam-divider"></div>
                <p className="fam-grandparents">
                  Grandson of (Late) Mr. PT Hydrose Haji &amp; (Late) Prof. AK Hydrose
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section gallery-section" id="gallery">
          <div className="container reveal" ref={addToRefs}>
            <p className="eyebrow">GLIMPSES</p>
            <h2 className="section-title">The Beautiful Couple</h2>

            <div className="g-frame">
              <img
                src="/couple.jpeg"
                alt="Raeza and Ashwin"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="section details-section">
          <div className="container reveal" ref={addToRefs}>
            <div className="blessed-occasion-header">
              <p className="eyebrow with-lines">THE GRAND CELEBRATION</p>
              <h2 className="join-us-title">
                <span className="line1">Join us for the</span>
                <span className="highlight">Marriage Reception</span>
              </h2>
            </div>

            <div className="event-minimal" style={{ marginTop: '4rem' }}>

              <div className="event-date-minimal">
                <span className="day">20</span>
                <span className="month-year">OCTOBER 2026</span>
              </div>

              <div className="event-info-grid">
                <div className="info-item">
                  <span className="info-label">TIME</span>
                  <span className="info-value">5:00 PM - 8:00 PM</span>
                </div>
                <div className="info-divider"></div>
                <div className="info-item">
                  <span className="info-label">VENUE</span>
                  <span className="info-value">Emerald Palace Auditorium<br />Kurukkol kunnu</span>
                </div>
              </div>

              <div className="event-btns-minimal mt-4">
                <a
                  href="https://maps.google.com/?q=Emerald+Palace+Auditorium,Kurukkol+kunnu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  View on Map
                </a>
                <a 
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Reception+-+Raeza+%26+Ashwin&dates=20261020T113000Z/20261020T143000Z&details=Join+us+for+the+wedding+reception+of+Raeza+and+Ashwin!&location=Emerald+Palace+Auditorium,+Kurukkol+Kunnu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                  style={{ textDecoration: 'none' }}
                >
                  Add to Calendar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Location Map Section */}
        <section className="section location-section" style={{ minHeight: 'auto', padding: '3rem 1.5rem 1rem' }}>
          <div className="container reveal" ref={addToRefs}>

            <div className="compliments-header">
              <p className="compliments-from">Find Your Way</p>
              <h2 className="compliments-title">Location Map</h2>
            </div>

            <a
              href="https://maps.google.com/?q=Emerald+Palace+Auditorium,Kurukkol+kunnu"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
            >
              <div className="qr-minimal">
                <div className="qr-frame-minimal">
                  <img
                    src="/qrcode.png"
                    alt="QR Code"
                    className="qr-image-minimal"
                    onError={(e) => {
                      e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Emerald+Palace+Auditorium';
                    }}
                  />
                </div>
                <p className="qr-scan-text">CLICK OR SCAN FOR LOCATION</p>
              </div>
            </a>

          </div>
        </section>

        {/* Footer */}
        <footer className="footer" style={{ padding: '6rem 1.5rem 4rem', textAlign: 'center', background: 'transparent' }}>
          <div className="container reveal" ref={addToRefs}>
            
            <h2 className="footer-couple" style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 300, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
              Raeza &amp; Ashwin
            </h2>
            
            <p className="footer-details" style={{ marginBottom: '0.5rem', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', opacity: 0.6 }}>
              20 &middot; OCTOBER &middot; 2026
            </p>
            <p className="footer-details" style={{ marginBottom: '5rem', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-light)', opacity: 0.6 }}>
              Emerald Palace Auditorium, Kurukkol Kunnu
            </p>

            <div className="footer-regards" style={{ marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                WITH BEST REGARDS
              </p>
              
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2.4rem', fontStyle: 'italic', color: 'var(--gold)' }}>
                Kalpakavadi Family
              </div>
            </div>

            <div className="footer-brands" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', opacity: 0.9, marginTop: '2rem', paddingBottom: '3rem' }}>
               <img src="/dressup.png" alt="DressUp" style={{ height: '35px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
               <div style={{ width: '1px', height: '30px', background: 'var(--gold)', opacity: 0.3 }}></div>
               <img src="/creativheads.png" alt="CreativHeads" style={{ height: '35px', objectFit: 'contain' }} />
            </div>

          </div>
        </footer>

      </main>

      {/* Background Audio */}
      <audio
        ref={iframeRef}
        id="bgm-player"
        src="/bgm.mp3"
        preload="auto"
        loop
      ></audio>

      {/* Floating Music Button */}
      <button id="bgmBtn" className={isPlaying ? 'playing' : ''} onClick={toggleMusic}>
        <div className="bgm-ring"></div>
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>

    </>
  );
}

export default App;
