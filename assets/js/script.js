let goToHighScores = document.querySelector("#go-to-high-scores");
goToHighScores.style.cursor = "pointer";
goToHighScores.addEventListener("click", createHighScoreLines);

let main = document.querySelector("main");
let footer = document.querySelector("footer");
let initial = document.querySelector("#initial");
let final = document.querySelector("#final");
let currentScore = document.querySelector("#current-score");
let highScoresCard = document.querySelector("#high-scores-card");
let submitScore = document.querySelector("#submit-score");
let questionCard = document.getElementsByClassName("question-card");
let startButton = document.querySelector("#start-button");
let time = document.querySelector("#timer-value");
let wrongAnswers = document.getElementsByClassName("wrong-answer");
let rightAnswers = document.getElementsByClassName("right-answer");

//loads local data for the high scores if it exists.
let savedHighScores= new Object;
if (JSON.parse(localStorage.getItem("saved-high-scores"))!==null){
    savedHighScores= JSON.parse(localStorage.getItem("saved-high-scores"));
}

main.replaceChildren(initial)

document.querySelector("#home").addEventListener("click", function(){location.reload()})

document.querySelector("#erase-high-scores").addEventListener("click", function(){
    localStorage.removeItem("saved-high-scores"); 
    location.reload();
})
//turns object into array, sorts array in descending order, then creates a h2 element with initials and score for each highscore.
function createHighScoreLines(){
    let h2Element = document.createElement("h2")
    let sortedHighScores = Object.entries(savedHighScores).sort((a, b) => b[1] - a[1]);
    localStorage.setItem("saved-high-scores",JSON.stringify(savedHighScores));
    for (i=0; i<sortedHighScores.length; i++){
        tempElement = h2Element.cloneNode(h2Element)
        tempElement.textContent = sortedHighScores[i][0] + ": " + sortedHighScores[i][1];
        document.querySelector("#high-scores-list").appendChild(tempElement);
        document.querySelector("header").textContent="";
    }
    main.replaceChildren(highScoresCard);
}

startButton.addEventListener("click", timedQuiz)

function timedQuiz(){
    
    main.replaceChildren(questionCard[0])

    let score = 0;
    
    let seconds = 70;
    
    let  timer =  setInterval(function(){
        if (seconds >0){
            seconds -= 1;
            time.textContent = seconds;
        }
        else{
            time.textContent = "";
            main.replaceChildren(final)
            currentScore.textContent = "Score:" + score;
            clearTimeout(timer)
        }
    }, 1000)
    
    //adds the event listeners to each element in the classes
    for (i=0; i<wrongAnswers.length;i++){
        wrongAnswers[i].addEventListener("click", wrongResponse)
        wrongAnswers[i].style.cursor = "pointer";
    }
    for (i=0; i<rightAnswers.length;i++){
        rightAnswers[i].addEventListener("click", rightResponse)
        rightAnswers[i].style.cursor = "pointer";
    }

    //subtracts time for every question wrong and displays the next question
    function wrongResponse(){
        seconds -= 10;
        if (questionCard.length>1){
            main.replaceChildren(questionCard[1])
            footer.textContent = "Wrong!";
        } else {
            currentScore.textContent = "Score:" + score;
            seconds = 0;
            main.replaceChildren(final);
            footer.textContent = "Wrong!";
            setTimeout ( function(){footer.textContent = "";}, 2000)
        }
    }

    //adds point for every question right and displays the next question
    function rightResponse(){
        score += 1;
        if (questionCard.length>1){
            main.replaceChildren(questionCard[1])
            footer.textContent = "Correct!";
        } else {
            currentScore.textContent = "Score:" + score;
            seconds = 0;
            main.replaceChildren(final);
            footer.textContent = "Correct!";
            setTimeout ( function(){footer.textContent = "";}, 2000)
        }
    }

//validates the highscore submission, and populates the highscores in the highscore card
    submitScore.addEventListener("click", function(event){
        let initials = document.querySelector("#initials").value.toUpperCase();
        event.preventDefault();
        
        if (!(isNaN(initials) && initials.length==2)){
            alert("Your initials must be 2 alpabetical Characters");
            return;
        }

        if (savedHighScores === null){
            
            savedHighScores[initials]= score;
            localStorage.setItem("saved-high-scores",JSON.stringify(savedHighScores));
            createHighScoreLines()

        } else if (!(initials in savedHighScores)) {
            savedHighScores[initials] = score;
            createHighScoreLines()
        } else if (confirm("These initials already exist, would you like to overwrite your previous score?")){
            savedHighScores[initials] = score;
            createHighScoreLines()
        } else {
            createHighScoreLines()
        }
})
}
