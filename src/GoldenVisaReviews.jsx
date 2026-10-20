import React, { useState } from 'react';
import { Star, BadgeCheck, ChevronRight } from 'lucide-react';

const reviews=[
 {name:'IbroFX',initial:'I',color:'#c73b0b',text:'The transaction was smooth. All thanks to Giffy Real Estate, indeed a reliable broker to work with.'},
 {name:'Fatima Alanda',initial:'F',color:'#ac45b6',text:'The CEO herself is one of the most humble and kindest people I have ever met. She takes care of you as she would of herself. I can only recommend!'},
 {name:'Amazing raheema',initial:'A',color:'#246b68',text:'The absolute best. Service is super top notch. If you are looking for a legit real estate agency in the UAE to handle your property purchases and still give after sales services, it is definitely Giffy Real Estate.'}
];
function GoogleMark(){return <svg className="gv-google-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51L18.7 4.6A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z"/></svg>;}
function Rating(){return <span className="gv-google-stars" aria-label="5 out of 5 stars">{Array.from({length:5},(_,i)=><Star key={i} fill="currentColor" strokeWidth={0}/>)}</span>;}
export default function GoldenVisaReviews(){
 const [offset,setOffset]=useState(0);
 const [expanded,setExpanded]=useState([]);
 return <section className="gv-google-reviews" aria-label="Giffy Google client reviews">
  <div className="gv-google-summary"><strong>EXCELLENT</strong><Rating/><span>Based on <b>12 reviews</b></span><span className="gv-google-wordmark" aria-label="Google"><i>G</i><i>o</i><i>o</i><i>g</i><i>l</i><i>e</i></span></div>
  <div className="gv-google-cards">{reviews.map((_,index)=>{const review=reviews[(index+offset)%reviews.length];const isExpanded=expanded.includes(review.name);return <article className="gv-google-card" key={review.name}>
   <div className="gv-google-card-top"><span className="gv-google-avatar" style={{background:review.color}}>{review.initial}</span><strong title={review.name}>{review.name}</strong><GoogleMark/></div>
   <div className="gv-google-card-rating"><Rating/><BadgeCheck size={15} fill="#4285f4" color="#fff" aria-label="Google review"/></div>
   <p className={isExpanded?'gv-review-expanded':''} id={`gv-google-review-${review.initial}`}>{review.text}</p>
   <button type="button" className="gv-google-read" aria-expanded={isExpanded} aria-controls={`gv-google-review-${review.initial}`} onClick={()=>setExpanded(current=>isExpanded?current.filter(name=>name!==review.name):[...current,review.name])}>{isExpanded?'Read less':'Read more'}</button>
  </article>;})}</div>
  <button type="button" className="gv-google-next" aria-label="Show next client review" onClick={()=>setOffset(current=>(current+1)%reviews.length)}><ChevronRight size={21}/></button>
  <a className="gv-google-source" href="https://giffyrealestate.com/" target="_blank" rel="noreferrer">Client reviews shared on Giffy <ArrowIcon/></a>
 </section>;
}
function ArrowIcon(){return <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8"/></svg>;}
