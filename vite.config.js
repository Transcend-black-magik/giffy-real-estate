import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { errorPages, errorDocument } from './src/error-pages.js';
import { sitePaths } from './src/routes.js';

const staticErrorPages = {
 name: 'giffy-static-error-pages',
 generateBundle() {
  const siteCss = readFileSync(new URL('./src/styles.css',import.meta.url),'utf8').replace(/@import[^;]+;/g,'');
  const css = 'html,body{margin:0;padding:0}' + siteCss + readFileSync(new URL('./src/error-pages.css',import.meta.url),'utf8');
  for (const code of Object.keys(errorPages)) {
   this.emitFile({ type:'asset', fileName:`${code}.html`, source:errorDocument(code,css) });
  }
 },
 writeBundle(options) {
  const output = resolve(options.dir || 'dist');
  const html = readFileSync(resolve(output,'index.html'),'utf8');
  for (const route of sitePaths.filter(path=>path!=='/').map(path=>path.slice(1))) {
   mkdirSync(resolve(output,route),{recursive:true});
   writeFileSync(resolve(output,route,'index.html'),html);
  }
 }
};
export default defineConfig({ plugins: [react(), staticErrorPages], define: { 'import.meta.env.VERCEL_DEPLOYMENT': JSON.stringify(process.env.VERCEL === '1') } });
