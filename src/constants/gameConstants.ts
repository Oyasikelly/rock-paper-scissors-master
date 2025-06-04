import { GameChoiceOption } from '../types/gameTypes';

export const GAME_CHOICES: Record<string, GameChoiceOption> = {
  rock: {
    id: 'rock',
    name: 'Rock',
    beats: ['scissors', 'lizard'],
    color: 'bg-gradient-to-b from-[hsl(349,71%,52%)] to-[hsl(349,70%,56%)]',
    ringColor: 'ring-[hsl(349,70%,40%)]',
  },
  paper: {
    id: 'paper',
    name: 'Paper',
    beats: ['rock', 'spock'],
    color: 'bg-gradient-to-b from-[hsl(230,89%,62%)] to-[hsl(230,89%,65%)]',
    ringColor: 'ring-[hsl(230,89%,45%)]',
  },
  scissors: {
    id: 'scissors',
    name: 'Scissors',
    beats: ['paper', 'lizard'],
    color: 'bg-gradient-to-b from-[hsl(39,89%,49%)] to-[hsl(40,84%,53%)]',
    ringColor: 'ring-[hsl(40,84%,35%)]',
  },
  lizard: {
    id: 'lizard',
    name: 'Lizard',
    beats: ['paper', 'spock'],
    color: 'bg-gradient-to-b from-[hsl(261,73%,60%)] to-[hsl(261,72%,63%)]',
    ringColor: 'ring-[hsl(261,72%,45%)]',
  },
  spock: {
    id: 'spock',
    name: 'Spock',
    beats: ['scissors', 'rock'],
    color: 'bg-gradient-to-b from-[hsl(189,59%,53%)] to-[hsl(189,58%,57%)]',
    ringColor: 'ring-[hsl(189,58%,40%)]',
  },
};

export const INITIAL_SCORE = 0;