import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Menu, X, CalendarDays, MapPin } from 'lucide-react';
import './styles.css';

const nav = ['Home', 'Projects', 'Sell', 'Rent', 'Services', 'About Giffy'];
const slides = [
  { title: ['THE INFINITE', 'PRECISION OF', 'LIVING'], label: 'A different perspective on home', type: 'Architecture, considered.', detail: 'Spaces that inspire. A life without limits.', image: '/images/hero.png' },
  { title: ['A PLACE', 'BEYOND THE', 'ORDINARY'], label: 'Discover your next chapter', type: 'Your Dubai. Your home.', detail: 'From a first home to your next investment.', image: '/images/hero.png' },
  { title: ['EXCEPTIONAL', 'SPACES. NEW', 'POSSIBILITIES.'], label: 'Property with a point of view', type: 'A considered investment.', detail: 'Local insight. A personal approach.', image: '/images/hero.png' }
];

function Logo({dark=false}) { return <a href="#home" className={`brand ${dark?'brand-dark':''}`} aria-label="Giffy Real Estate home"><svg viewBox="0 0 66 66" aria-hidden="true"><path d="M56 19A27 27 0 1 0 57 46V32H35"/><path d="M50 23A20 20 0 1 0 50 46M45 27A13 13 0 1 0 45 42"/><path d="m36 44 14-9v17l-14-8Zm4-3v8m4-11v13m4-15v17"/></svg><span className="brand-name">GIFFY<small>REAL ESTATE</small></span></a> }
function WireHouse() { return <svg className="wire-house" viewBox="0 0 190 180" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth=".65"><path d="m18 69 108-52 46 34v89l-49 30-105-41V69Zm0 0 105 38 49-56M123 107v63M18 129l108-55 46 66M126 17v57M32 74v48l81 31v-49M49 80v49m20-42v50m23-42v50M32 96l81 31M136 43l24 17v62l-24-13V43ZM20 57 126 5l52 39M8 137l117 43 56-34M14 46v99m113-144v175"/><path d="m44 110 24 9v18l-24-9v-18m43 16 18 7v18l-18-7v-18"/></g></svg> }
function App() {
 const [slide,setSlide]=useState(0), [menu,setMenu]=useState(false), [intent,setIntent]=useState('');
 const dialog=useRef(null); const current=slides[slide];
 const inquire=(purpose)=>{setIntent(purpose);dialog.current.showModal()};
 return <>
 <section className="hero" id="home" aria-label="Welcome to Giffy Real Estate">
   <div className="hero-photo"/><div className="hero-shade"/><div className="grid-lines"><i/><i/><i/></div>
   <header><Logo/><nav aria-label="Main navigation">{nav.map(n=><a key={n} href="#home" className={n==='Home'?'active':''} onClick={e=>{if(n!=='Home'){e.preventDefault();inquire(n)}}}>{n}</a>)}</nav><button className="pill" onClick={()=>inquire('Book a viewing')}>Book a viewing <CalendarDays size={15}/></button><button className="menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
   {menu&&<nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(n=><a key={n} href="#home" onClick={e=>{setMenu(false);if(n!=='Home'){e.preventDefault();inquire(n)}}}>{n}<ArrowUpRight size={20}/></a>)}</nav>}
   <div className="hero-copy" key={slide}><p className="eyebrow">DUBAI REAL ESTATE · EXCEPTIONALLY YOURS</p><h1>{current.title.map(line=><span key={line}>{line}</span>)}</h1></div>
   <div className="hero-bottom">
     <div className="property-panel"><WireHouse/><div className="property-info"><span className="micro">{current.label}</span><div className="display-word">LIVE WELL<span>↗</span></div><div className="panel-foot"><p>{current.type}<br/><span>{current.detail}</span></p><div className="slider-controls"><button onClick={()=>setSlide((slide+2)%3)} aria-label="Previous hero slide"><ArrowLeft size={16}/></button><button onClick={()=>setSlide((slide+1)%3)} aria-label="Next hero slide"><ArrowRight size={16}/></button></div></div></div></div>
     <div className="hero-note"><span className="location"><MapPin size={14}/> DUBAI, UAE</span><p>A vision that transcends property and space.<br/>Discover a finer way to live with Giffy.</p><span className="concept-label">Architectural inspiration · Concept image</span></div>
     <button className="explore-orb" onClick={()=>inquire('Explore projects')} aria-label="Explore projects"><span>EXPLORE</span><ArrowDown size={22}/></button>
   </div>
   <span className="slide-count">0{slide+1}<span> / 03</span></span>
 </section>
 <dialog ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><div className="dialog-inner"><button className="dialog-close" aria-label="Close contact dialog" onClick={()=>dialog.current.close()}><X/></button><p className="eyebrow dark-label">LET'S MAKE YOUR NEXT MOVE</p><h2>{intent}</h2><p>Our Dubai team is ready to help. Share what you have in mind and we'll take it from there.</p><a className="contact-action" href={`mailto:info@giffyrealestate.com?subject=${encodeURIComponent(intent)}`}>Email the team <ArrowUpRight size={20}/></a><a className="contact-action secondary" href="https://wa.me/971522656819" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={20}/></a><a className="phone-link" href="tel:+97145703395">+971 4 570 3395</a></div></dialog>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);
