"use client";
import { secureHeapUsed } from "crypto";
import { useEffect, useState } from "react";

export default function Home() {
  let [second, setSecond] = useState(0);
  let [minute, setMinute] = useState(0);
  let [hour, setHour] = useState(0);
  let [theme, setTheme] = useState(false);
  let [secondRotation, setSecondRotation] = useState(0);
  let [minuteRotation, setMinuteRotation] = useState(0);
  let [isRotating, setIsRotating] = useState(false);
  let [intervalId, setIntervalId] = useState(null);
  let [lap, setLap] = useState([]);

  const createLap = () => {
    setLap([...lap, { hour, minute, second }]);
  };

  const changeTheme = () => {
    if (theme == false) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  };

  const generateMarkingsSmall = (pixel: number, face: string) => {
    const markings = [];
    for (let i = 0; i <= 30; i++) {
      const angle = i * 12; // Each second marking is 6 degrees apart
      markings.push(
        <div
          key={i}
          className={`absolute bg-gray-200 w-0.5 ${
            i % 5 == 0 && face == "big"
              ? "h-5"
              : i % 5 == 0 && face == "small"
              ? "h-3"
              : face == "big"
              ? "h-2"
              : "h-1"
          }`}
          style={{
            transform: `rotate(${angle}deg) translate(0, -${pixel}px)`,
            transformOrigin: "center",
          }}
        >
          <p
            className={`flex items-center justify-center ${
              face == "small" ? "text-xs mt-3" : "mt-6 text-xl"
            }`}
          >
            {i % 5 == 0 && i != 0 ? i : ""}
          </p>
        </div>
      );
    }
    return markings;
  };

  const generateMarkingsBig = (pixel: number, face: string) => {
    const markings = [];
    for (let i = 0; i <= 60; i++) {
      const angle = i * 6; // Each second marking is 6 degrees apart
      markings.push(
        <div
          key={i}
          className={`absolute bg-gray-200 w-0.5 ${
            i % 5 == 0 && face == "big"
              ? "h-5"
              : i % 5 == 0 && face == "small"
              ? "h-3"
              : face == "big"
              ? "h-2"
              : "hidden"
          }`}
          style={{
            transform: `rotate(${angle}deg) translate(0, -${pixel}px)`,
            transformOrigin: "center",
          }}
        >
          <p
            className={`flex items-center justify-center ${
              face == "small" ? "text-xs mt-3" : "mt-6 text-xl"
            }`}
          >
            {i % 5 == 0 && i != 0 ? i : ""}
          </p>
        </div>
      );
    }
    return markings;
  };

  // Function to start the rotation
  const startRotation = () => {
    if (!isRotating) {
      setIsRotating(true);
      const d = setInterval(() => {
        setSecond((prev) => {
          if (prev === 59) {
            setMinute((prev) => {
              if (prev === 59) {
                setHour((prev) => prev + 1);
                return 0;
              }
              return prev + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      const id = setInterval(() => {
        setSecondRotation((prev) => (prev + 0.06) % 360);
        setMinuteRotation((prev) => (prev + 0.1 / 60) % 360);
      }, 10);
      setIntervalId(d);
      setIntervalId(id);
    }
  };

  const stopRotation = () => {
    if (isRotating) {
      setIsRotating(false);
      clearInterval(intervalId);
    }
  };

  const resetRotation = () => {
    setLap([]);
    stopRotation();
    setSecondRotation(0);
    setMinuteRotation(0);
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [intervalId]);

  return (
    <main
      className={`h-screen transform duration-1000 ${
        theme == false ? "container_black " : "container_white "
      }`}
    >
      <div className="select-none">
        <nav className="flex justify-end p-2">
          <button
            className={
              theme == false
                ? "p-2 border border-white rounded-full m-2"
                : "p-2 border border-black rounded-full m-2"
            }
            onClick={() => changeTheme()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={theme == false ? "currentColor" : "black"}
              className="w-8 h-8"
            >
              <path
                fill-rule="evenodd"
                d={
                  theme == false
                    ? "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
                    : "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                }
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>

        <div className="flex flex-row items-center justify-center">
          <div className="md:grid grid-cols-2 justify-center">
            <div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={theme == false ? "currentColor" : "black"}
                  className="w-8 h-8"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1zM3 14a9 9 0 0 1 14.618-7.032l.675-.675a1 1 0 1 1 1.414 1.414l-.675.675A9 9 0 1 1 3 14zm10-4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p
                  className={`text-3xl font-bold uppercase
              ${theme == false ? "text-white" : "text-black"}
              `}
                >
                  stop watch
                </p>
              </div>
              <div className="flex items-center justify-center p-4 transform duration-1000">
                {generateMarkingsBig(150, "big")}
                <div className="flex items-top justify-center bg-zinc-800 h-80 w-80 rounded-full">
                  <div className="mt-12 absolute flex items-center justify-center">
                    {generateMarkingsSmall(34, "small")}
                    <div className="flex items-top justify-center bg-zinc-600 h-20 w-20 rounded-full">
                      <div
                        className={`absolute flex items-end justify-center bg-yellow-500 h-10 w-1 rounded-full`}
                        style={{
                          transform: `rotate(${minuteRotation}deg)`,
                          transformOrigin: "bottom center",
                          transition: "transform 0.1s linear",
                        }}
                      >
                        <div className="bg-zinc-800 rounded-full w-1 h-1"></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`absolute flex items-end bg-yellow-500 h-40 w-1 rounded-full`}
                    style={{
                      transform: `rotate(${secondRotation}deg)`,
                      transformOrigin: "bottom center",
                      transition: "transform 0.1s linear",
                    }}
                  >
                    <div className="bg-zinc-800 rounded-full w-1 h-1"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center">
                      <p className="uppercase font-bolder text-4xl mt-20">
                        <span>{hour.toString().padStart(2, "0")}</span>:
                        <span>{minute.toString().padStart(2, "0")}</span>:
                        <span>{second.toString().padStart(2, "0")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-10">
                <button
                  className="bg-zinc-700 h-20 w-20 rounded-full"
                  onClick={isRotating == false ? resetRotation : createLap}
                >
                  {isRotating == false ? "RESET" : "LAP"}
                </button>
                <button
                  className={
                    isRotating == false
                      ? "bg-green-800 h-20 w-20 rounded-full"
                      : "bg-red-800 h-20 w-20 rounded-full"
                  }
                  onClick={isRotating == false ? startRotation : stopRotation}
                >
                  {isRotating == false ? "START" : "STOP"}
                </button>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={theme == false ? "currentColor" : "black"}
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={theme == false ? "currentColor" : "black"}
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>
                <p
                  className={`text-3xl font-bold uppercase
              ${theme == false ? "text-white" : "text-black"}
              `}
                >
                  Laps
                </p>
              </div>
              <div className="flex justify-center">
                <hr
                  className={
                    theme == false
                      ? "border border-white w-40"
                      : "border border-black w-40"
                  }
                />
              </div>
              <div className="overflow-y-scroll h-80">
                {lap.map((lapTime, index) => (
                  <div key={index} className="mt-5">
                    <div className="flex justify-between w-full pl-10 pr-10">
                      <p
                        className={theme == false ? "text:white" : "text-black"}
                      >
                        LAP {index + 1}
                      </p>
                      <p
                        className={theme == false ? "text:white" : "text-black"}
                      >
                        {lapTime.hour.toString().padStart(2, "0")}:
                        {lapTime.minute.toString().padStart(2, "0")}:
                        {lapTime.second.toString().padStart(2, "0")}
                      </p>
                    </div>
                    <hr
                      className={
                        theme == false
                          ? "border border-white w-80"
                          : "border border-black w-80"
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
