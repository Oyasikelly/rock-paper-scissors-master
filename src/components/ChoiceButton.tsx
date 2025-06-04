import { GameChoiceOption } from '../types/gameTypes';

interface ChoiceButtonProps {
  choice: GameChoiceOption;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const ICON_MAP = {
  rock: '/images/icon-rock.svg',
  paper: '/images/icon-paper.svg',
  scissors: '/images/icon-scissors.svg',
  lizard: '/images/icon-lizard.svg',
  spock: '/images/icon-spock.svg',
};

export const ChoiceButton = ({ 
  choice, 
  onClick, 
  size = 'md', 
  disabled = false 
}: ChoiceButtonProps) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${choice.color} ${choice.ringColor} lg:w-40 lg:h-40 md:w-32 md:h-32  w-20 h-20
        rounded-full flex items-center justify-center shadow-lg 
        transform transition hover:scale-105 active:scale-95 
        ring-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <div className="bg-white rounded-full w-2/3 h-2/3  lg:w-3/4 lg:h-3/4 flex items-center justify-center shadow-inner">
        <img 
          src={ICON_MAP[choice.id]} 
          alt={choice.name}
          className="w-1/2 h-1/2 object-contain"
        />
      </div>
    </button>
  );
};