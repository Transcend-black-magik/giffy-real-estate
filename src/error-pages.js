import { siteHeaderMarkup, siteFooterMarkup } from './site-chrome.js';
import { sitePaths } from './routes.js';
// Shared by the app and the standalone HTML error pages emitted during builds.
export const errorPages = {
 400: { label: 'Bad request', title: "Let's take a different route.", message: 'We could not understand this request. Check the address or return home to explore Dubai properties.' },
 401: { label: 'Sign-in required', title: 'This space is private.', message: 'This page requires authorization. Return home or contact our team for help with access.' },
 403: { label: 'Access restricted', title: 'A little further than we can go.', message: 'You do not have permission to view this page. Our team can help you find what you need.' },
 404: { label: 'Page not found', title: 'A wrong turn. A new possibility.', message: 'The page you are looking for may have moved, or the address may be incorrect. Your next home is still waiting to be discovered.' },
 405: { label: 'Method not allowed', title: "Let's try another way.", message: 'This page cannot process that kind of request. Return home and try again from there.' },
 408: { label: 'Request timed out', title: 'That took a little too long.', message: 'The connection timed out before the request could finish. Check your connection, then try again.', retry: true },
 410: { label: 'Page no longer available', title: 'This chapter has closed.', message: 'This page has been retired. Explore our current properties or ask our team for a suitable alternative.' },
 413: { label: 'Request too large', title: 'A little less, please.', message: 'The request is larger than we can accept. Reduce the size of your files or message, then submit it again from the original page.' },
 422: { label: 'Request could not be processed', title: 'A few details need another look.', message: 'Some information could not be processed. Return to the previous page, check your details, and try again.' },
 429: { label: 'Too many requests', title: 'A moment to catch our breath.', message: 'There have been too many requests in a short time. Please wait a little before trying again.', retry: true },
 500: { label: 'Something went wrong', title: 'A brief pause in your journey.', message: 'An unexpected problem interrupted this page. Please try again, or speak to our team for help.', retry: true },
 501: { label: 'Not supported', title: 'This route is not ready yet.', message: 'This request is not supported here. Head home or contact our team to continue.' },
 502: { label: 'Connection problem', title: 'A connection along the way.', message: 'We could not get a response from a service this page depends on. Please try again shortly.', retry: true },
 503: { label: 'Temporarily unavailable', title: "We'll be right back.", message: 'This service is temporarily unavailable. Please try again shortly, or contact our team directly.', retry: true },
 504: { label: 'Service timed out', title: 'A little longer than expected.', message: 'A service took too long to respond. Please try again in a moment.', retry: true },
 offline: { label: 'You are offline', title: "Let's reconnect.", message: 'Your internet connection appears to be unavailable. Check your connection and try again to continue exploring.', retry: true },
 maintenance: { label: 'Scheduled maintenance', title: 'Making room for something better.', message: 'The website is taking a short break for maintenance. Please check back soon. Our team is still available by phone and email.', retry: true }
};

export function getErrorCode(pathname) {
 const path = pathname.replace(/\/+$/, '') || '/';
 if (path === '/index.html' || sitePaths.includes(path)) return null;
 const match = path.match(/^\/(?:errors\/)?(\d{3}|offline|maintenance)(?:\.html)?$/);
 return match && Object.hasOwn(errorPages, match[1]) ? match[1] : '404';
}

export function errorMarkup(code) {
 const key = Object.hasOwn(errorPages, code) ? code : '404';
 const page = errorPages[key];
 const number = /^\d{3}$/.test(String(key)) ? key : key === 'offline' ? 'OFF' : 'BRB';
 const title = String(key) === '404' ? "Oops! We couldn't find that page." : page.title;
 return `<div class="error-screen">${siteHeaderMarkup()}<main class="error-main"><section class="error-panel" aria-labelledby="error-title"><div class="error-copy"><span class="error-eyebrow">${number} ${page.label}</span><h1 id="error-title">${title}</h1><p>${page.message}</p><div class="error-actions"><a class="error-primary" href="/">BACK TO HOME <span aria-hidden="true">→</span></a>${page.retry ? '<button class="error-secondary" type="button" data-error-retry>Try again ↻</button>' : ''}</div></div><div class="error-number" aria-hidden="true">${number}</div></section></main>${siteFooterMarkup()}</div>`;
}
export function errorDocument(code, css) {
 const page = errorPages[code];
 return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta name="theme-color" content="#f7f5f0"><title>${page.label} | Giffy Real Estate</title><link rel="icon" type="image/png" href="/giffy-favicon.png"><link rel="apple-touch-icon" href="/giffy-favicon.png"><style>${css}</style></head><body>${errorMarkup(code)}<script>document.querySelector('[data-error-retry]')?.addEventListener('click',function(){window.location.reload();});</script></body></html>`;
}
