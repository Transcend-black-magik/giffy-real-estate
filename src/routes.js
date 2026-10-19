export const sectionRoutes = { '/':'home', '/services':'services', '/about':'our-experience', '/property-management':'property-management' };
export const sitePaths = ['/', '/projects', '/projects/developers', '/services', '/about', '/property-management', '/contact'];
export const legacySections = { home:'/', 'featured-properties':'/projects', services:'/services', 'our-experience':'/about', 'about-giffy':'/about', 'property-management':'/property-management', contact:'/contact' };
export const normalizePath = path => path.replace(/\/+$/,'') || '/';
