const number_of_words = 6;
const number_of_char = 5;

let words = document.getElementById("container");

for (let i = 0; i < number_of_words; i++) {
  let singleword = document.createElement("div");
  singleword.className = "word";
  for (let j = 0; j < number_of_char; j++) {
    let singlechar = document.createElement("div");
    singlechar.className = "char";
    singleword.appendChild(singlechar);
  }
  words.appendChild(singleword);
}

let curentwORD = 0;
let curentChar = 0;
document.addEventListener("keydown", async function (event) {
  if (event.key === "Backspace") {
    if (curentChar > 0) {
      let wordDiv = words.children[curentwORD];
      let CharToDelete = wordDiv.children[curentChar - 1];
      CharToDelete.innerHTML = "";
      curentChar--;
      animateCSS(wordDiv, "jello");
    }
  } else {
    if (event.key === "Enter") {
      if (curentChar === 5) {
        let wordDiv = words.children[curentwORD];
        animateCSS(wordDiv, "wobble");
        const word = getWord();
        const results = await (await fetch("/wordle/" + word)).json();
        for (let i = 0; i < results.length; i++) {
          wordDiv.children[i].style.backgroundColor = results[i];
        }
        curentwORD++;
        curentChar = 0;
      }
    } else if (curentChar < 5 && isletter(event.key)) {
      let wordDiv = words.children[curentwORD];
      let charDiv = wordDiv.children[curentChar];

      charDiv.innerHTML = event.key.toUpperCase();
      curentChar++;
    }
  }
});

function getWord() {
  let word = "";
  let myGuess = words.children[curentwORD];
  for (let i = 0; i < myGuess.children.length; i++) {
    word = word + myGuess.children[i].innerHTML;
  }
  return word;
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

function isletter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
