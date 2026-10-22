/* Separate international funnel. Purchase is recorded only after payment approval. */
(()=>{
'use strict';
const COMMERCE=Object.freeze({checkoutUrl:'https://pay.kiwify.com/9MM7u2F',pixelId:'1792904275365443',currency:'USD',value:9.90,productId:'little-room-adventures-en-v1'});
const KEY='lra_marketing_consent_v1',THEME_KEY='lra_color_scheme_v1';
const systemTheme=matchMedia('(prefers-color-scheme: dark)'),selector=document.getElementById('theme-preference');
function syncTheme(){const preference=document.documentElement.dataset.theme||'auto';selector.value=preference;document.querySelector('meta[name="theme-color"]').content=preference==='dark'||(preference==='auto'&&systemTheme.matches)?'#101c23':'#0a1520'}
selector.disabled=false;
selector.addEventListener('change',()=>{const value=selector.value;if(value==='auto')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=value;try{if(value==='auto')localStorage.removeItem(THEME_KEY);else localStorage.setItem(THEME_KEY,value)}catch(e){}syncTheme()});
systemTheme.addEventListener('change',syncTheme);syncTheme();

// Native checkout anchor remains usable without JavaScript. Carry only bounded campaign parameters.
const checkout=new URL(COMMERCE.checkoutUrl),incoming=new URLSearchParams(location.search);
if(checkout.protocol!=='https:'||checkout.hostname!=='pay.kiwify.com')throw new Error('Unapproved international checkout');
checkout.searchParams.set('region','intl');
for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']){const value=incoming.get(key);if(value&&value.length<=200)checkout.searchParams.set(key,value)}
const buy=document.getElementById('buy');buy.href=checkout.href;

let choice=null,started=false;try{choice=localStorage.getItem(KEY)}catch(e){}
const allowed=()=>choice==='granted';
function event(name,data={}){if(allowed()&&window.fbq)window.fbq('trackCustom',name,{content_ids:[COMMERCE.productId],...data})}
function startMeasurement(){if(started||!allowed())return;started=true;
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
window.fbq('consent','grant');window.fbq('init',COMMERCE.pixelId);window.fbq('track','PageView');window.fbq('track','ViewContent',{content_name:'The Small-Space Play Kit',content_ids:[COMMERCE.productId],content_type:'product',currency:COMMERCE.currency,value:COMMERCE.value});
checkProgress();}
const banner=document.getElementById('consent');banner.hidden=choice==='granted'||choice==='denied';
function choose(value){choice=value;try{localStorage.setItem(KEY,value)}catch(e){}banner.hidden=true;if(value==='granted'){if(started&&window.fbq)window.fbq('consent','grant');else startMeasurement()}else if(window.fbq)window.fbq('consent','revoke')}
document.getElementById('allow').addEventListener('click',()=>choose('granted'));
document.getElementById('decline').addEventListener('click',()=>choose('denied'));
document.getElementById('preferences').addEventListener('click',()=>{banner.hidden=false;document.getElementById('decline').focus()});
buy.addEventListener('click',()=>event('CheckoutButtonClick',{currency:COMMERCE.currency,value:COMMERCE.value}));
document.querySelectorAll('.offer-link').forEach(a=>a.addEventListener('click',()=>event('OfferNavigationClick',{position:a.dataset.position})));
// Neither InitiateCheckout nor Purchase is fired by a landing-page button.
const milestones=new Set();let offerViewed=false;
function checkProgress(){if(!allowed())return;const max=document.documentElement.scrollHeight-innerHeight;if(max>0){const depth=Math.floor(scrollY/max*100);for(const percent of [25,50,75,90])if(depth>=percent&&!milestones.has(percent)){milestones.add(percent);event('ScrollDepth',{percent})}}const r=document.getElementById('get-kit').getBoundingClientRect();if(!offerViewed&&r.top<innerHeight*.8&&r.bottom>0){offerViewed=true;event('OfferViewed')}}

// Whole-frame illustrative footage, loaded only when needed. Respect motion and data preferences.
const video=document.getElementById('screen-scene'),film=video.closest('.film'),toggle=document.getElementById('film-toggle');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');let manualPause=false,loaded=false,inView=false;
function syncFilm(){film.classList.toggle('paused',video.paused);toggle.setAttribute('aria-label',video.paused?'Play illustrative scene':'Pause illustrative scene')}
function loadVideo(){if(loaded)return;const source=video.querySelector('source');source.src=source.dataset.src;video.load();loaded=true}
function playVideo(){loadVideo();const p=video.play();if(p)p.catch(syncFilm)}
toggle.addEventListener('click',()=>{if(video.paused){manualPause=false;playVideo()}else{manualPause=true;video.pause()}});
video.addEventListener('play',syncFilm);video.addEventListener('pause',syncFilm);
new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView&&!manualPause&&!reduce.matches&&!navigator.connection?.saveData)playVideo();else if(!inView)video.pause()},{threshold:.2}).observe(video);
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(inView&&!manualPause&&!reduce.matches&&!navigator.connection?.saveData)playVideo()});
reduce.addEventListener('change',()=>{if(reduce.matches)video.pause()});
const sticky=document.getElementById('sticky-offer'),hero=document.querySelector('.hero'),offer=document.getElementById('offer');let scheduled=false;
function update(){scheduled=false;const passed=hero.getBoundingClientRect().bottom<0,r=offer.getBoundingClientRect();sticky.classList.toggle('show',passed&&!(r.top<innerHeight&&r.bottom>0));checkProgress()}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);
if(allowed())startMeasurement();
update();
})();
