const all_box = document.getElementsByClassName("box");

const selectedElemet = [];

for(const x of all_box) {
    x.addEventListener("click", ()=>{
        const activeID = x.getAttribute("id");
        const innerHTML = document.getElementById(activeID).innerHTML;

        if(selectedElemet.length>0) {
            selectedElemet[0].removeAttribute("style");
            selectedElemet.length=0;
        }

        if(innerHTML.includes('pieces')){
            document.getElementById(activeID).style.backgroundColor = '#5293bb';
            selectedElemet.push(x);
            // console.log(activeID);
        }
    });
}