const screens=[...document.querySelectorAll('.screen')];
const nav=document.querySelector('.bottom-nav');
const toast=document.getElementById('toast');
const sheet=document.getElementById('storeSheet');
const storeName=document.getElementById('storeName');

function showScreen(id){
  screens.forEach(screen=>screen.classList.toggle('active',screen.id===id));
  nav.classList.toggle('visible',id!=='onboarding');
  nav.querySelectorAll('[data-open]').forEach(button=>button.classList.toggle('active',button.dataset.open===id));
  window.scrollTo({top:0,behavior:'smooth'});
}

function notify(message){
  toast.textContent=message;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2200);
}

function openStore(name){
  storeName.textContent=name;
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden','false');
}

document.querySelectorAll('[data-open]').forEach(button=>{
  button.addEventListener('click',()=>showScreen(button.dataset.open));
});

document.getElementById('enterApp').addEventListener('click',()=>showScreen('home'));
document.getElementById('skipIntro').addEventListener('click',()=>showScreen('home'));
document.querySelectorAll('[data-store]').forEach(item=>item.addEventListener('click',()=>openStore(item.dataset.store)));
document.querySelector('.close-sheet').addEventListener('click',()=>sheet.classList.remove('open'));

document.getElementById('stillHere').addEventListener('click',()=>{
  sheet.classList.remove('open');
  notify('Thanks — sighting refreshed!');
});

document.getElementById('soldOut').addEventListener('click',()=>{
  sheet.classList.remove('open');
  notify('Marked sold out. Thank you!');
});

document.getElementById('cameraButton').addEventListener('click',()=>notify('Camera connection comes in the next build'));

document.querySelectorAll('.quantity button').forEach((button,index)=>{
  button.addEventListener('click',()=>{
    const qty=document.getElementById('qty');
    const next=Math.max(0,Number(qty.textContent)+(index===0?-1:1));
    qty.textContent=next;
  });
});

document.getElementById('postReport').addEventListener('click',()=>{
  notify('Sighting posted live!');
  setTimeout(()=>showScreen('map'),700);
});

document.querySelectorAll('.chips button').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.chips button').forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
  });
});

showScreen('onboarding');