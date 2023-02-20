import { Component, OnInit } from "@angular/core";
import { Space } from "src/models/space.model";
import { Piece } from "src/models/piece.model";

@Component({
  selector: "app-checker-board",
  templateUrl: "./checker-board.component.html",
  styleUrls: ["./checker-board.component.scss"],
})
export class CheckerBoardComponent implements OnInit {
  spaces: Space[] = [];
  player1Pieces: Piece[] = [];
  player2Pieces: Piece[] = [];
  initialRedPlacementArray: number[] = [
    0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22,
  ];
  initialBlackPlacementArray: number[] = [
    41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63,
  ];

  availableSpace1: Space | undefined;
  availableSpace2: Space | undefined;

  constructor() {}

  ngOnInit(): void {
    this.addRowPairs(0);
    this.addRowPairs(16);
    this.addRowPairs(32);
    this.addRowPairs(48);
    this.addPlayerPieces();
  }

  addRowPairs(startingNumber: number) {
    for (let i = startingNumber; i < startingNumber + 8; i++) {
      if (i % 2) {
        let space = { isPlayable: false, id: i };
        this.spaces.push(space);
      } else {
        let space = { isPlayable: true, id: i };
        this.spaces.push(space);
      }
    }

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

  addPlayerPieces() {
    for (let b = 0; b < 12; b++) {
      this.player1Pieces.push({
        id: b,
        color: "black",
        isSelected: false,
        playerId: 1,
      });
      this.spaces[this.initialBlackPlacementArray[b]].occupyingPiece = {
        id: b,
        color: "black",
        isSelected: false,
        playerId: 1,
      };
    }

    for (let r = 0; r < 12; r++) {
      this.player2Pieces.push({
        id: r,
        color: "red",
        isSelected: false,
        playerId: 2,
      });
      this.spaces[this.initialRedPlacementArray[r]].occupyingPiece = {
        id: r,
        color: "red",
        isSelected: false,
        playerId: 2,
      };
    }
    console.log(this.spaces);
    console.log(this.player2Pieces, this.player1Pieces);
  }

  selectPiece(selectedPiece: Piece | undefined, spaceId: number) {
    if (!selectedPiece) {
      const currentSelcetedPieceSpace = this.spaces.find(
        (s: Space) => s.occupyingPiece?.isSelected
      );

      console.log(currentSelcetedPieceSpace);
      if (!currentSelcetedPieceSpace) {
        return;
      }

      if (this.availableSpace1?.id === spaceId) {
        this.availableSpace1.occupyingPiece =
          currentSelcetedPieceSpace.occupyingPiece;
      this.availableSpace2=undefined


      }

      if (this.availableSpace2?.id === spaceId) {
        this.availableSpace2.occupyingPiece =
          currentSelcetedPieceSpace.occupyingPiece;
          this.availableSpace1=undefined

      }
      currentSelcetedPieceSpace.occupyingPiece = undefined;


      return;
    } else {
      this.spaces.forEach((s: Space) => {
        if (s.occupyingPiece) {
          s.occupyingPiece.isSelected = false;
        }
      });
      selectedPiece.isSelected = true;
      if (selectedPiece.playerId === 2) {
        this.availableSpace1 = this.spaces.find(
          (s: Space) => s.id === spaceId + 7
        );
        this.availableSpace2 = this.spaces.find(
          (s: Space) => s.id === spaceId + 9
        );
      }

      if (selectedPiece.playerId === 1) {
        this.availableSpace1 = this.spaces.find(
          (s: Space) => s.id === spaceId - 7
        );
        this.availableSpace2 = this.spaces.find(
          (s: Space) => s.id === spaceId - 9
        );
      }

      console.log(this.availableSpace1, this.availableSpace2);

      console.log(selectedPiece);
    }
  }
  // getAvailableSpaceClass(spaceId:number){
  //   const selcetedPieceSpace=this.spaces.find((s:Space)=>s.occupyingPiece?.isSelected)

  // }
}
