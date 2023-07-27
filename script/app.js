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
    // console.log(i.target);
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

    const valid = isValidMove(i.target, opponent);

    if(taken && !takenByOpponent && (!valid || !correctMove)) {
        draggedEle.classList.add('shake')
        setTimeout(() => {
            draggedEle.classList.remove('shake')
        }, 300);
    }
    
    if(correctMove && valid)  {
        if(takenByOpponent) {
            
            i.target.parentNode.append(draggedEle);
            i.target.remove();
            changePlayer();
            moveSound();
            
        } else if(i.target.classList.contains('box')){

            i.target.append(draggedEle);
            changePlayer();
            moveSound();
    
        }
        else if (taken){
        } 

    }
}

function changePlayer() {
    if(currentPlayer === "black") {
        currentPlayer = "white";
    } else {
        currentPlayer = "black";
    }
}

function isValidMove(target, opponent) {
    const endId = target.getAttribute('id') || target.parentNode.getAttribute('id');
    const piece = draggedEle.getAttribute('piece');
    // console.log(startID)
    // console.log(endId)
    console.log(piece)

    // console.log(document.querySelector(`[id="${endId}"]`)?.firstChild.classList.contains(opponent))



    switch(piece) {

        case 'pawn' :
            const startingRank = [2,7];
            if(draggedEle.classList.contains('white')) {

                if(
                    (startingRank.includes(Number(startID[1])) && startID.charCodeAt(0) === endId.charCodeAt(0) && target.classList.contains('box') && (Number(endId[1]) === Number(startID[1])+1 || Number(endId[1]) === Number(startID[1])+2)) || 
                    (Number(endId[1]) === Number(startID[1])+1 && startID.charCodeAt(0) === endId.charCodeAt(0) && target.classList.contains('box')) || 
                    (document.querySelector(`[id="${endId}"]`).firstChild && startID.charCodeAt(0)+1 === endId.charCodeAt(0) && Number(endId[1]) === Number(startID[1])+1) || 
                    (document.querySelector(`[id="${endId}"]`).firstChild && startID.charCodeAt(0)-1 === endId.charCodeAt(0) && Number(endId[1]) === Number(startID[1])+1)
                ) {
                    return true;
                } else {
                    false;
                } 

            } else if (draggedEle.classList.contains('black')) {

                if(
                    (startingRank.includes(Number(startID[1])) && startID.charCodeAt(0) === endId.charCodeAt(0) && target.classList.contains('box') && (Number(endId[1]) === Number(startID[1])-1 || Number(endId[1]) === Number(startID[1])-2)) || 
                    (Number(endId[1]) === Number(startID[1])-1 && startID.charCodeAt(0) === endId.charCodeAt(0)  && target.classList.contains('box')) ||
                    (document.querySelector(`[id="${endId}"]`).firstChild && startID.charCodeAt(0)+1 === endId.charCodeAt(0) && Number(endId[1]) === Number(startID[1])-1) || 
                    (document.querySelector(`[id="${endId}"]`).firstChild && startID.charCodeAt(0)-1 === endId.charCodeAt(0) && Number(endId[1]) === Number(startID[1])-1)
                ) {
                    return true;
                } else {
                    false;
                } 

            }
            break;

        case 'knight' :
            if(
                (startID.charCodeAt(0)+2 === endId.charCodeAt(0) && Number(endId[1])+1 === Number(startID[1])) ||
                (startID.charCodeAt(0)+2 === endId.charCodeAt(0) && Number(endId[1])-1 === Number(startID[1])) ||
                (startID.charCodeAt(0)-2 === endId.charCodeAt(0) && Number(endId[1])+1 === Number(startID[1])) ||
                (startID.charCodeAt(0)-2 === endId.charCodeAt(0) && Number(endId[1])-1 === Number(startID[1])) ||
                (Number(startID[1])+2 === Number(endId[1]) && startID.charCodeAt(0)+1 === endId.charCodeAt(0)) ||
                (Number(startID[1])+2 === Number(endId[1]) && startID.charCodeAt(0)-1 === endId.charCodeAt(0)) ||
                (Number(startID[1])-2 === Number(endId[1]) && startID.charCodeAt(0)+1 === endId.charCodeAt(0)) ||
                (Number(startID[1])-2 === Number(endId[1]) && startID.charCodeAt(0)-1 === endId.charCodeAt(0)) 
            ) {
                return true;
            } else {
                return false;
            }
            break;

        case 'bishop' :
            if(bishopMove(startID, endId, opponent)) {
                return true;
            } else {
                return false;
            }
            break;
        
        case 'rook' :
            if(rookMove(startID, endId)) {
                return true;
            } else {
                return false;
            }
            break;

        case 'queen' :
            if(bishopMove(startID, endId, opponent) || rookMove (startID, endId)) {
                return true;
            } else {
                return false;
            }
            break;
    }
}

