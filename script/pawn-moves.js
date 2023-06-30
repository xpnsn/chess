const arrayOfPawn = [];

for(const ele of filesNameArray) {
    arrayOfPawn.push(document.getElementById(ele + 7));
}

for(const ele of filesNameArray) {
    arrayOfPawn.push(document.getElementById(ele + 2));    
}

// console.log(arrayOfPawn);

for(const activeEle of arrayOfPawn) {
    activeEle.addEventListener("click", ()=>{
        
        const activeID = activeEle.getAttribute("id");
        
        let change = parseInt(activeID[1]);

        const pawnMoves = [];

        if(activeID[1] === "2") {
            for(let i=1; i<=2; i++) {
                change++;
                pawnMoves.push(document.getElementById(activeID[0] + change));
            }
        } else if (activeID[1] === "7") {
            for(let i=1; i<=2; i++) {
                change--;
                pawnMoves.push(document.getElementById(activeID[0] + change));
            }
        }
        // console.log(activeEle);
        highlightMoves(pawnMoves, activeEle);

    });

}

// pawnMoves.forEach(i => {
//     i.addEventListener("click", ()=>{
//         console.log(i);
//     })
// });

// const highlightMoves = function ([first, second]) {
//     let circle1 = document.createElement("div");
//     let circle2 = document.createElement("div");
    
//     circle1.setAttribute("class", "circle");
//     circle2.setAttribute("class", "circle");

//     first.appendChild(circle1);
//     second.appendChild(circle2);

//     first.classList.add("flex");
//     second.classList.add("flex");
// }

const trackMoves = [];

const highlightMoves = function(moves, activeEle) {

    if(trackMoves.length != 0){
        deleteTrack(trackMoves);
    }

    moves.forEach(ele => {
        ele.addEventListener("click", ()=>{
            ele.innerHTML = activeEle.innerHTML;
            activeEle.innerHTML="";
            const removeCircleElement = moves.filter((el)=> el!==ele );
            deleteTrack(removeCircleElement);
        })
        ele.innerHTML = `<div class="circle"> </div>`;
        ele.classList.add("flex");
        trackMoves.push(ele);
    });

};

const deleteTrack = function(moves) {
    moves.forEach(ele => {
        let containPieces = ele.innerHTML;
        if(!containPieces.includes("pieces")) 
        ele.innerHTML = "";
        ele.classList.remove("flex");
    });
};