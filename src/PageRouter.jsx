import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { SiteEntry } from './ErrorScreens.jsx';
import { sectionRoutes, sitePaths, legacySections, normalizePath } from './routes.js';
import { siteHeaderMarkup } from './site-chrome.js';

export default function PageRouter({ renderPage }) {
 const [path,setPath] = useState(window.location.pathname);
 const busy = useRef(false);
 useEffect(()=>{
  const placePage = pathname => {
   const target = sectionRoutes[normalizePath(pathname)];
   const element = target && document.getElementById(target);
   const header = document.querySelector('.site-header')?.getBoundingClientRect().height || 58;
   window.scrollTo({top:element && target!=='home'?window.scrollY+element.getBoundingClientRect().top-header:0,behavior:'instant'});
  };
  if(location.hash){
   const cleanPath=legacySections[location.hash.slice(1)] || location.pathname;
   history.replaceState({},'',cleanPath+location.search);
   if(cleanPath!==path) {setPath(cleanPath);} else placePage(cleanPath);
  } else requestAnimationFrame(()=>placePage(location.pathname));
  const change = async (url,historyChange=true) => {
   if (busy.current) return;
   const next=new URL(url,window.location.href);
   if(next.hash){next.pathname=legacySections[next.hash.slice(1)]||next.pathname;next.hash='';}
   const same=normalizePath(next.pathname)===normalizePath(window.location.pathname);
   if(same && historyChange) {
    if(normalizePath(next.pathname)==='/contact') {
     if(next.search!==location.search) history.replaceState({},'',next.pathname+next.search);
     placePage(next.pathname);
    }
    else placePage(next.pathname);
    return;
   }
   busy.current=true;
   const commit = () => {
    if(historyChange) history.pushState({},'',next.pathname+next.search);
    flushSync(()=>setPath(next.pathname));
    placePage(next.pathname);
   };
   try {
    if(document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches){
     document.documentElement.classList.add('route-transition');
     const transition=document.startViewTransition(commit);
     await transition.finished;
    } else if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
     const surface=document.querySelector('.route-content');
     await surface.animate([{transform:'translateX(0)'},{transform:'translateX(-100%)'}],{duration:650,easing:'cubic-bezier(.76,0,.24,1)'}).finished;
     commit();
     await surface.animate([{transform:'translateX(100%)'},{transform:'translateX(0)'}],{duration:900,easing:'cubic-bezier(.22,1,.36,1)'}).finished;
    } else commit();
   } finally {busy.current=false;document.documentElement.classList.remove('route-transition');}
  };
  const click = event => {
   const anchor=event.target.closest('a[href]');
   if(!anchor || event.defaultPrevented || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.target==='_blank' || anchor.hasAttribute('download')) return;
   const url=new URL(anchor.href,location.href);
   if(url.origin!==location.origin || (!sitePaths.includes(normalizePath(url.pathname)) && !/^\/projects\/[^/]+$/.test(normalizePath(url.pathname)))) return;
   event.preventDefault();change(url.href);
  };
  const pop = () => change(location.href,false);
  document.addEventListener('click',click);window.addEventListener('popstate',pop);
  return ()=>{document.removeEventListener('click',click);window.removeEventListener('popstate',pop);};
 },[]);
 return <>
  <div className="route-header" data-current-page={normalizePath(path)} dangerouslySetInnerHTML={{__html:siteHeaderMarkup()}}/>
  <div className="route-surface"><div className="route-content"><SiteEntry key={path}>{renderPage(path)}</SiteEntry></div></div>
 </>;
}
