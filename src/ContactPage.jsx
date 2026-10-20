import React, { useLayoutEffect, useState } from 'react';
import { siteFooterMarkup } from './site-chrome.js';

export default function ContactPage() {
 const [status, setStatus] = useState('');
 useLayoutEffect(() => { document.title = 'Contact Giffy | Giffy Real Estate'; }, []);
 const submit = event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const message = data.get('message').trim();
  if (!name || !message) { setStatus('Please enter your name and message.'); return; }
  window.location.href = `mailto:info@giffyrealestate.com?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  setStatus('Your email app will open with your message. Send it there to reach our team.');
 };
 return <div className="giffy-contact-shell">
  <main className="giffy-contact-page">
   <section className="giffy-contact-info" aria-labelledby="giffy-contact-title">
    <h1 id="giffy-contact-title">Get in touch</h1>
    <address>
     <div><span>Email:</span><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com</a></div>
     <div><span>Phone:</span><a href="tel:+97145703395">+971 4 570 3395</a></div>
     <div><span>WhatsApp:</span><a href="https://wa.me/971522301992" target="_blank" rel="noreferrer">+971 5 22656819</a></div>
     <div><span>Address:</span><p>Prime Tower, Business Bay<br/>Dubai, United Arab Emirates</p></div>
    </address>
    <div className="giffy-contact-follow"><span>Follow us</span><div>
     <a href="https://www.facebook.com/giffyrealestatedubai" target="_blank" rel="noreferrer" aria-label="Giffy on Facebook"><img src="/images/social-facebook.svg" alt=""/></a>
     <a href="https://www.instagram.com/Giffyrealestate" target="_blank" rel="noreferrer" aria-label="Giffy on Instagram"><img src="/images/social-instagram.svg" alt=""/></a>
     <a href="https://www.tiktok.com/@giffyrealestate" target="_blank" rel="noreferrer" aria-label="Giffy on TikTok"><img src="/images/social-tiktok.svg" alt=""/></a>
    </div></div>
   </section>
   <form className="giffy-contact-form" onSubmit={submit} aria-label="Send Giffy a message">
    <div className="giffy-contact-fields">
     <label>Your Name<input name="name" placeholder="Your full name" autoComplete="name" required maxLength={100}/></label>
     <label>Email address<input name="email" type="email" placeholder="Your email address" autoComplete="email" required maxLength={180}/></label>
    </div>
    <label>Message<textarea name="message" placeholder="Write something…" rows={7} required maxLength={3000}/></label>
    <button type="submit">Send Message</button>
    <p className="giffy-contact-status" role="status">{status || 'Opens your email app to send your message.'}</p>
   </form>
  </main>
  <div dangerouslySetInnerHTML={{ __html: siteFooterMarkup() }}/>
 </div>;
}
