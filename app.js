"use strict";

window.addEventListener("load", initApp);

const notAllowed = ["null", "undifined"];
let viewGrid = false;

function initApp() {
  console.log("initApp");

  //Buttons that switch between grid and table
  // document.querySelector("#tableView").addEventListener("click",runCharactersTable);
  document
    .querySelector("#viewBtn")
    .addEventListener("click", runCharactersGrid);

  runCharactersGrid();
}

// VI SKAL RESETTE DET HELE...
function resetButton() {
  if ((viewGrid = false)) {
    viewGrid = true;
    document.querySelector("#viewBtn").textContent = "show Grid";
  } else if ((viewGrid = true)) {
    viewGrid = false;
    document.querySelector("#viewBtn").textContent = "show Table";
  }
}

// document
//   .querySelector("#viewBtn")
//   .removeEventListener("click", runCharactersGrid);

async function runCharactersGrid() {
  resetButton();

  const characters = await getJson();

  // Soultuion found at https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
  // Sorts the array of objects by character.apperance from hihgest to lowest
  const sorted = characters.sort((a, b) =>
    a.appearances > b.appearances ? -1 : 1
  );
  runShowCharacter(sorted);
}

// Fetches the json objects
async function getJson() {
  const promise = await fetch(
    "https://cederdorff.github.io/dat-js/05-data/southpark.json"
  );
  const figures = await promise.json();

  return figures;
}

//Loops every object in the json array and calls showCharacter.
function runShowCharacter(characters) {
  for (let index = 0; index < characters.length; index++) {
    const person = characters[index];
    showCharacter(person);
  }
}

//Returns a value responding to classes for css styling, depending on character age.
function checkAge(character) {
  const age = character["age"];
  let setClass;
  if (age < 13) {
    setClass = "ageChild";
  } else if (age < 29) {
    setClass = "ageYoung";
  } else if (age < 49) {
    setClass = "ageAdult";
  } else setClass = "ageSenior";

  return setClass;
}

// Creates the HTML element for the character
function showCharacter(character) {
  const ageColor = checkAge(character);
  const phrase = catchPhraseContent(character);

  // html = this or that...´
  let myHTML;
  let charaterTable = document.querySelector("#characterTable");

  if (viewGrid == true) {
    //Hides the HTML table
    charaterTable.classList.add("hidden");

    myHTML = /*html*/ `<article class=${ageColor}>
  <img src=${character["image"]}>
  <h2>${character["name"]}</h2>
  <p>Gender: ${character["gender"]}</p>
  <P>Nick Name: ${character["nickname"]}</P>
  <p>${phrase}</p>
  <p>Hair colour: ${character["hairColor"]}</p>
  <p>${character["name"]} is played by ${character["voicedBy"]}</p>
  </article>`;

    document
      .querySelector("#characters")
      .insertAdjacentHTML("beforeend", myHTML);
    document
      .querySelector("#characters article:last-child")
      .addEventListener("click", characterClicked);
  } else if (viewGrid == false) {
    //Shows the HTML table
    charaterTable.classList.remove("hidden");
    myHTML =
      /*html*/
      `<tr>
  <td class = image_style ><img src=${character["image"]}/></td>   
  <td>${character["name"]}</td>
  <td>Gender: ${character["gender"]}</td>
  <td>Nick Name: ${character["nickname"]}</td>
  <td>${phrase}</td>
  <td>Hair colour: ${character["hairColor"]}</td>
  <td>${character["name"]} is played by ${character["voicedBy"]}</td>
</tr>`;

    document
      .querySelector("#characterTable")
      .querySelector("tbody")
      .insertAdjacentHTML("beforeend", myHTML);

    document
      .querySelector("#characterTable tbody tr:last-child")
      .addEventListener("click", characterClicked);
  }

  // NB: Man kan også bruge et Call Back istedet for Modal Function...

  // NESTED FUNCTION STARTS HERE!
  // Connects the character info to the DIALOG HTML elements
  function characterClicked() {
    console.log("Clicked");

    const dialog = document.querySelector("dialog");
    dialog.setAttribute("data-theme", ageColor);
    dialog.showModal();

    // Hard coded
    document.querySelector("#dialogImage").src = character.image;
    document.querySelector(
      "#dialogName"
    ).textContent = `Name: ${character.name}`;
    document.querySelector(
      "#dialogGender"
    ).textContent = `Gender: ${character.gender}`;
    document.querySelector("#dialogPhrase").textContent = phrase;
    document.querySelector(
      "#dialogNickname"
    ).textContent = `Nickname:  ${character.nickname}`;
    document.querySelector(
      "#dialogOccupation"
    ).textContent = `Occupation ${character.occupation}`;
    document.querySelector("#dialogAge").textContent = `Age: ${character.age}`;
    document.querySelector(
      "#dialogReligion"
    ).textContent = `Religion: ${character.religion}`;
    document.querySelector(
      "#dialogHair"
    ).textContent = `Hair Color: ${character.hairColor}`;
    document.querySelector(
      "#dialogGrade"
    ).textContent = `Garde: ${character.schoolGrade}`;
    document.querySelector(
      "#dialogEpisodes"
    ).textContent = `Appears in following epidoes: ${character.episodes}`;
    document.querySelector(
      "#dialogApperances"
    ).textContent = `Features in ${character.appearances} episodes`;
    document.querySelector(
      "#dialogFirstApperance"
    ).textContent = `First episode: ${character.firstAppearance}`;

    document.querySelector("#dialogCharacter").showModal();
  }
}

// Checks if the value is null or not, returns different strings based on the result
function catchPhraseContent(character) {
  let output = "";
  //Lav catchphrase til en string.
  const phrase = `${character.catchPhrase}`;
  console.log(phrase);
  if (phrase != "null") {
    output = `Catchphrase:  ${character.catchPhrase}`;
  } else {
    output = `${character.name} has no catch phrase`;
  }
  return output;
}

// character.catchPhrase === null ? console.log("false") : console.log("true");

// function test();
