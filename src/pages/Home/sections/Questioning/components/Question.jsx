import { Button } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { questions } from "src/constants/questions";
import { useModal } from "src/contexts/ModalContext";
import { useMobile } from "src/hooks/useMobile";
import { AnswerOption } from "./AnswerOption";

export function Question({
  questionIndex,
  handleSelect,
  selectedValue,
  className,
  style,
}) {
  const { showModal } = useModal();
  const isMobile = useMobile();

  const question = questions[questionIndex];

  const handleSelected = (value) => {
    handleSelect(questionIndex, value);
  };
  const showSkipQuestionModal = () => {
    showModal(ModalType.SkipQuestionModal);
  };

  return (
    <div
      className={className}
      style={{
        width: isMobile ? "auto" : question.style.width,
        ...style,
      }}
    >
      <h6 className="font-caption font-normal text-[16px] lg:text-[20px] leading-[1.46] text-grey-lighter3 text-center mb-[8px]">
        Question {questionIndex + 1}
      </h6>
      <div className="flex ">
        <h3
          className="h-[119px] lg:h-[141px] font-caption text-[20px] lg:text-[32px] text-center text-grey-darkest dark:text-white child-span:text-yellow-dark mx-auto"
          dangerouslySetInnerHTML={{
            __html: isMobile
              ? question.question.replace("<br>", " ")
              : question.question,
          }}
        />
      </div>
      <div className="flex flex-col gap-[20px] mt-[30px] lg:mt-[20px] mx-auto items-center">
        {question.options.map((option) => (
          <AnswerOption
            key={option.value}
            value={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onSelected={handleSelected}
          />
        ))}
      </div>
      <div>
        <Button
          type={14}
          onClick={showSkipQuestionModal}
          className="mx-auto mt-[24px] lg:mt-[56px]"
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
