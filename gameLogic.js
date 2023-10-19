module.exports.userStatus = function (moves, computerMove, playerMove) {
   if (computerMove === playerMove) return "draw ✨";

   const index = moves.indexOf(playerMove);
   const half = Math.floor(moves.length / 2);
   const shiftedMoves = [
      ...moves.slice(index + 1),
      ...moves.slice(0, index + 1),
   ];

   return shiftedMoves.indexOf(computerMove) < half ? "win ✅" : "lose ❌";
};
