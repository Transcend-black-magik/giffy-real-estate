import { useLayoutEffect } from 'react';

// Animate each element once per mount; content stays readable after completion.
export default function usePageEntrances(rootRef, pageKey) {
 useLayoutEffect(() => {
  const root=rootRef.current;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const targets=[...root.querySelectorAll('h1,h2,h3,p,address,dt,dd,figcaption,label,button,a,video,img,.section-index,.about-basic-label,.developer-directory-title>span,.developer-card-top>span,.management-hero-image')].filter(element => {
   if(element.closest('[aria-hidden="true"],.about-team-track,.about-ownership-track,dialog')) return false;
   if(element.matches('img') && element.closest('.about-signature-thumbnails,.management-hero-image')) return false;
   if(element.matches('a,button,figcaption') && element.querySelector('h1,h2,h3,p,img,video')) return false;
   return !element.closest('.hero-body,.hero-footer');
  });
  let observer,frame;
  const animations=[];
  const waiting=new Set(targets);
  targets.forEach(element=>element.classList.add('page-entrance-target'));
  const reveal=elements=>elements.forEach((element,index)=>{
   if(!waiting.delete(element)) return;
   element.classList.add('page-entrance-visible');
   observer?.unobserve(element);
   if(!reduced.matches) animations.push(element.animate([
    {opacity:0,translate:'0 24px'}, {opacity:1,translate:'0 0'}
   ],{duration:850,delay:Math.min(index,7)*95,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
  });
  const start=()=>{
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    if(reduced.matches){reveal([...waiting]);return;}
    observer?.disconnect();
    observer=new IntersectionObserver(entries=>reveal(entries.filter(entry=>entry.isIntersecting).map(entry=>entry.target)),{threshold:.03,rootMargin:'0px 0px -12px 0px'});
    const visible=[];
    waiting.forEach(element=>{
     const rect=element.getBoundingClientRect();
     if(rect.bottom>0&&rect.top<innerHeight-12&&rect.right>0&&rect.left<innerWidth) visible.push(element);
     else observer.observe(element);
    });
    reveal(visible);
   });
  };
  window.addEventListener('giffy:route-entered',start);
  reduced.addEventListener('change',start);
  start();
  return ()=>{
   cancelAnimationFrame(frame);observer?.disconnect();animations.forEach(animation=>animation.cancel());
   window.removeEventListener('giffy:route-entered',start);reduced.removeEventListener('change',start);
   targets.forEach(element=>element.classList.remove('page-entrance-target','page-entrance-visible'));
  };
 },[pageKey]);
}
