"use strict";

// Problemer:
// Vi skal rodde med noget z-index så de 2-view modes ikke ligger i forlængelse af hinanden.
// Vi skal også sørger for at man ikke kan klikke på et "view" som ikke vises.

window.addEventListener("load", initApp);

let viewGrid = false;

async function initApp() {
  console.log(`ViewGrid:${viewGrid}`);

  const characters = await getJson();
  const sorted = sortCharacters(characters);

  //Buttons that switch between grid and table
  // document.qu erySelector("#tableView").addEventListener("click",runCharactersTable);
  document.querySelector("#viewBtn").addEventListener("click", resetButton);

  runShowCharacter(characters);
}

// VI SKAL RESETTE DET HELE...
function resetButton() {
  if (viewGrid == false) {
    viewGrid = true;
    document.querySelector("#viewBtn").textContent = "show Grid";

    characterTable.classList.remove("hidden");
    characterGrid.classList.add("hidden");
  } else if (viewGrid == true) {
    viewGrid = false;
    document.querySelector("#viewBtn").textContent = "show Table";

    //Hides the HTML table
    characterTable.classList.add("hidden");
    characterGrid.classList.remove("hidden");
  }
}

function updateView() {
  //Prevent btn presses.
  document.querySelector("#viewBtn").removeEventListener("click", resetButton);
  //Runs initApp - showing new view
  initApp();
}

function sortCharacters(characters) {
  // Soultuion found at https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
  // Sorts the array of objects by character.apperance from hihgest to lowest
  const sorted = characters.sort((a, b) =>
    a.appearances > b.appearances ? -1 : 1
  );
  return sorted;
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
  console.log("runShowCharaceres");
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
  const charaterTable = document.querySelector("#characterTable");
  const characterGrid = document.querySelector("#characterGrid");

  const gridHTML = /*html*/ `<article class=${ageColor} gird-item>
  <img src=${character["image"]}>
  <h2>${character["name"]}</h2>
  <p>Gender: ${character["gender"]}</p>
  <P>Nick Name: ${character["nickname"]}</P>
  <p>${phrase}</p>
  <p>Hair colour: ${character["hairColor"]}</p>
  <p>${character["name"]} is played by ${character["voicedBy"]}</p>
  </article>`;

  document
    .querySelector("#characterGrid")
    .insertAdjacentHTML("beforeend", gridHTML);
  document
    .querySelector("#characterGrid article:last-child")
    .addEventListener("click", characterClicked);

  //Shows the HTML table

  const tableHTML =
    /*html*/
    `<tr>
  <td class = image_style ><img src=${character["image"]}/></td>   
  <td>${character["name"]}</td>
  <td>${character["gender"]}</td>
  <td>${character["nickname"]}</td>
  <td>${phrase}</td>
  <td>${character["hairColor"]}</td>
  <td>${character["voicedBy"]}</td>
</tr>`;

  document
    .querySelector("#characterTable")
    .querySelector("tbody")
    .insertAdjacentHTML("beforeend", tableHTML);

  document
    .querySelector("#characterTable tbody tr:last-child")
    .addEventListener("click", characterClicked);

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
