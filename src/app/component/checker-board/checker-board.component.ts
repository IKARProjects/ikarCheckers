import { Component, OnInit } from "@angular/core";
import { Space } from "src/models/space.model";
import { Piece } from "src/models/piece.model";
import { MatDialog } from "@angular/material/dialog";
import { WinnerDialogComponent } from "src/app/winner-dialog/winner-dialog.component";

@Component({
  selector: "app-checker-board",
  templateUrl: "./checker-board.component.html",
  styleUrls: ["./checker-board.component.scss"],
})
export class CheckerBoardComponent implements OnInit {
  spaces: Space[] = [];
  player1Pieces: Piece[] = [];
  player2Pieces: Piece[] = [];
  blackKingArray: number[] = [0, 2, 4, 6];
  redKingArray: number[] = [57, 59, 61, 63];
  winnerId: number | undefined;
  initialRedPlacementArray: number[] = [
    0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22,
  ];
  initialBlackPlacementArray: number[] = [
    41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63,
  ];

  player1Wins: number = 0;
  player1Losses: number = 0;
  player2Wins: number = 0;
  player2Losses: number = 0;
  player1Name: string = "";
  player2Name: string = "";
  availableSpace1: Space | undefined;
  availableSpace2: Space | undefined;
  availableSpace3: Space | undefined;
  availableSpace4: Space | undefined;
  currentPlayerIdTurn: number = 1;
  constructor(private dialog:MatDialog
    ) {}

  ngOnInit(): void {

    this.dialog.open(WinnerDialogComponent,{
      data:'ADam'
    })

    this.addRowPairs(0);
    this.addRowPairs(16);
    this.addRowPairs(32);
    this.addRowPairs(48);
    this.addPlayerPieces();
  }

  addRowPairs(startingNumber: number) {
    this.createBoardRow(startingNumber, false);
    this.createBoardRow(startingNumber, true);
  }

  createBoardRow(startingNumber: number, shifted: boolean) {
    if (!shifted) {
      for (let i = startingNumber; i < startingNumber + 8; i++) {
        if (i % 2) {
          let space = { isPlayable: false, id: i };
          this.spaces.push(space);
        } else {
          let space = { isPlayable: true, id: i };
          this.spaces.push(space);
        }
      }
    } else {
      for (let i = startingNumber + 8; i < startingNumber + 16; i++) {
        if (i % 2) {
          let space = { isPlayable: true, id: i };
          this.spaces.push(space);
        } else {
          let space = { isPlayable: false, id: i };
          this.spaces.push(space);
        }
      }
    }
  }

  addPlayerPiece(
    pieces: Piece[],
    color: string,
    playerId: number,
    initialPlacementArray: number[]
  ) {
    for (let p = 0; p < 12; p++) {
      pieces.push({
        id: p,
        color: color,
        isSelected: false,
        playerId: playerId,
        isKing: false,
      });
      this.spaces[initialPlacementArray[p]].occupyingPiece = {
        id: p,
        color: color,
        isSelected: false,
        playerId: playerId,
        isKing: false,
      };
    }
  }

  addPlayerPieces() {
    this.addPlayerPiece(
      this.player1Pieces,
      "black",
      1,
      this.initialBlackPlacementArray
    );

    this.addPlayerPiece(
      this.player2Pieces,
      "red",
      2,
      this.initialRedPlacementArray
    );
  }

  findSelectedPiece(): Space | undefined {
    return this.spaces.find((s: Space) => s.occupyingPiece?.isSelected);
  }

  moveSelectedPiece(selectedPiece: Piece | undefined, spaceId: number) {
    const currentSelcetedPieceSpace = this.findSelectedPiece();

    if (!selectedPiece) {
      if (!currentSelcetedPieceSpace) {
        return;
      }

      this.movePiece(this.availableSpace1!, currentSelcetedPieceSpace, spaceId);
      this.movePiece(this.availableSpace2!, currentSelcetedPieceSpace, spaceId);
      this.movePiece(this.availableSpace3!, currentSelcetedPieceSpace, spaceId);
      this.movePiece(this.availableSpace4!, currentSelcetedPieceSpace, spaceId);

      this.currentPlayerIdTurn = this.currentPlayerIdTurn === 1 ? 2 : 1;
      this.availableSpace1 = undefined;
      this.availableSpace2 = undefined;
      this.availableSpace3 = undefined;
      this.availableSpace4 = undefined;

      currentSelcetedPieceSpace.occupyingPiece = undefined;

      return;
    } else {
      if (selectedPiece.playerId !== this.currentPlayerIdTurn) {
        return;
      }
      this.spaces.forEach((s: Space) => {
        if (s.occupyingPiece) {
          s.occupyingPiece.isSelected = false;
        }
      });
      selectedPiece.isSelected = true;

      if (!selectedPiece.isKing) {
        if (selectedPiece.playerId === 2) {
          this.getAvailableSpace(spaceId, "down");
        }

        if (selectedPiece.playerId === 1) {
          this.getAvailableSpace(spaceId, "up");
        }
      } else {
        this.getAvailableSpace(spaceId, "", selectedPiece.isKing);
      }
    }
  }

