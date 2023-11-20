let main = document.querySelector("main");
let initial = document.querySelector("#initial");
let final = document.querySelector("#final")
let questionCard = document.getElementsByClassName("question-card");
let startButton = document.querySelector("#start-button");
let time = document.querySelector("#timer-value");
let wrongAnswers = document.getElementsByClassName("wrong-answer");
let rightAnswers = document.getElementsByClassName("right-answer");

main.replaceChildren(initial)

startButton.addEventListener("click", timedQuiz)

function timedQuiz(){

    function wrongResponse(){
        seconds -= 10;
        if (questionCard.length>1){
            main.replaceChildren(questionCard[1])
        } else {
            main.replaceChildren(final)
        }
    }

function rightResponse(){
    if (questionCard.length>1){
        main.replaceChildren(questionCard[1])
    } else {
        main.replaceChildren(final)
    }
}

for (i=0; i<wrongAnswers.length;i++){
    wrongAnswers[i].addEventListener("click",wrongResponse)
    wrongAnswers[i].style.cursor = "pointer";
}

for (i=0; i<rightAnswers.length;i++){
    rightAnswers[i].addEventListener("click",rightResponse)
    rightAnswers[i].style.cursor = "pointer";
}

    main.replaceChildren(questionCard[0])

    let seconds = 70;

    let  timer =  setInterval(function(){
        if (seconds >0){
            seconds -= 1;
            time.textContent = seconds;
        }
        else{
            time.textContent = "";
            main.replaceChildren(final)
            clearTimeout(timer)
        }
    }, 1000)

}
console.log(main)