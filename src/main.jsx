import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, X, Menu, Star, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import './styles.css';

const navigation = ['Home', 'Projects', 'Sell', 'Rent', 'Services', 'About Giffy'];
const reviews = [
  { name: 'IbroFX', initial: 'I', color: '#c73b0b', text: 'The transaction was smooth. All thanks to Giffy Real Estate, indeed a reliable broker to work with.' },
  { name: 'Fatima Alanda', initial: 'F', color: '#ac45b6', text: 'The CEO herself is one of the most humble and kindest people I have ever met. She takes care of you as she would of herself. I can only recommend!' },
  { name: 'Amazing raheema', initial: 'A', color: '#246b68', text: 'The absolute best. Service is super top notch. If you are looking for a legit real estate agency in the UAE to handle your property purchases and still give after sales services, it is definitely Giffy Real Estate.' }
];
function Brand() {
 return <a className="brand" href="#home" aria-label="Giffy Real Estate home"><svg viewBox="0 0 50 50" aria-hidden="true"><path d="M40 12a20 20 0 1 0 1 27V25H26"/><path d="M35 17a13 13 0 1 0 1 18"/><path d="m28 33 11-7v15Z"/></svg><span>GIFFY<small>REAL ESTATE</small></span></a>;
}
function Stars() { return <span className="stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map(i=><Star key={i} size={15} fill="currentColor" strokeWidth={0}/>)}</span>; }
function App() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [intent, setIntent] = useState('');
 const [reviewIndex, setReviewIndex] = useState(0);
 const contactDialog = useRef(null);
 const reviewDialog = useRef(null);
 const inquire = purpose => { setMenuOpen(false); setIntent(purpose); contactDialog.current.showModal(); };
 const navigate = (e, label) => { if(label !== 'Home') { e.preventDefault(); inquire(label); } else setMenuOpen(false); };
 const review = reviews[reviewIndex];
 return <>
  <main className="hero-shell" id="home">
   <header className="site-header">
    <div className="enter header-brand" style={{'--delay':'40ms'}}><Brand/></div>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((label,i)=><a className="enter" style={{'--delay':`${110+i*55}ms`}} href="#home" key={label} onClick={e=>navigate(e,label)}>{label}</a>)}</nav>
    <button className="button header-contact enter" style={{'--delay':'460ms'}} onClick={()=>inquire('Contact Giffy')}>Contact us</button>
    <button className="menu-toggle enter" style={{'--delay':'460ms'}} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
   </header>
   {menuOpen&&<nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">{navigation.map(label=><a href="#home" key={label} onClick={e=>navigate(e,label)}>{label}<ArrowUpRight size={18}/></a>)}</nav>}
   <section className="hero-body" aria-labelledby="hero-title">
    <div className="hero-copy">
     <h1 id="hero-title"><span className="line"><span className="enter" style={{'--delay':'550ms'}}>Experience smarter</span></span><span className="line"><span className="enter" style={{'--delay':'690ms'}}>real estate</span></span><span className="line"><span className="enter" style={{'--delay':'830ms'}}>investment in Dubai</span></span></h1>
     <p className="hero-description enter" style={{'--delay':'990ms'}}>Whether you’re an investor, buyer, or seller, Giffy Real Estate LLC delivers unmatched insight into Dubai’s property market. Get expert support for off-plan projects, Golden Visa applications, and end-to-end property management.</p>
     <div className="hero-actions"><button className="button enter" style={{'--delay':'1140ms'}} onClick={()=>inquire('Find my property')}>Find your property <ArrowUpRight size={14}/></button><button className="text-link enter" style={{'--delay':'1250ms'}} onClick={()=>inquire('Request a floor plan')}>Request floor plan</button></div>
     <button className="review-summary enter" style={{'--delay':'1390ms'}} onClick={()=>reviewDialog.current.showModal()} aria-label="Read Giffy Real Estate Google reviews, excellent, based on 12 reviews">
      <span className="avatar-stack" aria-hidden="true">{reviews.map(r=><span key={r.initial} style={{background:r.color}}>{r.initial}</span>)}</span>
      <span className="review-copy"><span className="review-rating"><Stars/><span className="excellent">Excellent</span></span><span className="review-count">12 Google reviews <BadgeCheck size={12}/></span><small>Verified by Trustindex</small></span>
     </button>
     <div className="stats" aria-label="About Giffy Real Estate">{[{value:'400+',label:'Happy clients'},{value:'10+',label:'Years of experience'},{value:'Dubai',label:'Local market expertise'}].map((stat,i)=><div className="stat enter" style={{'--delay':`${1530+i*120}ms`}} key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    </div>
    <div className="hero-visual enter" style={{'--delay':'1850ms'}}><img src="/images/modern-villa.png" alt="Architectural concept of a teal and white contemporary villa with orange and white ribbed panels" fetchPriority="high"/><span className="visual-caption enter" style={{'--delay':'2180ms'}}>A fresh perspective on Dubai living.</span></div>
   </section>
  </main>
  <dialog ref={contactDialog} className="contact-dialog" onClick={e=>{if(e.target===contactDialog.current)contactDialog.current.close()}}><div className="dialog-content"><button className="dialog-close" aria-label="Close dialog" onClick={()=>contactDialog.current.close()}><X/></button><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>{intent}</h2><p>Tell our Dubai team what you have in mind. We’ll help you explore the next step.</p><a className="button dialog-action" href={`mailto:info@giffyrealestate.com?subject=${encodeURIComponent(intent)}`}>Email our team <ArrowUpRight size={17}/></a><a className="whatsapp" href="https://wa.me/971522656819" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={16}/></a><a className="phone" href="tel:+97145703395">+971 4 570 3395</a></div></dialog>
  <dialog ref={reviewDialog} className="reviews-dialog" onClick={e=>{if(e.target===reviewDialog.current)reviewDialog.current.close()}}><div className="dialog-content"><button className="dialog-close" aria-label="Close reviews" onClick={()=>reviewDialog.current.close()}><X/></button><span className="google-label"><span className="google-g">G</span> Google reviews</span><h2>Excellent, in your words.</h2><div className="review-dialog-rating"><Stars/><span>Based on 12 reviews</span></div><article className="review-card" aria-live="polite"><div className="reviewer"><span className="reviewer-avatar" style={{background:review.color}}>{review.initial}</span><strong>{review.name}</strong><BadgeCheck size={17}/></div><Stars/><p>{review.text}</p></article><div className="review-footer"><span><BadgeCheck size={15}/> Verified by Trustindex</span><div><button aria-label="Previous review" onClick={()=>setReviewIndex((reviewIndex+2)%3)}><ChevronLeft size={20}/></button><button aria-label="Next review" onClick={()=>setReviewIndex((reviewIndex+1)%3)}><ChevronRight size={20}/></button></div></div><a className="original-reviews" href="https://giffyrealestate.com/" target="_blank" rel="noreferrer">View reviews on Giffy’s website <ArrowUpRight size={14}/></a></div></dialog>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
