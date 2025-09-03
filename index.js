const user1score = 0;
const user2score = 0;
const computerscore = 0;
const user1score_span = document.getElementById("user1-score");
const user2score_span = document.getElementById("user2-score");
const computerscore_span = document.getElementById("computer-score");
const scoreboard_div = document.querySelector("score_board") 
const result_div = document.querySelector("result")
const rock_div = document.getElementById("r")
const paper_div = document.getElementById("p")
const scissors_div = document.getElementById("s")

function getcomputerchoice()
{
    const choices =("r","p","s")
    const randomnumber = Math.floor(math.random() * 3);
    return choices [randomnumber];
}

function game(user1choice) {
const computerchoice = getcomputerchoice();
console.log("user1 choice => " + user1choice);
console.log("computerchoice => " + computerchoice);
}

function main() {
    rock_div.addEventListener("click",function() {  
    game("r");
})
paper_div.addEventListener("click",function() {  
    game("p");
})
scissors_div.addEventListener("click",function() {  
    game("s");
})
}
main()