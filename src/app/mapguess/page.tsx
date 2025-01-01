"use client"
import MapSelector from "../components/mapguess/map-selector";
import ScoreDisplay from "../components/mapguess/score-display";
import MapQuestionDisplay from "../components/mapguess/map-question-display";
import { useCallback, useEffect, useState } from "react";
import { Coordinates, MapAnswer, MapQuestion } from "../data/types";
import { MapQuestions, answerMapSize } from "../data/data";
import { useNotification } from "../components/providers/notification-provider";

export default function MapGuess(){
  const totalExistingQuestions = Object.keys(MapQuestions).length;
  const [, setShuffledQuestionsIndexes] = useState<number[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [realAnswer, setRealAnswer] = useState<MapAnswer>({mapName: "", coordinates: {x: 0, y: 0}});
  const [currentScoreMultiplier, setCurrentScoreMultiplier] = useState<number>(1);
  const [questionImageUrl, setQuestionImageUrl] = useState<string>();
  const [score, setScore] = useState<number>(0);

  const lgMapSize = 500;
  const mdMapSize = 350;
  const [mapSize, setMapSize] = useState<number>(answerMapSize);
  
  const { showNotification } = useNotification();

  const shuffleQuestions = useCallback(() => {
    const allIndex: number[] = Array.from({ length: totalExistingQuestions }, (_, i) => i + 1);

    for (let i = allIndex.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = allIndex[i];
      allIndex[i] = allIndex[j];
      allIndex[j] = temp;
    }

    //console.log(allIndex) //DEBUG: values of shuffledIndex
    setShuffledQuestionsIndexes(allIndex);
    setCurrentQuestionIndex(0);

    const firstQuestion = MapQuestions[allIndex[0]];
    updateQuestionState(firstQuestion);
  }, [totalExistingQuestions])
  
  useEffect(()=>{
    shuffleQuestions();

    // Calculate Map Size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMapSize(lgMapSize); // Desktop size
      } else {
        setMapSize(mdMapSize); // Mobile size
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  },[shuffleQuestions])

  function updateQuestionState(questionIndex: MapQuestion) {
    setQuestionImageUrl(questionIndex.url);
    setRealAnswer(questionIndex.answer);
    setCurrentScoreMultiplier(questionIndex.scoreMultiplier);

    //console.log(questionIndex.answer); // DEBUG: This prints the answer
  };

  const getNextQuestion = () => {
    if (currentQuestionIndex + 1 > totalExistingQuestions) {
      shuffleQuestions();
    } else {
      const nextQuestion = MapQuestions[currentQuestionIndex + 1];
      setCurrentQuestionIndex(prev => prev + 1);

      updateQuestionState(nextQuestion);
    }
  }

  const calculateReward = (answerCoord: Coordinates, givenAnswer: Coordinates, forgiveness: number): number => {
    const maxScore = 5000 * currentScoreMultiplier;

    // Scale answers
    if (mapSize !== answerMapSize){
      givenAnswer = {
        x: (givenAnswer.x / answerMapSize) * mapSize,
        y: (givenAnswer.y / answerMapSize) * mapSize
      }
    }
    
    const distance = Math.sqrt(Math.pow(answerCoord.x - givenAnswer.x, 2) + Math.pow(answerCoord.y - givenAnswer.y, 2));
  
    if (distance <= forgiveness) {
      return maxScore;
    }
    const newScore = Math.max(1, maxScore - (distance / mapSize) * maxScore);
  
    return Math.round(newScore);
  };  

  const handleFinalAnswer = (answerMap: string, answerCoord: Coordinates) => {
    let rewardScore: number = 0;
    let mapCorrect: boolean = false;

    //console.log(answerCoord); //DEBUG: Print Submitted Coordinates

    if (answerMap === realAnswer.mapName){
      mapCorrect = true;
      rewardScore = calculateReward(answerCoord, realAnswer.coordinates, 10);
    }

    if (mapCorrect) {
      showNotification("Answer Correct!", `Score Multiplier: ${currentScoreMultiplier}\nYour Score is ${rewardScore}!\n\nNEW SCORE: ${score + rewardScore}`);
      setScore(prevScore => prevScore + rewardScore);
    } else {
      showNotification("Answer Incorrect!", `Your final score is ${score}!`);
      setScore(0);
    }

    if (mapCorrect) {
      getNextQuestion();
    } else {
      shuffleQuestions();
    }
    
  }

  const handleShowTutorial = () => {
    showNotification("Tutorial", 
      `The screenshot shown is taken from a specific point in the map.
      
      - All screenshots were taken in places reachable in normal games.
      - Different screenshots have a hidden score multiplier depending on difficulty.
      - Pin should be placed where the PLAYER was standing when the screenshot was taken!

      Getting the answer wrong will cause your points to reset!`
    );
  };

  return <div className="grid md:grid-cols-1 lg:grid-cols-2 lg:h-full">
    <div className="grid grid-cols-1 grid-rows-[100px_1fr_100px] items-center justify-center">
      <div></div>
      <MapQuestionDisplay
        imageURL={questionImageUrl ?? undefined}
      />
      <div></div>
    </div>
    <div className="bg-slate-100 grid grid-cols-1 grid-rows-[100px_1fr]">
      <ScoreDisplay
        score={score}
      />
      <MapSelector
        handleAnswer={handleFinalAnswer}
        mapSize={mapSize}
      />
    </div>
    <button 
      className="fixed bg-emerald-600 hover:bg-emerald-700 rounded-full text-lg bottom-0 right-0 w-[48px] h-[48px] m-6"
      onClick={handleShowTutorial}
    >
      i
    </button>
  </div>
}