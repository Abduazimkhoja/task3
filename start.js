const secure = require("./secure");
const whoWon = require("./whoWon");
const helpTable = require("./helpTable");
const prompts = require("prompts");

const moves = process.argv.slice(2);

if (
   new Set(moves).size !== moves.length ||
   moves.length % 2 === 0 ||
   moves.length < 3
) {
   console.error(
      "Error: For a correct operation, it is required that the number of arguments is odd, they have no repetitions and the value of each argument is greater than or equal to 3"
   );
   process.exit(1);
}

async function game() {
   const computerMove = moves[Math.floor(Math.random() * moves.length)];
   const key = secure.generateKey();
   const hmac = secure.getHMAC(key, computerMove);

   console.log("HMAC:", hmac, "\nAvailable moves:");
   moves.forEach((move, i) => console.log(`${i + 1} - ${move}`));
   console.log("0 - exit");
   console.log("? - help");
   console.log("HMAC:", hmac);

   const response = await prompts({
      type: "text",
      name: "value",
      message: "Enter your move:",
      validate: (value) =>
         value === "?" || (+value > 0 && +value <= moves.length)
            ? true
            : `Please enter a number between 0 and ${moves.length} or '?'`,
   });

   if (response.value === 0) process.exit(0);
   else if (response.value === "?") {
      console.log(helpTable.infoTable(moves));
      game();
   } else {
      const playerMove = moves[response.value - 1];
      console.log(`Your move: ${playerMove}`);
      console.log(`PC move: ${computerMove}`);
      const result = whoWon.userStatus(moves, computerMove, playerMove);
      console.log(`You ${result}`);
      console.log(`HMAC key: ${key}`);
   }
}

game();
