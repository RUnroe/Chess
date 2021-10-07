
// document.getElementById("output").innerHTML += Object.keys(unitjs.string("example"));
// console.log(unitjs.string("example"));
// document.getElementById("output").innerHTML += (unitjs.string(5) === null ? "Test Passed" : "Test Failed");

CHESSAPP.GamePlay.init(gameSettings);
document.querySelector("[data-mode='chess960']").click();
document.getElementById("output").innerHTML +=(`<b>Chess 960</b><br>`);

//TEST 1: Both Bishops are placed on opposite colors
//Find pieces
let evenWBishop, oddWBishop;
CHESSAPP.GamePlay.pieces.forEach(piece => {
    if(piece.y === 7 && piece.pieceType === "bishop") {
        if(piece.x % 2 === 0) evenWBishop = piece;
        else oddWBishop = piece;
    }
});
//Assert test
try {
    document.getElementById("output").innerHTML +=(`Bishops are on opposite colors: &nbsp;`);
    unitjs.assert(evenWBishop.x % 2 != oddWBishop.x % 2);
    document.getElementById("output").innerHTML += "<span style='color: #239937;'>Test Passed</span></br>";
} catch(e) {
    document.getElementById("output").innerHTML += "<span style='color: #e64843;'>Test failed</span><br>";
}



//TEST 2: King inbetween rooks
//get pieces from board
let leftWRook, rightWRook, wKing;
CHESSAPP.GamePlay.pieces.forEach(piece => {
    if(piece.pieceType === "king" && piece.y === 7) wKing = piece;
});
CHESSAPP.GamePlay.pieces.forEach(piece => {
    if(piece.pieceType === "rook" && piece.y === 7) {
        if(piece.x < wKing.x) leftWRook = piece;
        else rightWRook = piece;
    }
});
//Assert test
try {
    document.getElementById("output").innerHTML +=(`King inbetween rooks: &nbsp;`);
    unitjs.assert(leftWRook.x < wKing.x && wKing.x < rightWRook.x);
    document.getElementById("output").innerHTML += "<span style='color: #239937;'>Test Passed</span></br>";
} catch(e) {
    document.getElementById("output").innerHTML += "<span style='color: #e64843;'>Test failed</span><br>";
}


