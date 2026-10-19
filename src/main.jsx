import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, X, Menu, Star, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './styles.css';

const navigation = ['Home', 'Projects', 'Sell', 'Rent', 'Services', 'About Giffy'];
const reviews = [
  { name: 'IbroFX', initial: 'I', color: '#c73b0b', text: 'The transaction was smooth. All thanks to Giffy Real Estate, indeed a reliable broker to work with.' },
  { name: 'Fatima Alanda', initial: 'F', color: '#ac45b6', text: 'The CEO herself is one of the most humble and kindest people I have ever met. She takes care of you as she would of herself. I can only recommend!' },
  { name: 'Amazing raheema', initial: 'A', color: '#246b68', text: 'The absolute best. Service is super top notch. If you are looking for a legit real estate agency in the UAE to handle your property purchases and still give after sales services, it is definitely Giffy Real Estate.' }
];
const featuredProperties = [
  { number: '01', name: 'Sunset Bay Grand', price: 'AED 1.95M', image: '/images/projects/sunset-bay.jpg', alt: 'Warm contemporary dining interior at Sunset Bay Grand', href: 'https://giffyrealestate.com/projects/sunset-bay-grand-by-imtiaz/', tag: 'Featured launch' },
  { number: '02', name: 'Golf Hills EMAAR South', price: 'AED 1.06M', image: '/images/projects/golf-hills.png', alt: 'A resident looking out over a landscaped community at sunset', href: 'https://giffyrealestate.com/projects/grand-polo-club-resort-living/', tag: 'Dubai South' },
  { number: '03', name: 'Equestra Grand Polo', price: 'AED 1.06M', image: '/images/projects/equestra.png', alt: 'Equestrian community at Equestra Grand Polo', href: 'https://giffyrealestate.com/projects/equestra-grand-polo-club-resort-living/', tag: 'New release' },
  { number: '04', name: 'Marquis Vista', price: 'AED 661,000', image: '/images/projects/marquis-vista.png', alt: 'Marquis Vista contemporary residential development', href: 'https://giffyrealestate.com/projects/marquis-vista-2/', tag: 'Just listed' }
];
function CountUp({ from, to, label }) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setValue(to); return; }
    let frame;
    const start = performance.now() + 160;
    const duration = 950;
    const step = now => {
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [from, to]);
  return <><strong aria-label={`${to}+ ${label}`}>{value}+</strong><span>{label}</span></>;
}
function Brand() {
 return <a className="brand" href="#home" aria-label="Giffy Real Estate home"><img src="/images/giffy-logo.png" alt="Giffy Real Estate" width="2330" height="807"/></a>;
}
function Stars() { return <span className="stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map(i=><Star key={i} size={15} fill="currentColor" strokeWidth={0}/>)}</span>; }
const serviceCards = [
 { title: 'Property To Buy', text: 'Find the best ready and off-plan properties across Dubai, carefully selected for quality, ROI, and long-term value.' },
 { title: 'Property To Sell', text: 'Sell your property faster with professional marketing, accurate valuation, and access to qualified buyers across Dubai.' },
 { title: 'Property Management', text: 'Enjoy hassle-free ownership with full property management, tenant handling, maintenance, and rental supervision.' },
 { title: 'Off-Plan Properties', text: 'Unlock early-stage investment opportunities with flexible payment plans from top Dubai developers.' }
];
function ServicesScroll({ onEnquire }) {
 const sectionRef = useRef(null);
 const trackRef = useRef(null);
 useEffect(() => {
  const section = sectionRef.current, track = trackRef.current;
  let frame = 0, travel = 0;
  const update = () => {
   frame = 0;
   const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')) || 58;
   const distance = Math.min(travel, Math.max(0, header - section.getBoundingClientRect().top));
   track.style.transform = `translate3d(${-distance}px,0,0)`;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const measure = () => {
   const simpleLayout = window.matchMedia('(max-width: 700px), (prefers-reduced-motion: reduce)').matches;
   travel = simpleLayout ? 0 : Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
   section.style.setProperty('--services-travel', `${travel}px`);
   schedule();
  };
  const observer = new ResizeObserver(measure);
  observer.observe(track.parentElement);
  observer.observe(track);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure);
  measure();
  return () => { observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure); cancelAnimationFrame(frame); };
 }, []);
 return <section ref={sectionRef} className="services-scroll-section" id="services" aria-labelledby="services-scroll-title"><div className="services-scroll-pin"><header className="services-scroll-heading"><span>OUR SERVICES</span><h2 id="services-scroll-title">Expert support.<br/>Every step of the way.</h2><p>Get expert support for buying, selling, investing, and managing properties across Dubai. Giffy Real Estate LLC provides end-to-end solutions tailored to homeowners, investors, and international buyers.</p></header><div className="services-scroll-window"><div className="services-scroll-track" ref={trackRef}>{serviceCards.map((service,index)=><article className="services-scroll-card" key={service.title}><span className="services-card-number">{String(index+1).padStart(2,'0')}</span><div><h3>{service.title}</h3><p>{service.text}</p><button onClick={()=>service.title === 'Property Management' ? document.getElementById('property-management')?.scrollIntoView({behavior:'smooth'}) : onEnquire(service.title)}>{service.title === 'Property Management' ? 'Explore management' : 'Talk to an advisor'} <ArrowUpRight size={14}/></button></div></article>)}</div></div><span className="services-scroll-note">SCROLL TO EXPLORE ALL SERVICES <span aria-hidden="true">→</span></span></div></section>;
}
function SiteFooter({ onContact }) {
 return <footer className="classic-footer">
  <div className="classic-footer-inner">
   <div className="classic-footer-partners" aria-label="Our developer partners">{[['emaar','EMAAR'],['damac','DAMAC'],['binghatti','Binghatti'],['imtiaz','Imtiaz Developments'],['object-one','Object 1']].map(([slug,name])=><img key={slug} src={`/images/developers/${slug}.png`} alt={name} loading="lazy"/>)}</div>
   <div className="classic-footer-columns">
    <div><h2>Contact Info</h2><address>Prime Tower, Business Bay,<br/>Dubai, United Arab Emirates</address><p>Phone: <a href="tel:+97145703395">+971 4 570 3395</a></p><p>Email: <a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a></p></div>
    <nav aria-label="Footer navigation"><h2>Explore Giffy</h2><ul><li><a href="#home">Home</a></li><li><a href="#featured-properties">Featured Properties</a></li><li><a href="#services">Our Services</a></li><li><a href="#property-management">Property Management</a></li><li><a href="#our-experience">Our Experience</a></li><li><button onClick={()=>onContact('Speak to an advisor')}>Speak to an Advisor</button></li></ul></nav>
    <div className="footer-advisor"><h2>Your Next Move</h2><p>Tell us what you are looking for. We will help you explore the right opportunities in Dubai.</p><button className="classic-footer-signup" onClick={()=>onContact('Request a property consultation')}>Book a consultation <ArrowUpRight size={14}/></button></div>
    <nav aria-label="Giffy stories and insights"><h2>Stories &amp; Insights</h2><ul><li><a href="#featured-properties">Featured Properties in Dubai</a></li><li><a href="#property-management">Hassle-Free Property Management</a></li><li><a href="#our-experience">A Decade of Real Estate Experience</a></li></ul></nav>
   </div>
   <div className="classic-footer-bottom"><span>© {new Date().getFullYear()} Giffy Real Estate LLC. All rights reserved.</span><span>Thoughtful guidance. Exceptional homes.</span></div>
  </div>
  <svg className="classic-footer-skyline" viewBox="0 0 1680 230" preserveAspectRatio="none" aria-hidden="true" focusable="false">{[0,1,2].map(layer=><g key={layer} fill={['#d9dce0','#c6cbd0','#afb7bf'][layer]}>{Array.from({length:58},(_,i)=>{const x=i*30-15+layer*9;const h=22+((i*47+layer*29)%115);const y=230-h-layer*4;return <g key={i}><path d={`M${x} 230 V${y} l12 -${i%4===0?12:0} h14 v${230-y+12}Z`}/>{i%7===0&&<path d={`M${x+11} ${y}v-24h3v24Z`}/>}</g>;})}<path d="M820 230V78h12V50h8V20h3V0h3v20h3v30h8v28h12v152Z"/>{Array.from({length:45},(_,i)=><rect key={i} x={i*39+layer*5} y={190+(i%3)*12} width="3" height="7" fill="#f5f5f5" opacity=".9"/>)}</g>)}</svg>
  <a className="classic-footer-top" href="#home" aria-label="Back to top">⌃</a>
 </footer>;
}
function App() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [contactOpen, setContactOpen] = useState(false);
 const [contactMounted, setContactMounted] = useState(false);
 const contactCloseTimer = useRef(null);
 const [lowBandwidth] = useState(() => {
   const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
   return Boolean(connection?.saveData || /(^|-)2g|3g/.test(connection?.effectiveType || '') || (connection?.downlink && connection.downlink < 1.5));
 });
 const videoRefs = useRef([]);
 const playExclusively = current => { videoRefs.current.forEach(video => { if (video && video !== current) video.pause(); }); };
 useEffect(() => {
   const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   let frame, lenis;
   if (!reduced) {
     lenis = new Lenis({ duration: 1.1, anchors: true });
     const tick = time => { lenis.raf(time); frame = requestAnimationFrame(tick); };
     frame = requestAnimationFrame(tick);
   }
   const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
     if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
   }), { threshold: 0.12 });
   document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
   const videoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
     if (!entry.isIntersecting) entry.target.pause();
   }), { threshold: 0.05 });
   videoRefs.current.filter(Boolean).forEach(video => videoObserver.observe(video));
   return () => { if(frame) cancelAnimationFrame(frame); lenis?.destroy(); revealObserver.disconnect(); videoObserver.disconnect(); };
 }, []);
 const telemetryEnabled = import.meta.env.PROD && (import.meta.env.VERCEL_DEPLOYMENT || import.meta.env.VITE_ENABLE_VERCEL_INSIGHTS === 'true');
 const [intent, setIntent] = useState('');
 const [reviewIndex, setReviewIndex] = useState(0);
 const reviewDialog = useRef(null);
 const inquire = purpose => { setMenuOpen(false); setIntent(purpose); window.clearTimeout(contactCloseTimer.current); setContactMounted(true); requestAnimationFrame(() => setContactOpen(true)); };
 const closeContact = () => { setContactOpen(false); window.clearTimeout(contactCloseTimer.current); contactCloseTimer.current = window.setTimeout(() => setContactMounted(false), 720); };
 useEffect(() => { if (!contactMounted) return; const handleEscape = event => { if (event.key === 'Escape') { setContactOpen(false); window.clearTimeout(contactCloseTimer.current); contactCloseTimer.current = window.setTimeout(() => setContactMounted(false), 720); } }; window.addEventListener('keydown', handleEscape); return () => window.removeEventListener('keydown', handleEscape); }, [contactMounted]);
 const navigationTarget = label => ({ Home:'#home', Projects:'#featured-properties', Services:'#services', 'About Giffy':'#our-experience' }[label] || '#home');
 const navigate = (e, label) => { setMenuOpen(false); if (label === 'Sell' || label === 'Rent') { e.preventDefault(); inquire(`${label} a property in Dubai`); } };
 const review = reviews[reviewIndex];
 return <>
  <div className={`page-transition-view${contactOpen?' page-view-away':''}`} aria-hidden={contactOpen} inert={contactOpen}><div className="page-frame"><main className="hero-shell" id="home">
   <header className="site-header">
    <div className="enter header-brand" style={{'--delay':'40ms'}}><Brand/></div>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((label,i)=><a className="enter" style={{'--delay':`${110+i*55}ms`}} href={navigationTarget(label)} key={label} onClick={e=>navigate(e,label)}>{label}</a>)}</nav>
    <button className="button header-contact enter" style={{'--delay':'460ms'}} onClick={()=>inquire('Contact Giffy')}>Contact us</button>
    <button className="menu-toggle enter" style={{'--delay':'460ms'}} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
   </header>
   {menuOpen&&<nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">{navigation.map(label=><a href={navigationTarget(label)} key={label} onClick={e=>navigate(e,label)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}
   <section className="hero-body" aria-labelledby="hero-title">
    <div className="hero-copy">
     <p className="hero-eyebrow enter" style={{'--delay':'500ms'}}>GIFFY REAL ESTATE <span aria-hidden="true">/</span> DUBAI</p>
     <h1 id="hero-title"><span className="line"><span className="enter" style={{'--delay':'550ms'}}>Experience smarter</span></span><span className="line"><span className="enter" style={{'--delay':'690ms'}}>real estate investment</span></span><span className="line"><span className="enter" style={{'--delay':'830ms'}}>in Dubai.</span></span></h1>
     <p className="hero-description enter" style={{'--delay':'990ms'}}>Whether you’re an investor, buyer, or seller, Giffy Real Estate LLC delivers unmatched insight into Dubai’s property market. Get expert support for off-plan projects, Golden Visa applications, and end-to-end property management.</p>
     <div className="hero-actions"><button className="button enter" style={{'--delay':'1140ms'}} onClick={()=>document.getElementById('featured-properties')?.scrollIntoView({behavior:'smooth'})}>Explore properties <ArrowUpRight size={14}/></button><button className="text-link enter" style={{'--delay':'1250ms'}} onClick={()=>inquire('Speak to a property advisor')}>Speak to an advisor</button></div>
     <button className="review-summary enter" style={{'--delay':'1390ms'}} onClick={()=>reviewDialog.current.showModal()} aria-label="Read Giffy Real Estate Google reviews, excellent, based on 12 reviews">
      <span className="avatar-stack" aria-hidden="true">{reviews.map(r=><span key={r.initial} style={{background:r.color}}>{r.initial}</span>)}</span>
      <span className="review-copy"><span className="review-rating"><Stars/><span className="excellent">Excellent</span></span><span className="review-count">12 Google reviews <BadgeCheck size={12}/></span><small>Verified by Trustindex</small></span>
     </button>

    </div>
    <div className="hero-visual video-showcase enter" style={{'--delay':'1700ms'}} aria-label="Stories from Giffy Real Estate">
     <figure className="video-card enter" style={{'--delay':'1850ms'}}>
      <video ref={element => { videoRefs.current[0] = element; }} onPlay={event => playExclusively(event.currentTarget)} src={`/videos/giffy-award${lowBandwidth ? '-low' : ''}.mp4`} poster="/videos/giffy-award-poster.jpg" controls autoPlay={false} muted loop playsInline preload={lowBandwidth ? 'none' : 'metadata'} aria-label="Giffy Real Estate Binghatti award video"><a href="https://giffyrealestate.com/wp-content/uploads/2026/07/Giffy-Binghatti-Award.mp4">Watch the Giffy Binghatti award video</a></video>
      <figcaption>
        Giffy × Binghatti
      </figcaption>
     </figure>
     <figure className="video-card enter" style={{'--delay':'2010ms'}}>
      <video ref={element => { videoRefs.current[1] = element; }} onPlay={event => playExclusively(event.currentTarget)} src={`/videos/giffy-story${lowBandwidth ? '-low' : ''}.mp4`} poster="/videos/giffy-story-poster.jpg" controls muted loop playsInline preload="none" aria-label="Gift's story at Giffy Real Estate"><a href="https://giffyrealestate.com/wp-content/uploads/2026/07/Ms-Gift-Story.mp4">Watch Gift's story</a></video>
      <figcaption>Our story</figcaption>
     </figure>
    </div>
   </section>
   <div className="hero-footer">     <div className="stats" aria-label="About Giffy Real Estate">{[{from:40,to:500,label:'Happy Clients'},{from:20,to:250,label:'Exclusive Listings'},{from:0,to:15,label:'Developer Partnerships'}].map((stat,i)=><div className="stat enter" style={{'--delay':`${1530+i*120}ms`}} key={stat.label}><CountUp {...stat}/></div>)}</div><p className="footer-note enter" style={{'--delay':'1800ms'}}>Personal guidance.<br/>A considered approach to property.</p></div>
  </main></div>
  <section className="developers-section reveal" id="developers" aria-labelledby="developers-title">
   <div className="section-index reveal-item" style={{'--reveal-delay':'0ms'}}>OUR NETWORK / YOUR ADVANTAGE</div>
   <h2 id="developers-title" className="reveal-item" style={{'--reveal-delay':'100ms'}}>Trusted Partner of the Most Prominent Developers</h2>
   <div className="developer-marquee" role="region" aria-label="Our developer partners">
    <div className="developer-track">
     {[0,1].map(copy=><div className="developer-group" key={copy} aria-hidden={copy===1}>
      {[['emaar','EMAAR'],['damac','DAMAC'],['binghatti','Binghatti'],['imtiaz','Imtiaz Developments'],['acube','Acube Developments'],['object-one','Object 1']].map(([slug,name],i)=><div className="developer-logo reveal-item" style={{'--reveal-delay':`${180+i*70}ms`}} key={slug}><img src={`/images/developers/${slug}.png`} alt={copy===0?name:''} loading="lazy" width="220" height="100"/></div>)}
     </div>)}
    </div>
   </div>
  </section>
  <section className="properties-section reveal" id="featured-properties" aria-labelledby="properties-title">
   <div className="properties-heading">
    <div><span className="section-index">FEATURED PROPERTIES / DUBAI</span><h2 id="properties-title">Exceptional properties.<br/>Considered choices.</h2></div>
    <div className="properties-intro"><p>Discover high-demand residential and investment properties in Dubai’s fastest-growing areas.<br/>Our featured listings highlight the best deals, exclusive launches, and limited-time offers from trusted developers.</p><a href="https://giffyrealestate.com/projects/" target="_blank" rel="noreferrer">Explore all properties <ArrowUpRight size={14}/></a></div>
   </div>
   <div className="property-grid">{[featuredProperties.slice(0,2),featuredProperties.slice(2)].map((row,rowIndex)=><div className={`property-row property-row-${rowIndex+1}`} key={rowIndex}>{row.map((property,index)=><a key={property.name} className="property-card reveal-item" style={{'--reveal-delay':`${120+(rowIndex*2+index)*90}ms`}} href={property.href} target="_blank" rel="noreferrer">
    <div className="property-image"><img src={property.image} alt={property.alt} loading="lazy"/><span className="property-tag"><i/> {property.tag}</span><span className="property-open"><ArrowUpRight size={17}/></span></div>
    <div className="property-meta"><div><span className="property-number">{property.number}</span><h3>{property.name}</h3></div><strong>{property.price}</strong></div>
    <span className="property-note">Starting from</span>
   </a>)}</div>)}</div>
  </section>
  <ServicesScroll onEnquire={inquire}/>
  <div className="reference-stack">
   <section className="reference-card craft-section management-craft" id="property-management" aria-labelledby="craft-title">
    <div className="craft-ribbon" aria-hidden="true">{Array.from({length:8},(_,i)=><span key={i}>HASSLE-FREE OWNERSHIP <b>✳</b> PROPERTY MANAGEMENT IN DUBAI <b>✳</b></span>)}</div>
    <header className="craft-heading"><span className="craft-eyebrow">01 / PROPERTY MANAGEMENT</span><h2 id="craft-title">Hassle-Free Property<br/>Management in <em>Dubai.</em></h2><div><p>Enjoy worry-free ownership with our end-to-end property management services. We keep your property occupied, well-maintained, and consistently profitable.</p><button onClick={()=>inquire('Get started with property management')}>GET STARTED <ArrowUpRight size={10}/></button></div></header>
    <div className="craft-body"><figure><img src="/images/dubai-skyline.jpg" alt="Burj Khalifa and Downtown Dubai above illuminated roads at sunset" loading="lazy"/><figcaption><span>YOUR PROPERTY, OUR PRIORITY</span><span>DUBAI / GIFFY REAL ESTATE</span></figcaption></figure><div className="craft-details">{[['List &','Prepare','We inspect your property, set the right rental price, and get it ready for tenants. From presentation to pricing, every detail helps attract the right people.'],['Manage &','Maintain','We handle tenant communication, rent collection, and all maintenance needs. Our end-to-end service covers inspections and day-to-day care, so ownership stays simple.'],['Report &','Support','You receive clear monthly updates while we manage everything end-to-end. Stay informed about your property, rental income, and ongoing maintenance with support whenever you need it.']].map(([first,second,copy],index)=><article key={first}><h3>{first}<br/>{second}</h3><p>{copy}</p><button className={index===0?'craft-detail-active':''} aria-label={`Enquire about ${first} ${second}`} onClick={()=>inquire(`Property management: ${first} ${second}`)}><ArrowUpRight size={14}/></button></article>)}</div></div>
    <div className="craft-ribbon craft-ribbon-bottom" aria-hidden="true">{Array.from({length:8},(_,i)=><span key={i}>LIST &amp; PREPARE <b>✳</b> MANAGE &amp; MAINTAIN <b>✳</b> REPORT &amp; SUPPORT <b>✳</b></span>)}</div>
   </section>
   <section className="reference-card reference-leadership restored-leadership" id="our-experience" aria-labelledby="experience-title">
    <div className="reference-leadership-brand">◇ GIFFY<br/><small>REAL ESTATE</small></div>
    <img className="reference-portrait" src="/images/giffy-ceo.jpg" alt="Gift Preye Solomon, founder and CEO of Giffy Real Estate" loading="lazy"/>
    <div className="reference-leadership-copy experience-copy-content"><span className="experience-eyebrow">Our Experience</span><h2 id="experience-title">With A Decade Of Experience, We're Experts At Getting It Right The First Time.</h2><p>Giffy Real Estate LLC is a leading real estate company in Dubai, offering a premium portfolio of luxury and high-end properties. Our mission is to provide every client with an exceptional, seamless, and personalized experience—whether you are buying, selling, or investing in Dubai's rapidly growing property market.</p><button className="experience-view-more" onClick={()=>inquire('Meet the Giffy team')}>View More <ArrowUpRight size={15}/></button></div>
    <span className="reference-project-count"><b>02</b> / 02 &nbsp;&nbsp; OUR EXPERIENCE ›</span>
    <aside className="reference-abstract experience-aside"><div><h3>EXPERIENCE THAT COUNTS</h3><p>A decade of market knowledge. Personal guidance for every move. Lasting relationships built on trust.</p><dl className="experience-figures"><div><dt>500+</dt><dd>Happy Clients</dd></div><div><dt>250+</dt><dd>Exclusive Listings</dd></div><div><dt>15+</dt><dd>Developer Partnerships</dd></div></dl></div><span className="reference-care">LOCAL KNOWLEDGE. PERSONAL SERVICE.</span><div className="reference-social"><a href="https://facebook.com/giffyrealestate" aria-label="Giffy on Facebook">f</a><a href="https://instagram.com/giffyrealestate" aria-label="Giffy on Instagram">◎</a></div></aside>
   </section>

  </div>
  <section className="contact-invitation" aria-labelledby="contact-invitation-title"><span className="section-index">YOUR NEXT CHAPTER</span><h2 id="contact-invitation-title">Let's find your place<br/>in Dubai.</h2><p>Buying, selling, or investing? Start with a conversation and a clearer picture of what comes next.</p><div><button className="button" onClick={()=>inquire('Speak to a property advisor')}>Speak to an advisor <ArrowUpRight size={16}/></button><a href="https://wa.me/971522656819" target="_blank" rel="noreferrer" className="text-link">Chat on WhatsApp <ArrowUpRight size={16}/></a></div></section>
  <SiteFooter onContact={inquire}/>
  </div>
  {contactMounted&&<section className={`contact-page${contactOpen?' contact-page-entered':''}`} role="dialog" aria-modal="true" aria-labelledby="contact-title"><div className="contact-page-content"><div className="contact-page-top"><button className="contact-menu" onClick={closeContact}><Menu size={17}/> <span>Back to Giffy</span></button><Brand/></div><h1 id="contact-title">CONTACT</h1><div className="contact-details"><p className="contact-intro">For enquiries, or just to say hello, get in touch and contact us.</p><div className="contact-detail-grid"><div><span>New projects</span><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a></div><div><span>General enquiries</span><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a><a href="tel:+97145703395">+971 4 570 3395</a></div><div><span>Address</span><p>Prime Tower<br/>Business Bay, Dubai</p></div><div><span>Careers &amp; Partnerships</span><a href="https://wa.me/971522656819" target="_blank" rel="noreferrer">Chat with our team</a></div><div><span>Call us</span><a href="tel:+97145703395">+971 4 570 3395</a></div><div><span>Follow us</span><div className="contact-social"><a href="https://instagram.com/giffyrealestate" target="_blank" rel="noreferrer">IG</a><a href="https://facebook.com/giffyrealestate" target="_blank" rel="noreferrer">FB</a><a href="https://linkedin.com/company/giffy-real-estate" target="_blank" rel="noreferrer">IN</a></div></div></div></div><span className="contact-footnote">{intent || 'A considered way to live.'} / DUBAI</span></div><figure className="contact-page-image"><img src="/images/about-residence.jpg" alt="A welcoming modern residence with warm natural light"/><figcaption>GIFFY REAL ESTATE / DUBAI</figcaption></figure><button className="contact-close" onClick={closeContact} aria-label="Close contact page"><X size={19}/></button></section>}
  {telemetryEnabled && <><Analytics/><SpeedInsights/></>}

  <dialog ref={reviewDialog} className="reviews-dialog" onClick={e=>{if(e.target===reviewDialog.current)reviewDialog.current.close()}}><div className="dialog-content"><button className="dialog-close" aria-label="Close reviews" onClick={()=>reviewDialog.current.close()}><X/></button><span className="google-label"><span className="google-g">G</span> Google reviews</span><h2>Excellent, in your words.</h2><div className="review-dialog-rating"><Stars/><span>Based on 12 reviews</span></div><article className="review-card" aria-live="polite"><div className="reviewer"><span className="reviewer-avatar" style={{background:review.color}}>{review.initial}</span><strong>{review.name}</strong><BadgeCheck size={17}/></div><Stars/><p>{review.text}</p></article><div className="review-footer"><span><BadgeCheck size={15}/> Verified by Trustindex</span><div><button aria-label="Previous review" onClick={()=>setReviewIndex((reviewIndex+2)%3)}><ChevronLeft size={20}/></button><button aria-label="Next review" onClick={()=>setReviewIndex((reviewIndex+1)%3)}><ChevronRight size={20}/></button></div></div><a className="original-reviews" href="https://giffyrealestate.com/" target="_blank" rel="noreferrer">View reviews on Giffy’s website <ArrowUpRight size={14}/></a></div></dialog>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