// console.log(bishopMove)

function bishopMove(startID, endId, opponent) {
    console.log(opponent)
    let currentID = startID;
    let isValid = false;
    for(let i=1; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
        currentID = String.fromCharCode(startID.charCodeAt(0)+(1*(i-1))) + (Number(startID[1])+(1*(i-1)));
        if(
            ((String.fromCharCode(startID.charCodeAt(0)+(1*i)) + (Number(startID[1])+(1*i))) === endId && !document.querySelector(`[id="${currentID}"]`).firstChild)
        ) {
            isValid = true;
            break;
        }
    }

    if(!isValid) {

        for(let i=1; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
            currentID = (String.fromCharCode(startID.charCodeAt(0)-(1*(i-1))) + (Number(startID[1])+(1*(i-1))));
            console.log(currentID)
            if(
                ((String.fromCharCode(startID.charCodeAt(0)-(1*i)) + (Number(startID[1])+(1*i))) === endId && !document.querySelector(`[id="${currentID}"]`).firstChild)
            ) {
                isValid = true;
                break;
            }
        }

    }

    if(!isValid) {
        
        for(let i=1; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
            currentID = (String.fromCharCode(startID.charCodeAt(0)+(1*(i-1))) + (Number(startID[1])-(1*(i-1))));
            console.log(currentID)
            if(
                ((String.fromCharCode(startID.charCodeAt(0)+(1*i)) + (Number(startID[1])-(1*i))) === endId && !document.querySelector(`[id="${currentID}"]`).firstChild)
            ) {
                isValid = true;
                break;
            }
        }

    }

    if(!isValid) {

        for(let i=1; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
            currentID = (String.fromCharCode(startID.charCodeAt(0)-(1*(i-1))) + (Number(startID[1])-(1*(i-1))));
            console.log(currentID)
            if(
                ((String.fromCharCode(startID.charCodeAt(0)-(1*i)) + (Number(startID[1])-(1*i))) === endId && !document.querySelector(`[id="${currentID}"]`).firstChild) 
            ) {
                isValid = true;
                break;
            }
        }

    }

    return isValid;
}

function rookMove(startID, endId) {
    let currentID = startID;
    let isValid = false;
    for(let i=0; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
        currentID = String.fromCharCode(startID.charCodeAt(0)+i) + startID[1];
        if(currentID === endId && !document.querySelector(`[id="${currentID}"]`).firstChild) {
            isValid = true;
            break;
        }
    }

    if(!isValid) {
        for(let i=0; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
            currentID = String.fromCharCode(startID.charCodeAt(0)-i) + startID[1];
            if(currentID === endId && !document.querySelector(`[id="${currentID}"]`).firstChild) {
                isValid = true;
                break;
            }
        }
    }

    if(!isValid) {
        for(let i=0; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
            currentID = startID[0] + (Number(startID[0])+i);
            if(currentID === endId && !document.querySelector(`[id="${currentID}"]`).firstChild) {
                isValid = true;
                break;
            }
        }
    }

    if(!isValid) {
        for(let i=0; i<8 && 0 < Number(currentID[1]) < 9 && 96 < currentID.charCodeAt(0) < 105; i++) {
            currentID = startID[0] + (Number(startID[0])-i);
            if(currentID === endId && !document.querySelector(`[id="${currentID}"]`).firstChild) {
                isValid = true;
                break;
            }
        }
    }

    return isValid;
}

function moveSound() {
    let moveSFX = new Audio("/../miscellaneous/sounds/pieceMoveSound.mp3");
    moveSFX.play();
}