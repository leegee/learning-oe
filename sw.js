if(!self.define){let e,n={};const s=(s,c)=>(s=new URL(s+".js",c).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let o={};const r=e=>s(e,t),l={module:{uri:t},exports:o,require:r};n[t]=Promise.all(c.map((e=>l[e]||r(e)))).then((e=>(i(...e),o)))}}define(["./workbox-1504e367"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Cle7MC3y.css",revision:null},{url:"assets/index-keQ-GE2m.js",revision:null},{url:"index.html",revision:"9ff86146db1497af1aa6e315fae3ffae"},{url:"registerSW.js",revision:"cf52ddbcce1bc17367a8678619017325"},{url:"manifest.webmanifest",revision:"a4edf0128cc74300016ab8cb5cec09da"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".html")),new e.NetworkFirst({cacheName:"html-cache",networkTimeoutSeconds:10,plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".css")),new e.NetworkFirst({cacheName:"css-cache",networkTimeoutSeconds:10,plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".js")),new e.NetworkFirst({cacheName:"js-cache",networkTimeoutSeconds:10,plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".tff")),new e.NetworkFirst({cacheName:"tff-cache",networkTimeoutSeconds:10,plugins:[]}),"GET")}));
