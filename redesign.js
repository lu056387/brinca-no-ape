(()=>{
 'use strict';
 // Preserve the established checkout and campaign parameters.
 const checkout=new URL('https://pay.kiwify.com.br/3SxyTjx');
 const incoming=new URLSearchParams(location.search);
 ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k=>{const v=incoming.get(k);if(v)checkout.searchParams.set(k,v)});
 document.querySelectorAll('a.checkout').forEach(a=>a.href=checkout.href);

 const video=document.getElementById('screen-scene'),film=video.closest('.film'),toggle=document.getElementById('film-toggle');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let manualPause=false,loaded=false,inView=false;
 const sync=()=>{film.classList.toggle('paused',video.paused);toggle.setAttribute('aria-label',video.paused?'Reproduzir cena ilustrativa':'Pausar cena ilustrativa')};
 function load(){if(loaded)return;const source=video.querySelector('source');source.src=source.dataset.src;video.load();loaded=true}
 function play(){load();const p=video.play();if(p)p.catch(sync)}
 toggle.addEventListener('click',()=>{if(video.paused){manualPause=false;play()}else{manualPause=true;video.pause()}});
 video.addEventListener('play',sync);video.addEventListener('pause',sync);
 const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView&&!manualPause&&!reduce.matches&&!navigator.connection?.saveData)play();else if(!inView)video.pause()},{threshold:.2});observer.observe(video);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(inView&&!manualPause&&!reduce.matches)play()});
 reduce.addEventListener('change',()=>{if(reduce.matches)video.pause()});

 const sticky=document.getElementById('sticky-offer'),hero=document.querySelector('.hero'),offer=document.getElementById('oferta');
 let scheduled=false;
 function updateSticky(){scheduled=false;const passed=hero.getBoundingClientRect().bottom<0;const b=offer.getBoundingClientRect();const seeingOffer=b.top<innerHeight&&b.bottom>0;sticky.classList.toggle('show',passed&&!seeingOffer)}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateSticky)}},{passive:true});addEventListener('resize',updateSticky);updateSticky();
})();
