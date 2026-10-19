import React, { useEffect, useState } from 'react';
import { errorMarkup, errorPages, getErrorCode } from './error-pages.js';
import './error-pages.css';

export function ErrorScreen({ code = '500' }) {
 useEffect(() => {
  const title = document.title;
  document.title = `${errorPages[code]?.label || errorPages[404].label} | Giffy Real Estate`;
  const robots = document.createElement('meta');
  robots.name = 'robots'; robots.content = 'noindex,follow';
  document.head.appendChild(robots);
  return () => { document.title = title; robots.remove(); };
 }, [code]);
 return <div onClick={event => { if (event.target.closest('[data-error-retry]')) window.location.reload(); }} dangerouslySetInnerHTML={{ __html: errorMarkup(code) }}/>;
}

export class SiteErrorBoundary extends React.Component {
 state = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 componentDidCatch(error) { console.error('Giffy page failed to render:', error); }
 render() { return this.state.failed ? <ErrorScreen code="500"/> : this.props.children; }
}

export function SiteEntry({ children }) {
 const [offline, setOffline] = useState(!navigator.onLine);
 useEffect(() => {
  const update = () => setOffline(!navigator.onLine);
  window.addEventListener('online',update); window.addEventListener('offline',update);
  return () => { window.removeEventListener('online',update); window.removeEventListener('offline',update); };
 }, []);
 const code = getErrorCode(window.location.pathname);
 if (offline) return <ErrorScreen code="offline"/>;
 if (code) return <ErrorScreen code={code}/>;
 return children;
}
