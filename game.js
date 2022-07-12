const colors = ["green", "red", "yellow", "blue"];
const sounds = ["sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3", "sounds/blue.mp3", 
                "sounds/wrong.mp3"];
let uesrPattern = [];
let seq = [];
let isExecuting = false;

let audioPlayer = (i) => {
    let sound = new Audio(sounds[i]);
    sound.play();
}

$(".btn").on("click", (e) => {
    if (isExecuting == false) {
        console.log("i got clicked");
        $(e.target).addClass("pressed");
        for(let i = 0; i < 4; i++){
            if($(e.target).hasClass(colors[i])){
                audioPlayer(i);
            }
        }
        setTimeout(() => {
            $(e.target).removeClass("pressed");
        }, 200);
        uesrPattern.push(parseInt($(e.target).attr("id")))
        let head = $("h1").text();
        let curLevel = parseInt(head.slice(head.length - 1));
        if (check() == false) {
            $("h1").text(`You Lose! You reached level ${curLevel}`);
            audioPlayer(4);
        }
        else if (uesrPattern.length == seq.length) {
            setTimeout(() => {
                gameHandler(curLevel + 1);
            }, 1000);
            uesrPattern = [];
        }
    }
})

let randSeq = (n) => {
    let seq = [];
    for (let i = 0; i < n; i++) {
        let num = Math.random();
        num = num * 4;
        num = Math.floor(num);
        seq.push(num);
    }
    return seq;
}

const delay = async (ms = 1000) =>
    new Promise(resolve => setTimeout(resolve, ms))

async function showPattern(seq) {
    isExecuting = true;
    for (let i = 0; i < seq.length; i++) {
        $($(".btn")[seq[i]]).addClass("pressed");
        for(let j = 0; j < 4; j++){
            if($($(".btn")[seq[i]]).hasClass(colors[j])){
                audioPlayer(j);
            }
        }
        await delay(300);
        $($(".btn")[seq[i]]).removeClass("pressed");
        await delay(300);
    }
    isExecuting = false;
}

let gameHandler = (n) => {
    $("h1").text(`Level ${n}`);
    seq = randSeq(n);
    console.log(n);
    console.log(seq);
    showPattern(seq);
}

let check = () => {
    console.log(uesrPattern);
    console.log(seq);
    if (uesrPattern[uesrPattern.length - 1] != seq[uesrPattern.length - 1]) {
        return false;
    }
    else {
        return true;
    }
}

$(document).on("keypress", () => {
    seq = [];
    uesrPattern = [];
    gameHandler(1);
})