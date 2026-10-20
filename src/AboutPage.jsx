import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteHeaderMarkup, siteFooterMarkup } from './site-chrome.js';

const images = [
 ['/images/projects/sunset-bay.jpg', 'Refined interiors at Sunset Bay Grand'],
 ['/images/about-residence.jpg', 'A thoughtfully designed Dubai residence'],
 ['/images/projects/golf-hills.png', 'Golf Hills residences overlooking landscaped gardens'],
 ['/images/dubai-skyline.jpg', 'Downtown Dubai and the Burj Khalifa'],
];

const ownershipMessages = [
 'HASSLE-FREE OWNERSHIP',
 'PROPERTY MANAGEMENT IN DUBAI',
 'YOUR PROPERTY, OUR PRIORITY',
 'LOCAL KNOWLEDGE, PERSONAL GUIDANCE',
 'FIND YOUR NEXT HOME',
 'INVEST WITH CONFIDENCE',
 'TRUSTED DEVELOPER CONNECTIONS',
 'SUPPORT AT EVERY STEP',
 'THOUGHTFUL PROPERTY ADVICE',
 'EXCEPTIONAL HOMES, CONSIDERED CHOICES',
];

const vlogs = [
 { title: 'Discover Dubai, one home at a time.', category: 'HOME TOURS & LIFESTYLE', src: '/videos/vlog-home-tour.mp4', poster: '/videos/vlog-home-tour-poster.jpg' },
 { title: 'Three property buying mistakes to avoid.', category: 'PROPERTY TIPS', src: '/videos/vlog-golden-visa.mp4', poster: '/videos/vlog-golden-visa-poster.jpg' },
 { title: 'Your next chapter: a Golden Visa in Dubai.', category: 'LIVING IN DUBAI', src: '/videos/vlog-property-tips.mp4', poster: '/videos/vlog-property-tips-poster.jpg' },
 { title: 'Celebrating our journey with Imtiaz.', category: 'GIFFY MOMENTS', src: '/videos/vlog-imtiaz-award.mp4', poster: '/videos/vlog-imtiaz-award-poster.jpg' },
];

