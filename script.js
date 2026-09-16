const reviewStyles=document.createElement('link');
reviewStyles.rel='stylesheet';
reviewStyles.href='reviews.css';
document.head.append(reviewStyles);
const audio=document.querySelector('#audio');
const tracks=[...document.querySelectorAll('.track')];
let current=null;
const fmt=n=>`00:${String(Math.floor(n)).padStart(2,'0')}`;
tracks.forEach(track=>{
  const button=track.querySelector('.play');
  const start=()=>{
    if(current!==track){
      tracks.forEach(t=>{t.classList.remove('active');t.querySelector('.play').textContent='▶';t.querySelector('.progress i').style.width='0'});
      current=track;track.classList.add('active');audio.src=track.dataset.src;
    }
    if(audio.paused){audio.play();button.textContent='Ⅱ'}else{audio.pause();button.textContent='▶'}
  };
  button.addEventListener('click',start);
  track.querySelector('.progress').addEventListener('click',e=>{
    if(current!==track){current=track;audio.src=track.dataset.src;tracks.forEach(t=>t.classList.remove('active'));track.classList.add('active')}
    audio.currentTime=(e.offsetX/e.currentTarget.clientWidth)*(Number(track.dataset.duration)||1);audio.play();button.textContent='Ⅱ';
  });
});
audio.addEventListener('timeupdate',()=>{if(!current)return;const duration=audio.duration||Number(current.dataset.duration);current.querySelector('.progress i').style.width=`${audio.currentTime/duration*100}%`;current.querySelector('.track-time span').textContent=fmt(audio.currentTime)});
audio.addEventListener('ended',()=>{if(!current)return;current.querySelector('.play').textContent='▶';current.querySelector('.progress i').style.width='0';current.querySelector('.track-time span').textContent='00:00'});
