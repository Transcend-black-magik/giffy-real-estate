import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { openDialogBubble } from './modal-bubble.js';

export function ConsultationProvider({ children }) {
 const [open,setOpen]=useState(()=>new URLSearchParams(location.search).has('consultation'));
 const [purpose,setPurpose]=useState(()=>new URLSearchParams(location.search).get('service')||'Speak to an advisor');
 useEffect(()=>{
  const click=event=>{
   const link=event.target.closest('[data-book-consultation]');
   if(!link) return;
   if(event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   document.querySelectorAll('.route-header details').forEach(menu=>{menu.removeAttribute('open');menu.classList.add('menu-dismissed');});
   event.preventDefault();event.stopPropagation();window.__giffyModalTrigger=link;setPurpose(link.dataset.consultationPurpose||'Book a consultation');setOpen(true);
  };
  const show=event=>{window.__giffyModalTrigger=document.activeElement;setPurpose(event.detail||'Speak to an advisor');setOpen(true);};
  document.addEventListener('click',click,true);window.addEventListener('giffy:consultation',show);
  return ()=>{document.removeEventListener('click',click,true);window.removeEventListener('giffy:consultation',show);};
 },[]);
 return <>{children}{open&&<ConsultationModal purpose={purpose} onClose={()=>setOpen(false)}/>}</>;
}

function dubaiDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}

function consultationPreset(purpose='Speak to an advisor'){
 const value=purpose.toLowerCase();
 if(/golden visa|residency/.test(value)) return {key:'golden-visa',theme:'golden-visa',interest:'Golden visa',eyebrow:'GOLDEN VISA / PERSONAL GUIDANCE',title:'Plan your future in Dubai.',description:'Tell us about your property and residency goals. We’ll help you understand the next steps.',caption:'A new chapter.<br/>A future in Dubai.',tags:'PROPERTY · RESIDENCY · FAMILY'};
 if(/property management|manage.*property|rental analysis|tenant|leasing/.test(value)) return {key:'management',theme:'management',interest:'Property management',eyebrow:'PROPERTY MANAGEMENT / DUBAI',title:'Let’s care for your property.',description:'Share what you need for your Dubai property and our team will help you choose the right management support.',caption:'Your property.<br/>In trusted hands.',tags:'PREPARE · MANAGE · SUPPORT'};
 if(/sell|selling|list(?:ing)?/.test(value)) return {key:'selling',theme:'property',interest:'Selling a property',eyebrow:'SELLING / PERSONAL GUIDANCE',title:'Make your next move count.',description:'Tell us about the property you’re selling. We’ll help you understand the market and plan your next steps.',caption:'A considered sale.<br/>A confident next step.',tags:'VALUATION · MARKETING · SALE'};
 if(/rent|rental|tenant|lease/.test(value)) return {key:'renting',theme:'renting',interest:'Renting a property',eyebrow:'RENTING / DUBAI',title:'Find a place to belong.',description:'Tell us what you’re looking for and we’ll help you explore homes that fit your plans.',caption:'The right place.<br/>The right next step.',tags:'RENT · RELOCATE · SETTLE'};
 if(/off.?plan/.test(value)) return {key:'offplan',theme:'property',interest:'Off-plan investment',eyebrow:'OFF-PLAN / PROPERTY ADVISORY',title:'Choose your next investment.',description:'Share your goals and we’ll help you explore Dubai projects, payment plans, and developer options.',caption:'A considered investment.<br/>Built around your goals.',tags:'PROJECTS · INVESTMENT · DUBAI'};
 const namedProperty=purpose.match(/(?:enquire about|book a viewing for)\s+(.+)/i);
 if(namedProperty) return {key:`property-${namedProperty[1]}`,theme:'property',interest:'Buying a property',eyebrow:`PROPERTY ENQUIRY / ${namedProperty[1].toUpperCase()}`,title:`Explore ${namedProperty[1]}.`,description:`Tell us what you’d like to know about ${namedProperty[1]}. A Giffy property advisor will help with availability, viewings, and next steps.`,caption:`Your next move.<br/>${namedProperty[1]}.`,tags:'PROPERTY DETAILS · VIEWING · DUBAI'};
 if(/buy|viewing|project|property|developer/.test(value)) return {key:'buying',theme:'property',interest:'Buying a property',eyebrow:'PROPERTY ADVISORY / DUBAI',title:'Find the right place for you.',description:'Tell us what matters most and a Giffy advisor will help you explore the right properties and next steps.',caption:'A thoughtful move.<br/>A place to call yours.',tags:'BUY · INVEST · DUBAI'};
 return {key:'general',theme:'general',interest:'General consultation',eyebrow:'YOUR NEXT CHAPTER / SPEAK TO AN ADVISOR',title:'Plan your next move.',description:'Tell us what you’re looking for. Our Dubai team will help you find the right next step.',caption:'A thoughtful move.<br/>A place to call yours.',tags:'BUY · SELL · RENT · INVEST'};
}

