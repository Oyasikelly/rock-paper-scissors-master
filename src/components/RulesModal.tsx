import { useState } from 'react';
import Image from 'next/image';

interface RulesModalProps {
  isBonus?: boolean;
}

export const RulesModal = ({ isBonus = false }: RulesModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-transparent text-white font-bold py-2 px-6 rounded-lg border-2 border-[hsl(217,16%,45%)]"
      >
        RULES
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[hsl(229,25%,31%)]">RULES</h1>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Image 
                  src="/images/icon-close.svg" 
                  alt="Close"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            
            <div className="flex justify-center">
              <Image
                src={isBonus ? "/images/image-rules-bonus.svg" : "/images/image-rules.svg"}
                alt="Game Rules"
                width={isBonus ? 340 : 304}
                height={isBonus ? 330 : 270}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};