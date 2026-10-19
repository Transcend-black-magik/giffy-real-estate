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
      <figcaption>Giffy × Binghatti</figcaption>
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
  <div className="stacked-panels">
   <section className="stack-panel creative-architecture" id="services" aria-labelledby="services-title">
    <div className="creative-top"><Brand/><span>GIFFY REAL ESTATE</span><button className="creative-menu" onClick={()=>inquire('Explore Giffy Real Estate')}><Menu size={16}/> Menu</button></div>
    <span className="creative-side-label">DUBAI / REAL ESTATE</span><span className="creative-side-count">01 ? 03</span>
    <div className="architecture-copy"><span className="section-index">OUR SERVICES / DUBAI</span><h2 id="services-title">Explore<br/>the future.</h2><p>Find a home or investment that moves you forward. We bring clarity, care, and local insight to every Dubai property decision.</p><button className="creative-cta" onClick={()=>inquire('Explore property opportunities')}>Explore properties <ArrowUpRight size={15}/></button></div>
    <figure className="architecture-image"><img src="/images/modern-villa.png" alt="Contemporary sculptural Dubai home with expansive glass and modern architecture" loading="lazy"/><figcaption>01 / A new perspective on Dubai living</figcaption></figure>
    <div className="architecture-footer"><span>BUY</span><span>SELL</span><span>INVEST</span><span>PROPERTY CARE</span></div>
   </section>
   <section className="stack-panel creative-story" id="property-management" aria-labelledby="story-title">
    <div className="story-white"><div className="creative-top"><Brand/><span>THE GIFFY STORY</span><button className="creative-menu" onClick={()=>inquire('Our story')}><Menu size={16}/> Menu</button></div><span className="story-vertical">DUBAI / PERSONAL GUIDANCE</span><span className="story-watermark">02</span><div className="story-copy"><span className="section-index">A PERSONAL APPROACH</span><h2 id="story-title">The Story.</h2><p>Behind every move is a personal story. We pair deep Dubai market knowledge with thoughtful, one-to-one guidance, so your next chapter begins with confidence.</p><button className="text-link" onClick={()=>inquire('Meet Giffy')}>Get to know Giffy <ArrowUpRight size={14}/></button><div className="story-social"><a href="https://instagram.com/giffyrealestate" target="_blank" rel="noreferrer">Instagram</a><span>?</span><a href="https://giffyrealestate.com/" target="_blank" rel="noreferrer">Giffy Real Estate</a></div></div><span className="story-grid-mark" aria-hidden="true"/></div><div className="story-dark"><button className="story-menu-button" onClick={()=>inquire('Explore Giffy')} aria-label="Open contact page"><Menu/></button><span className="story-progress">02 <i/> 03</span><div className="story-film"><img src="/videos/giffy-story-poster.jpg" alt="A cinematic view of a Dubai residence"/><span>Giffy / Dubai</span></div><span className="story-arrows" aria-hidden="true">?<br/>?</span></div>
   </section>
   <section className="stack-panel creative-founder" id="our-experience" aria-labelledby="founder-title">
    <div className="founder-white"><div className="creative-top"><Brand/><span>GIFFY REAL ESTATE / 03</span><button className="creative-menu" onClick={()=>inquire('Contact Giffy')}><Menu size={16}/> Menu</button></div><div className="founder-copy"><span className="section-index">LEADERSHIP / DUBAI</span><h2 id="founder-title">Experience<br/>over things.<br/><strong>Always.</strong></h2><p>Thoughtful real estate guidance begins with listening. Our founder brings a personal understanding of the Dubai market to every client relationship.</p><div className="founder-caption"><strong>Gift Preye Solomon</strong><span>Founder & CEO, Giffy Real Estate</span></div></div><span className="founder-counter">03 / 03&nbsp;&nbsp; FOUNDER?S NOTE <ArrowUpRight size={13}/></span></div><figure className="founder-photo"><img src="/images/giffy-ceo.jpg" alt="Gift Preye Solomon, Founder and CEO of Giffy Real Estate" loading="lazy"/><figcaption>GIFFY REAL ESTATE / DUBAI</figcaption></figure><aside className="founder-aside"><span className="founder-search">?</span><span className="founder-menu-line"/><div><span className="section-index">A POINT OF VIEW</span><p>Local insight.<br/>Personal guidance.<br/>A better way forward.</p><div className="founder-detail"><span>FOUNDER & CEO</span><strong>GIFT PREYE<br/>SOLOMON</strong></div></div><span className="founder-side-text">DESIGNED AROUND YOU</span><div className="founder-social">IG&nbsp;&nbsp;&nbsp; IN</div></aside>
   </section>
  </div>
  </div>
  {contactMounted&&<section className={`contact-page${contactOpen?' contact-page-entered':''}`} role="dialog" aria-modal="true" aria-labelledby="contact-title"><div className="contact-page-content"><div className="contact-page-top"><button className="contact-menu" onClick={closeContact}><Menu size={17}/> <span>Back to Giffy</span></button><Brand/></div><h1 id="contact-title">CONTACT</h1><div className="contact-details"><p className="contact-intro">For enquiries, or just to say hello, get in touch and contact us.</p><div className="contact-detail-grid"><div><span>New projects</span><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a></div><div><span>General enquiries</span><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a><a href="tel:+97145703395">+971 4 570 3395</a></div><div><span>Address</span><p>Prime Tower<br/>Business Bay, Dubai</p></div><div><span>Careers &amp; Partnerships</span><a href="https://wa.me/971522656819" target="_blank" rel="noreferrer">Chat with our team</a></div><div><span>Call us</span><a href="tel:+97145703395">+971 4 570 3395</a></div><div><span>Follow us</span><div className="contact-social"><a href="https://instagram.com/giffyrealestate" target="_blank" rel="noreferrer">IG</a><a href="https://facebook.com/giffyrealestate" target="_blank" rel="noreferrer">FB</a><a href="https://linkedin.com/company/giffy-real-estate" target="_blank" rel="noreferrer">IN</a></div></div></div></div><span className="contact-footnote">{intent || 'A considered way to live.'} / DUBAI</span></div><figure className="contact-page-image"><img src="/images/about-residence.jpg" alt="A welcoming modern residence with warm natural light"/><figcaption>GIFFY REAL ESTATE / DUBAI</figcaption></figure><button className="contact-close" onClick={closeContact} aria-label="Close contact page"><X size={19}/></button></section>}
  {telemetryEnabled && <><Analytics/><SpeedInsights/></>}

  <dialog ref={reviewDialog} className="reviews-dialog" onClick={e=>{if(e.target===reviewDialog.current)reviewDialog.current.close()}}><div className="dialog-content"><button className="dialog-close" aria-label="Close reviews" onClick={()=>reviewDialog.current.close()}><X/></button><span className="google-label"><span className="google-g">G</span> Google reviews</span><h2>Excellent, in your words.</h2><div className="review-dialog-rating"><Stars/><span>Based on 12 reviews</span></div><article className="review-card" aria-live="polite"><div className="reviewer"><span className="reviewer-avatar" style={{background:review.color}}>{review.initial}</span><strong>{review.name}</strong><BadgeCheck size={17}/></div><Stars/><p>{review.text}</p></article><div className="review-footer"><span><BadgeCheck size={15}/> Verified by Trustindex</span><div><button aria-label="Previous review" onClick={()=>setReviewIndex((reviewIndex+2)%3)}><ChevronLeft size={20}/></button><button aria-label="Next review" onClick={()=>setReviewIndex((reviewIndex+1)%3)}><ChevronRight size={20}/></button></div></div><a className="original-reviews" href="https://giffyrealestate.com/" target="_blank" rel="noreferrer">View reviews on Giffy’s website <ArrowUpRight size={14}/></a></div></dialog>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
