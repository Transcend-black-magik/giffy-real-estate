# Giffy Real Estate

React + Vite hero landing page. `npm install`, `npm run dev`, `npm run build`.

Editable HTML/CSS hero inspired by the supplied inset white boutique real-estate reference. Uses Inter Tight for sentence-case display typography, a slate-and-white interface and the original Giffy gold-and-grey logo. The actual skyline background from Giffy's site is used as the right-hand photograph and the surrounding backdrop. Asset sources: `public/images/asset-sources.txt`. Header, navigation, headline lines, description, actions, review summary, statistics and architecture image enter in a timed sequence. Reduced motion disables animation. Desktop fills the viewport with compact layouts for short screens; tablet and phone layouts flow vertically so content remains readable without clipping. Dialogs scroll within the visible viewport.

Navigation topics and property/floor-plan buttons open contact dialogs. Email and WhatsApp actions connect to Giffy's published business contacts; no booking or form submission is simulated. Review summary opens an accessible dialog with three supplied Google reviews and next/previous controls. Reviews/count and company statistics are based on the supplied screenshot and https://giffyrealestate.com/ (12 reviews, 400+ clients, a decade of experience), not a live review integration. Review excerpts are lightly normalized for punctuation. No fabricated 72k/28k statistics.

The active hero uses `public/images/dubai-skyline.jpg` and `public/images/giffy-logo.png`, downloaded from the original Giffy site. Earlier concept images remain in the assets folder but are not used by the current hero. Google review summary sits immediately beneath the Book a viewing action.
