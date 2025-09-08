let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let message = document.querySelector("#message");
let choose = document.querySelector(".chooseType");

let turnX = true;

// Winning patterns
const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];




// Reset the board
function resetBoard() {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    message.innerText = "Choose your player type"; 
}

// Show winner message
function showWiner() {
    if (turnX) {
        message.innerText = "Congratulations Player O is Winner";
    } else {
        message.innerText = "Congratulations Player X is Winner";
    }
    
    setTimeout(() => {
        document.querySelector(".message").classList.add("hidden");
    }, 4000);
    choose.classList.remove("hidden");
    document.querySelector(".container").classList.add("disabled");
}




// Check for a winner
function checkWiner() {
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[b].innerText === boxes[c].innerText
        ) {
            showWiner();
            return;
        } else if (    // Check for draw
            pattern === winpatterns[3] &&
            boxes[a].innerText !== "" &&
            boxes[b].innerText !== "" &&
            boxes[c].innerText !== ""
        ) {         // Last pattern checked
            message.innerText = "It's a Draw Match!";
            document.querySelector(".message").classList.remove("hidden");
            setTimeout(() => {
                document.querySelector(".message").classList.add("hidden");
            }, 4000);
            choose.classList.remove("hidden");
            document.querySelector(".container").classList.add("disabled");
            return;
        }
    }
}




// Choose player type
choose.addEventListener("click", (e) => {
    if (e.target.id === "X") {
        resetBoard();
        turnX = true;
    } else if (e.target.id === "O") {
        resetBoard();
        turnX = false;
    }
    choose.classList.add("hidden");
    document.querySelector(".message").classList.remove("hidden");
    message.innerText = `Player ${turnX ? "X" : "O"}'s turn`;
    
    document.querySelector(".container").classList.remove("disabled");
});




// Add click event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
       if (turnX){
        box.innerText = "X";
        turnX = false;
        message.innerText = "Player O's turn";
       } else {
        box.innerText = "O";
        turnX = true;
        message.innerText = "Player X's turn";
       }
    box.disabled = true;

    checkWiner();
    });
});




// Add click event listener to reset button
reset.addEventListener("click", () => {
    resetBoard();
    choose.classList.remove("hidden");
    document.querySelector(".container").classList.add("disabled");
    message.innerText = "Choose your player type";
});
document.querySelector(".container").classList.add("disabled");
message.innerText = "Choose your player type"; 
document.querySelector(".message").classList.remove("hidden");
choose.classList.remove("hidden");
resetBoard();
