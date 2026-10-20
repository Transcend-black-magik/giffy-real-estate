import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const questions = [
 ['How do I start the process of buying a home?', 'Start with your budget, preferred location, and the type of property you have in mind. If you plan to finance your purchase, speak with your lender about your options. Our advisors can then help you explore suitable homes and understand the next steps.'],
 ['What services does Giffy Real Estate offer?', 'We help with buying, selling, renting, and managing properties in Dubai. We also guide clients exploring off-plan projects and connect them with our team for Golden Visa enquiries.'],
 ['Can you help me find projects by a specific developer?', 'Yes. Explore our By Developer page or tell our advisors which developer, community, or property type interests you. We will help you compare the available opportunities against your goals.'],
 ['Can you manage my property after I buy?', 'Our property management service covers preparing and listing your property, tenant communication, rent collection, maintenance coordination, and regular updates. Speak with our team to discuss the support your property needs.'],
 ['How can I book a consultation with your team?', 'Use any Book a consultation or Speak to an advisor button to open our consultation form. Share your contact details and property goals, and our team will get in touch to arrange a conversation. You can also contact us by phone, email, or WhatsApp using the links below.'],
];

export default function AboutFaq() {
 const [open, setOpen] = useState(null);
 return <section className="about-faq" aria-labelledby="about-faq-title">
  <div className="about-faq-intro">
   <h2 id="about-faq-title" data-about-reveal>Frequently asked<br/>questions</h2>
   <p data-about-reveal>To help you make informed decisions, we have brought together answers to some of the questions our clients ask most.</p>
  </div>
  <div className="about-faq-list">
   {questions.map(([question, answer], index) => <article className={`about-faq-item${open === index ? ' is-open' : ''}`} key={question} data-about-reveal>
    <h3><button id={`about-faq-question-${index}`} aria-expanded={open === index} aria-controls={`about-faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{question}</span><i aria-hidden="true">{open === index ? <ArrowDownRight size={16}/> : <ArrowUpRight size={16}/>}</i></button></h3>
    <div className="about-faq-answer" id={`about-faq-answer-${index}`} role="region" aria-labelledby={`about-faq-question-${index}`} aria-hidden={open !== index}><div><p>{answer}</p></div></div>
   </article>)}
  </div>
 </section>;
}
