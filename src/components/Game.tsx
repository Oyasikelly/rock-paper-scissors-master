import { useState } from 'react';
import { GameChoiceOption } from '../types/gameTypes';
import { GAME_CHOICES, INITIAL_SCORE } from '../constants/gameConstants';
import { ChoiceButton } from './ChoiceButton';
import { ScoreDisplay } from './ScoreDisplay';
// import { ResultModal } from './ResultModal';
import { RulesModal } from './RulesModal';
import Image from 'next/image';

export const Game = () => {
  const [score, setScore] = useState(INITIAL_SCORE);
  const [userChoice, setUserChoice] = useState<GameChoiceOption | null>(null);
  const [houseChoice, setHouseChoice] = useState<GameChoiceOption | null>(null);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [isBonusMode, setIsBonusMode] = useState(false);

  const choices = isBonusMode 
    ? Object.values(GAME_CHOICES) 
    : [GAME_CHOICES.rock, GAME_CHOICES.paper, GAME_CHOICES.scissors];

  const handleChoice = (choice: GameChoiceOption) => {
    setUserChoice(choice);
    
    setTimeout(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setHouseChoice(randomChoice);
      
      if (choice.beats.includes(randomChoice.id)) {
        setGameResult('win');
        setScore(prev => prev + 1);
      } else if (randomChoice.beats.includes(choice.id)) {
        setGameResult('lose');
        setScore(prev => Math.max(0, prev - 1));
      } else {
        setGameResult('draw');
      }
    }, 1000);
  };

  const resetGame = () => {
    setUserChoice(null);
    setHouseChoice(null);
    setGameResult(null);
  };

  const toggleGameMode = () => {
    resetGame();
    setIsBonusMode(!isBonusMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(214,47%,23%)] to-[hsl(237,49%,15%)] py-8 px-4">
  <div className="max-w-3xl mx-auto">
    <div className="flex justify-between items-center mb-16 border-1 border-[hsl(217,16%,45%)] p-4 rounded-lg">
      <div className="flex items-center">
        <Image 
          src={isBonusMode ? "/images/logo-bonus.svg" : "/images/logo.svg"} 
          alt="Rock Paper Scissors"
          width={isBonusMode ? 115 : 162}
          height={isBonusMode ? 114 : 99}
          className="mr-4"
        />
        <button
          onClick={toggleGameMode}
          className="bg-white text-[hsl(229,25%,31%)] py-1 px-3 rounded text-sm font-bold"
        >
          {isBonusMode ? 'Standard' : 'Bonus'}
        </button>
      </div>
      <ScoreDisplay score={score} />
    </div>

    {!userChoice ? (
      <div className="relative flex justify-center items-center h-96">
        {isBonusMode ? (
          <>
            <Image
              src="/images/bg-pentagon.svg"
              alt="Pentagon Background"
              width={329}
              height={313}
              className="absolute inset-0 m-auto"
            />
            {/* Scissors - Top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ChoiceButton 
                choice={GAME_CHOICES.scissors} 
                onClick={() => handleChoice(GAME_CHOICES.scissors)} 
                size="lg"
              />
            </div>
            {/* rock - Top Right */}
            <div className="absolute top-[80%] right-[23%]">
              <ChoiceButton 
                choice={GAME_CHOICES.rock} 
                onClick={() => handleChoice(GAME_CHOICES.rock)} 
                size="lg"
              />
            </div>
            {/* Paper - Bottom Right */}
            <div className="absolute bottom-[35%] right-[12%]">
              <ChoiceButton 
                choice={GAME_CHOICES.paper} 
                onClick={() => handleChoice(GAME_CHOICES.paper)} 
                size="lg"
              />
            </div>
            {/* spock - Bottom Left */}
            <div className="absolute bottom-[35%] left-[12%]">
              <ChoiceButton 
                choice={GAME_CHOICES.spock} 
                onClick={() => handleChoice(GAME_CHOICES.spock)} 
                size="lg"
              />
            </div>
            {/* lizard - Top Left */}
            <div className="absolute top-[80%] left-[23%]">
              <ChoiceButton 
                choice={GAME_CHOICES.lizard} 
                onClick={() => handleChoice(GAME_CHOICES.lizard)} 
                size="lg"
              />
            </div>
          </>
        ) : (
          <>
            <Image
              src="/images/bg-triangle.svg"
              alt="Triangle Background"
              width={313}
              height={278}
              className="absolute inset-0 m-auto"
            />
            {/* Scissors - Top */}
            <div className="absolute top-0 right-[23%] transform translate-x-[2.3rem] translate-y-[1rem]
            lg:right-[30%] lg:translate-x-1/1 lg:-translate-y-[1rem]
            md:right-[25%] md:translate-x-2/3 md:-translate-y-[1rem]
            ">
              <ChoiceButton 
                choice={GAME_CHOICES.scissors} 
                onClick={() => handleChoice(GAME_CHOICES.scissors)} 
                size="lg"
              />
            </div>
         
            {/* Paper - Bottom Right */}
            <div className="absolute bottom-0 lg:left-[10%] transform lg:-translate-y-3/2
            md:left-[13%] md:-translate-y-[17rem]
            left-[18%] -translate-y-[18rem]
            ">

              <ChoiceButton 
                choice={GAME_CHOICES.paper} 
                onClick={() => handleChoice(GAME_CHOICES.paper)} 
                size="lg"
              />
            </div>

               {/* Rock - Bottom Left */}
            <div className="absolute bottom-0  lg:right-[39%] transform lg:translate-y-[6rem]
            md:right-[41%] md:translate-y-[4rem]
            right-[40%] translate-y-[0.6rem] 
            ">

              <ChoiceButton 
                choice={GAME_CHOICES.rock} 
                onClick={() => handleChoice(GAME_CHOICES.rock)} 
                size="lg"
              />
            </div>
          </>
        )}
      </div>
    ) : (
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center">
          <p className="font-semibold mb-4 text-white">YOU PICKED</p>
          <ChoiceButton choice={userChoice} size="lg" disabled onClick={() => {}} />
        </div>
        
        {gameResult && (
          <div className="text-center my-8 md:my-0">
            <h2 className={`text-4xl font-bold mb-4 ${
              gameResult === 'win' ? 'text-green-400' : 
              gameResult === 'lose' ? 'text-red-400' : 'text-white'
            }`}>
              {gameResult === 'win' ? 'YOU WIN' : 
               gameResult === 'lose' ? 'YOU LOSE' : 'DRAW'}
            </h2>
            <button
              onClick={resetGame}
              className="bg-white text-[hsl(229,25%,31%)] py-3 px-8 rounded-lg font-semibold hover:bg-gray-200"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
        
        <div className="text-center">
          <p className="font-semibold mb-4 text-white">THE HOUSE PICKED</p>
          {houseChoice ? (
            <ChoiceButton choice={houseChoice} size="lg" disabled onClick={() => {}} />
          ) : (
            <div className="w-40 h-40 rounded-full bg-[hsl(237,49%,15%)] flex items-center justify-center">
              <p className="text-white">...</p>
            </div>
          )}
        </div>
      </div>
    )}

    <RulesModal isBonus={isBonusMode} />
  </div>
</div>
  );
};