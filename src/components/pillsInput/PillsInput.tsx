import "./PillsInput.css";
import { useSelector, useDispatch } from "react-redux";
import type { KeyboardEvent } from "react";
import { addSkill, removeSkill } from "../../store/slices/appSlice";
import { useState } from "react";
import type { RootState } from "../../store";
import { PillsInput as PillsInputUi, Pill, Image } from "@mantine/core";
import skillButton from "../../assets/image/skillButton.svg";

const PillsInput = () => {
  const [text, setText] = useState("");
  const skilsItems = useSelector((state: RootState) => state.app.itemsSkils);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addSkill({ skill: text }));
    setText("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) handleClick();
  };

  const handleRemove = (item: string) => {
    dispatch(removeSkill({ skill: item }));
  };

  return (
    <section className="pillsInput">
      <div className="pillsInput__input input">
        <PillsInputUi
          radius="md"
          label={<span className="input__lable">Ключевые навыки</span>}
        >
          <PillsInputUi.Field
            onKeyDown={(e) => handleKey(e)}
            value={text}
            onChange={(e) => setText(e.target.value)}
            h={20}
            w={190}
            placeholder="Навык"
          />
        </PillsInputUi>
        <div onClick={handleClick} className="input__button">
          <Image height={36} src={skillButton} />
        </div>
      </div>
      <div className="pillsInput__group">
        <Pill.Group>
          {skilsItems.map((item: string) => {
            return (
              <Pill
                key={crypto.randomUUID()}
                onRemove={() => handleRemove(item)}
                data-testid={`skill-pill-${item}`}
                withRemoveButton
              >
                {item}
              </Pill>
            );
          })}
        </Pill.Group>
      </div>
    </section>
  );
};

export default PillsInput;
