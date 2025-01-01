export type Coordinates = {
  x: number;
  y: number;
}

export type MapQuestion = {
  url: string;
  answer: MapAnswer;
  scoreMultiplier: number;
}

export type MapAnswer = {
  mapName: string;
  coordinates: Coordinates;
}