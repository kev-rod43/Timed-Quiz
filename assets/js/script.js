let initial = document.querySelector("#initial");
let questionCard = document.getElementsByClassName("question-card");
let startButton = document.querySelector("#start-button");
let time = document.querySelector("#timer-value");
startButton.addEventListener("click", timedQuiz)

function timedQuiz(){

    let seconds = 10;

    let  timer =  setInterval(function(){
        if (seconds >0){
            seconds -= 1;
            time.textContent = seconds;
        }
        else{
            time.textContent = "";
            clearTimeout(timer)
        }
    }, 1000)

}
console.log(initial, questionCard, startButton)