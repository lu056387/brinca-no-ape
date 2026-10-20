(()=>{
'use strict';
const isEN=(document.documentElement.lang||'').toLowerCase().startsWith('en');
const t=isEN?{
strip:['🔒 Secure checkout','⚡ Instant digital access','↩ 7-day guarantee'],
title:'Buy with confidence',
items:[['🔒 Secure payment','Checkout is processed on a secure payment platform.'],['⚡ Instant access','Digital material delivered after payment confirmation.'],['↩ 7-day guarantee','You have 7 days to request a refund under the offer terms.']],
cta:'Secure checkout · Instant digital access · 7-day guarantee',
safe:['🔒 Secure payment','⚡ Digital delivery','↩ 7-day guarantee'],
seller:'Digital product with support channel available on this page.',
reframe:'The kit works best when an adult joins in and presents the activity as an invitation to play — that is exactly what the missions were designed to make easier.'
}:{
strip:['🔒 Checkout seguro','⚡ Acesso digital imediato','↩ Garantia de 7 dias'],
title:'Compre com tranquilidade',
items:[['🔒 Pagamento seguro','A finalização acontece em uma plataforma de pagamento segura.'],['⚡ Acesso digital','Você recebe o material digital após a confirmação do pagamento.'],['↩ Garantia de 7 dias','Você tem 7 dias para solicitar reembolso conforme as condições da oferta.']],
cta:'Checkout seguro · Acesso digital · Garantia de 7 dias',
safe:['🔒 Pagamento seguro','⚡ Entrega digital','↩ Garantia de 7 dias'],
seller:'Produto digital com canal de suporte informado nesta página.',
reframe:'O kit funciona melhor quando o adulto participa e apresenta a atividade como um convite para brincar — e as missões foram criadas justamente para facilitar esse momento.'
};
function strip(){const main=document.querySelector('main');if(!main||document.querySelector('.trust-strip'))return;const d=document.createElement('div');d.className='wrap';d.innerHTML=`<div class="trust-strip">${t.strip.map(x=>`<span>${x}</span>`).join('')}</div>`;main.insertBefore(d,main.firstChild)}
function panel(){const offer=document.querySelector('#oferta');if(!offer||document.querySelector('.trust-panel'))return;const d=document.createElement('div');d.className='trust-panel';d.innerHTML=`<h3>${t.title}</h3><div class="trust-grid">${t.items.map(x=>`<div class="trust-item"><strong>${x[0]}</strong><p>${x[1]}</p></div>`).join('')}</div>`;offer.parentElement.insertBefore(d,offer)}
function ctas(){document.querySelectorAll('a.btn[href]').forEach((a,i)=>{const href=(a.getAttribute('href')||'').toLowerCase();if(href.startsWith('#')||href.includes('privacy')||a.closest('.nav'))return;if(a.nextElementSibling&&a.nextElementSibling.classList.contains('cta-trust'))return;const p=document.createElement('p');p.className='cta-trust';p.textContent=t.cta;a.insertAdjacentElement('afterend',p);if(a.closest('.pricebox')){const s=document.createElement('div');s.className='safe-checkout';s.innerHTML=t.safe.map(x=>`<span>${x}</span>`).join('');p.insertAdjacentElement('afterend',s)}})}
function cleanPlaceholders(){const body=document.body;if(!body)return;const walker=document.createTreeWalker(body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{if(/\[NOME_DO_VENDEDOR\]|\[DOCUMENTO_DO_VENDEDOR\]|\[ENDERECO_DO_VENDEDOR\]/.test(n.nodeValue)){n.nodeValue=n.nodeValue.replace(/\[NOME_DO_VENDEDOR\]|\[DOCUMENTO_DO_VENDEDOR\]|\[ENDERECO_DO_VENDEDOR\]/g,'').replace(/\s{2,}/g,' ')}});const footer=document.querySelector('footer');if(footer&&!footer.querySelector('.seller-trust')){const p=document.createElement('p');p.className='seller-trust';p.textContent=t.seller;footer.querySelector('.wrap')?.appendChild(p)}}
function reframe(){if(isEN)return;const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{if(/não garante que a criança vai deixar a tela/i.test(n.nodeValue||''))n.nodeValue=n.nodeValue.replace(/[^.!?]*não garante que a criança vai deixar a tela[^.!?]*[.!?]?/i,t.reframe)})}
function run(){strip();panel();ctas();cleanPlaceholders();reframe()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
