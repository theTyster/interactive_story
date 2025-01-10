"use strict";


//constructor used for showing and hiding objects. Uses the computed transition time as the timer for sleeping the integrated promise.
export const displayFunc = function(tag) {
  this.tag = document.querySelector(tag),
    this.show = async function({sec = 1, rel = true, disp = "block"} = {}){
      this.tag.style.display = disp;
    if (rel)
      this.tag.style.position = "relative";
    if (!rel)
      this.tag.style.position = "absolute";
    await sleep(sec * 1);
    },
  this.hide = async function(sec = .5){
    this.tag.style.display = "none";
    await sleep(sec * 1);
  }
};


// custom sleep function.
export const sleep = time => new Promise(resolve => setTimeout(resolve, time * 1000));


//PAGE TAGS
export const page = {
  //Unilateral Tags
  border: document.querySelector("#app"),
  lightGreenBG: "#B3DCBD",
  container: document.querySelector(".container"),
  duckType: document.querySelectorAll(".duck_type"),
  friendType: document.querySelectorAll(".friend_type"),
  friendName: document.querySelectorAll(".friend_name"),
  helper: new displayFunc("#helper"),
  // Beginning Tags
}

export const beginningPage = {
  oneTime: new displayFunc("#oneTime"),
  startButton: new displayFunc("button#startButton"),
  hm:  new displayFunc("#hm"),
  no: new displayFunc("#no"),
  yes: new displayFunc("#yes"),
  phaseOne:{
    duckInlineInput: new displayFunc("span.inline"),
    duckWhatColor: new displayFunc("#whatColor"),
  },
  phaseTwo:{
    body: new displayFunc("div.phaseTwo"),
    where: new displayFunc("#where"),
    letsSee: new displayFunc("#letsSee"),
    eyes: new displayFunc("#eyes"),
    ah: new displayFunc("#ah"),
    thereSheIs: new displayFunc("#thereSheIs"),
    splashing: new displayFunc("#splashing"),
  },
  phaseThree:{
    body: new displayFunc("div.phaseThree"),
    chooseAFriend: new displayFunc("#chooseAFriend"),
    tryAgain: new displayFunc("#tryAgain"),
    friendDeclare: new displayFunc("#friend_declare"),
    friendNameCheck: new displayFunc(".input_name_check"),
    friendColorQuestion: new displayFunc("#friend_colorQuestion"),
    friendColorInput: new displayFunc("#friend_colorQuestion_input"),
    friendGoofy: new displayFunc("#friend_goofy"),
    friendLaugh: new displayFunc("#friend_laugh"),
    duckLaugh: new displayFunc("#duck_laugh"),
    rainStart: new displayFunc("#rain_start"),
    rainHowBad: new displayFunc("#rain_howBad"),
    rainInputNode: new displayFunc("#rain_input_node"),
    rainNotBad: new displayFunc("#notBad"),
    rainRangeInput: new displayFunc("input#rain_range"),
    rainReallyBad: new displayFunc("#reallyBad"),
    rainGetOut: new displayFunc("#rain_getOut"),
    rainHungry: new displayFunc("#rain_hungry"),
    eatChoose: new displayFunc("#eat_choose"),
  },
}

export const pizzaPage = {
  // Pizza Tags
  pizzaHeading: new displayFunc("#pizza_story"),
  visitPizza: new displayFunc("#visit_pizza"),
  pizzaFantastic: new displayFunc("#pizza_fantastic"),
  scream: new displayFunc("#scream"),
  karenWords1: new displayFunc("#karenWords1"),
  karenWords2: new displayFunc("#karenWords2"),
  karenWords3: new displayFunc("#karenWords3"),
  karenWords4: new displayFunc("#karenWords4"),
  karenWords5: new displayFunc("#karenWords5"),
  karenWords6: new displayFunc("#karenWords6"),
  mrFantastic: new displayFunc("#mrFantastic"),
  sorryGuys: new displayFunc("#sorry_guys"),
  leave: new displayFunc("#leave"),
  notFantastic: new displayFunc("#notFantastic"),
  duckNod: new displayFunc("#duck_nod"),
  sneaky: new displayFunc("#sneaky"),
  sneakyHow: new displayFunc("#sneaky_how"),
  startBand: new displayFunc("#start_band"),
  soundsAwesome: new displayFunc("#sounds_awesome"),
  musicPractice: new displayFunc("#music_practice"),
  finallyReady: new displayFunc("#finally_ready"),
  back4More: new displayFunc("#back_4_more"),
  songChoose: new displayFunc("#song_choose"),
  playButton: new displayFunc("#play_button"),
  pauseButton: new displayFunc("#pause_button"),
  ffwdButton: new displayFunc("#ffwd_button"),
  songPlaying: new displayFunc("#song_playing"),
  howGood: new displayFunc("#how_good"),
  songRatingSlide: new displayFunc("#song_rating_slide"),
  songReviewSliderInput: new displayFunc("input#song_review"),
  songRatingDisplay: new displayFunc("#song_rating_display"),
  rating: new displayFunc("#rating"),
  songPlayAgain: new displayFunc("#song_playAgain"),
  pizzaFinally: new displayFunc("#pizza_finally"),
  sneakInside: new displayFunc("#sneak_inside"),
  slipInTheBack: new displayFunc("#slip_in_the_back"),
  outback: new displayFunc("#outback"),
  pizzaWait: new displayFunc("#pizza_wait"),
  ninjaSneak: new displayFunc("#ninja_sneak"),
  YAY: new displayFunc("#YAY"),
  pizzaDance: new displayFunc("#pizza_dance"),
  pizzaEnd: new displayFunc("#pizza_end"),
  pizzaEndButtons: new displayFunc("#pizza_end_buttons"),
}