function ConsultationModal({ purpose, onClose }) {
 const dialog=useRef(null);
 const [handoff,setHandoff]=useState('');
 const preset=consultationPreset(purpose);
 const visual=/golden visa|residency/i.test(purpose)?{src:'/images/golden-visa/travel.jpg',alt:'Traveler considering a future in Dubai'}:/property management|manage.*property|rental analysis/i.test(purpose)?{src:'/images/property-management.jpg',alt:'Dubai property prepared for professional management'}:{src:'/images/about-residence.jpg',alt:'Contemporary Dubai residence with natural light'};
 const [interest,setInterest]=useState(preset.interest);
 useEffect(()=>{setInterest(preset.interest);setHandoff('');},[preset.key]);
 useEffect(()=>{
  const previous=document.activeElement;
  openDialogBubble(dialog.current,window.__giffyModalTrigger||document.activeElement);
  window.__giffyModalTrigger=null;
  const overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  window.dispatchEvent(new Event('giffy:scroll-lock'));
  return ()=>{document.body.style.overflow=overflow;window.dispatchEvent(new Event('giffy:scroll-unlock'));previous?.focus();};
 },[]);
 const submit=event=>{
  event.preventDefault();
  const form=event.currentTarget;
  const date=form.elements.namedItem('date');
  if(date.value<dubaiDate()){date.setCustomValidity('Please choose today or a future date.');date.reportValidity();return;}
  date.setCustomValidity('');
  const data=Object.fromEntries(new FormData(form));
  const message=`Hello Giffy Real Estate, I would like to request a consultation.\n\nName: ${data.name.trim()}\nEmail: ${data.email.trim()}\nPhone: ${data.phone.trim()}\nInterested in: ${data.interest}\nPreferred date: ${data.date}\nPreferred time: ${data.time} (Dubai, UTC+4)\nMeeting: ${data.meeting}\nNotes: ${data.message.trim()||'None'}\n\nPlease confirm availability. Thank you.`;
  if(event.nativeEvent.submitter?.value==='email'){
   window.location.href=`mailto:info@giffyrealestate.com?subject=${encodeURIComponent('Consultation request - '+data.name.trim())}&body=${encodeURIComponent(message)}`;
   setHandoff('Your email app will open with your request. Send it there to reach our team. Your appointment is confirmed only after our team replies.');
  }else{
   window.open(`https://wa.me/971522301992?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
   setHandoff('WhatsApp will open with your request. Tap Send there to reach our team. Your appointment is confirmed only after our team replies.');
  }
 };
 return <dialog className="consultation-dialog" data-consultation-theme={preset.theme} ref={dialog} aria-labelledby="consultation-title" aria-describedby="consultation-description" onWheel={event=>event.stopPropagation()} onTouchMove={event=>event.stopPropagation()} onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)onClose();}}}><figure className="consultation-visual"><img src={visual.src} alt={visual.alt}/><figcaption><span>{preset.eyebrow}</span><strong>{preset.caption.split('<br/>').map((line,index)=><React.Fragment key={`${index}-${line}`}>{index>0&&<br/>}{line}</React.Fragment>)}</strong><small>{preset.tags}</small></figcaption></figure><div className="consultation-panel"><button className="consultation-close" type="button" onClick={onClose} aria-label="Close consultation form"><X size={20}/></button><div className="consultation-heading"><span className="consultation-eyebrow">{preset.eyebrow}</span><h2 id="consultation-title">{preset.title}</h2><p id="consultation-description">{preset.description}</p></div><form className="consultation-form" onSubmit={submit}><div className="consultation-field-stack"><label><span>What can we help with?</span><select name="interest" value={interest} onChange={event=>setInterest(event.target.value)} required>{['Buying a property','Selling a property','Renting a property','Off-plan investment','Property management','Golden visa','General consultation'].map(item=><option key={item}>{item}</option>)}</select></label><label><span>Your name</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name"/></label><label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,25}" title="Enter a phone number with 7-25 characters, including your country code." maxLength={25} placeholder="+971 ..."/></label><label><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@example.com"/></label><div className="consultation-date-row"><label><span>Preferred date</span><input name="date" type="date" min={dubaiDate()} required onChange={event=>event.target.setCustomValidity('')}/></label><label><span>Preferred time</span><select name="time" defaultValue="" required><option value="" disabled>Select a time</option>{['09:00-11:00','11:00-13:00','13:00-15:00','15:00-17:00','17:00-19:00'].map(item=><option key={item}>{item}</option>)}</select></label></div></div><label className="consultation-meeting">How would you like to meet?<select name="meeting" defaultValue="Phone call"><option>Phone call</option><option>Video call</option><option>In person in Dubai</option></select></label><details className="consultation-extra"><summary>Add a note (optional)</summary><textarea name="message" rows={2} maxLength={1500} placeholder="Budget, preferred area, or questions..."/></details><label className="consultation-consent"><input type="checkbox" required/> <span>I agree to be contacted about this request.</span></label><div className="consultation-actions"><button type="submit" value="whatsapp" className="consultation-submit">Send request on WhatsApp <ArrowUpRight size={16}/></button><button type="submit" value="email" className="consultation-email">Send by email <ArrowUpRight size={14}/></button></div><p className="consultation-time-note">All times are Dubai time (UTC+4). We’ll confirm your preferred slot with you.</p><p role="status" className="consultation-status">{handoff||'Your request is only shared when you send it through WhatsApp or your email app.'}</p></form></div></dialog>;
}


