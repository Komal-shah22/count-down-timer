"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

const Countdown = () => {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsActive(false);
      setIsPaused(true);
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timeRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4 sm:p-10"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNYIizD1aM2XSILZfecEccuBBEQRxH_hg2w&s')`,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Start Countdown Timer Screen */}
        <div
          className={`absolute w-full transition-transform duration-700 ${
            showTimer ? "-translate-x-full" : "translate-x-0"
          } flex items-center justify-center`}
        >
          <div className="dark:bg-[#e3e4e6] backdrop-blur-lg shadow-lg rounded-[10px] p-6 sm:p-10 w-full max-w-md sm:max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-[#1a1919] dark:text-gray-200 text-center">
              Welcome to Countdown Timer
            </h3>
            <Button
              onClick={() => setShowTimer(true)}
              variant="outline"
              className="w-full sm:w-auto text-gray-900 cursor-pointer dark:text-white rounded-[20px] px-6 py-3 shadow-lg shadow-cyan-500/50"
            >
              Start Countdown Timer
            </Button>
          </div>
        </div>

        {/* Countdown Timer Screen */}
        <div
          className={`absolute w-full transition-transform duration-700 ${
            showTimer ? "translate-x-0" : "translate-x-full"
          } flex items-center justify-center`}
        >
          <div className="dark:bg-[#e3e4e6] backdrop-blur-lg shadow-lg rounded-[10px] p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-auto">
            {/* Title */}
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-[#1a1919] dark:text-gray-200 text-center">
              Countdown Timer
            </h3>

            {/* Input and Set Button */}
            <div className="flex flex-col sm:flex-row items-center mb-6 gap-3">
              <Input
                type="number"
                id="duration"
                placeholder="Enter duration in seconds"
                value={duration}
                onChange={handleDurationChange}
                className="flex-1 rounded-[30px] dark:bg-gray-700 dark:text-white text-center sm:text-left"
              />
              <Button
                onClick={handleSetDuration}
                variant="outline"
                className="text-gray-900 dark:text-white rounded-[20px] px-6 py-2 shadow-lg shadow-cyan-500/50"
              >
                Set
              </Button>
            </div>

            {/* Timer Display */}
            <div className="text-4xl sm:text-6xl font-bold text-[#141414] dark:text-gray-400 mb-6 text-center">
              {formatTime(timeLeft)}
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Button
                onClick={handleStart}
                variant="outline"
                className="text-gray-900 dark:text-white bg-[#f5f7f7] rounded-[20px] px-6 py-2 shadow-lg shadow-cyan-500/50 w-full sm:w-auto"
              >
                {isPaused ? "Resume" : "Start"}
              </Button>
              <Button
                onClick={handlePause}
                variant="outline"
                className="text-gray-900 dark:text-white bg-[#eff1f1] rounded-[20px] px-6 py-2 shadow-lg shadow-cyan-500/50 w-full sm:w-auto"
              >
                Pause
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="text-gray-900 dark:text-white bg-[#f7fafa] rounded-[20px] px-6 py-2 shadow-lg shadow-cyan-500/50 w-full sm:w-auto"
              >
                Reset
              </Button>
            </div>

            {/* Back Button */}
            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowTimer(false)}
                variant="outline"
                className="text-gray-900 dark:text-white bg-[#fafafa] rounded-[20px] px-6 py-2 shadow-lg shadow-cyan-500/50 w-full sm:w-auto"
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;


