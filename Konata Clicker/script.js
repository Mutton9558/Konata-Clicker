const SCORETEXT = document.querySelector("#score");
const TARGET = document.querySelector("#target-img");
const UPGRADETEXT = document.querySelector("#upgrade-amount");
const UPGRADEBTN = document.querySelector("#upgrade-btn");
let volumeBg = document.querySelector('#volume-slider');
let volumeClick = document.querySelector("#volume-slider-click");
let randImageLoc = document.querySelector("#random-konata-img");

var clickAudio = new Audio("konata_good_job.mp3");
var AUDIO1 = new Audio("./music/bgmusic1.mp3");
var AUDIO2 = new Audio("./music/bgmusic2.mp3");
var clickStrength = 1;
var cur_score = 0;
var upgrade_amount = 10;
var imgID = 0;

TARGET.addEventListener("click", ()=>{
    if (AUDIO1.paused && AUDIO2.paused) {
        playBackgroundAudio();
    }
    playAudio();
    cur_score += clickStrength;
    SCORETEXT.innerHTML = cur_score;
    checkUpgradability();
})

volumeBg.addEventListener("change", function(e) {
    AUDIO1.volume = e.currentTarget.value / 100;
    AUDIO2.volume = e.currentTarget.value/100;
})

volumeClick.addEventListener("change", function(e) {
    clickAudio.volume = e.currentTarget.value / 100;
})

function playBackgroundAudio(){
    console.log("Playing background audio");
    AUDIO1.play().then(() => {
        console.log("AUDIO1 started");
    }).catch(error => {
        console.error("AUDIO1 play error:", error);
    });

    AUDIO1.addEventListener('ended', () => {
        AUDIO2.play().then(()=>{
            console.log("Playing audio 2")
        }).catch(error => {
            console.error("Audio 2 play error:", error)
        });
    });

    AUDIO2.addEventListener('ended', ()=>{
        AUDIO1.play().then(() => {
            console.log("AUDIO1 started");
        }).catch(error => {
            console.error("AUDIO1 play error:", error);
        });
    });
}

function checkUpgradability(){
    if (cur_score >= upgrade_amount){
        UPGRADEBTN.disabled = false;
        UPGRADEBTN.classList.remove("btn-disabled")
    }
}

function upgradeClicks(){
    clickStrength*=2;
    upgrade_amount *= 5;
    UPGRADETEXT.innerHTML = upgrade_amount;
    UPGRADEBTN.disabled = true;
    UPGRADEBTN.classList.add("btn-disabled")
    topLocation = Math.floor(Math.random()*96);
    leftLocation = Math.floor(Math.random()*96);
    imgID += 1
    randImageLoc.innerHTML += `<img src="img/konatagoodjob.png" style="position: absolute;top: ${topLocation}%;left: ${leftLocation}%;z-index: 1;pointer-events: none;" height="50" width="50" id="konata-random-img-${imgID}">`
}

function playAudio(){
    clickAudio.play();
}
