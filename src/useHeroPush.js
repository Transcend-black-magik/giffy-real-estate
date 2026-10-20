import { useLayoutEffect } from 'react';

// Let the following section rise over the hero while the hero moves up with scroll.
export default function useHeroPush(sceneRef, pinRef, contentRef) {
 useLayoutEffect(()=>{
  const scene=sceneRef.current;
  const pin=pinRef.current;
  const content=contentRef.current;
  const nextSection=scene?.nextElementSibling;
  if(!scene||!pin||!content)return;

  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,travel=1,pinTop=0,available=1;
  const clamp=value=>Math.max(0,Math.min(1,value));
  const paint=()=>{
   frame=0;
   if(reduced.matches){
    scene.style.removeProperty('height');
    nextSection?.style.removeProperty('--gv-transition-overlap');
    pin.style.removeProperty('top');
    content.style.removeProperty('transform');
    content.inert=false;
    return;
   }
   const progress=clamp((pinTop-scene.getBoundingClientRect().top)/travel);
   content.style.transform=`translate3d(0,${-available*progress}px,0)`;
   content.inert=progress>.99;
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  const measure=()=>{
   const height=content.offsetHeight;
   const header=document.querySelector('.site-header')?.offsetHeight||58;
   available=Math.max(1,innerHeight-header);
   travel=available;
   pinTop=header-Math.max(0,height-available);
   if(!reduced.matches){
    scene.style.height=`${height+travel}px`;
    nextSection?.style.setProperty('--gv-transition-overlap',`${travel}px`);
    pin.style.top=`${pinTop}px`;
   }
   schedule();
  };

  const resize=new ResizeObserver(measure);
  resize.observe(content);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',measure);
  reduced.addEventListener('change',measure);
  measure();
  return ()=>{
   cancelAnimationFrame(frame);
   resize.disconnect();
   window.removeEventListener('scroll',schedule);
   window.removeEventListener('resize',measure);
   reduced.removeEventListener('change',measure);
   content.inert=false;
   scene.style.removeProperty('height');
   nextSection?.style.removeProperty('--gv-transition-overlap');
   pin.style.removeProperty('top');
   content.style.removeProperty('transform');
  };
 },[sceneRef,pinRef,contentRef]);
}
