const photoCount=155,photoWall=document.querySelector('#photoWall');
const pad=n=>String(n).padStart(3,'0');
const photos=Array.from({length:photoCount},(_,i)=>`./assets/bg/bg-${pad(i+1)}.webp`);
for(let r=0;r<10;r++){const row=document.createElement('div');row.className='photo-row';const set=photos.filter((_,i)=>i%10===r);[...set,...set,...set].forEach((src,i)=>{const img=document.createElement('img');img.src=src;img.alt='';img.loading=i<30?'eager':'lazy';img.decoding='async';row.appendChild(img)});photoWall.appendChild(row)}

const intro=document.querySelector('#intro'),main=document.querySelector('#main'),answerZone=document.querySelector('#answerZone'),noBtn=document.querySelector('#noBtn'),yesBtn=document.querySelector('#yesBtn');
const mars=document.querySelector('#mars'),musicToggle=document.querySelector('#musicToggle');let escapeCount=0,lastNoX=0,lastNoY=0;
function escapeNo(bigJump=false){const b=noBtn.getBoundingClientRect(),pad=12,maxX=Math.max(pad,innerWidth-b.width-pad),maxY=Math.max(pad,innerHeight-b.height-pad);let x,y,tries=0;do{x=pad+Math.random()*(maxX-pad);y=pad+Math.random()*(maxY-pad);tries++}while(bigJump&&Math.hypot(x-lastNoX,y-lastNoY)<Math.min(innerWidth,innerHeight)*.42&&tries<12);lastNoX=x;lastNoY=y;noBtn.style.right='auto';noBtn.style.left=`${x}px`;noBtn.style.top=`${y}px`;noBtn.style.transform=`rotate(${Math.random()*22-11}deg)`;escapeCount++;noBtn.textContent=escapeCount>8?'YAKALAYAMAZSIN :D':'HAYIR'}
['pointerenter','pointerdown','focus','click'].forEach(name=>noBtn.addEventListener(name,e=>{e.preventDefault();escapeNo(true);noBtn.blur()}));
setTimeout(()=>escapeNo(false),350);
setInterval(()=>{if(!document.body.classList.contains('entered'))escapeNo(false)},900);
yesBtn.addEventListener('click',()=>{yesBtn.textContent='DOGRU CEVAP ✓';musicToggle.hidden=false;mars.play().catch(()=>{musicToggle.textContent='▶ MARS';musicToggle.setAttribute('aria-label','Muzigi oynat')});document.body.classList.add('entered');window.scrollTo({top:0,behavior:'auto'})});
musicToggle.addEventListener('click',async()=>{if(mars.paused){answerVideo.pause();await mars.play();musicToggle.textContent='II MARS';musicToggle.setAttribute('aria-label','Muzigi duraklat')}else{mars.pause();musicToggle.textContent='▶ MARS';musicToggle.setAttribute('aria-label','Muzigi oynat')}});

const gameStart=document.querySelector('#gameStart'),arena=document.querySelector('#arena'),heart=document.querySelector('#heart'),scoreText=document.querySelector('#scoreText'),gameMessage=document.querySelector('#gameMessage'),picker=document.querySelector('#picker');let score=0,running=false;
function moveHeart(){const x=Math.max(0,arena.clientWidth-heart.offsetWidth-16),y=Math.max(0,arena.clientHeight-heart.offsetHeight-16);heart.style.left=`${8+Math.random()*x}px`;heart.style.top=`${8+Math.random()*y}px`}
gameStart.addEventListener('click',()=>{score=0;running=true;scoreText.textContent='0 / 7';gameMessage.textContent='radar acildi. kalbi yakala.';gameStart.hidden=true;arena.hidden=false;requestAnimationFrame(moveHeart)});
heart.addEventListener('click',()=>{if(!running)return;score++;scoreText.textContent=`${score} / 7`;if(score>=7){running=false;heart.hidden=true;gameMessage.textContent='test gecti. kalp yakalama konusunda gereksiz yeteneklisin.';picker.classList.remove('locked');setTimeout(()=>picker.scrollIntoView({behavior:'smooth',block:'center'}),450)}else moveHeart()});

const buttons=document.querySelectorAll('#options button'),result=document.querySelector('#result'),resultChoice=document.querySelector('#resultChoice'),answerVideo=document.querySelector('#answerVideo');
answerVideo.addEventListener('play',()=>{mars.pause();musicToggle.textContent='▶ MARS';musicToggle.setAttribute('aria-label','Muzigi oynat')});
buttons.forEach(button=>button.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('selected'));button.classList.add('selected');resultChoice.textContent=`${button.dataset.choice.toUpperCase()} SECILDI`;mars.pause();musicToggle.textContent='▶ MARS';musicToggle.setAttribute('aria-label','Muzigi oynat');result.hidden=false;answerVideo.currentTime=0;answerVideo.play().catch(()=>{});result.scrollIntoView({behavior:'smooth',block:'nearest'})}));
