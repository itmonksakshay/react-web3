import { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as LeftArrowSvg } from "src/assets/img/icons/left-arrow.svg";
import { ReactComponent as RightArrowSvg } from "src/assets/img/icons/right-arrow.svg";
import { Button } from "src/components/lib";
import { questions } from "src/constants/questions";
import { ChainLine } from "./components/ChainLine";
import { Question } from "./components/Question";

export function Questioning({ answers, setAnswers, onFinish }) {
  const [questionIndex, setQuestionIndex] = useState(-1);

  const timeoutRef = useRef(-1);

  const showPrev = questionIndex > 0;
  const showNext =
    questionIndex === questions.length - 1
      ? false
      : answers[questionIndex + 1]
      ? true
      : timeoutRef.current > -1
      ? false
      : answers[questionIndex];

  const handleSelect = (index, value) => {
    if (timeoutRef.current > -1) {
      return;
    }
    setAnswers((prev) => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index + 1),
    ]);
    if (questionIndex < questions.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setQuestionIndex((i) => i + 1);
        timeoutRef.current = -1;
      }, 500);
    } else {
      timeoutRef.current = setTimeout(() => {
        onFinish();
        timeoutRef.current = -1;
      }, 700);
    }
  };

  const goToPreviousQuestion = useCallback(() => {
    setQuestionIndex((i) => {
      if (i === 0) return i;
      return i - 1;
    });
  }, []);

  const goToNextQuestion = useCallback(() => {
    setQuestionIndex((i) => {
      if (i === questions.length - 1) return i;
      return i + 1;
    });
  }, []);

  useEffect(() => {
    setAnswers([]);
  }, [setAnswers]);

  useEffect(() => {
    setQuestionIndex(0);
  }, []);

  return (
    <div className="lg:px-[74px] pt-[81px] lg:py-[30px] animate-fadeIn">
      <div className="flex flex-col gap-[14px] items-center lg:flex-row">
        <p className="font-caption font-normal text-[14px] mx-[24px] lg:ml-0 lg:text-[16px] leading-[1.2] max-w-[380px] text-grey-deep">
          Please answer a few questions to help our AI to better understand you
        </p>
        <ChainLine
          value={questionIndex}
          checkedCount={answers.filter(Boolean).length}
          total={questions.length}
          className="lg:ml-auto"
        />
      </div>
      <div className="relative flex h-[497px] overflow-hidden mt-[24px] lg:mt-[84px]">
        <Button
          type={13}
          className={`group ml-[18px] lg:ml-0 lg:mt-[49px] z-[100] ${
            showPrev ? "visible" : "invisible"
          }`}
          onClick={goToPreviousQuestion}
        >
          <LeftArrowSvg />
        </Button>
        {questions.map((question, index) => (
          <Question
            key={index}
            questionIndex={index}
            handleSelect={handleSelect}
            selectedValue={answers[index]}
            className={`absolute mx-auto mt-[40px] lg:mt-0 transition-all ease-in-out duration-700 left-1/2 ${
              questionIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              display: Math.abs(index - questionIndex) > 1 ? "none" : "block",
              transform: `translateX(${-50 + (index - questionIndex) * 100}%)`,
            }}
          />
        ))}
        <Button
          type={13}
          className={`mr-[18px] lg:mr-0 lg:mt-[49px] ml-auto z-[100] ${
            showNext ? "visible" : "invisible"
          }`}
          onClick={goToNextQuestion}
        >
          <RightArrowSvg />
        </Button>
      </div>
    </div>
  );
}
