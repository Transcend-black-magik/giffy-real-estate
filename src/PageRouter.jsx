import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { SiteEntry } from './ErrorScreens.jsx';
import { sectionRoutes, sitePaths, legacySections, normalizePath } from './routes.js';
import { siteHeaderMarkup } from './site-chrome.js';
import usePageEntrances from './usePageEntrances.js';

export default function PageRouter({ renderPage }) {
 const [path,setPath] = useState(window.location.pathname);
 const busy = useRef(false);
 const contentRef=useRef(null);
 const currentPath=useRef(window.location.pathname);
 usePageEntrances(contentRef,path);
 const routeOrder = pathname => {
  const normalized=normalizePath(pathname);
  if(normalized==='/') return 0;
  if(normalized.startsWith('/projects')) return 1;
  if(normalized.startsWith('/services')||normalized==='/golden-visa'||normalized==='/property-management') return 2;
  if(normalized==='/about') return 3;
  if(normalized==='/contact') return 4;
  return 2;
 };
 useEffect(()=>{
  const placePage = pathname => {
   const story = new URLSearchParams(location.search).get('story');
   const storyElement = story && document.getElementById(story);
   if (storyElement) {
    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 58;
    window.scrollTo({ top: window.scrollY + storyElement.getBoundingClientRect().top - headerHeight, behavior: 'instant' });
    return;
   }
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
   const same=normalizePath(next.pathname)===normalizePath(currentPath.current);
   if(same) {
    if(historyChange && next.search!==location.search) history.pushState({},'',next.pathname+next.search);
    if(normalizePath(next.pathname)==='/contact') {
     placePage(next.pathname);
    }
    else placePage(next.pathname);
    return;
   }
   const direction=routeOrder(next.pathname)<routeOrder(currentPath.current)?'backward':'forward';
   busy.current=true;
   document.documentElement.dataset.routeDirection=direction;
   const commit = () => {
    if(historyChange) history.pushState({},'',next.pathname+next.search);
    currentPath.current=next.pathname;
    flushSync(()=>setPath(next.pathname));
    placePage(next.pathname);
   };
   try {
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
     const surface=document.querySelector('.route-content');
     const exitX=direction==='forward'?'-100%':'100%';
     const enterX=direction==='forward'?'100%':'-100%';
     await surface.animate([{transform:'translateX(0)'},{transform:`translateX(${exitX})`}],{duration:650,easing:'cubic-bezier(.76,0,.24,1)'}).finished;
     commit();
     await surface.animate([{transform:`translateX(${enterX})`},{transform:'translateX(0)'}],{duration:900,easing:'cubic-bezier(.22,1,.36,1)'}).finished;
   } else commit();

   } finally {busy.current=false;document.documentElement.classList.remove('route-transition');delete document.documentElement.dataset.routeDirection;}
  };
  const click = event => {
   const anchor=event.target.closest('a[href]');
   if(!anchor || event.defaultPrevented || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.target==='_blank' || anchor.hasAttribute('download')) return;
   const url=new URL(anchor.href,location.href);
   if(url.origin!==location.origin || (!sitePaths.includes(normalizePath(url.pathname)) && !/^\/projects\/[^/]+$/.test(normalizePath(url.pathname)))) return;
   event.preventDefault();
   document.querySelectorAll('.route-header details[open]').forEach(menu=>menu.removeAttribute('open'));
   if(document.activeElement instanceof HTMLElement) document.activeElement.blur();
   change(url.href);
  };
  const closeMenu=event=>{if(event.key==='Escape'||(event.type==='pointerdown'&&!event.target.closest('.route-header')))document.querySelectorAll('.route-header details[open]').forEach(menu=>menu.removeAttribute('open'));};
  document.addEventListener('keydown',closeMenu);document.addEventListener('pointerdown',closeMenu);
  const pop = () => change(location.href,false);
  document.addEventListener('click',click);window.addEventListener('popstate',pop);
  return ()=>{document.removeEventListener('keydown',closeMenu);document.removeEventListener('pointerdown',closeMenu);document.removeEventListener('click',click);window.removeEventListener('popstate',pop);};
 },[]);
 return <>
  <div className="route-header" data-current-page={normalizePath(path)} onClickCapture={event=>{
   if(event.target.closest('summary')) event.target.closest('details')?.classList.remove('menu-dismissed');
   if(!event.target.closest('a[href]')) return;
   event.currentTarget.querySelectorAll('details').forEach(menu=>{menu.removeAttribute('open');menu.classList.add('menu-dismissed');});
   if(document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }} onMouseLeave={event=>event.currentTarget.querySelectorAll('.menu-dismissed').forEach(menu=>menu.classList.remove('menu-dismissed'))} dangerouslySetInnerHTML={{__html:siteHeaderMarkup()}}/>
  <div className="route-surface"><div className="route-content unified-entrances" ref={contentRef}><SiteEntry key={path}>{renderPage(path)}</SiteEntry></div></div>
 </>;
}
