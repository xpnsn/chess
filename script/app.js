const gameBoard=document.querySelector('.container');

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
            square.classList.add('white');
        } else {
            square.classList.add('black');
        }
        y++;
        if((i+1)%8 === 0) {
            y++;
        }
        if(x != ''){
            square.firstChild.setAttribute('draggable', true)
        }
        square.setAttribute("id", boxId[i]);
        gameBoard.append(square);
    })
}
createBoard();

const allBox = document.querySelectorAll('.container .box');

// console.log(allBox);

allBox.forEach(ele => {
    ele.addEventListener('dragstart', dragStart);
    ele.addEventListener('dragover', dragOver);
    ele.addEventListener('drop', dragDrop);
});

let startID;
let draggedEle;

function dragStart(i) {
    startID = i.target.parentNode.parentNode.id;
    draggedEle = i.target.parentNode;
    console.log(startID)
    console.log(draggedEle)
}

function dragOver(i) {
    i.preventDefault();
}

function dragDrop(i) {
    i.stopPropagation()
    console.log(i.target);
    i.target.append(draggedEle);
}