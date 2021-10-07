

////////////////////////////////////////////////////////
// 960 Chess Tests
////////////////////////////////////////////////////////

//Initialize game
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


//TEST 3: All pieces are on board
const sidePieceCount = {
    king: 1,
    queen: 1,
    bishop: 2,
    knight: 2,
    rook: 2,
    pawn: 8
}
let whitePieceCount = {
    king: 0,
    queen: 0,
    bishop: 0,
    knight: 0,
    rook: 0,
    pawn: 0
}
let blackPieceCount = {
    king: 0,
    queen: 0,
    bishop: 0,
    knight: 0,
    rook: 0,
    pawn: 0
}

CHESSAPP.GamePlay.pieces.forEach(piece => {
    if(piece.color === "B") blackPieceCount[piece.pieceType] += 1; 
    if(piece.color === "W") whitePieceCount[piece.pieceType] += 1; 
});


const areListsEqual = (list1, list2) => {
    let listsEqual = true;
    console.log(Object.keys(list1));
    Object.keys(list1).forEach(pieceType => {
        if(list1[pieceType] != list2[pieceType]) listsEqual = false;
    });
    return listsEqual;
}

//Assert test
try {
    document.getElementById("output").innerHTML +=(`All pieces are placed on board: &nbsp;`);
    unitjs.assert(areListsEqual(sidePieceCount, whitePieceCount) && areListsEqual(sidePieceCount, blackPieceCount));
    document.getElementById("output").innerHTML += "<span style='color: #239937;'>Test Passed</span></br>";
} catch(e) {
    document.getElementById("output").innerHTML += "<span style='color: #e64843;'>Test failed</span><br>";
}



//TEST 4: Other side reflects the same pieces
//Get first row
let firstRowPieces = [null, null, null, null, null, null, null, null];
CHESSAPP.GamePlay.pieces.forEach(piece => {
    if(piece.y === 7) firstRowPieces[piece.x] = piece;
});
//Get second row
let secondRowPieces = [null, null, null, null, null, null, null, null];
CHESSAPP.GamePlay.pieces.forEach(piece => {
    if(piece.y === 0) secondRowPieces[piece.x] = piece;
});


const areRowsSame = (firstRow, secondRow) => {
    rowsAreSame = true;
    firstRow.forEach((firstRowPiece, index) => {
        if(firstRowPiece.pieceType != secondRow[index].pieceType) rowsAreSame = false; 
    });
    return rowsAreSame;
}

//Assert test
try {
    document.getElementById("output").innerHTML +=(`Other side reflects pieces: &nbsp;`);
    unitjs.assert(areRowsSame(firstRowPieces, secondRowPieces));
    document.getElementById("output").innerHTML += "<span style='color: #239937;'>Test Passed</span></br>";
} catch(e) {
    document.getElementById("output").innerHTML += "<span style='color: #e64843;'>Test failed</span><br>";
}


////////////////////////////////////////////////////////
// Traditional Chess Tests
////////////////////////////////////////////////////////

//Initialize game
CHESSAPP.GamePlay.init(gameSettings);
document.querySelector("[data-mode='chess960']").click();
document.getElementById("output").innerHTML +=(`<b>Chess 960</b><br>`);