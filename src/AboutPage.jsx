import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteFooterMarkup } from './site-chrome.js';
import teamMembers from './team-members.json';
import TestimonialSection from './TestimonialSection.jsx';
import AboutFaq from './AboutFaq.jsx';

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
 { id: 'vlog-featured-properties', title: 'Discover Dubai, one home at a time.', category: 'HOME TOURS & LIFESTYLE', src: '/videos/vlog-home-tour.mp4', poster: '/videos/vlog-home-tour-poster.jpg' },
 { id: 'vlog-property-tips', title: 'Three property buying mistakes to avoid.', category: 'PROPERTY TIPS', src: '/videos/vlog-golden-visa.mp4', poster: '/videos/vlog-golden-visa-poster.jpg' },
 { title: 'Your next chapter: a Golden Visa in Dubai.', category: 'LIVING IN DUBAI', src: '/videos/vlog-property-tips.mp4', poster: '/videos/vlog-property-tips-poster.jpg' },
 { id: 'vlog-real-estate-experience', title: 'Celebrating our journey with Imtiaz.', category: 'GIFFY MOMENTS', src: '/videos/vlog-imtiaz-award.mp4', poster: '/videos/vlog-imtiaz-award-poster.jpg' },
];

export default function AboutGiffyPage() {
 const pageRef = useRef(null);
 const footerRef = useRef(null);
 useLayoutEffect(() => {
  const track = pageRef.current.querySelector('.about-team-track');
  const group = track.querySelector('.about-team-group');
  const band = track.closest('.about-signature-band');
  const portraits = [...track.querySelectorAll('.about-team-portrait')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame;
  // The SVG uses matching cubic x coordinates for both boundaries.
  const curveAt = x => {
   x = Math.max(0, Math.min(1, x));
   let low = 0, high = 1;
   for (let i = 0; i < 16; i++) {
    const t = (low + high) / 2;
    const curveX = 3 * (1 - t) ** 2 * t * .22 + 3 * (1 - t) * t ** 2 * .78 + t ** 3;
    if (curveX < x) low = t; else high = t;
   }
   const t = (low + high) / 2;
   return { top: .72 * t * (1 - t), bottom: 1 - 1.05 * t * (1 - t) };
  };
  const fitPortraits = () => {
   const bounds = band.getBoundingClientRect();
   if (bounds.bottom >= 0 && bounds.top <= window.innerHeight) {
    const measurements = portraits.map(portrait => ({ portrait, bounds: portrait.getBoundingClientRect() }));
    measurements.forEach(({ portrait, bounds: card }) => {
     if (card.right < bounds.left || card.left > bounds.right) return;
     const left = curveAt((card.left - bounds.left) / bounds.width);
     const right = curveAt((card.right - bounds.left) / bounds.width);
     const top = Math.min(left.top, right.top) * bounds.height;
     const bottom = Math.max(left.bottom, right.bottom) * bounds.height;
     portrait.style.setProperty('--portrait-top', `${Math.max(0, top - 2)}px`);
     portrait.style.setProperty('--portrait-height', `${bottom - top + 4}px`);
     portrait.style.setProperty('--portrait-caption-bottom', `${(1 - Math.min(left.bottom, right.bottom)) * bounds.height + 10}px`);
    });
   }
   if (!reducedMotion.matches) frame = requestAnimationFrame(fitPortraits);
  };
  const setSpeed = () => track.style.setProperty('--team-loop-duration', `${group.getBoundingClientRect().width / 70}s`);
  setSpeed();
  const observer = new ResizeObserver(setSpeed);
  observer.observe(group);
  frame = requestAnimationFrame(fitPortraits);
  return () => { observer.disconnect(); cancelAnimationFrame(frame); };
 }, []);
 useLayoutEffect(() => {
  document.title = 'About Giffy | Giffy Real Estate';
  const footerElements = [...footerRef.current.querySelectorAll('.classic-footer-columns h2, .classic-footer-columns address, .classic-footer-columns p, .classic-footer-columns li, .footer-brand-socials, .footer-advisor>a, .classic-footer-bottom>span')];
  footerElements.forEach(element => element.setAttribute('data-about-reveal', ''));
  const elements = [...pageRef.current.querySelectorAll('[data-about-reveal]'), ...footerElements];
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const groups = new Map();
  elements.forEach(element => {
   const group = element.closest('.about-vlog-card, .classic-footer-columns>*, section') || element.parentElement;
   const index = groups.get(group) || 0;
   if (!element.style.getPropertyValue('--about-delay')) element.style.setProperty('--about-delay', `${Math.min(index * 100, 500)}ms`);
   groups.set(group, index + 1);
  });
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -30px 0px' });
  elements.forEach(element => { element.classList.add('about-reveal-ready'); observer.observe(element); });
  return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('about-reveal-ready', 'is-revealed')); };
 }, []);
 return <div className="about-basic-shell">
  <main className="about-basic" ref={pageRef}>
   <section className="about-basic-hero"><h1 className="about-title-drop">ABOUT GIFFY</h1></section>
   <div className="about-basic-services about-ownership-strip" aria-label={ownershipMessages.join('. ')} data-about-reveal>
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
    <div className="about-signature-heading">
     <span>GIFFY REAL ESTATE / DUBAI</span>
     <h2 id="about-signature-title" data-about-reveal>Meet the people who bring<br/>your property goals to life.</h2>
     <p data-about-reveal>Local knowledge. Personal guidance.<br/>Get to know the people behind Giffy.</p>
    </div>
    <div className="about-signature-band" data-about-reveal>
     <div className="about-team-track">
      {[0, 1].map(copy => <div className="about-team-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
       {teamMembers.map(member => <figure className="about-team-portrait" key={member.name}>
        <img src={member.src} alt={copy === 0 ? `${member.name}, ${member.role}` : ''} loading="eager" decoding="async" />
        <figcaption><strong>{member.name}</strong><span>{member.role}</span></figcaption>
       </figure>)}
      </div>)}
     </div>
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
     {vlogs.map((vlog, index) => <article className="about-vlog-card" id={vlog.id} key={vlog.src}>
      <h3 data-about-reveal style={{ '--about-delay': `${index * 90}ms` }}>{vlog.title}</h3>
      <video data-about-reveal style={{ '--about-delay': `${index * 90 + 140}ms` }} controls playsInline preload="none" poster={vlog.poster} aria-label={vlog.title} onPlay={event => { pageRef.current.querySelectorAll('video').forEach(video => { if (video !== event.currentTarget) video.pause(); }); }}>
       <source src={vlog.src} type="video/mp4" />
       <a href={vlog.src}>Watch {vlog.title}</a>
      </video>
      <p data-about-reveal style={{ '--about-delay': `${index * 90 + 240}ms` }}>{vlog.category}</p>
     </article>)}
    </div>
   </section>
   <TestimonialSection />
   <AboutFaq />
  </main>
  <div ref={footerRef} dangerouslySetInnerHTML={{ __html: siteFooterMarkup() }} />
 </div>;
}
