if(!self.define){let e,n={};const c=(c,s)=>(c=new URL(c+".js",s).href,n[c]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=n,document.head.appendChild(e)}else e=c,importScripts(c),n()})).then((()=>{let e=n[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(n[t])return;let o={};const r=e=>c(e,t),l={module:{uri:t},exports:o,require:r};n[t]=Promise.all(s.map((e=>l[e]||r(e)))).then((e=>(i(...e),o)))}}define(["./workbox-1504e367"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-B-s-MDAj.js",revision:null},{url:"assets/index-DevN24Wc.css",revision:null},{url:"index.html",revision:"c79c24bfa35ede9abb15eb6c35d22774"},{url:"registerSW.js",revision:"cf52ddbcce1bc17367a8678619017325"},{url:"manifest.webmanifest",revision:"a4edf0128cc74300016ab8cb5cec09da"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".html")),new e.NetworkFirst({cacheName:"html-cache",networkTimeoutSeconds:10,plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".css")),new e.NetworkFirst({cacheName:"css-cache",networkTimeoutSeconds:10,plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".js")),new e.NetworkFirst({cacheName:"js-cache",networkTimeoutSeconds:10,plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.origin===location.origin&&e.pathname.endsWith(".tff")),new e.NetworkFirst({cacheName:"tff-cache",networkTimeoutSeconds:10,plugins:[]}),"GET")}));
