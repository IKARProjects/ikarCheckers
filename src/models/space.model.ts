import { Piece } from "./piece.model";

export interface Space{
    isPlayable: boolean;
    occupyingPiece? :Piece
    id: number;
}