
////////////////////////////////////////////////////////
// Traditional Chess Tests
////////////////////////////////////////////////////////

//Initialize game
CHESSAPP.GamePlay.init(gameSettings);
document.querySelector("[data-mode='traditional']").click();
document.getElementById("output").innerHTML +=(`<b>Traditional</b><br>`);


//TEST 1: All pieces are on board
const allPiecesAreOnBoard = () => {
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
}
allPiecesAreOnBoard();

//TEST 2: Pieces are movable with proper constraints
const findPiece = (x,y) => {
    let found = false;
    CHESSAPP.GamePlay.pieces.forEach(piece => {
        console.log(piece);
        if(piece.y == y && piece.x == x) found = piece;
    });
    return found;
}
const validatePieceMove = () => {

    //move white pawn up
    document.querySelector(`div[data-x="6"][data-y="6"]`).click();
    document.querySelector(`div[data-x="6"][data-y="4"]`).click();


    //attempt to make invalid move: White moving again
    document.querySelector(`div[data-x="5"][data-y="6"]`).click();
    document.querySelector(`div[data-x="5"][data-y="4"]`).click();

    //move black pawn up
    document.querySelector(`div[data-x="6"][data-y="1"]`).click();
    document.querySelector(`div[data-x="6"][data-y="2"]`).click();

    //move white bishop
    document.querySelector(`div[data-x="5"][data-y="7"]`).click();
    document.querySelector(`div[data-x="7"][data-y="5"]`).click();


    //Assert test
    try {
        document.getElementById("output").innerHTML +=(`Pieces can move and are constrained properly: &nbsp;`);
        
        unitjs.assert(
            findPiece(6,4).pieceType === "pawn" &&
            !findPiece(5,4) &&
            findPiece(6,2).pieceType === "pawn" &&
            findPiece(7,5).pieceType === "bishop"
        );
        document.getElementById("output").innerHTML += "<span style='color: #239937;'>Test Passed</span></br>";
    } catch(e) {
        document.getElementById("output").innerHTML += "<span style='color: #e64843;'>Test failed</span><br>";
    }
}
validatePieceMove();


////////////////////////////////////////////////////////
// 960 Chess Tests
////////////////////////////////////////////////////////

//Initialize game
CHESSAPP.GamePlay.init(gameSettings);
document.querySelector("[data-mode='chess960']").click();
document.getElementById("output").innerHTML +=(`<b>Chess 960</b><br>`);

//TEST 1: Both Bishops are placed on opposite colors
const bishopsOnOppositeColors = () => {
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

}
bishopsOnOppositeColors();

//TEST 2: King inbetween rooks
const kingInbetweenRooks = () => {
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
}
kingInbetweenRooks();

//TEST 3: All pieces are on board
allPiecesAreOnBoard();



//TEST 4: Other side reflects the same pieces

const bothSidesHaveSamePieces = () => {
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


}
bothSidesHaveSamePieces();



document.getElementById("container").innerHTML = "";