  getAvailableSpace(
    spaceId: number,
    direction: string,
    isking: boolean = false
  ) {
    if (!isking) {
      this.availableSpace1 = this.spaces.find(
        (s: Space) =>
          s.id === (direction === "down" ? spaceId + 7 : spaceId - 7)
      );
      this.availableSpace2 = this.spaces.find(
        (s: Space) =>
          s.id === (direction === "down" ? spaceId + 9 : spaceId - 9)
      );

      if (
        this.availableSpace1?.occupyingPiece &&
        this.availableSpace1.occupyingPiece.playerId !==
          this.currentPlayerIdTurn
      ) {
        this.availableSpace1 = this.spaces.find(
          (s: Space) =>
            s.id === (direction === "down" ? spaceId + 14 : spaceId - 14)
        );
      }

      if (
        this.availableSpace2?.occupyingPiece &&
        this.availableSpace2.occupyingPiece.playerId !==
          this.currentPlayerIdTurn
      ) {
        this.availableSpace2 = this.spaces.find(
          (s: Space) =>
            s.id === (direction === "down" ? spaceId + 18 : spaceId - 18)
        );
      }
    } else {
      this.availableSpace1 = this.spaces.find(
        (s: Space) => s.id === spaceId + 7
      );
      this.availableSpace2 = this.spaces.find(
        (s: Space) => s.id === spaceId + 9
      );

      this.availableSpace3 = this.spaces.find(
        (s: Space) => s.id === spaceId - 7
      );
      this.availableSpace4 = this.spaces.find(
        (s: Space) => s.id === spaceId - 9
      );

      if (
        this.availableSpace1?.occupyingPiece &&
        this.availableSpace1.occupyingPiece.playerId !==
          this.currentPlayerIdTurn
      ) {
        this.availableSpace1 = this.spaces.find(
          (s: Space) => s.id === spaceId + 14
        );
      }

      if (
        this.availableSpace2?.occupyingPiece &&
        this.availableSpace2.occupyingPiece.playerId !==
          this.currentPlayerIdTurn
      ) {
        this.availableSpace2 = this.spaces.find(
          (s: Space) => s.id === spaceId + 18
        );
      }

      if (
        this.availableSpace3?.occupyingPiece &&
        this.availableSpace3.occupyingPiece.playerId !==
          this.currentPlayerIdTurn
      ) {
        this.availableSpace3 = this.spaces.find(
          (s: Space) => s.id === spaceId - 14
        );
      }

      if (
        this.availableSpace4?.occupyingPiece &&
        this.availableSpace4.occupyingPiece.playerId !==
          this.currentPlayerIdTurn
      ) {
        this.availableSpace4 = this.spaces.find(
          (s: Space) => s.id === spaceId - 18
        );
      }
    }
  }

  removeCapturedPiece(spaceId: number) {
    let capturedPieceSpace = this.spaces.find((s: Space) => s.id === spaceId);
    if (capturedPieceSpace) {
      capturedPieceSpace.occupyingPiece = undefined;
    }
  }

  movePiece(
    availableSpace: Space,
    currentSelcetedPieceSpace: Space,
    spaceId: number
  ) {
    if (availableSpace?.id === spaceId) {
      if (availableSpace.id === currentSelcetedPieceSpace.id + 14) {
        this.removeCapturedPiece(currentSelcetedPieceSpace.id + 7);
      } else if (availableSpace.id === currentSelcetedPieceSpace.id + 18) {
        this.removeCapturedPiece(currentSelcetedPieceSpace.id + 9);
      } else if (availableSpace.id === currentSelcetedPieceSpace.id - 14) {
        this.removeCapturedPiece(currentSelcetedPieceSpace.id - 7);
      } else if (availableSpace.id === currentSelcetedPieceSpace.id - 18) {
        this.removeCapturedPiece(currentSelcetedPieceSpace.id - 9);
      }
      currentSelcetedPieceSpace.occupyingPiece!.isSelected = false;
      availableSpace.occupyingPiece = currentSelcetedPieceSpace.occupyingPiece;
      if (availableSpace.occupyingPiece?.playerId === 1) {
        const spaceId = availableSpace.id;
        if (this.blackKingArray.includes(spaceId)) {
          availableSpace.occupyingPiece.isKing = true;
        }
      } else if (availableSpace.occupyingPiece?.playerId === 2) {
        const spaceId = availableSpace.id;
        if (this.redKingArray.includes(spaceId)) {
          availableSpace.occupyingPiece.isKing = true;
        }
      }
      this.winnerId = this.checkForWinner();
      if(this.winnerId===1){

        this.player1Wins++;
        this.player2Losses++;
        this.dialog.open(WinnerDialogComponent,{
          data:this.player1Name
        })      
      }
      if(this.winnerId===2){
        this.player2Wins++;
        this.player1Losses++;
        this.dialog.open(WinnerDialogComponent,{
          data:this.player2Name
        })      }
    }
   
  }

  checkForWinner(): number | undefined {
    const player1Pieces = this.spaces.filter(
      (s: Space) => s.occupyingPiece?.playerId === 1
    );
    const player2Pieces = this.spaces.filter(
      (s: Space) => s.occupyingPiece?.playerId === 2
    );
    if (player1Pieces.length === 0) {
      return 2;
    }
    if (player2Pieces.length === 0) {
      return 1;
    }

    return undefined;
  }



}
