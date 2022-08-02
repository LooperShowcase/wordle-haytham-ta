const express = require("express");
const app = express();
const ourWord = "world";
const port = process.env.PORT || 3000
app.get("/wordle/:guess", function (req, res) {
  let ourWordMap = {
    w: 1,
    o: 1,
    r: 1,
    l: 1,
    d: 1,
  };
  let resArr = ["", "", "", "", ""];
  const word = req.params.guess.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ourWord[i]) {
      resArr[i] = "green";
      let curLtter = ourWord[i];
      ourWordMap[curLtter]--;
    }
  }
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== ourWord[i]) {
      let curLtter = word[i];
      if (ourWordMap[curLtter] > 0) {
        resArr[i] = "orange";
        ourWordMap[curLtter]--;
      } else {
        resArr[i] = "gray";
      }
    }
  }
  res.send(resArr);
});
app.use(express.static("public"));
app.listen(port, () => {
  console.log("server is up");
});
