"use client"
import { ImageUrl } from "@/app/data/data";
import { Coordinates } from "@/app/data/types";
import Image from "next/image";
import { useState } from "react";
import { useNotification } from "../providers/notification-provider";

interface QuestionProps{
  handleAnswer: (mapName: string, answerCoord: Coordinates) => void;
  mapSize: number;
}

export default function MapSelector(Props: QuestionProps){
  const { handleAnswer, mapSize } = Props;

  const [selectedMap, setSelectedMap] = useState<string>("Area88");
  const [currentCoord, setCurrentCoord] = useState<Coordinates>({x: 0, y: 0})
  const [pinVisible, setPinVisible] = useState<boolean>(false);

  const { showNotification } = useNotification();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMap(event.target.value);
  }

  const handleMapClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const img = event.target as HTMLImageElement;
    const rect = img.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //console.log(`Pin Location: x: ${x}, y: ${y}`); //DEBUG: Print Pin Location
    setCurrentCoord({x: x, y: y});
    setPinVisible(true);
  }

  const handleSubmitAnswer = () => {
    if (pinVisible === false) {
      showNotification("No Location Submitted!", "Place a pin on the location you want to guess!")
    } else {
      handleAnswer(selectedMap, currentCoord);
      setPinVisible(false);
    }
  }

  return(
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_100px]">
      <div className="w-full h-full flex justify-center">
        <select 
          id="countries" 
          className="bg-slate-200 mb-7 lg:mb-0 border border-slate-800 rounded-md text-center text-black w-9/12 h-12"  
          value={selectedMap}
          onChange={handleChange}
        >
          <option value="Area88">Area 88</option>
          <option value="Base404">Base 404</option>
          <option value="PortEuler">Port Euler</option>
          <option value="SpaceLab">Space Lab</option>
          <option value="WindyTown">Windy Town</option>
          <option value="CauchyStreet">Cauchy Street</option>
          <option value="Cosmite">Cosmite</option>
        </select>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="relative">
          <Image
            className="shadow-md rounded-md"
            id="mapImage"
            priority={true}
            src={ImageUrl[selectedMap ?? null]}
            alt="Map"
            onClick={handleMapClick}
            width={mapSize}
            height={mapSize}
          />
          <div 
            className={`${pinVisible ? "" : "hidden "}absolute w-5 h-5 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
            style={{left: `${currentCoord.x}px`, top: `${currentCoord.y}px`}}
          />
        </div>
      </div>
      <div className="flex items-start justify-center">
        <button 
          className="bg-blue-500 mt-7 lg:mt-0 hover:bg-sky-600 rounded-lg shadow-xl transition-all duration-200 px-24 py-3"
          onClick={handleSubmitAnswer}  
        >
          Submit
        </button>
      </div>
    </div>
  )
}