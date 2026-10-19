import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, X, Menu, Search, Star, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
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
const aboutStories = [
  {
    title: <>We see <em>possibility,</em> not just property.<br/>Our work is shaped by local insight<br/>and a <em>considered approach</em> to your next chapter.</>,
    description: 'Behind every move is a personal story. We bring Dubai market knowledge and thoughtful, individual guidance to buying, selling and investing, so your next decision feels clear, considered and entirely yours.',
    image: '/images/about-residence.jpg',
    alt: 'A light-filled contemporary residence with natural materials',
    caption: 'A considered way to live.'
  },
  {
    title: <>Your next move, <em>made clearer.</em><br/>Thoughtful guidance for a city<br/>full of <em>possibility.</em></>,
    description: 'From exploring off-plan opportunities to understanding a ready home\'s details, our team helps you navigate Dubai property with clear information and personal support.',
    image: '/images/dubai-skyline.jpg',
    alt: 'Dubai skyline at dusk, with the city illuminated',
    caption: 'A city full of possibility.'
  }
];
const featuredProperties = [
  { number: '01', name: 'Sunset Bay Grand', price: 'AED 1.95M', image: '/images/projects/sunset-bay.jpg', alt: 'Warm contemporary dining interior at Sunset Bay Grand', href: 'https://giffyrealestate.com/projects/sunset-bay-grand-by-imtiaz/', tag: 'Featured launch' },
  { number: '02', name: 'Golf Hills EMAAR South', price: 'AED 1.06M', image: '/images/projects/golf-hills.png', alt: 'A resident looking out over a landscaped community at sunset', href: 'https://giffyrealestate.com/projects/grand-polo-club-resort-living/', tag: 'Dubai South' },
  { number: '03', name: 'Equestra Grand Polo', price: 'AED 1.06M', image: '/images/projects/equestra.png', alt: 'Equestrian community at Equestra Grand Polo', href: 'https://giffyrealestate.com/projects/equestra-grand-polo-club-resort-living/', tag: 'New release' },
  { number: '04', name: 'Marquis Vista', price: 'AED 661,000', image: '/images/projects/marquis-vista.png', alt: 'Marquis Vista contemporary residential development', href: 'https://giffyrealestate.com/projects/marquis-vista-2/', tag: 'Just listed' }
];
const services = [
  { title: 'Property to Buy', description: 'Find the best ready and off-plan properties across Dubai, carefully selected for quality, ROI, and long-term value.' },
  { title: 'Property to Sell', description: 'Sell your property faster with professional marketing, accurate valuation, and access to qualified buyers across Dubai.' },
  { title: 'Property Management', description: 'Enjoy hassle-free ownership with full property management, tenant handling, maintenance, and rental supervision.' },
  { title: 'Off-Plan Properties', description: 'Unlock early-stage investment opportunities with flexible payment plans from top Dubai developers.' }
];
const managementSteps = [
  { title: 'List & Prepare', description: 'We inspect your property, set the right rental price, and get it ready for tenants.' },
  { title: 'Manage & Maintain', description: 'We handle tenant communication, rent collection, and all maintenance needs.' },
  { title: 'Report & Support', description: 'You receive clear monthly updates while we manage everything end-to-end.' }
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
   travel = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
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
 return <section ref={sectionRef} className="services-scroll-section" id="services" aria-labelledby="services-scroll-title"><div className="services-scroll-pin"><header className="services-scroll-heading"><span>OUR SERVICES</span><h2 id="services-scroll-title">OUR REAL ESTATE<br/>SERVICES IN DUBAI.</h2><p>Get expert support for buying, selling, investing, and managing properties across Dubai. Giffy Real Estate LLC provides end-to-end solutions tailored to homeowners, investors, and international buyers.</p></header><div className="services-scroll-window"><div className="services-scroll-track" ref={trackRef}>{serviceCards.map((service,index)=><article className="services-scroll-card" key={service.title}><span className="services-card-number">{String(index+1).padStart(2,'0')}</span><div><h3>{service.title}</h3><p>{service.text}</p><button onClick={()=>onEnquire(service.title)}>Learn more <ArrowUpRight size={14}/></button></div></article>)}</div></div><span className="services-scroll-note">SCROLL TO EXPLORE ALL SERVICES <span aria-hidden="true">→</span></span></div></section>;
}
function ProjectsHeadline({ children }) {
 const sectionRef = useRef(null);
 const lineRef = useRef(null);
 const text = 'Discover the art of living through our finest projects';
 useEffect(() => {
  const section = sectionRef.current, line = lineRef.current;
  const letters = [...line.querySelectorAll('.projects-headline-letter')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let frame = 0, travel = 0;
  const update = () => {
   frame = 0;
   const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')) || 58;
   const rect = section.getBoundingClientRect();
   const entrance = Math.min(1, Math.max(0, (window.innerHeight * .85 - rect.top) / (window.innerHeight * .55)));
   const distance = Math.min(travel, Math.max(0, header - rect.top));
   line.style.transform = `translate3d(${-distance}px,0,0)`;
   const lineLeft = line.getBoundingClientRect().left;
   letters.forEach((letter,index) => {
    const naturalLeft = lineLeft + letter.parentElement.offsetLeft + letter.offsetLeft;
    const visibility = Math.min(1, Math.max(0, (window.innerWidth * .98 - naturalLeft) / (window.innerWidth * .25)));
    const delay = (index % 5) * .025;
    const progress = reduced ? 1 : Math.min(1, Math.max(0, (Math.min(entrance, visibility) - delay) / (1 - delay)));
    const remaining = Math.pow(1 - progress, 3);
    const x = [120,-90,60,-140,0][index % 5] * remaining;
    const y = [-170,150,-100,130,-200][index % 5] * remaining;
    const rotation = [18,-15,12,-20,9][index % 5] * remaining;
    letter.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rotation}deg)`;
    letter.style.opacity = String(Math.min(1, progress * 3));
   });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const measure = () => {
   travel = Math.max(0, line.scrollWidth - line.parentElement.clientWidth);
   section.style.setProperty('--headline-travel', `${travel}px`);
   section.style.setProperty('--headline-content-height', `${section.firstElementChild.getBoundingClientRect().height}px`);
   schedule();
  };
  const observer = new ResizeObserver(measure);
  observer.observe(line); observer.observe(line.parentElement); observer.observe(section.firstElementChild);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure);
  document.fonts.ready.then(measure);
  measure();
  return () => { observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure); cancelAnimationFrame(frame); };
 }, []);
 return <section className="projects-headline-section" ref={sectionRef} aria-labelledby="projects-headline-title"><div className="projects-headline-pin"><h2 id="projects-headline-title" className="projects-headline-window" aria-label={text}><span ref={lineRef} className="projects-headline-line" aria-hidden="true">{text.split(' ').map((word,wordIndex)=><React.Fragment key={wordIndex}><span className="projects-headline-word">{[...word].map((letter,index)=><span className="projects-headline-letter" key={index}>{letter}</span>)}</span>{wordIndex < text.split(' ').length-1 ? ' ' : null}</React.Fragment>)}</span></h2>{children}</div></section>;
}
function SiteFooter({ onContact }) {
 const [email, setEmail] = useState('');
 const propertyTypes = [['Commercial',false],['Office',true],['Shop',true],['Residential',false],['Apartment',true],['Apartment Building',true],['Condominium',true],['Single Family Home',true],['Villa',true]];
 return <footer className="classic-footer">
  <div className="classic-footer-inner">
   <div className="classic-footer-partners" aria-label="Our developer partners">{[['emaar','EMAAR'],['damac','DAMAC'],['binghatti','Binghatti'],['imtiaz','Imtiaz Developments'],['object-one','Object 1']].map(([slug,name])=><img key={slug} src={`/images/developers/${slug}.png`} alt={name} loading="lazy"/>)}</div>
   <div className="classic-footer-columns">
    <div><h2>Contact Info</h2><address>Prime Tower, Business Bay,<br/>Dubai, United Arab Emirates</address><p>Phone: <a href="tel:+97145703395">+971 4 570 3395</a></p><p>Email: <a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a></p></div>
    <nav aria-label="Property types"><h2>Property Types</h2><ul>{propertyTypes.map(([type,indent])=><li className={indent?'classic-footer-indent':''} key={type}><button onClick={()=>onContact(`Find a property: ${type}`)}>{type}</button></li>)}</ul></nav>
    <div><h2>Newsletter</h2><form onSubmit={event=>{event.preventDefault();onContact(`Newsletter signup request: ${email}`);}}><label htmlFor="footer-email">Email address:</label><input id="footer-email" type="email" required value={email} onChange={event=>setEmail(event.target.value)} placeholder="Your email address" autoComplete="email"/><button className="classic-footer-signup" type="submit">Sign up</button></form></div>
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
 const [autoplayVideos] = useState(() => !lowBandwidth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
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
 const [aboutIndex, setAboutIndex] = useState(0);
 const [aboutArriving, setAboutArriving] = useState(false);
 const [aboutDirection, setAboutDirection] = useState(1);
 const aboutTimer = useRef(null);
 const aboutStory = aboutStories[aboutIndex];
 const changeAboutStory = direction => {
   setAboutDirection(direction);
   window.clearTimeout(aboutTimer.current);
   setAboutArriving(false);
   setAboutIndex(index => (index + direction + aboutStories.length) % aboutStories.length);
   requestAnimationFrame(() => setAboutArriving(true));
   aboutTimer.current = window.setTimeout(() => setAboutArriving(false), 750);
 };
 useEffect(() => () => window.clearTimeout(aboutTimer.current), []);
 const reviewDialog = useRef(null);
 const inquire = purpose => { setMenuOpen(false); setIntent(purpose); window.clearTimeout(contactCloseTimer.current); setContactMounted(true); requestAnimationFrame(() => setContactOpen(true)); };
 const closeContact = () => { setContactOpen(false); window.clearTimeout(contactCloseTimer.current); contactCloseTimer.current = window.setTimeout(() => setContactMounted(false), 720); };
 useEffect(() => { if (!contactMounted) return; const handleEscape = event => { if (event.key === 'Escape') { setContactOpen(false); window.clearTimeout(contactCloseTimer.current); contactCloseTimer.current = window.setTimeout(() => setContactMounted(false), 720); } }; window.addEventListener('keydown', handleEscape); return () => window.removeEventListener('keydown', handleEscape); }, [contactMounted]);
 const navigate = (e, label) => { if (label === 'About Giffy' || label === 'Home' || label === 'Projects') { setMenuOpen(false); } else { e.preventDefault(); inquire(label); } };
 const review = reviews[reviewIndex];
 return <>
  <div className={`page-transition-view${contactOpen?' page-view-away':''}`} aria-hidden={contactOpen} inert={contactOpen}><div className="page-frame"><main className="hero-shell" id="home">
   <header className="site-header">
    <div className="enter header-brand" style={{'--delay':'40ms'}}><Brand/></div>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((label,i)=><a className="enter" style={{'--delay':`${110+i*55}ms`}} href={label === 'About Giffy' ? '#about-giffy' : label === 'Projects' ? '#featured-properties' : '#home'} key={label} onClick={e=>navigate(e,label)}>{label}</a>)}</nav>
    <button className="button header-contact enter" style={{'--delay':'460ms'}} onClick={()=>inquire('Contact Giffy')}>Contact us</button>
    <button className="menu-toggle enter" style={{'--delay':'460ms'}} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
   </header>
   {menuOpen&&<nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">{navigation.map(label=><a href={label === 'About Giffy' ? '#about-giffy' : label === 'Projects' ? '#featured-properties' : '#home'} key={label} onClick={e=>navigate(e,label)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}
   <section className="hero-body" aria-labelledby="hero-title">
    <div className="hero-copy">
     <p className="hero-eyebrow enter" style={{'--delay':'500ms'}}>GIFFY REAL ESTATE <span aria-hidden="true">/</span> DUBAI</p>
     <h1 id="hero-title"><span className="line"><span className="enter" style={{'--delay':'550ms'}}>Experience smarter</span></span><span className="line"><span className="enter" style={{'--delay':'690ms'}}>real estate investment</span></span><span className="line"><span className="enter" style={{'--delay':'830ms'}}>in Dubai.</span></span></h1>
     <p className="hero-description enter" style={{'--delay':'990ms'}}>Whether you’re an investor, buyer, or seller, Giffy Real Estate LLC delivers unmatched insight into Dubai’s property market. Get expert support for off-plan projects, Golden Visa applications, and end-to-end property management.</p>
     <div className="hero-actions"><button className="button enter" style={{'--delay':'1140ms'}} onClick={()=>inquire('Get started')}>Get started <ArrowUpRight size={14}/></button><button className="text-link enter" style={{'--delay':'1250ms'}} onClick={()=>inquire('Request a floor plan')}>Request floor plan</button></div>
     <button className="review-summary enter" style={{'--delay':'1390ms'}} onClick={()=>reviewDialog.current.showModal()} aria-label="Read Giffy Real Estate Google reviews, excellent, based on 12 reviews">
      <span className="avatar-stack" aria-hidden="true">{reviews.map(r=><span key={r.initial} style={{background:r.color}}>{r.initial}</span>)}</span>
      <span className="review-copy"><span className="review-rating"><Stars/><span className="excellent">Excellent</span></span><span className="review-count">12 Google reviews <BadgeCheck size={12}/></span><small>Verified by Trustindex</small></span>
     </button>

    </div>
    <div className="hero-visual video-showcase enter" style={{'--delay':'1700ms'}} aria-label="Stories from Giffy Real Estate">
     <figure className="video-card enter" style={{'--delay':'1850ms'}}>
      <video ref={element => { videoRefs.current[0] = element; }} onPlay={event => playExclusively(event.currentTarget)} src={`/videos/giffy-award${lowBandwidth ? '-low' : ''}.mp4`} poster="/videos/giffy-award-poster.jpg" controls autoPlay={autoplayVideos} muted loop playsInline preload={lowBandwidth ? 'none' : 'metadata'} aria-label="Giffy Real Estate Binghatti award video"><a href="https://giffyrealestate.com/wp-content/uploads/2026/07/Giffy-Binghatti-Award.mp4">Watch the Giffy Binghatti award video</a></video>
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
  <section className="about-section reveal" id="about-giffy" aria-labelledby="about-title">
   <div className="about-section-label reveal-item" style={{'--reveal-delay':'0ms'}}><span>01</span> ABOUT GIFFY</div>
   <h2 id="about-title" key={`title-${aboutIndex}`} className={`about-statement about-carousel-item${aboutArriving?` about-entering ${aboutDirection<0?'about-backward':'about-forward'}`:''}`}>{aboutStory.title}</h2>
   <div className="about-seal reveal-item" style={{'--reveal-delay':'240ms'}} aria-hidden="true"><span>GIFFY REAL ESTATE</span><img src="/images/giffy-logo.png" alt="" width="2330" height="807"/><span>DUBAI / PERSONAL GUIDANCE</span></div>
   <div key={`story-${aboutIndex}`} className={`about-story about-carousel-item${aboutArriving?` about-entering ${aboutDirection<0?'about-backward':'about-forward'}`:''}`}><span className="about-line" aria-hidden="true"/><p>{aboutStory.description}</p><button className="text-link" onClick={()=>inquire('Meet Giffy Real Estate')}>Get to know Giffy <ArrowUpRight size={14}/></button></div>
   <span className="about-asterisks reveal-item" style={{'--reveal-delay':'420ms'}} aria-hidden="true">&#10035; &#10035; &#10035;</span>
   <figure key={`photo-${aboutIndex}`} className={`about-photo about-carousel-item${aboutArriving?` about-entering ${aboutDirection<0?'about-backward':'about-forward'}`:''}`}><img src={aboutStory.image} alt={aboutStory.alt} loading="lazy" width="900" height="1100"/><figcaption><span>{aboutStory.caption}</span><span>Dubai / Giffy</span></figcaption></figure>
   <button className="about-top-link reveal-item" style={{'--reveal-delay':'550ms'}} onClick={()=>changeAboutStory(-1)} aria-label="Previous Giffy story"><ChevronLeft size={18}/></button>
   <button className="about-next-link reveal-item" style={{'--reveal-delay':'400ms'}} onClick={()=>changeAboutStory(1)} aria-label="Next Giffy story"><ChevronRight size={18}/></button>
  </section>
  <section className="properties-section reveal" id="featured-properties" aria-labelledby="properties-title">
   <div className="properties-heading">
    <div><span className="section-index">Our Top Property Picks in Dubai</span><h2 id="properties-title">Check out Featured<br/>Properties in Dubai</h2></div>
    <div className="properties-intro"><p>Discover high-demand residential and investment properties in Dubai’s fastest-growing areas.<br/>Our featured listings highlight the best deals, exclusive launches, and limited-time offers from trusted developers.</p><a href="https://giffyrealestate.com/projects/" target="_blank" rel="noreferrer">View all projects <ArrowUpRight size={14}/></a></div>
   </div>
   <div className="property-grid">{[featuredProperties.slice(0,2),featuredProperties.slice(2)].map((row,rowIndex)=><div className={`property-row property-row-${rowIndex+1}`} key={rowIndex}>{row.map((property,index)=><a key={property.name} className="property-card reveal-item" style={{'--reveal-delay':`${120+(rowIndex*2+index)*90}ms`}} href={property.href} target="_blank" rel="noreferrer">
    <div className="property-image"><img src={property.image} alt={property.alt} loading="lazy"/><span className="property-tag"><i/> {property.tag}</span><span className="property-open"><ArrowUpRight size={17}/></span></div>
    <div className="property-meta"><div><span className="property-number">{property.number}</span><h3>{property.name}</h3></div><strong>{property.price}</strong></div>
    <span className="property-note">Starting from</span>
   </a>)}</div>)}</div>
  </section>
  <div className="reference-stack">
   <section className="reference-card craft-section management-craft" id="property-management" aria-labelledby="craft-title">
    <div className="craft-ribbon" aria-hidden="true">{Array.from({length:8},(_,i)=><span key={i}>HASSLE-FREE OWNERSHIP <b>✳</b> PROPERTY MANAGEMENT IN DUBAI <b>✳</b></span>)}</div>
    <header className="craft-heading"><span className="craft-eyebrow">01 / PROPERTY MANAGEMENT</span><h2 id="craft-title">Hassle-Free Property<br/>Management in <em>Dubai.</em></h2><div><p>Enjoy worry-free ownership with our end-to-end property management services. We keep your property occupied, well-maintained, and consistently profitable.</p><button onClick={()=>inquire('Get started with property management')}>GET STARTED <ArrowUpRight size={10}/></button></div></header>
    <div className="craft-body"><figure><img src="/images/dubai-skyline.jpg" alt="Burj Khalifa and Downtown Dubai above illuminated roads at sunset" loading="lazy"/><figcaption><span>YOUR PROPERTY, OUR PRIORITY</span><span>DUBAI / GIFFY REAL ESTATE</span></figcaption></figure><div className="craft-details">{[['List &','Prepare','We inspect your property, set the right rental price, and get it ready for tenants. From presentation to pricing, every detail helps attract the right people.'],['Manage &','Maintain','We handle tenant communication, rent collection, and all maintenance needs. Our end-to-end service covers inspections and day-to-day care, so ownership stays simple.'],['Report &','Support','You receive clear monthly updates while we manage everything end-to-end. Stay informed about your property, rental income, and ongoing maintenance with support whenever you need it.']].map(([first,second,copy],index)=><article key={first}><h3>{first}<br/>{second}</h3><p>{copy}</p><button className={index===0?'craft-detail-active':''} aria-label={`Enquire about ${first} ${second}`} onClick={()=>inquire(`Property management: ${first} ${second}`)}><ArrowUpRight size={14}/></button></article>)}</div></div>
    <div className="craft-ribbon craft-ribbon-bottom" aria-hidden="true">{Array.from({length:8},(_,i)=><span key={i}>LIST &amp; PREPARE <b>✳</b> MANAGE &amp; MAINTAIN <b>✳</b> REPORT &amp; SUPPORT <b>✳</b></span>)}</div>
   </section>
   <section className="reference-card reference-leadership" id="our-experience" aria-labelledby="reference-leadership-title">
    <div className="reference-leadership-brand">◇ GIFFY<br/><small>REAL ESTATE</small></div>
    <img className="reference-portrait" src="/images/giffy-ceo.jpg" alt="Gift Preye Solomon, founder and CEO of Giffy Real Estate" loading="lazy"/>
    <div className="reference-leadership-copy experience-copy-content"><span className="experience-eyebrow">Our Experience</span><h2 id="reference-leadership-title">With A Decade Of Experience, We're Experts At Getting It Right The First Time.</h2><p>Giffy Real Estate LLC is a leading real estate company in Dubai, offering a premium portfolio of luxury and high-end properties. Our mission is to provide every client with an exceptional, seamless, and personalized experience—whether you are buying, selling, or investing in Dubai’s rapidly growing property market.</p><button className="experience-view-more" onClick={()=>inquire('Learn more about Giffy Real Estate')}>View More <ArrowUpRight size={15}/></button></div>
    <span className="reference-project-count"><b>02</b> / 03 &nbsp;&nbsp; OUR EXPERIENCE ›</span>
    <aside className="reference-abstract experience-aside"><div><h3>EXPERIENCE THAT COUNTS</h3><p>A decade of market knowledge. Personal guidance for every move. Lasting relationships built on trust.</p><dl className="experience-figures"><div><dt>500+</dt><dd>Happy Clients</dd></div><div><dt>250+</dt><dd>Exclusive Listings</dd></div><div><dt>15+</dt><dd>Developer Partnerships</dd></div></dl></div><span className="reference-care">LOCAL KNOWLEDGE. PERSONAL SERVICE.</span><div className="reference-social"><a href="https://facebook.com/giffyrealestate" aria-label="Giffy on Facebook">f</a><a href="https://instagram.com/giffyrealestate" aria-label="Giffy on Instagram">◎</a></div></aside>
   </section>
   <ServicesScroll onEnquire={inquire}/>
  </div>
  <ProjectsHeadline><SiteFooter onContact={inquire}/></ProjectsHeadline>
  </div>
  {contactMounted&&<section className={`contact-page${contactOpen?' contact-page-entered':''}`} role="dialog" aria-modal="true" aria-labelledby="contact-title"><div className="contact-page-content"><div className="contact-page-top"><button className="contact-menu" onClick={closeContact}><Menu size={17}/> <span>Back to Giffy</span></button><Brand/></div><h1 id="contact-title">CONTACT</h1><div className="contact-details"><p className="contact-intro">For enquiries, or just to say hello, get in touch and contact us.</p><div className="contact-detail-grid"><div><span>New projects</span><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a></div><div><span>General enquiries</span><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a><a href="tel:+97145703395">+971 4 570 3395</a></div><div><span>Address</span><p>Prime Tower<br/>Business Bay, Dubai</p></div><div><span>Careers &amp; Partnerships</span><a href="https://wa.me/971522656819" target="_blank" rel="noreferrer">Chat with our team</a></div><div><span>Call us</span><a href="tel:+97145703395">+971 4 570 3395</a></div><div><span>Follow us</span><div className="contact-social"><a href="https://instagram.com/giffyrealestate" target="_blank" rel="noreferrer">IG</a><a href="https://facebook.com/giffyrealestate" target="_blank" rel="noreferrer">FB</a><a href="https://linkedin.com/company/giffy-real-estate" target="_blank" rel="noreferrer">IN</a></div></div></div></div><span className="contact-footnote">{intent || 'A considered way to live.'} / DUBAI</span></div><figure className="contact-page-image"><img src="/images/about-residence.jpg" alt="A welcoming modern residence with warm natural light"/><figcaption>GIFFY REAL ESTATE / DUBAI</figcaption></figure><button className="contact-close" onClick={closeContact} aria-label="Close contact page"><X size={19}/></button></section>}
  {telemetryEnabled && <><Analytics/><SpeedInsights/></>}

  <dialog ref={reviewDialog} className="reviews-dialog" onClick={e=>{if(e.target===reviewDialog.current)reviewDialog.current.close()}}><div className="dialog-content"><button className="dialog-close" aria-label="Close reviews" onClick={()=>reviewDialog.current.close()}><X/></button><span className="google-label"><span className="google-g">G</span> Google reviews</span><h2>Excellent, in your words.</h2><div className="review-dialog-rating"><Stars/><span>Based on 12 reviews</span></div><article className="review-card" aria-live="polite"><div className="reviewer"><span className="reviewer-avatar" style={{background:review.color}}>{review.initial}</span><strong>{review.name}</strong><BadgeCheck size={17}/></div><Stars/><p>{review.text}</p></article><div className="review-footer"><span><BadgeCheck size={15}/> Verified by Trustindex</span><div><button aria-label="Previous review" onClick={()=>setReviewIndex((reviewIndex+2)%3)}><ChevronLeft size={20}/></button><button aria-label="Next review" onClick={()=>setReviewIndex((reviewIndex+1)%3)}><ChevronRight size={20}/></button></div></div><a className="original-reviews" href="https://giffyrealestate.com/" target="_blank" rel="noreferrer">View reviews on Giffy’s website <ArrowUpRight size={14}/></a></div></dialog>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
