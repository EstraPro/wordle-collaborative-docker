var karak;
var lerroa;
var hitzaEgiaz;
var hiztegiHitza;
var mapHiztegi = new Map();
export var zapaldua = false;
export var enter = false;
export var chatting = false;

export function zapalduGabe() {
  zapaldua = false;
}

export function enterGabe(){
  enter = false;
}

export function sethiztegiHitza(hitza){
  hiztegiHitza = hitza;
}

export function idatzi(value, code) {
  if (teklaEgokia(code)) {
    if(karak.textContent === ''){
      karak.innerHTML = value;
      hitzaEgiaz += value;
    }
    if (karak.nextSibling != null) {    
      karak = karak.nextSibling;
      karak.focus();
    }
  }
  else if (code === 13) {
    if(hitzaEgiaz.length < hiztegiHitza.length && hitzaEgiaz !== ""){
      let mezua = document.getElementById('mezua');
      document.getElementById('game').style.opacity = 0.3;
      console.log(mezua);
      mezua.style.visibility = "visible";
      mezua.style.backgroundColor = "#eb445a";
      mezua.style.borderRadius = "4px";
      mezua.style.color = "white";
      mezua.innerHTML = 'Hitza motzeegia da';

      setTimeout(() => {
      
        mezua.style.visibility = 'hidden';
        document.getElementById('game').style.opacity = 1;
      }, 1000);
    }
    else if(hitzaEgiaz !== "") {
      enter = true;
      hitzaEgiaztatu();
    }
    
  }

  else if (code === 8) {
    zapaldua = true;
    karakBorratu();
  }
}
// After login
export function loadGame() {

  hitzaEgiaz = "";
  for (let index = 0; index < hiztegiHitza.length; index++) {
    
    if(mapHiztegi.has(hiztegiHitza[index])){
      mapHiztegi.set(hiztegiHitza[index],mapHiztegi.get(hiztegiHitza[index])+1);
    }
    else {
      mapHiztegi.set(hiztegiHitza[index],1);
    }
    
  }
  console.log(mapHiztegi);
  karak = document.getElementsByClassName("gelaxka")[0];
  lerroa = document.getElementsByClassName("row")[0];

  karak.focus();

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.keyCode === 32) {
        if (!chatting) document.getElementById("chattext").value = "";
        document.getElementById("chattext").setFocus();
        chatting = true;
      } else if (!chatting) {
        event.preventDefault();
        if (event.keyCode !== 13 && event.keyCode !== 8 && event.keyCode !== 32) zapaldua = true;
        var value = event.key;
        var code = event.keyCode;
        if (event.keyCode !== 32) idatzi(value, code);
      }
    },
    false
  );
}

export function notChatting(){
  chatting = false;
}

function teklaEgokia(teklaKodea) {
  if ((teklaKodea >= 65 && teklaKodea <= 90) || teklaKodea === 192) {
    return true;
  }

  return false;
}

export function karakBorratu() {
  hitzaEgiaz = hitzaEgiaz.slice(0, hitzaEgiaz.length - 1);
  console.log(hitzaEgiaz);

  if (karak.previousSibling != null) {
    if (lerroa.lastChild.textContent !== "") {
      karak.innerHTML = "";
    } else {
      karak = karak.previousSibling;
      karak.innerHTML = "";
    }
    karak.focus();
  }
}

export function hitzaEgiaztatu() {
    let mapHitza = new Map();
    for (let index = 0; index < lerroa.childElementCount; index++) {
      let elementua = lerroa.children[index];
      let botoia = document.getElementById(elementua.textContent);
      console.log(hiztegiHitza);
      // hitza egiaztapenaren hash mapa bete, zenbat hizki dauden bakoitzeko
      if(mapHitza.has(elementua.textContent)){
        mapHitza.set(elementua.textContent,mapHitza.get(elementua.textContent)+1);
      }
      else {
        mapHitza.set(elementua.textContent,1);
      }
      if (elementua.textContent === hiztegiHitza.charAt(index)) {
        elementua.classList.add("hizki_egokia");
        botoia.classList.add("hizki_egokia");
      } else if (hiztegiHitza.includes(elementua.textContent)) {
        if(mapHiztegi.get(elementua.textContent) >= mapHitza.get(elementua.textContent)){
          elementua.classList.add("hizki_posizio_okerra");
          botoia.classList.add("hizki_posizio_okerra");
        }
        else {
          elementua.classList.add("hizki_okerra");
        }
        
      } else {
        elementua.classList.add("hizki_okerra");
        botoia.classList.add("hizki_okerra");
      }
    }
    if (hitzaEgiaz === hiztegiHitza) {

      let mezua = document.getElementById('mezua');
      document.getElementById('game').style.opacity = 0.3;
      mezua.style.visibility = "visible";
      mezua.style.borderRadius = "4px";
      mezua.style.backgroundColor = "#79b851";
      mezua.style.color = "white";
      mezua.innerHTML = 'HITZA ZUZENA DA!! ZORIONAK';

      setTimeout(() => {
      
        mezua.style.visibility = 'hidden';
        document.getElementById('game').style.opacity = 1;
        // Hizki guztiak ezabatzeko
        let gelaxkak = document.getElementsByClassName('gelaxka');
        let botoiak = document.getElementsByClassName('teklatuaBotoi');
        for (let index = 0; index < gelaxkak.length; index++) {
          
          gelaxkak[index].innerHTML = '';
          gelaxkak[index].classList.remove('hizki_egokia');
          gelaxkak[index].classList.remove('hizki_posizio_okerra');
          gelaxkak[index].classList.remove('hizki_okerra');
        }
        for (let index = 0; index < botoiak.length; index++) {
          
          botoiak[index].classList.remove('hizki_egokia');
          botoiak[index].classList.remove('hizki_posizio_okerra');
          botoiak[index].classList.remove('hizki_okerra');
          
        }
        mapHitza.clear();
        hitzaEgiaz = '';
        karak = document.getElementsByClassName('gelaxka')[0];
        lerroa = document.getElementsByClassName('row')[0];
        karak.focus();

       
      }, 1000);
  
    }
    else{
      hitzaEgiaz = "";
      mapHitza.clear();
      if(lerroa.nextSibling != null){
        lerroa = lerroa.nextSibling;
        karak = lerroa.firstChild;
        karak.focus();
      }
      else {
        let mezua = document.getElementById('mezua');
        document.getElementById('game').style.opacity = 0.3;
        mezua.style.visibility = "visible";
        mezua.style.height = "130px";
        mezua.style.borderRadius = "4px";
        mezua.style.backgroundColor = "#eb445a";
        mezua.style.color = "white";
        mezua.innerHTML = 'HITZA EZ DUZU ASMATU<br><br> HITZA HAU ZEN: <b>' +hiztegiHitza.toUpperCase()+'</b>';
      }
    }    
    
}