//tags to ascii graphics
export const ascii = {
  water: new displayFunc("#waterBody"),
  duck: new displayFunc("#duck"),
  frog: new displayFunc("#frog"),
  dog: new displayFunc("#dog"),
  hog: new displayFunc("#hog"),
  eggnog: new displayFunc("#eggnog"),
  animalsBlock: new displayFunc(".ascii_animals_block")
};

//declares the object for easter egg features.
export const bonusLevel = {}

//function to invert styles if easter egg is activated.
export const bonusEgg = function(){
  if (bonusLevel.enabled){
    const invert = "invert(100%)";
    page.border.style.background = "MidnightBlue";
    const selectorTexts = document.querySelectorAll(".bonus_egg");
    for (let i of selectorTexts)
      i.style.filter = invert;
  }
}

// Listens for Enter to be pressed before continuing.
export const listen4Enter = function(){
  return new Promise(resolve => {
    document.addEventListener("keyup", function enterInputListener(event){
      if (event.key === "Enter"){
        document.removeEventListener("keyup", enterInputListener);
        resolve();
      }
    });
  })
}

// guesses the local language from the browser.
export const getLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }
}

export const ranNumG = function(max){
  return Math.floor(Math.random() * max);
}


export const makeArray = function arrayFromMaxIndex(maxIndex, useKeysBool){
  if (useKeysBool){
    return [...Array(maxIndex).keys()].map(x => ++x);
  }
  else {
    return [...Array(maxIndex).keys()];
  }
}


export const shuffle = function fisherYatesArrayShuffler(inputArr){
  let applyShuffler = () => {
    let len = inputArr.length;
    while (len){
      let ran = ranNumG(len--);
      [inputArr[ran], inputArr[len]] = [inputArr[len], inputArr[ran]];
    }
    return inputArr;
  }
  return applyShuffler(...inputArr);
}



export const makeItRain = function(storminess) { // remember that the arg is a range 1-100.
  const hiddenRaindrops = 20;
  storminess = Math.floor(hiddenRaindrops*(storminess/100));
  const rainArray = shuffle(makeArray(storminess));
  const shuffledDrops = shuffle(makeArray(hiddenRaindrops, "Add 1"));

  let delayedRain = async () => {
    try {
      for (let rDropIteration = rainArray.length - 1; rDropIteration > -1; rDropIteration--){
        await sleep(1.77);
        let rainSelector = document.querySelector(`#rain_${shuffledDrops[rainArray[rDropIteration]]}`);
        rainSelector.style.display = "unset";
        rainSelector.style.opacity = 1;
      }
    }
    catch (e){
      console.log(e);
    }
  }
  delayedRain();
}


export const checkColorInput = async function checkInputForColor(inputSelector, asciiObj, transFunc){
  //inputSelector = The selector ID for the text input box being used to choose a color.
  //asciiObj = the ascii picture that the color is going to be applied to.
  //transFunc = the function which fires after the check is complete.

  //moves helper text to after the input box. If the input box is in an inline class.
  if (inputSelector.parentNode.classList.toString() === "inline"){
    inputSelector.parentNode.after(page.helper.tag);
    inputSelector.parentNode.after(page.hm.tag);
    inputSelector.parentNode.after(page.no.tag);
    inputSelector.parentNode.after(page.yes.tag);
  }
  else{
    inputSelector.after(document.querySelector("#helper"));
  }
  await listen4Enter(); // wait for enter to be hit after inputing the color
  page.helper.hide();

  //blocks the input while it is being checked.
  inputSelector.disabled = true;
  await page.hm.show(); 
  await page.hm.hide();

  // event listener verifies the input. If the transition on the input box occurred after colorizeAscii ran, then transitionend will detect it.
  inputSelector.addEventListener("transitionend", transFunc, {once: true});

  //Colors the Duck based on the input.
  //saves details to object and local storage.
  const colorizeAscii = (async () => {
    inputSelector.style.backgroundColor = inputSelector.value;
    asciiObj.color = inputSelector.value;
    asciiObj.tag.style.color = asciiObj.color;
    for (let i of asciiObj.typeSpans)
      i.style.color = asciiObj.color;

    //a little easter egg in case anyone puts in the same color that is used for the background later on.
    if (inputSelector.value === "paleTurquoise")
      bonusLevel.enabled = true;
  })();

  const inputRegex = /#/gu;
  // checks if the background color has a value.
  if (!inputSelector.style.backgroundColor){
    await page.no.show();
    await page.no.hide();
    inputSelector.disabled = false;
    checkColorInput(inputSelector, asciiObj);
  }
  //checks to ensure that no hex colors were used and that the duck is not colored white.
  switch(true){
    case inputSelector.style.backgroundColor === "white":
    case Boolean(inputSelector.value.match(inputRegex)):{
      await page.no.show();
      await page.no.hide();
      inputSelector.disabled = false;
      checkColorInput(inputSelector, asciiObj);
      break;
    }
  }
}
