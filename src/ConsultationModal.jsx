import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

export function ConsultationProvider({ children }) {
 const [open,setOpen]=useState(()=>new URLSearchParams(location.search).has('consultation'));
 useEffect(()=>{
  const click=event=>{
   if(!event.target.closest('[data-book-consultation]')) return;
   if(event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   event.preventDefault();event.stopPropagation();setOpen(true);
  };
  const show=()=>setOpen(true);
  document.addEventListener('click',click,true);window.addEventListener('giffy:consultation',show);
  return ()=>{document.removeEventListener('click',click,true);window.removeEventListener('giffy:consultation',show);};
 },[]);
 return <>{children}{open&&<ConsultationModal onClose={()=>setOpen(false)}/>}</>;
}

function dubaiDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}

function ConsultationModal({ onClose }) {
 const dialog=useRef(null);
 const [handoff,setHandoff]=useState('');
 useEffect(()=>{
  const previous=document.activeElement;
  dialog.current.showModal();
  const overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return ()=>{document.body.style.overflow=overflow;previous?.focus();};
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
   window.location.href=`mailto:info@giffyrealestate.com?subject=${encodeURIComponent('Consultation request — '+data.name.trim())}&body=${encodeURIComponent(message)}`;
   setHandoff('Your email app will open with your request. Send it there to reach our team. Your appointment is confirmed only after our team replies.');
  }else{
   window.open(`https://wa.me/971522301992?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
   setHandoff('WhatsApp will open with your request. Tap Send there to reach our team. Your appointment is confirmed only after our team replies.');
  }
 };
 return <dialog className="consultation-dialog" ref={dialog} aria-labelledby="consultation-title" aria-describedby="consultation-description" onCancel={onClose} onClick={event=>{if(event.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)onClose();}}}><div className="consultation-heading"><span className="consultation-eyebrow">YOUR NEXT CHAPTER / GIFFY REAL ESTATE</span><button className="consultation-close" type="button" onClick={onClose} aria-label="Close consultation form"><X size={20}/></button><h2 id="consultation-title">Let's talk about<br/>your next move.</h2><p id="consultation-description">Tell us a little about your plans and choose a preferred time. Our advisors will get in touch to confirm availability.</p></div><form className="consultation-form" onSubmit={submit}><div className="consultation-fields"><label>Full name <span>*</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name"/></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@example.com"/></label><label>Phone / WhatsApp <span>*</span><input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,25}" title="Enter a phone number with 7–25 characters, including your country code." maxLength={25} placeholder="+971 ..."/></label><label>I'm interested in <span>*</span><select name="interest" defaultValue="" required><option value="" disabled>Select a service</option>{['Buying a property','Selling a property','Renting a property','Off-plan investment','Property management','Golden visa','General consultation'].map(item=><option key={item}>{item}</option>)}</select></label><label>Preferred date <span>*</span><input name="date" type="date" min={dubaiDate()} required onChange={event=>event.target.setCustomValidity('')}/></label><label>Preferred time <span>*</span><select name="time" defaultValue="" required><option value="" disabled>Select a time</option>{['09:00–11:00','11:00–13:00','13:00–15:00','15:00–17:00','17:00–19:00'].map(item=><option key={item}>{item}</option>)}</select></label></div><p className="consultation-time-note">All times are in Dubai time (UTC+4). This is a preferred slot, subject to confirmation.</p><label>How would you like to meet?<select name="meeting" defaultValue="Phone call"><option>Phone call</option><option>Video call</option><option>In person in Dubai</option></select></label><label>Anything else we should know?<textarea name="message" rows={3} maxLength={1500} placeholder="Your budget, preferred area, or any questions..."/></label><label className="consultation-consent"><input type="checkbox" required/> <span>I agree to be contacted by Giffy Real Estate about this consultation request.</span></label><div className="consultation-actions"><button type="submit" value="whatsapp" className="consultation-submit">Request on WhatsApp <ArrowUpRight size={16}/></button><button type="submit" value="email" className="consultation-email">Send by email <ArrowUpRight size={14}/></button></div><p role="status" className="consultation-status">{handoff||'Your details are shared only when you send the request through WhatsApp or your email app.'}</p></form></dialog>;
}
