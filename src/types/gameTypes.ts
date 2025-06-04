export type GameChoice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
export type GameChoices = Record<GameChoice, GameChoiceOption>;
export type GameResult = 'win' | 'lose' | 'draw';

export interface GameChoiceOption {
  id: GameChoice;
  name: string;
  beats: GameChoice[];
  color: string;
  ringColor: string;
}