export default function AboutGiffyPage() {
 const pageRef = useRef(null);
 useLayoutEffect(() => {
  document.title = 'About Giffy | Giffy Real Estate';
  const elements = [...pageRef.current.querySelectorAll('[data-about-reveal]')];
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } });
  }, { threshold: .12 });
  elements.forEach(element => { element.classList.add('about-reveal-ready'); observer.observe(element); });
  return () => observer.disconnect();
 }, []);
 return <div className="about-basic-shell">
  <div dangerouslySetInnerHTML={{ __html: siteHeaderMarkup() }} />
  <main className="about-basic" ref={pageRef}>
   <section className="about-basic-hero"><h1 data-about-reveal>ABOUT US</h1></section>
   <div className="about-basic-services about-ownership-strip" aria-label={ownershipMessages.join('. ')}>
    <div className="about-ownership-track" aria-hidden="true">
     {[0, 1].map(copy => <div className="about-ownership-group" key={copy}>
      {ownershipMessages.map(message => <span key={message}>{message}<b>✳</b></span>)}
     </div>)}
    </div>
   </div>
   <section className="about-image-series" aria-label="Discover Giffy and Dubai living">
    <div className="about-image-series-window">
     <div className="about-image-series-row">
      {[
       ['/images/about-series/33342702.jpg', 'A contemporary office with warm architectural details'],
       ['/images/about-series/7163378.jpg', 'Professionals sharing ideas in a collaborative workspace'],
       ['/images/about-series/7750027.jpg', 'A bright living room with natural textures'],
       ['/images/about-series/33342712.jpg', 'A refined modern meeting space'],
       ['/images/about-series/8092177.jpg', 'A calm sunlit interior with neutral furnishings'],
       ['/images/about-series/19650953.jpg', 'An airy apartment with warm wood and greenery'],
       ['/images/about-series/33342710.jpg', 'Elegant furniture in a contemporary office lounge'],
       ['/images/about-series/30380646.jpg', 'A welcoming living room with soft neutral tones'],
      ].map(([src, alt], index) => <figure key={src} data-about-reveal style={{ '--about-delay': `${index * 80}ms` }}><img src={src} alt={alt} loading="lazy" /></figure>)}
     </div>
    </div>
   </section>
   <section className="about-basic-story">
    <span className="about-basic-label" data-about-reveal>ABOUT GIFFY</span>
    <div>
     <h2 data-about-reveal>Where local knowledge meets<br className="about-basic-desktop-break"/> a <em>personal</em> approach to property.</h2>
     <p data-about-reveal>Giffy Real Estate LLC connects homeowners, investors, and international buyers with exceptional properties in Dubai. Our mission is to make every move feel considered, clear, and personal.</p>
     <p data-about-reveal>Founded by Gift Preye Solomon, we bring a decade of experience and trusted developer relationships to every conversation. We listen, explore your goals, and guide you towards the opportunities that fit.</p>
     <p data-about-reveal>From buying and selling to rentals and property management, we believe good advice starts with understanding people. Your next chapter deserves thoughtful guidance from beginning to end.</p>
    </div>
   </section>
   <section className="about-signature" aria-labelledby="about-signature-title">
    <svg className="about-signature-geometry" width="0" height="0" aria-hidden="true" focusable="false"><defs><clipPath id="giffy-curved-gallery" clipPathUnits="objectBoundingBox"><path d="M0,0 C0.22,0.24 0.78,0.24 1,0 L1,1 C0.78,0.65 0.22,0.65 0,1 Z" /></clipPath></defs></svg>
    <div className="about-signature-heading" data-about-reveal>
     <span>GIFFY REAL ESTATE / DUBAI</span>
     <h2 id="about-signature-title">Find a place that reflects<br/>your way of living.</h2>
     <p>Exceptional homes. Thoughtful guidance.<br/>Discover a new chapter with Giffy.</p>
    </div>
    <div className="about-signature-band" data-about-reveal>
     <div className="about-signature-images">{[images[3], ...images, images[0]].map(([src,alt], index) => <a href="/projects" key={`${src}-${index}`} aria-label={`Explore properties: ${alt}`}><img src={src} alt={alt} loading="lazy" /></a>)}</div>
    </div>
    <div className="about-signature-bottom">
     <div className="about-signature-trust" data-about-reveal><div className="about-signature-thumbnails"><img src="/images/giffy-ceo.jpg" alt=""/><img src="/images/about-series/7163378.jpg" alt=""/><img src="/images/about-series/33342702.jpg" alt=""/></div><div><strong>500+ happy clients</strong><span>A personal approach to every move</span></div></div>
     <a href="/projects" className="about-signature-explore" data-about-reveal>Explore our properties <span aria-hidden="true">↓</span></a>
     <a href="/contact?consultation=1" data-book-consultation data-consultation-purpose="Speak to the Giffy team" className="about-signature-seal" aria-label="Speak to the Giffy team" data-about-reveal><span>LET'S FIND YOUR NEXT HOME</span><ArrowUpRight size={23}/><small>WITH GIFFY</small></a>
    </div>
   </section>
   <section className="about-vlogs" aria-labelledby="about-vlogs-title">
    <h2 id="about-vlogs-title" data-about-reveal>Vlogs</h2>
    <div className="about-vlogs-grid">
     {vlogs.map((vlog, index) => <article className="about-vlog-card" key={vlog.src} data-about-reveal style={{ '--about-delay': `${index * 90}ms` }}>
      <h3>{vlog.title}</h3>
      <video controls playsInline preload="none" poster={vlog.poster} aria-label={vlog.title} onPlay={event => { pageRef.current.querySelectorAll('.about-vlogs video').forEach(video => { if (video !== event.currentTarget) video.pause(); }); }}>
       <source src={vlog.src} type="video/mp4" />
       <a href={vlog.src}>Watch {vlog.title}</a>
      </video>
      <p>{vlog.category}</p>
     </article>)}
    </div>
   </section>
  </main>
  <div dangerouslySetInnerHTML={{ __html: siteFooterMarkup() }} />
 </div>;
}
