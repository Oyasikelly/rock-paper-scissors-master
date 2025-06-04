export const ScoreDisplay = ({ score }: { score: number }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md text-center border-2 border-[hsl(217,16%,45%)]">
      <h2 className="text-[hsl(229,64%,46%)] font-semibold tracking-wider">SCORE</h2>
      <p className="text-4xl font-bold text-[hsl(229,25%,31%)]">{score}</p>
    </div>
  );
};