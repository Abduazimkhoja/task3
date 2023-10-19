const Table = require("cli-table3");

const chars = {
   top: "-",
   "top-mid": "+",
   "top-left": "+",
   "top-right": "+",
   bottom: "-",
   "bottom-mid": "+",
   "bottom-left": "+",
   "bottom-right": "+",
   left: "|",
   "left-mid": "+",
   mid: "-",
   "mid-mid": "+",
   right: "|",
   "right-mid": "+",
   middle: "|",
};

module.exports.getInfoTable = function (moves) {
   const table = new Table({
      head: ["v PC\\User >", ...moves],
      chars,
   });

   const half = (moves.length - 1) / 2;

   table.push(
      ...moves.map((item, i) => {
         let row = [item];
         row.push(
            ...moves.map((_, j) => {
               if (j === i) return "Draw";

               if (j <= i + half && j > i && i + half <= moves.length) {
                  return "Win";
               } else if (i + half < moves.length) {
                  return "Lose";
               }

               if (j >= i - half && j < i) return "Lose";
               else return "Win";
            })
         );
         return row;
      })
   );

   return table.toString();
};
