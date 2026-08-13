/* Shared report page behavior: theme toggle (localStorage key chip50-theme),
   scroll progress bar, TOC scroll-spy, sidebar collapse. */
(function(){
 var r=document.documentElement, k='chip50-theme', s=null;
 try{s=localStorage.getItem(k)}catch(e){}
 if(s)r.setAttribute('data-theme',s);
 var b=document.getElementById('tt');
 if(b){
   /* sun/moon (Feather, MIT); CSS shows the one matching the mode you'd switch to */
   b.innerHTML='<svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg><svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
   b.onclick=function(){
     var cur=r.getAttribute('data-theme');
     if(!cur)cur=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
     var nx=cur==='dark'?'light':'dark';
     r.setAttribute('data-theme',nx);
     try{localStorage.setItem(k,nx)}catch(e){}
   };
 }
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
