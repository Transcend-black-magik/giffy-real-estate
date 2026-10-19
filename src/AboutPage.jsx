import React, { useLayoutEffect } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { siteHeaderMarkup, siteFooterMarkup } from './site-chrome.js';

export default function AboutGiffyPage() {
 useLayoutEffect(()=>{
  document.title='About Giffy | Giffy Real Estate';
  const page=document.querySelector('.about-editorial');
  if(!page)return;
  page.classList.add('about-enter-ready');
  page.querySelectorAll('[data-about-enter]').forEach((element,index)=>element.style.setProperty('--about-index',String(index)));
  const frame=requestAnimationFrame(()=>page.classList.add('about-page-entered'));
  return ()=>{cancelAnimationFrame(frame);page.classList.remove('about-enter-ready','about-page-entered');};
 },[]);

 return <div className="about-page-shell">
  <div dangerouslySetInnerHTML={{__html:siteHeaderMarkup()}}/>
  <main className="about-reference-page">
   <article className="about-editorial">
    <header className="about-editorial-header" data-about-enter>
     <a className="about-editorial-mark" href="/" aria-label="Giffy Real Estate home"><img src="/images/giffy-logo.png" alt="Giffy Real Estate"/><span>REAL ESTATE / DUBAI</span></a>
     <nav aria-label="About page navigation"><a href="/projects">Projects</a><a href="/contact" data-book-consultation data-consultation-purpose="Speak to our team">Contact</a><a className="about-editorial-cta" href="/contact?consultation=1" data-book-consultation data-consultation-purpose="Book a consultation">Talk to Giffy <ArrowUpRight size={13}/></a></nav>
    </header>
    <aside className="about-editorial-index" aria-label="About page sections">
     <span>GIFFY REAL ESTATE</span><b>01 / 02</b><a href="#about-story" aria-label="Previous section"><ChevronUp size={13}/></a><a href="#about-approach" aria-label="Next section"><ChevronDown size={13}/></a>
    </aside>
    <section className="about-editorial-intro" id="about-story">
     <h1 data-about-enter>About</h1>
     <div className="about-editorial-lead" data-about-enter><p>Real estate should feel considered, personal, and clear.</p><span>That is the Giffy approach.</span></div>
    </section>
    <section className="about-editorial-details" id="about-approach">
     <div className="about-editorial-story" data-about-enter>
      <p>With a decade of experience in Dubai, Giffy Real Estate connects homeowners, investors, and international buyers with the right opportunities across the city.</p>
      <p>We bring local market knowledge, trusted developer relationships, and thoughtful one-to-one guidance to every move—so you can make your next decision with confidence.</p>
      <a href="/contact?consultation=1" data-book-consultation data-consultation-purpose="Meet the Giffy team">Meet our team <ArrowUpRight size={13}/></a>
     </div>
     <address className="about-editorial-contact" data-about-enter>
      <span>GIFFY REAL ESTATE LLC</span>
      <p>Prime Tower<br/>Business Bay<br/>Dubai, United Arab Emirates</p>
      <a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a>
      <a href="tel:+97145703395">+971 4 570 3395</a>
     </address>
     <a className="about-editorial-news" href="/projects" data-about-enter><span>Explore our latest properties</span><small>Projects / Dubai</small><ArrowUpRight size={15}/></a>
    </section>
    <footer className="about-editorial-footer" data-about-enter>
     <a href="/">GIFFY</a><div><span>Thoughtful guidance.<br/>Exceptional homes.</span><nav aria-label="Social links"><a href="https://www.instagram.com/Giffyrealestate" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/giffyrealestatedubai" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.tiktok.com/@giffyrealestate" target="_blank" rel="noreferrer">TikTok</a></nav></div><small>© {new Date().getFullYear()} GIFFY REAL ESTATE LLC</small>
    </footer>
   </article>
  </main>
  <div dangerouslySetInnerHTML={{__html:siteFooterMarkup()}}/>
 </div>;
}
