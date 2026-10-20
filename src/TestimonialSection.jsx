import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function TestimonialSection() {
 const videoRef = useRef(null);
 const [playing, setPlaying] = useState(false);
 return <section className="about-testimonials" aria-labelledby="about-testimonials-title">
  <div className="testimonial-intro" data-about-reveal>
   <span>CLIENT STORIES / DUBAI</span>
   <h2 id="about-testimonials-title">Trusted voices.<br/><em>Real property journeys.</em></h2>
   <p>Hear how considered advice and local knowledge helped our clients move forward with confidence.</p>
  </div>
  <div className="testimonial-single" data-about-reveal>
   <article className={`testimonial-story${playing ? ' testimonial-is-playing' : ''}`}>
    <video ref={videoRef} src="/videos/testimonial-client.mp4" poster="/videos/testimonial-client-poster.jpg" controls={playing} playsInline preload="none" aria-label="Giffy investor and buyer testimonial" onPlay={() => { document.querySelectorAll('.about-basic video').forEach(video => { if (video !== videoRef.current) video.pause(); }); setPlaying(true); }} onEnded={() => setPlaying(false)} />
    <div className="testimonial-story-top"><span>CLIENT EXPERIENCE</span><img src="/images/giffy-logo.png" alt="Giffy Real Estate" /></div>
    <div className="testimonial-story-copy">
     <h3>A property journey,<br/>told firsthand.</h3>
     <p>Investor &amp; buyer story</p>
     <button onClick={() => { videoRef.current?.play(); }} aria-label="Play client testimonial"><Play size={12} fill="currentColor"/> Play story</button>
    </div>
   </article>
  </div>
 </section>;
}
