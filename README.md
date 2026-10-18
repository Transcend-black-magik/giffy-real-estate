# Giffy Real Estate hero prototype

React + Vite. Run `npm install` then `npm run dev`. Production: `npm run build`.

The hero uses the exact original Nixtio presentation artwork with its outer frame cropped through CSS. The headline, property panel, map and thumbnails are flattened into that source image. Accessible HTML labels and positioned controls provide working contact navigation, viewing dialog and residence preview. The original composition is preserved on small screens. A clean background/source design file is needed to make each visual element independently editable and reflow the composition for mobile.

Reference and attribution: `public/images/reference-source.txt`. Property specifications belong to the reference design and are not verified listings. Contact actions open email or WhatsApp; no bookings are stored.

The headline and description are editable HTML in `src/main.jsx`. `public/images/hero-text-cleared.png` is a built-in image_gen edit of the original reference with the old headline and paragraph removed. The remaining UI artwork is still flattened.
