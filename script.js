// ===== あなたのLINE追加URLを設定 =====
const LINE_URL = "https://lin.ee/your_link_here"; // ←あなたのリンクに置換
// ====================================

// LINE導線にURL適用
["lineHero","lineHeroTxt","lineLast","lineLastTxt"].forEach(id=>{
  const el = document.getElementById(id);
  if (el) el.href = LINE_URL;
});

// ===== ストーリー v2（カードUI）の制御 =====
(function initStoryV2(){
  const root   = document.getElementById('storyCarousel');
  const rootV2 = document.getElementById('storyCarousel'); // 互換
  const container = document.querySelector('.story-carousel-v2');
  if(!container) return;

  const slides = Array.from(container.querySelectorAll('.story-card'));
  const total  = slides.length;

  const prevBtn = document.getElementById('storyPrev');
  const nextBtn = document.getElementById('storyNext');
  const dotsUl  = document.getElementById('storyDots');

  // ドット生成
  slides.forEach((_, i)=>{
    const li=document.createElement('li');
    const b=document.createElement('button');
    b.setAttribute('role','tab');
    b.setAttribute('aria-label',`${i+1}枚目へ`);
    b.addEventListener('click',()=>go(i));
    li.appendChild(b); dotsUl.appendChild(li);
  });

  // 枠の矢印 → 親カルーセルをスクロール
  slides.forEach((slide, i)=>{
    slide.querySelector('.edge-arrow.prev')?.addEventListener('click', ()=> go(i-1));
    slide.querySelector('.edge-arrow.next')?.addEventListener('click', ()=> go(i+1));
  });

  const slideW = ()=> container.getBoundingClientRect().width;
  const idx = ()=> Math.round(container.scrollLeft / slideW());
  const clamp = i=> Math.max(0, Math.min(total-1, i));
  const go = i=> container.scrollTo({left: clamp(i)*slideW(), behavior:'smooth'});

  function update(){
    const i = clamp(idx());
    // 下部ナビの状態
    dotsUl.querySelectorAll('button').forEach((b,ii)=> b.setAttribute('aria-selected', ii===i ? 'true':'false'));
    if (prevBtn) prevBtn.disabled = (i===0);
    if (nextBtn) nextBtn.disabled = (i===total-1);

    // それぞれのカード左上に「n / total」を表示（初期化済みだが再同期しておく）
    slides.forEach((s,ii)=>{
      const c = s.querySelector('.card-count');
      if(c) c.textContent = `${ii+1} / ${total}`;
    });
  }

  if (prevBtn) prevBtn.addEventListener('click',()=>go(idx()-1));
  if (nextBtn) nextBtn.addEventListener('click',()=>go(idx()+1));

  let ticking=false;
  container.addEventListener('scroll',()=>{
    if(!ticking){ requestAnimationFrame(()=>{ update(); ticking=false; }); ticking=true; }
  });
  window.addEventListener('resize', update);

  update();

  // 任意：?story=3 で3枚目から開始
  const m = new URLSearchParams(location.search).get('story');
  if(m) go(Number(m)-1);
})();
