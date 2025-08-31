// ===== あなたのLINE追加URLを設定 =====
const LINE_URL = "https://lin.ee/your_link_here";
// ====================================

// LINE導線に適用
["lineHero","lineHeroTxt","lineLast","lineLastTxt"].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.href=LINE_URL;
});

// ストーリー横スワイプ制御
(function(){
  const root=document.getElementById('storyCarousel');
  if(!root) return;
  const slides=[...root.querySelectorAll('.story-slide')];
  const total=slides.length;
  const bar=document.getElementById('storyProgress');
  const count=document.getElementById('storyCounter');
  const prev=document.getElementById('storyPrev');
  const next=document.getElementById('storyNext');
  const dotsUl=document.getElementById('storyDots');

  slides.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('role','tab');b.addEventListener('click',()=>go(i));const li=document.createElement('li');li.appendChild(b);dotsUl.appendChild(li);});
  const slideW=()=>root.getBoundingClientRect().width;
  const idx=()=>Math.round(root.scrollLeft/slideW());
  const clamp=i=>Math.max(0,Math.min(total-1,i));
  const go=i=>root.scrollTo})
