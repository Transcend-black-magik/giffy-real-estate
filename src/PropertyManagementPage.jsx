import React, { useLayoutEffect, useState } from 'react';
import { UserRoundCheck, ChartNoAxesCombined, Wrench, Check, ArrowUpRight } from 'lucide-react';
import { siteFooterMarkup } from './site-chrome.js';
import teamMembers from './team-members.json';

const services = [
 { icon: UserRoundCheck, title: 'Tenant Vetting & Placement', text: 'Rigorous screening, Ejari registration, and professional leasing to secure reliable, long-term tenants faster. Maximize occupancy rates.' },
 { icon: ChartNoAxesCombined, title: 'Transparent Financial Reporting', text: "Real-time updates, detailed monthly statements, and timely rent collection. Access your portfolio performance 24/7 through our Owner?s Portal." },
 { icon: Wrench, title: '24/7 Maintenance & Upkeep', text: 'Proactive preventative maintenance and rapid response to all tenant requests, protecting your asset?s value with minimal cost and disruption.' },
];

export default function PropertyManagementPage() {
 const [status,setStatus]=useState('');
 const submit=event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity()) return;
  const values=new FormData(form);
  const body=[['Name','name'],['Phone','phone'],['Email','email'],['Property type','propertyType'],['Area / community','area'],['Message','message']].map(([label,key])=>`${label}: ${String(values.get(key)||'').trim()}`).join('\n');
  window.location.href=`mailto:info@giffyrealestate.com?subject=${encodeURIComponent('Free rental analysis request')}&body=${encodeURIComponent(body)}`;
  setStatus('Your email app will open with your request. Send it there to reach our property team.');
 };
 useLayoutEffect(() => { document.title = 'Property Management | Giffy Real Estate'; }, []);
 return <div className="management-page-shell">
  <main className="management-page" id="property-management">
   <section className="management-hero" aria-labelledby="management-title">
    <div className="management-hero-copy">
     <h1 id="management-title">Your Property.<br/><em>Expertly Managed.</em><br/>Peace of Mind.</h1>
     <p>Enjoy hassle-free ownership in Dubai with thoughtful property care and a team that puts you first.</p>
     <div className="management-hero-actions">
      <a className="management-primary" href="#rental-analysis" onClick={event=>{event.preventDefault();document.getElementById('rental-analysis')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}>Get a free rental analysis</a>
      <a className="management-secondary" href="/contact">Get Free Advice</a>
     </div>
     <div className="management-team-proof">
      <div className="management-team-avatars" aria-label="Meet your Giffy property team">{teamMembers.slice(0,5).map(member=><img key={member.name} src={member.src} alt={member.name}/>)}</div>
      <p>Personal service. Local knowledge. Your Giffy team.</p>
     </div>
    </div>
    <figure className="management-hero-image"><img src="/images/property-management.jpg" alt="Property owners and an advisor holding a model home together" fetchPriority="high"/></figure>
   </section>
   <section className="management-features" aria-label="Property management services">
    {services.map(({icon:Icon,title,text})=><article key={title}><span className="management-feature-icon"><Icon size={23} strokeWidth={1.3}/></span><h2>{title}</h2><p>{text}</p></article>)}
   </section>
   <section className="rental-analysis" id="rental-analysis" aria-labelledby="rental-analysis-title">
    <div className="rental-analysis-intro">
     <span className="section-index">YOUR PROPERTY / ITS NEXT CHAPTER</span>
     <h2 id="rental-analysis-title">Ready to start<br/><em>earning more?</em></h2>
     <p>Stop wasting time on maintenance calls and legal paperwork. Tell us about your property, and we?ll send you a personalized rental income projection within 24 hours.</p>
     <ul>{['No hidden fees.','RERA certified experts.','Designed for international owners.'].map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul>
     <div className="rental-analysis-note"><span>PERSONAL GUIDANCE. CLEAR NEXT STEPS.</span><p>A local team to help you make the most of your Dubai property.</p></div>
    </div>
    <form className="rental-analysis-form" onSubmit={submit} aria-label="Request a free rental analysis">
     <div className="rental-form-heading"><span>LET?S TALK ABOUT YOUR PROPERTY</span><h3>Your free rental analysis</h3><p>A few details. A more informed next move.</p></div>
     <div className="rental-form-grid">
      <label>Full name<input name="name" autoComplete="name" placeholder="Your full name" required maxLength={100}/></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+971 ..." required maxLength={30}/></label>
      <label className="rental-field-wide">Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={180}/></label>
      <label>Property type<select name="propertyType" defaultValue="" required><option value="" disabled>Select property type</option>{['Apartment','Villa','Townhouse','Penthouse','Commercial property','Other'].map(type=><option key={type}>{type}</option>)}</select></label>
      <label>Area / community<input name="area" placeholder="e.g. Dubai Marina" required maxLength={150}/></label>
      <label className="rental-field-wide">Anything else we should know? <small>Optional</small><textarea name="message" placeholder="Bedrooms, current tenancy, or your goals for the property?" rows={4} maxLength={2500}/></label>
     </div>
     <button type="submit">Get my free rental analysis <ArrowUpRight size={17}/></button>
     <p className="rental-form-status" role="status">{status||'Opens your email app to send your details directly to Giffy.'}</p>
    </form>
   </section>
  </main>
  <div dangerouslySetInnerHTML={{__html:siteFooterMarkup()}}/>
 </div>;
}
