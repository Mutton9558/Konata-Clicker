const SCORETEXT = document.querySelector("#score");
const TARGET = document.querySelector("#target-img");
const UPGRADETEXT = document.querySelector("#upgrade-amount");
const UPGRADEBTN = document.querySelector("#upgrade-btn");
const AUDIO1 = document.querySelector("#audio1");
const AUDIO2 = document.querySelector("#audio2");

var clickAudio = new Audio("momoi_nword.mp3");
var clickStrength = 1;
var cur_score = 0;
var upgrade_amount = 10;

TARGET.addEventListener("click", ()=>{
    if (AUDIO1.paused && AUDIO2.paused) {
        playBackgroundAudio();
    }
    playAudio();
    cur_score += clickStrength;
    SCORETEXT.innerHTML = cur_score;
    checkUpgradability();
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
}

function playAudio(){
    clickAudio.play();
}
