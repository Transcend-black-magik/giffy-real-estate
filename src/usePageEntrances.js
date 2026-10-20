import { useLayoutEffect } from 'react';

// Animate each element once per mount; content stays readable after completion.
export default function usePageEntrances(rootRef, pageKey) {
 useLayoutEffect(() => {
  const root=rootRef.current;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const targets=[...root.querySelectorAll('h1,h2,h3,p,address,dt,dd,figcaption,label,button,a,video,img,.section-index,.about-basic-label,.developer-directory-title>span,.developer-card-top>span,.management-hero-image,.management-feature-icon,[data-project-enter],[data-developer-enter],[data-entrance-group],[data-entrance]')].filter(element => {
   if(element.closest('[aria-hidden="true"],.about-team-track,.about-ownership-track,dialog')) return false;
   if(element.closest('[data-no-page-entrance]')) return false;
   if(element.closest('.experience-copy-content')) return false;
   if(element.matches('[data-project-enter],[data-developer-enter]')) return true;
   if(element.closest('[data-project-enter],[data-developer-enter]')) return false;
   if(element.matches('.editorial-project-image img')) return false;
   if(element.matches('[data-entrance-group]')) return true;
   if(element.closest('[data-entrance-group]')) return false;
   if(element.matches('img') && element.closest('.about-signature-thumbnails,.management-hero-image,.management-feature-icon')) return false;
   if(element.matches('a,button,figcaption') && element.querySelector('h1,h2,h3,p,img,video')) return false;
   return !element.closest('.hero-body,.hero-footer');
  });
  let observer,frame;
  const animations=[];
  const waiting=new Set(targets);
  targets.forEach(element=>element.classList.add('page-entrance-target'));
  const reveal=elements=>{
   const sectionSteps=new Map();
   elements.forEach(element=>{
   const section=element.closest('section,footer')||root;
   const index=sectionSteps.get(section)||0;
   sectionSteps.set(section,index+1);
   if(!waiting.delete(element)) return;
   element.classList.add('page-entrance-visible');
   observer?.unobserve(element);
   if(!reduced.matches){
    const directional=Boolean(element.closest('.golden-visa-page'));
    const direction=element.dataset.entrance||(element.dataset.projectDirection==='up'?'top':element.dataset.projectDirection==='down'?'bottom':directional?['left','right','center','bottom'][index%4]:'bottom');
    if(element.matches('.editorial-project-image')){
     const revealFromBottom=element.dataset.projectDirection==='up';
     const delay=Number.parseFloat(element.style.getPropertyValue('--project-image-delay'))||0;
     const image=element.querySelector('img');
     const decoded=image?.complete?image.decode().catch(()=>{}):new Promise(resolve=>{
      image?.addEventListener('load',resolve,{once:true});
      image?.addEventListener('error',resolve,{once:true});
     });
     decoded.then(()=>{
      if(!image?.isConnected||reduced.matches)return;
      animations.push(image.animate([
       {clipPath:revealFromBottom?'inset(100% 0 0 0)':'inset(0 0 100% 0)'},
       {clipPath:'inset(0 0 0 0)'}
      ],{duration:1350,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}));
     });
     return;
    }
    const distance=innerWidth<650?32:65;
    const offsets={left:`-${distance}px 0`,right:`${distance}px 0`,top:'0 -52px',bottom:'0 38px',center:'0 0'};
    const delay=element.hasAttribute('data-entrance-delay')?Number(element.dataset.entranceDelay):Math.min(index,7)*110;
    animations.push(element.animate([
     {opacity:0,translate:offsets[direction]||offsets.bottom,scale:direction==='center'?'.93':'1'},
     {opacity:1,translate:'0 0',scale:'1'}
    ],{duration:element.hasAttribute('data-entrance-duration')?Number(element.dataset.entranceDuration):(directional?1000:850),delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
   }
   });
  };
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
