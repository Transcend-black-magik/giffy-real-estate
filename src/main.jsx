import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, X } from 'lucide-react';
import './styles.css';

// The publicly posted design is flattened artwork, not a clean background photo.
// Preserve its exact composition and provide real, accessible controls over it.
function App() {
  const [intent, setIntent] = useState('');
  const [preview, setPreview] = useState(false);
  const dialog = useRef(null);
  const inquire = (purpose) => { setIntent(purpose); dialog.current.showModal(); };

  return <>
    <main className="hero" id="home" aria-label="Giffy Real Estate">
      <div className="reference-stage">
        <div className="reference-art" role="img" aria-label="A white sculptural villa set between dramatic rocky cliffs at dusk" />
        <h1 className="sr-only">The infinite precision of living</h1>
        <a className="hotspot logo-hit" href="#home" aria-label="Giffy Real Estate home" />
        <nav aria-label="Main navigation">
          <button className="hotspot project-hit" onClick={() => inquire('Projects')}>Project</button>
          <button className="hotspot about-hit" onClick={() => inquire('About Giffy')}>About Us</button>
          <button className="hotspot contact-hit" onClick={() => inquire('Contact Giffy')}>Contact</button>
        </nav>
        <button className="hotspot viewing-hit" onClick={() => inquire('Book a viewing')}>Book a Viewing</button>
        <section className="sr-only" aria-label="Reference property specifications">
          <p>House Area: 160 square metres</p><p>House Type C ? Comfort Line</p>
          <p>A vision that transcends property and space, where unmatched craftsmanship inspires elegance and innovation to enrich lives.</p>
        </section>
        <button className="hotspot previous-hit" aria-label="Preview previous residence" onClick={() => setPreview(true)} />
        <button className="hotspot next-hit" aria-label="Preview next residence" onClick={() => setPreview(true)} />
        <button className="hotspot thumbnail-hit" aria-label="View residence preview" onClick={() => setPreview(true)} />
      </div>
    </main>
 <dialog ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><div className="dialog-inner"><button className="dialog-close" aria-label="Close contact dialog" onClick={()=>dialog.current.close()}><X/></button><p className="eyebrow dark-label">LET'S MAKE YOUR NEXT MOVE</p><h2>{intent}</h2><p>Our Dubai team is ready to help. Share what you have in mind and we'll take it from there.</p><a className="contact-action" href={`mailto:info@giffyrealestate.com?subject=${encodeURIComponent(intent)}`}>Email the team <ArrowUpRight size={20}/></a><a className="contact-action secondary" href="https://wa.me/971522656819" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={20}/></a><a className="phone-link" href="tel:+97145703395">+971 4 570 3395</a></div></dialog>
    {preview && <dialog className="preview-dialog" open aria-label="Residence preview"><div className="preview-inner"><button className="dialog-close" aria-label="Close residence preview" onClick={() => setPreview(false)}><X /></button><h2>House Type C</h2><p>Comfort Line ? 160 m?</p><div className="residence-preview" role="img" aria-label="White villa between rocky cliffs" /><button className="contact-action" onClick={() => { setPreview(false); inquire('Book a viewing'); }}>Book a Viewing <ArrowUpRight size={20}/></button></div></dialog>}
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
