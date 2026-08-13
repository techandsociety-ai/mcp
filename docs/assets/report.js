/* Shared report page behavior: theme toggle (localStorage key chip50-theme),
   scroll progress bar, TOC scroll-spy, sidebar collapse. */
(function(){
 var r=document.documentElement, k='chip50-theme', s=null;
 try{s=localStorage.getItem(k)}catch(e){}
 if(s)r.setAttribute('data-theme',s);
 var b=document.getElementById('tt');
 if(b)b.onclick=function(){
   var cur=r.getAttribute('data-theme');
   if(!cur)cur=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
   var nx=cur==='dark'?'light':'dark';
   r.setAttribute('data-theme',nx);
   try{localStorage.setItem(k,nx)}catch(e){}
 };
 var p=document.getElementById('pg');
 if(p)addEventListener('scroll',function(){
   var h=document.body.scrollHeight-innerHeight;
   p.style.width=(h>0?(scrollY/h*100):0)+'%';
 },{passive:true});
 var links=[].slice.call(document.querySelectorAll('.side a')),
     heads=links.map(function(a){return document.getElementById(a.hash.slice(1))});
 if(links.length&&'IntersectionObserver' in window){
   var io=new IntersectionObserver(function(es){
     es.forEach(function(e){
       if(!e.isIntersecting)return;
       var i=heads.indexOf(e.target); if(i<0)return;
       links.forEach(function(a){a.classList.remove('on')});
       links[i].classList.add('on');
     });
   },{rootMargin:'-80px 0px -70% 0px'});
   heads.forEach(function(h){if(h)io.observe(h)});
 }
 var tg=document.getElementById('tg');
 if(tg)tg.onclick=function(){document.querySelector('.side').classList.toggle('collapsed')};
})();
