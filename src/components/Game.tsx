import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Or any icon from lucide/react-icons

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    console.log( houseChoice, userChoice, gameResult);

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
        setScore(prev => prev + 4);
      } else if (randomChoice.beats.includes(choice.id)) {
        setGameResult('lose');
        setScore(prev => Math.max(0, prev - 2));
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
 <div className="mb-8 border border-[hsl(217,16%,45%)] rounded-lg p-4">
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center">
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

      {/* Mobile View */}
      <div className="flex md:hidden justify-between items-center">
        <Image 
          src={isBonusMode ? "/images/logo-bonus.svg" : "/images/logo.svg"} 
          alt="Rock Paper Scissors"
          width={100}
          height={100}
        />
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 flex flex-col justify-center items-center text-center">
          <button
            onClick={() => {
              toggleGameMode();
              setIsMenuOpen(false);
            }}
            className="w-fit bg-white text-[hsl(229,25%,31%)] p-2 rounded font-bold"
          >
            {isBonusMode ? 'Switch to Standard' : 'Switch to Bonus'}
          </button>
          <div className="w-fit bg-white rounded p-2 text-[hsl(229,25%,31%)] font-bold">
            Score: {score}
          </div>
        </div>
      )}
    </div>

    {!userChoice ? (
      <div className="relative flex justify-center items-center h-96">
        {isBonusMode ? (
          <>
           {/* Pentagon Background */}
<Image
  src="/images/bg-pentagon.svg"
  alt="Pentagon Background"
  width={329}
  height={313}
  className="absolute inset-0 m-auto"
/>

{/* Scissors - Top */}
<div className="
  absolute top-[4%] left-1/2 transform -translate-x-1/2
  md:top-[2%]
  lg:top-[1%]
">
  <ChoiceButton choice={GAME_CHOICES.scissors} onClick={() => handleChoice(GAME_CHOICES.scissors)} size="lg" />
</div>

{/* Spock - Top Left */}
<div className="
  absolute top-[28%] left-[5%]
  md:top-[25%] md:left-[18%]
  lg:top-[22%] lg:left-[10%]
">
  <ChoiceButton choice={GAME_CHOICES.spock} onClick={() => handleChoice(GAME_CHOICES.spock)} size="lg" />
</div>

{/* Paper - Bottom Left */}
<div className="
  absolute bottom-[8%] left-[15%]
  md:-bottom-[10%] md:left-[28%]
  lg:-bottom-[18%] lg:left-[19%]
">
  <ChoiceButton choice={GAME_CHOICES.paper} onClick={() => handleChoice(GAME_CHOICES.paper)} size="lg" />
</div>

{/* Lizard - Bottom Right */}
<div className="
  absolute bottom-[8%] right-[15%]
  md:-bottom-[10%] md:right-[28%]
  lg:-bottom-[18%] lg:right-[19%]
">
  <ChoiceButton choice={GAME_CHOICES.lizard} onClick={() => handleChoice(GAME_CHOICES.lizard)} size="lg" />
</div>

{/* Rock - Top Right */}
<div className="
  absolute top-[28%] right-[5%]
  md:top-[25%] md:right-[18%]
  lg:top-[22%] lg:right-[10%]
">
  <ChoiceButton choice={GAME_CHOICES.rock} onClick={() => handleChoice(GAME_CHOICES.rock)} size="lg" />
</div>
          </>
        ) : (
          <>

           {/* Triangle Background */}

<Image
  src="/images/bg-triangle.svg"
  alt="Triangle Background"
  width={313}
  height={278}
  className="absolute inset-0 m-auto"
/>

{/* Scissors - Top */}
<div className="
  absolute top-4 right-[10%]
  transform translate-x-4 translate-y-4
  md:right-[20%] md:translate-x-6 md:translate-y-2
  lg:right-[17%] lg:translate-x-8 lg:-translate-y-4
">
  <ChoiceButton choice={GAME_CHOICES.scissors} onClick={() => handleChoice(GAME_CHOICES.scissors)} size="lg" />
</div>

{/* Paper - Bottom Left */}
<div className="
  absolute bottom-0 left-[5%] -translate-y-68
  md:left-[15%] md:-translate-y-[15rem]
  lg:left-[12%] lg:-translate-y-55
">
  <ChoiceButton choice={GAME_CHOICES.paper} onClick={() => handleChoice(GAME_CHOICES.paper)} size="lg" />
</div>

{/* Rock - Bottom Right */}
<div className="
  absolute bottom-0 right-[38%] translate-y-2
  md:right-[41%] md:translate-y-12
  lg:right-[39%] lg:translate-y-19
">
  <ChoiceButton choice={GAME_CHOICES.rock} onClick={() => handleChoice(GAME_CHOICES.rock)} size="lg" />
</div>

          </>
        )}
      </div>
    ) : (
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center">
          <p className="font-semibold mb-4 text-white">YOU PICKED</p>
          <div className={`rounded-full p-4
 ${userChoice && houseChoice && userChoice.name === houseChoice.name ? "ripple-fade" : ""} ${userChoice && houseChoice && userChoice.beats.includes(houseChoice.id) ? "ripple-fade" : ""}`}>

          <ChoiceButton  choice={userChoice} size="lg" disabled onClick={() => {}} />
          </div>
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
        
        <div className="flex flex-col items-center justify-center text-center">
          <p className="font-semibold mb-4 text-white">THE HOUSE PICKED</p>
          {houseChoice ? (
             <div className={`rounded-full p-4
  ${userChoice?.name == houseChoice?.name ?"ripple-fade":""} ${houseChoice?.beats.includes(userChoice?.id)? "ripple-fade":""}`} >
            <ChoiceButton choice={houseChoice} size="lg" disabled onClick={() => {}} />
                </div>
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