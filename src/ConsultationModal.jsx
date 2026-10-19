import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

export function ConsultationProvider({ children }) {
 const [open,setOpen]=useState(()=>new URLSearchParams(location.search).has('consultation'));
 const [purpose,setPurpose]=useState(()=>new URLSearchParams(location.search).get('service')||'Speak to an advisor');
 useEffect(()=>{
  const click=event=>{
   const link=event.target.closest('[data-book-consultation]');
   if(!link) return;
   if(event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   event.preventDefault();event.stopPropagation();setPurpose(link.dataset.consultationPurpose||'Book a consultation');setOpen(true);
  };
  const show=event=>{setPurpose(event.detail||'Speak to an advisor');setOpen(true);};
  document.addEventListener('click',click,true);window.addEventListener('giffy:consultation',show);
  return ()=>{document.removeEventListener('click',click,true);window.removeEventListener('giffy:consultation',show);};
 },[]);
 return <>{children}{open&&<ConsultationModal purpose={purpose} onClose={()=>setOpen(false)}/>}</>;
}

function dubaiDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}

function ConsultationModal({ purpose, onClose }) {
 const dialog=useRef(null);
 const [handoff,setHandoff]=useState('');
 useEffect(()=>{
  const previous=document.activeElement;
  dialog.current.showModal();
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
 return <dialog className="consultation-dialog" ref={dialog} aria-labelledby="consultation-title" aria-describedby="consultation-description" onWheel={event=>event.stopPropagation()} onTouchMove={event=>event.stopPropagation()} onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)onClose();}}}><figure className="consultation-visual"><img src="/images/about-residence.jpg" alt="Contemporary Dubai residence with natural light"/><figcaption><span>GIFFY REAL ESTATE / DUBAI</span><strong>A thoughtful move.<br/>A place to call yours.</strong><small>BUY · SELL · RENT · INVEST</small></figcaption></figure><div className="consultation-panel"><button className="consultation-close" type="button" onClick={onClose} aria-label="Close consultation form"><X size={20}/></button><div className="consultation-heading"><span className="consultation-eyebrow">YOUR NEXT CHAPTER / {purpose.toUpperCase()}</span><h2 id="consultation-title">Plan your next move.</h2><p id="consultation-description">Tell us what you’re looking for. Our Dubai team will help you find the right next step.</p></div><form className="consultation-form" onSubmit={submit}><div className="consultation-field-stack"><label><span>What can we help with?</span><select name="interest" defaultValue="" required><option value="" disabled>Select a service</option>{['Buying a property','Selling a property','Renting a property','Off-plan investment','Property management','Golden visa','General consultation'].map(item=><option key={item}>{item}</option>)}</select></label><label><span>Your name</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name"/></label><label><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,25}" title="Enter a phone number with 7-25 characters, including your country code." maxLength={25} placeholder="+971 ..."/></label><label><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@example.com"/></label><div className="consultation-date-row"><label><span>Preferred date</span><input name="date" type="date" min={dubaiDate()} required onChange={event=>event.target.setCustomValidity('')}/></label><label><span>Preferred time</span><select name="time" defaultValue="" required><option value="" disabled>Select a time</option>{['09:00-11:00','11:00-13:00','13:00-15:00','15:00-17:00','17:00-19:00'].map(item=><option key={item}>{item}</option>)}</select></label></div></div><label className="consultation-meeting">How would you like to meet?<select name="meeting" defaultValue="Phone call"><option>Phone call</option><option>Video call</option><option>In person in Dubai</option></select></label><details className="consultation-extra"><summary>Add a note (optional)</summary><textarea name="message" rows={2} maxLength={1500} placeholder="Budget, preferred area, or questions..."/></details><label className="consultation-consent"><input type="checkbox" required/> <span>I agree to be contacted about this request.</span></label><div className="consultation-actions"><button type="submit" value="whatsapp" className="consultation-submit">Send request on WhatsApp <ArrowUpRight size={16}/></button><button type="submit" value="email" className="consultation-email">Send by email <ArrowUpRight size={14}/></button></div><p className="consultation-time-note">All times are Dubai time (UTC+4). We’ll confirm your preferred slot with you.</p><p role="status" className="consultation-status">{handoff||'Your request is only shared when you send it through WhatsApp or your email app.'}</p></form></div></dialog>;
}


