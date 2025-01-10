document.addEventListener("DOMContentLoaded", ()=>{

  //UTILS
  const newElem = (elem)=>document.createElement(elem);
  const select = (elem)=> document.querySelector(elem);
  const selectAll = (elem)=> document.querySelectorAll(elem);
  const sleep = (s) => new Promise((r)=> setTimeout(()=> r(), s *1000));
  const shuffle = (array)=>{
    let count = array.length;
    while(count){
      let ran = Math.floor(Math.random() * count--);
      [array[ran], array[count]] = [array[count], array[ran]]
    }
    return array;
  }

  //PAGE TAGS
  const page = {
    gameContainer: select("#game"),
  }

  //Objects/Arrays
  const covers = [
    "cards/Adventure_Time:_Marceline_and_the_Scream_Queens_Issue_1_item_0_full.jpg",
    "cards/Adventure_Time:_Summer_Special_2013_Issue_1_item_4_full.jpg",
    "cards/Adventure_Time:_The_Flip_Side_Issue_4_item_3_full.jpg",
    "cards/Issue_10_item_5_full.jpg",
    "cards/Issue_2_item_1_full.jpg",
    "cards/Issue_2_item_2_full.jpg",
    "cards/Issue_2_item_4_full.jpg",
    "cards/Issue_4_item_1_full.jpg",
    "cards/Adventure_Time:_Marceline_and_the_Scream_Queens_Issue_1_item_0_full.jpg",
    "cards/Adventure_Time:_Summer_Special_2013_Issue_1_item_4_full.jpg",
    "cards/Adventure_Time:_The_Flip_Side_Issue_4_item_3_full.jpg",
    "cards/Issue_10_item_5_full.jpg",
    "cards/Issue_2_item_1_full.jpg",
    "cards/Issue_2_item_2_full.jpg",
    "cards/Issue_2_item_4_full.jpg",
    "cards/Issue_4_item_1_full.jpg",
  ];

  const handleFirstCardClick = (firstEvent)=> {
    const first = firstEvent.target;
    if (first.localName !== "img" || first.style.filter === "none"){
      undefined;
    }
    else{
      first.style.filter = "unset";

      for (let image of page.images){
        if (image.style.filter !== "unset"){
          page.gameContainer.removeEventListener("click", handleFirstCardClick);


          page.gameContainer.addEventListener("click", async function handleSecondCardClick(secondEvent){
            const second = secondEvent.target;
            if (second.localName !== "img"){
              undefined;
            }
            else if (second.style.filter === "none"){
              first.style.filter = "";
              console.log("You did not do it.")
              page.gameContainer.removeEventListener("click",  handleSecondCardClick);
              page.gameContainer.addEventListener("click", handleFirstCardClick);
            }
            else{
                second.style.filter = "unset";
                await sleep(1);

                //MOMENT OF TRUTH
                if (first.src === second.src && (first.x !== second.x || first.y !== second.y)){
                  first.style.filter = "none";
                  second.style.filter = "none";

                  //COMPLETION CELEBRATION.
                  let foundImages = 0;
                  let pinata = {};
                  pinata[foundImages] = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  pinata[foundImages + 16] = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  pinata[foundImages + 32] = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                  for (let image of page.images){
                    if (image.style.filter === "none")
                      foundImages++;
                  }
                  if (foundImages === 16){
                    select(".confetti").style.display = "flex";
                    for (let confetti in pinata){
                      select(".confetti").append(pinata[confetti]);
                      pinata[confetti].setAttribute("width", 20);
                      pinata[confetti].setAttribute("height", 20);
                      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

                      path.setAttribute("d", `m0,0 l0,${Math.random() * 20 + 2} l${Math.random() * 20 + 2},${Math.random() * (-10) - 2} z`);
                      pinata[confetti].append(path);

                      //Styles
                      pinata[confetti].style.flex = 1;
                      setInterval(()=>{
                        path.style.fill = shimmer();
                      }, 1300);
                    }
                  }
                  console.log("you did it!")
                }
                else{
                  first.style.filter = "";
                  second.style.filter = "";
                  console.log("You did not do it.")
                }

                page.gameContainer.removeEventListener("click",  handleSecondCardClick);
                page.gameContainer.addEventListener("click", handleFirstCardClick);
              }
          }, {once: true})

        }
      }
    }
  }

  const shimmer = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = `rgb(${r}, ${g}, ${b})`
    return rgb;
  }

  const createDivsForCovers = function(coverArray) {
    for (let cover of coverArray) {

      let img = newElem("img");
      img.src = cover;

      // call a function handleCardClick when a div is clicked on
      page.gameContainer.addEventListener("click", handleFirstCardClick);

      // append the div to the element with an id of game
      page.gameContainer.append(img);

      page.images = selectAll("img");
    }
  }

  let shuffledCovers = shuffle(covers);

  createDivsForCovers(shuffledCovers);
})
