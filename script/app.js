const gameBoard=document.querySelector('.container');
let currentPlayer = "white";


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
    console.log(i.target);
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

    const taken = i.target.classList.contains('pieces');
    const correctMove = draggedEle?.classList.contains(currentPlayer);
    const opponent = currentPlayer === 'white' ? 'black' : 'white';
    const takenByOpponent = i.target?.classList.contains(opponent);

    if(taken && !takenByOpponent) {
        draggedEle.classList.add('shake')
        setTimeout(() => {
            draggedEle.classList.remove('shake')
        }, 300);
    }
    
    if(correctMove) {
        if(takenByOpponent) {
            i.target.parentNode.append(draggedEle);
            i.target.remove();
        } else {
            i.target.append(draggedEle)
            
        }
    }

    changePlayer();
}

function changePlayer() {
    if(currentPlayer === "black") {
        currentPlayer = "white";
    } else {
        currentPlayer = "black";
    }
}