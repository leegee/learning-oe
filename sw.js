if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const d=e=>i(e,r),l={module:{uri:r},exports:o,require:d};s[r]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(t(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BsWte2KI.js",revision:null},{url:"assets/index-C_ZXMCaR.css",revision:null},{url:"index.html",revision:"9c9263336da831644fdd955591a60d7d"},{url:"registerSW.js",revision:"cf52ddbcce1bc17367a8678619017325"},{url:"manifest.webmanifest",revision:"1691f87e88b0568da18a0013c3ac145f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
