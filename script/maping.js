// console.log("hello");
const arrayOfFiles = document.getElementsByClassName("files");

const filesNameArray = ["a", "b", "c", "d", "e", "f", "g", "h"];

console.log()

let file=0;

for(const i of arrayOfFiles) {
    let rank=8;

    for(const ele of i.children) {
        ele.setAttribute("id", filesNameArray[file]+rank);
        // console.log(ele);
        rank--;
    }
    file++;
}