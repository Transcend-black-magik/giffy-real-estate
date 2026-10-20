import React, { useLayoutEffect } from 'react';
import { KeyRound, ChartNoAxesCombined, ShieldCheck } from 'lucide-react';
import { siteFooterMarkup } from './site-chrome.js';
import teamMembers from './team-members.json';

const services = [
 { icon: KeyRound, title: 'Tenant & Leasing Care', text: 'From marketing your property to coordinating viewings and tenant enquiries, we help you find the right fit for your home.' },
 { icon: ChartNoAxesCombined, title: 'Clear Property Updates', text: 'Stay informed about your property with personal guidance on rental opportunities, tenancy matters, and day-to-day management.' },
 { icon: ShieldCheck, title: 'Maintenance & Support', text: 'Keep your property cared for with coordinated maintenance, responsive support, and a local team you can turn to.' },
];

export default function PropertyManagementPage() {
 useLayoutEffect(() => { document.title = 'Property Management | Giffy Real Estate'; }, []);
 return <div className="management-page-shell">
  <main className="management-page" id="property-management">
   <section className="management-hero" aria-labelledby="management-title">
    <div className="management-hero-copy">
     <h1 id="management-title">Your Property.<br/><em>Expertly Managed.</em><br/>Peace of Mind.</h1>
     <p>Enjoy hassle-free ownership in Dubai with thoughtful property care and a team that puts you first.</p>
     <div className="management-hero-actions">
      <a className="management-primary" href="/contact?consultation=1" data-book-consultation data-consultation-purpose="Manage my property in Dubai">Manage My Property</a>
      <a className="management-secondary" href="/contact">Get Free Advice</a>
     </div>
     <div className="management-team-proof">
      <div className="management-team-avatars" aria-label="Meet your Giffy property team">{teamMembers.slice(0,5).map(member=><img key={member.name} src={member.src} alt={member.name}/>)}</div>
      <p>Personal service. Local knowledge. Your Giffy team.</p>
     </div>
    </div>
    <figure className="management-hero-image"><img src="/images/dubai-skyline.jpg" alt="Dubai skyline with the Burj Khalifa overlooking the city" fetchPriority="high"/></figure>
   </section>
   <section className="management-features" aria-label="Property management services">
    {services.map(({icon:Icon,title,text})=><article key={title}><span className="management-feature-icon"><Icon size={23} strokeWidth={1.3}/></span><h2>{title}</h2><p>{text}</p></article>)}
   </section>
  </main>
  <div dangerouslySetInnerHTML={{__html:siteFooterMarkup()}}/>
 </div>;
}
