import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, Plus, Minus, ShieldCheck, UsersRound, Building2, FileCheck2, Globe2, Handshake, BadgeCheck, Landmark, Star } from 'lucide-react';
import { siteFooterMarkup } from './site-chrome.js';
import teamMembers from './team-members.json';
import './golden-visa.css';
import GoldenVisaReviews from './GoldenVisaReviews.jsx';
import useHeroPush from './useHeroPush.js';

const photos='/images/golden-visa/';
const pathways=[
 {title:'Property investment',intro:'A considered investment. A longer-term future in Dubai.',cards:[
  {title:'Family sponsorship',text:'Explore residency options for your spouse, children, and eligible dependants.',image:photos+'family.jpg',alt:'A family enjoying time together in a green park'},
  {title:'Property investment',text:'One or more qualifying properties with a total purchase value of at least AED 2 million.',image:'/images/dubai-skyline.jpg',alt:'Dubai skyline and its residential neighbourhoods'},
  {title:'Ready & off-plan homes',text:'Understand the documents and approval conditions for your chosen investment.',image:'/images/projects/sunset-bay.jpg',alt:'A contemporary residential interior'},
  {title:'Personal guidance',text:'Get a clear property shortlist and a practical plan for your next steps.',image:photos+'consultation.jpg',alt:'An advisor welcoming a client'}]},
 {title:'Family sponsorship',intro:'Plan your next chapter together, with guidance for every family member.',cards:[
  {title:'Spouse & children',text:'Review sponsorship requirements, relationship documents, and health insurance.',image:photos+'family.jpg',alt:'Parents and children together outdoors'},
  {title:'A place to call home',text:'Find a community that fits your family’s everyday life.',image:'/images/about-residence.jpg',alt:'A bright modern home'},
  {title:'Document preparation',text:'Understand the marriage and birth certificate requirements for your application.',image:photos+'laptop.jpg',alt:'A woman organising her next steps on her laptop'},
  {title:'A connected future',text:'Ask about eligible dependants and the steps that apply to your circumstances.',image:photos+'travel.jpg',alt:'A traveller preparing for a new journey'}]},
 {title:'Off-plan investment',intro:'Understand how your investment and residency fit together.',cards:[
  {title:'Approved developments',text:'Consider qualifying homes from approved local developers.',image:'/images/projects/sunset-bay.jpg',alt:'An elegant residential development interior'},
  {title:'Payment & financing',text:'Review your payment plan and any bank or developer evidence required.',image:photos+'consultation.jpg',alt:'A discussion about an investment'},
  {title:'Ownership evidence',text:'Clarify the registration and documents needed for your specific route.',image:photos+'laptop.jpg',alt:'An investor reviewing information'},
  {title:'Your property shortlist',text:'Explore current projects that may fit your investment goals.',image:'/images/about-residence.jpg',alt:'A contemporary residence'}]},
 {title:'Eligibility review',intro:'Already own a home, or just starting? Begin with a clear picture of your options.',cards:[
  {title:'Your existing portfolio',text:'Review the value and ownership details of your Dubai properties.',image:'/images/dubai-skyline.jpg',alt:'Properties across the Dubai skyline'},
  {title:'Joint ownership',text:'Check how your registered share and documents affect your application.',image:photos+'consultation.jpg',alt:'Two people discussing their next steps'},
  {title:'Other investor residency',text:'Compare Golden Visa eligibility with other property investor residence routes.',image:photos+'travel.jpg',alt:'A traveller looking ahead to a new destination'},
  {title:'Speak to our team',text:'Bring your questions and leave with a practical plan.',image:photos+'laptop.jpg',alt:'A professional ready for a conversation'}]}
];
const benefits=[
 {icon:UsersRound,title:'Bring your family closer',text:'Eligible holders can sponsor family members, including a spouse and children, subject to the applicable requirements.'},
 {icon:ShieldCheck,title:'A longer-term foundation',text:'Dubai’s property-investor Golden Visa offers a renewable 10-year residency route for qualifying investors.'},
 {icon:Globe2,title:'More freedom to move',text:'Golden Visa holders can remain outside the UAE for longer than the usual six-month period.'},
 {icon:BadgeCheck,title:'Residency without a sponsor',text:'Build your life in the UAE through a self-sponsored residency route, with the investment requirements maintained.'}
];
const questions=['I want to check whether my property qualifies','I am looking for an investment from AED 2 million','I need advice on an off-plan purchase','I would like to sponsor my family','I own a mortgaged or jointly owned property','I need help understanding the documents'];
const faqs=[
 ['How much do I need to invest for a Golden Visa?','Dubai Land Department lists a minimum purchase value of AED 2 million across one or more qualifying properties for its 10-year investor Golden Visa service. Your ownership and supporting documents must meet the current conditions.'],
 ['Can an off-plan property qualify?','An off-plan investment may qualify when it meets the relevant authority’s requirements and is purchased from an approved developer. Our team will help you review the project, payment evidence, and registration documents before you proceed. A particular payment percentage alone does not guarantee eligibility.'],
 ['Can I include my family?','Eligible investors can apply to sponsor family members, subject to relationship documents, insurance, and sponsorship conditions. We will help you identify the requirements for your family’s circumstances.'],
 ['What if my property is mortgaged or jointly owned?','Additional ownership or bank evidence may be required. Dubai Land Department requests a bank no-objection letter for mortgaged property; joint ownership requires a review of your registered share and the applicable route.'],
 ['Is investor residency the same as a Golden Visa?','No. Property investor residence routes have their own eligibility rules and validity periods. Dubai Land Department currently lists a two-year Taskeen investor residence service separately from its 10-year Golden Visa service. We can help you compare the routes.'],
 ['How do I start my application?','Start with a personal review of your property, budget, and residency goals. We will help you understand suitable property options and the documents to prepare. Residency decisions and approval remain with the relevant UAE authorities.']
];
function AdvisorLink({entrance,entranceDelay,children='Speak to an advisor',className='',purpose='UAE Golden Visa consultation'}) {
 return <a data-entrance={entrance} data-entrance-delay={entranceDelay} className={`gv-button ${className}`} href="/contact?consultation=1" data-book-consultation data-consultation-purpose={purpose}>{children}<ArrowUpRight size={16}/></a>;
}
export default function GoldenVisaPage(){
 const stackRef=useRef(null);
 const heroSceneRef=useRef(null);
 const heroPinRef=useRef(null);
 const heroContentRef=useRef(null);
 useHeroPush(heroSceneRef,heroPinRef,heroContentRef);
 const [tab,setTab]=useState(0);
 const [selected,setSelected]=useState([]);
 const [openFaq,setOpenFaq]=useState(0);
 useLayoutEffect(()=>{document.title='UAE Golden Visa | Giffy Real Estate';},[]);
 useLayoutEffect(()=>{
  const stack=stackRef.current;
  const panels=[...stack.children];
  const measure=()=>{
   const header=document.querySelector('.site-header')?.getBoundingClientRect().height||58;
   panels.forEach((panel,index)=>{
    const inset=header+index*9;
    panel.style.setProperty('--gv-stack-top',`${inset-Math.max(0,panel.offsetHeight-(window.innerHeight-inset))}px`);
   });
  };
  const observer=new ResizeObserver(measure);
  panels.forEach(panel=>observer.observe(panel));
  window.addEventListener('resize',measure);
  measure();
  return ()=>{observer.disconnect();window.removeEventListener('resize',measure);};
 },[]);
 const assess=()=>window.dispatchEvent(new CustomEvent('giffy:consultation',{detail:`Golden Visa assessment${selected.length?': '+selected.join('; '):''}`}));
 return <div className="golden-visa-page"><main>
  <div className="gv-hero-transition-scene" ref={heroSceneRef}><div className="gv-hero-transition-pin" ref={heroPinRef}><div className="gv-hero-transition-content" ref={heroContentRef}>
  <section className="gv-hero gv-container" aria-labelledby="gv-title">
   <span className="gv-eyebrow" data-entrance="left" data-entrance-delay="80">A NEW CHAPTER. A GOLDEN OPPORTUNITY.</span>
   <h1 id="gv-title" data-entrance="center" data-entrance-delay="180">Your UAE Golden Visa.<br/><em>A future with more possibility.</em></h1>
   <p data-entrance="bottom" data-entrance-delay="310">Make Dubai part of your long-term story.<br/>Thoughtful property investment. Clear residency guidance. Giffy by your side.</p>
   <div className="gv-hero-actions"><a className="gv-button" data-entrance="left" data-entrance-delay="420" href="#visa-pathways" onClick={event=>{event.preventDefault();document.getElementById('visa-pathways')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}>Explore your options <ArrowRight size={16}/></a><AdvisorLink className="gv-button-outline" entrance="right" entranceDelay="470"/></div>
   <svg className="gv-mosaic-geometry" width="0" height="0" aria-hidden="true" focusable="false"><defs>
    <clipPath id="gv-photo-scallop" clipPathUnits="objectBoundingBox"><path d="M0,.15 Q0,0 .15,0 H.3 C.4,0 .45,.065 .5,.15 C.55,.065 .6,0 .7,0 H.85 Q1,0 1,.15 V.85 Q1,1 .85,1 H.7 C.6,1 .55,.935 .5,.85 C.45,.935 .4,1 .3,1 H.15 Q0,1 0,.85 Z"/></clipPath>
    <clipPath id="gv-photo-hourglass" clipPathUnits="objectBoundingBox"><path d="M.1,0 H.9 Q1,0 1,.09 V.28 C1,.4 .79,.42 .77,.5 C.79,.58 1,.6 1,.72 V.91 Q1,1 .9,1 H.1 Q0,1 0,.91 V.72 C0,.6 .21,.58 .23,.5 C.21,.42 0,.4 0,.28 V.09 Q0,0 .1,0 Z"/></clipPath>
    <clipPath id="gv-inverted-leaf-section" clipPathUnits="objectBoundingBox"><path d="M0,0 H.26 C.36,0 .405,.075 .5,.075 C.595,.075 .64,0 .74,0 H1 V1 H.74 C.64,1 .595,.925 .5,.925 C.405,.925 .36,1 .26,1 H0 Z"/></clipPath>
   </defs></svg>
   <div className="gv-mosaic">
    <article className="gv-mosaic-note" data-entrance-group data-entrance="left" data-entrance-delay="540"><span className="gv-round-arrow"><ArrowUpRight size={19}/></span><h2>Invest in a place.<br/>Belong to a future.</h2><p>Personal property guidance for people building a life beyond borders.</p></article>
    <figure className="gv-mosaic-photo" data-entrance-group data-entrance="bottom" data-entrance-delay="650"><img src={photos+'family.jpg'} alt="Parents and their child sharing a happy moment outdoors" fetchPriority="high"/></figure>
    <article className="gv-mosaic-clients" data-entrance-group data-entrance="center" data-entrance-delay="760"><div className="gv-avatar-stack">{teamMembers.slice(0,4).map(member=><img key={member.name} src={member.src} alt=""/>)}<span className="gv-avatar-plus" aria-hidden="true"><Plus size={19}/></span></div><strong>500+</strong><span>Happy clients</span></article>
    <figure className="gv-mosaic-tall" data-entrance-group data-entrance="right" data-entrance-delay="870"><img src={photos+'laptop.jpg'} alt="A woman planning her next chapter on a laptop" fetchPriority="high"/><span className="gv-round-arrow"><ArrowUpRight size={19}/></span></figure>
   </div>
   <GoldenVisaReviews/>
  </section>
  </div></div></div>
  <section className="gv-introduction gv-container" data-no-page-entrance aria-labelledby="gv-intro-title">
   <div className="gv-intro-copy"><h2 id="gv-intro-title">Why choose Giffy for<br/>your Golden Visa?</h2><p>With a decade of experience in Dubai real estate, our team helps you connect a considered property investment with your long-term residency goals. We put your needs first, with personal guidance and clear next steps.</p><p>From choosing a home to reviewing the property documents, we bring local knowledge and trusted developer relationships to your journey. You get thoughtful support, built around the future you want to create.</p><a className="gv-button" href="/about">Read more about Giffy <ArrowRight size={16}/></a></div>
   <div className="gv-intro-visual"><figure className="gv-intro-image" data-entrance-group><img src={photos+'travel.jpg'} alt="A traveller preparing for a new chapter abroad" loading="lazy"/></figure><div className="gv-facts"><article data-entrance-group><strong>10+ years<br/>of experience</strong><span>Local property knowledge<br/>and personal guidance.</span></article><article data-entrance-group><strong>500+ happy<br/>clients</strong><span>Relationships built on<br/>care and trust.</span></article><article data-entrance-group><strong>Free initial<br/>consultation</strong><span>Discuss your goals before<br/>taking the next step.</span></article></div></div>
  </section>
  <section className="gv-pathways" id="visa-pathways" aria-labelledby="gv-pathways-title"><div className="gv-container">
   <div className="gv-section-heading"><h2 id="gv-pathways-title">Our Golden Visa services</h2><p>Build your future in Dubai with property and residency guidance shaped around you.<br/>Whether you are investing in a home or planning a family move,<br/>explore the options and support available below.</p></div>
   <div className="gv-tabs" role="tablist" aria-label="Golden Visa guidance">{pathways.map((path,index)=><button key={path.title} id={`gv-tab-${index}`} type="button" role="tab" aria-selected={tab===index} aria-controls="gv-pathway-panel" tabIndex={tab===index?0:-1} onClick={()=>setTab(index)} onKeyDown={event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?pathways.length-1:(index+(event.key==='ArrowRight'?1:-1)+pathways.length)%pathways.length;setTab(next);document.getElementById(`gv-tab-${next}`)?.focus();}}}>{path.title}</button>)}</div>
   <div id="gv-pathway-panel" className="gv-tab-panel" role="tabpanel" aria-labelledby={`gv-tab-${tab}`}><p className="gv-tab-intro">{pathways[tab].intro}</p><div className="gv-pathway-grid">{pathways[tab].cards.map(card=><a href="/contact?consultation=1" data-book-consultation data-consultation-purpose={`Golden Visa: ${card.title}`} className="gv-pathway-card" data-entrance-group key={card.title}><img src={card.image} alt={card.alt} loading="lazy"/><span className="gv-card-arrow"><ArrowUpRight size={17}/></span><div><h3>{card.title}</h3><p>{card.text}</p></div></a>)}</div></div>
   <div className="gv-centered-action"><a className="gv-button" href="/projects">Explore Dubai properties <ArrowRight size={16}/></a></div>
  </div></section>
  <section className="gv-assessment-banner gv-container"><div className="gv-banner-photo" aria-hidden="true"/><div><span className="gv-eyebrow">A CONVERSATION CAN CHANGE WHAT COMES NEXT.</span><h2>Your Golden opportunity<br/>starts with a clear plan.</h2><p>Let’s connect your property goals with your future in Dubai.</p></div><AdvisorLink>Start my assessment</AdvisorLink></section>
  <div className="gv-section-stack" ref={stackRef}>
  <div className="gv-stack-panel">
  <section className="gv-thresholds gv-container" aria-labelledby="gv-thresholds-title">
   <div className="gv-section-heading"><span className="gv-eyebrow">CLARITY BEFORE COMMITMENT</span><h2 id="gv-thresholds-title">The investment essentials.</h2><p>A clear starting point for a considered decision.</p></div>
   <div className="gv-threshold-grid">
    <article><Handshake/><h3>The 10-year commitment</h3><p>Qualifying property investors can apply through Dubai’s 10-year renewable Golden Visa service. Renewal depends on continuing to meet the applicable requirements.</p><ul><li><Check/>A longer-term home for your plans.</li><li><Check/>Freedom to plan your life and work in the UAE.</li><li><Check/>Family sponsorship options, subject to eligibility.</li></ul></article>
    <article><Landmark/><h3>The AED 2 million option</h3><p>One or more qualifying properties with a total purchase value of at least AED 2 million form the starting point for this property-investor route.</p><ul><li><Check/>Review your ownership and property documents.</li><li><Check/>Check the evidence required for a mortgaged purchase.</li><li><Check/>Choose a property that fits your investment goals.</li></ul></article>
    <article><FileCheck2/><h3>Other investor residency</h3><p>Property investor residency and the Golden Visa are separate routes. Dubai’s Taskeen service currently provides a two-year investor residence option with its own ownership requirements.</p><a href="https://dubailand.gov.ae/en/eservices/request-for-investor-visa/" target="_blank" rel="noreferrer">View the current Taskeen requirements <ArrowUpRight size={14}/></a></article>
    <article><Building2/><h3>Off-plan & ownership rules</h3><p>Qualifying off-plan purchases from approved developers may offer a route to residency. Joint ownership, financing, and payment evidence need an individual review.</p><p>We help you understand the right questions before you commit to a purchase.</p></article>
   </div>
   <p className="gv-source-note">Eligibility and approval are determined by the relevant UAE authorities. <a href="https://dubailand.gov.ae/en/eservices/request-for-golden-visa-investor/" target="_blank" rel="noreferrer">Dubai Land Department</a> · <a href="https://icp.gov.ae/en/services/uae-golden-residency/" target="_blank" rel="noreferrer">ICP Golden Residency</a></p>
  </section>
  </div><div className="gv-stack-panel gv-benefits-panel">
  <section className="gv-benefits gv-container" aria-labelledby="gv-benefits-title"><div className="gv-section-heading"><span className="gv-eyebrow" data-entrance="top" data-entrance-delay="0">A FUTURE WITH ROOM TO GROW</span><h2 id="gv-benefits-title" data-entrance="top" data-entrance-delay="110">More than a residency.<br/>A foundation for <span className="gv-benefit-highlight">your next chapter.</span></h2><p data-entrance="top" data-entrance-delay="220">Explore the advantages of a qualifying Golden Visa investment.</p></div><div className="gv-benefit-grid">{benefits.map(({icon:Icon,title,text},index)=><article key={title} data-entrance={['left','right','bottom','top'][index]} data-entrance-delay={340+index*150}><span><Icon size={23}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  </div><div className="gv-stack-panel">
  <section className="gv-checklist gv-container" aria-labelledby="gv-checklist-title"><div><span className="gv-eyebrow">LET’S MAKE IT PERSONAL</span><h2 id="gv-checklist-title">Where are you<br/>in your Golden<br/>Visa journey?</h2><p>Tell us what is on your mind. We’ll help you turn your questions into a clear next step.</p></div><div className="gv-checklist-panel"><h3>What would you like help with?</h3><fieldset><legend className="gv-sr-only">Choose any topics you would like to discuss</legend>{questions.map(question=><label key={question}><input type="checkbox" checked={selected.includes(question)} onChange={event=>setSelected(current=>event.target.checked?[...current,question]:current.filter(item=>item!==question))}/><span>{question}</span></label>)}</fieldset><button className="gv-button" type="button" onClick={assess}>Talk to a Giffy advisor <ArrowRight size={16}/></button><small>Select any that apply, or simply start a conversation.</small></div></section>
  </div><div className="gv-stack-panel gv-process-panel">
  <section className="gv-process gv-container" aria-labelledby="gv-process-title"><div className="gv-section-heading"><span className="gv-eyebrow">A CONSIDERED WAY FORWARD</span><h2 id="gv-process-title">From your first question<br/>to your next move.</h2><p>A personal plan, built around your property and residency goals.</p></div><div className="gv-process-table"><table><thead><tr><th scope="col">Your next step</th><th scope="col">With Giffy</th><th scope="col">What to prepare</th></tr></thead><tbody>{[
   ['Understand your options','A personal conversation about your goals.','Your budget, preferred timeline, and questions.'],
   ['Explore the right property','A considered shortlist and local market knowledge.','Existing property details or your buying criteria.'],
   ['Review eligibility','Guidance on the relevant property and document requirements.','Ownership evidence, financing details, and identification.'],
   ['Plan your application','Clear next steps and coordination with the relevant channels.','The documents requested for your individual application.']
  ].map(([step,giffy,prepare],index)=><tr key={step}><th scope="row"><span>0{index+1}</span>{step}</th><td><Check size={15}/>{giffy}</td><td>{prepare}</td></tr>)}</tbody></table></div></section>
  </div></div>
  <section className="gv-reviews"><div className="gv-container"><div className="gv-section-heading"><span className="gv-eyebrow">PEOPLE AT THE HEART OF WHAT WE DO</span><h2>Real experiences.<br/>A relationship built on trust.</h2><p>What clients have shared about working with Giffy.</p></div><div className="gv-review-grid">{[
   ['A smooth transaction','The transaction was smooth. All thanks to Giffy Real Estate, indeed a reliable broker to work with.','IbroFX'],
   ['Personal from the start','The CEO herself is one of the most humble and kindest people I have ever met. She takes care of you as she would of herself.','Fatima Alanda'],
   ['Support beyond the purchase','The absolute best. Service is super top notch. If you are looking for a legit real estate agency in the UAE to handle your property purchases and still give after sales services, it is definitely Giffy Real Estate.','Amazing raheema']
  ].map(([title,quote,name])=><article key={name}><div className="gv-stars" aria-label="5 out of 5 stars">{Array.from({length:5},(_,i)=><Star key={i} size={12} fill="currentColor"/>)}</div><h3>{title}</h3><blockquote>{quote}</blockquote><div className="gv-review-person"><span>{name.charAt(0)}</span><div><strong>{name}</strong><small>Giffy client review</small></div></div></article>)}</div></div></section>
  <section className="gv-faq gv-container" aria-labelledby="gv-faq-title"><div className="gv-section-heading"><span className="gv-eyebrow">YOUR QUESTIONS, CONSIDERED.</span><h2 id="gv-faq-title">A little more clarity.<br/>A lot more confidence.</h2></div><div className="gv-faq-list">{faqs.map(([question,answer],index)=><article key={question} className={openFaq===index?'gv-faq-open':''}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`gv-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}>{question}{openFaq===index?<Minus size={17}/>:<Plus size={17}/>}</button></h3><div id={`gv-faq-${index}`} hidden={openFaq!==index}><p>{answer}</p></div></article>)}</div></section>
  <section className="gv-final-cta gv-container"><span className="gv-eyebrow">YOUR GOLDEN OPPORTUNITY STARTS NOW.</span><h2>A property. A plan.<br/><em>A future in Dubai.</em></h2><p>Speak to our investment team and take your next step with clarity.</p><AdvisorLink>Speak to an investment advisor</AdvisorLink></section>
 </main><div dangerouslySetInnerHTML={{__html:siteFooterMarkup()}}/></div>;
}
