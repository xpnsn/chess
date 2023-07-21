const gameBoard=document.querySelector('.container');
let currentPlayer = 'white';


const initialBoard = [
    brook, bknight, bbishop, bqueen, bking, bbishop, bknight, brook,
    bpawn, bpawn, bpawn, bpawn, bpawn, bpawn, bpawn, bpawn, 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '', 
    wpawn, wpawn, wpawn, wpawn, wpawn, wpawn, wpawn, wpawn, 
    wrook, wknight, wbishop, wqueen, wking, wbishop, wknight, wrook
]

const boxId=[];

for(let i=8; i>0; i--) {
    for(let j=97; j<105; j++) {
        boxId.push(String.fromCharCode(j)+i);
    }
}


// console.log(initialBoard);
let y=0;

function createBoard() {
    initialBoard.forEach((x, i)=>{
        const square = document.createElement('div');
        square.classList.add('box');
        square.innerHTML = x;
        if(y%2 === 0) {
            square.classList.add('light-square');
        } else {
            square.classList.add('dark-square');
        }
        y++;
        if((i+1)%8 === 0) {
            y++;
        }
        if(x != ''){
            square.firstChild.setAttribute('draggable', true);
        }
        square.setAttribute("id", boxId[i]);
        gameBoard.append(square);
    })
}
createBoard();

const allBox = document.querySelectorAll('.box');

// console.log(allBox);

allBox.forEach(ele => {
    // console.log(ele)
    ele.addEventListener('dragstart', dragStart);
    ele.addEventListener('dragover', dragOver);
    ele.addEventListener('drop', dragDrop);
});

let startID;
let draggedEle;

function dragStart(i) {
    // console.log(i);
    // i.dataTransfer.setData('text/plain', pieceId);
    startID = i.target.parentNode.id;
    draggedEle = i.target;


    // console.log(startID)
    // console.log(draggedEle)
}

function dragOver(i) {
    i.preventDefault();
}

function dragDrop(i) {
    i.stopPropagation();

    i.target.append(draggedEle);
    
    const taken = i.target.classList.contains('pieces');
    const correctMove = i.target.firstChild.classList.contains(currentPlayer);
    const opponentGo = currentPlayer === 'white' ? 'black' : 'white';
    const takenByOpponent = i.target.firstChild.classList.contains(opponentGo);
    
    if(correctMove) {
        if(takenByOpponent) {

        }
    }

    console.log(opponentGo);
    changePlayer();
    console.log(i.target.firstChild);
}

function changePlayer() {
    if(currentPlayer === "white") {
        currentPlayer = "black";
    } else {
        currentPlayer === "white";
    }
}