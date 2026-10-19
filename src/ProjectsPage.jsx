import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteHeaderMarkup, siteFooterMarkup } from './site-chrome.js';

export function ProjectsMenu() {
 const [open,setOpen]=useState(false);
 return <div className="projects-nav-menu" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setOpen(false);}} onKeyDown={event=>{if(event.key==='Escape')setOpen(false);}}><button className="projects-nav-trigger" aria-expanded={open} aria-controls="projects-dropdown" onClick={()=>setOpen(!open)}>Projects <span aria-hidden="true">⌄</span></button><div id="projects-dropdown" className={`projects-nav-dropdown${open?' projects-menu-open':''}`} inert={!open}><a href="/projects" onClick={()=>setOpen(false)}>All Projects <ArrowUpRight size={13}/></a><a href="/projects/developers" onClick={()=>setOpen(false)}>By developers <ArrowUpRight size={13}/></a></div></div>;
}

export default function ProjectsPage({ projects, byDeveloper=false }) {
 const [filter,setFilter]=useState('All');
 const developers=['All','Imtiaz','EMAAR','Marquis'];
 const listings=projects.map((project,index)=>({...project,developer:['Imtiaz','EMAAR','EMAAR','Marquis'][index]}));
 const visible=listings.filter(project=>filter==='All'||project.developer===filter);
 useEffect(()=>{
  document.title=byDeveloper?'Projects by Developer | Giffy Real Estate':'All Projects | Giffy Real Estate';
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('projects-content-visible');observer.unobserve(entry.target);}}),{threshold:.1});
  document.querySelectorAll('.projects-page [data-project-enter]').forEach(el=>observer.observe(el));
  return ()=>observer.disconnect();
 },[filter,byDeveloper]);
 return <div className="projects-page"><div dangerouslySetInnerHTML={{__html:siteHeaderMarkup()}}/><main className="projects-editorial"><header className="projects-page-heading"><div className="projects-title-line"><h1 data-project-enter>PROJECTS</h1><span data-project-enter>{String(visible.length).padStart(2,'0')}</span></div><div className="projects-page-intro" data-project-enter><span>{byDeveloper?'BY DEVELOPER / DUBAI':'A CONSIDERED COLLECTION / DUBAI'}</span><p>Distinctive places. Trusted developers.<br/>Find a property that moves you forward.</p></div><nav className="projects-filters" data-project-enter aria-label="Filter projects by developer">{developers.map(name=><button key={name} aria-pressed={filter===name} onClick={()=>setFilter(name)}>{filter===name?'[':''}{name==='All'?'ALL PROJECTS':name.toUpperCase()}{filter===name?']':''}</button>)}</nav></header><div className="editorial-listings" key={filter}>{visible.map((project,index)=><a className={`editorial-project editorial-project-${index===0?'hero':index===1?'row':'tile'}`} key={project.name} href={project.href} target="_blank" rel="noreferrer"><div className="editorial-project-image" data-project-enter><img src={project.image} alt={project.alt} loading={index===0?'eager':'lazy'}/><span className="editorial-project-arrow"><ArrowUpRight size={24}/></span></div><div className="editorial-project-info"><div><h2 data-project-enter>{project.name}</h2><span className="editorial-project-price" data-project-enter>FROM {project.price}</span><span className="editorial-project-tag" data-project-enter>{project.tag}</span></div><dl data-project-enter><div><dt>DEVELOPER</dt><dd>{project.developer}</dd></div><div><dt>LOCATION</dt><dd>Dubai, UAE</dd></div></dl></div></a>)}</div><section className="projects-talk"><h2 data-project-enter>LET’S TALK</h2><div data-project-enter><a href="mailto:info@giffyrealestate.com">info@giffyrealestate.com<br/>+971 4 570 3395<br/>Business Bay, Dubai</a><p>YOUR NEXT CHAPTER.<br/>THOUGHTFULLY CHOSEN.<br/>TOGETHER.</p><a href="/contact" className="projects-talk-button" aria-label="Discuss your next property"><ArrowUpRight size={30}/></a></div></section></main><div onClick={event=>{const link=event.target.closest('[data-footer-contact]');if(link)link.href='/contact';}} dangerouslySetInnerHTML={{__html:siteFooterMarkup()}}/></div>;
}
