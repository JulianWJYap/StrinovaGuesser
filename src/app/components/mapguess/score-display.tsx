interface ScoreProps{
  score:number
}

export default function ScoreDisplay(Props: ScoreProps){
  const { score } = Props;

  return(
    <div className="flex items-center justify-center">
      <span className="text-3xl text-slate-600 underline">Score: {score}</span>
    </div>
  )
}