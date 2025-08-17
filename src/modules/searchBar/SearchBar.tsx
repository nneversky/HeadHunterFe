import "./SearchBar.css";
import { Input, Button } from "@mantine/core";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  inputChange,
  clickOnSearch,
  cleanUpSearch,
} from "../../store/slices/appSlice";
import { IconSearch } from "@tabler/icons-react";
import type { RootState } from "../../store";

const SearchBar = () => {
  const bufferText = useSelector((state: RootState) => state.app.bufferText);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") dispatch(cleanUpSearch());
    dispatch(inputChange({ text: e.target.value }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) dispatch(clickOnSearch());
  };

  return (
    <section className="searchBar">
      <div className="searchBar__title">
        <h2>Список вакансий</h2>
        <span>по профессии Frontend-разработчик</span>
      </div>
      <div className="searchBar__input">
        <Input
          value={bufferText}
          w={403}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => handleChange(e)}
          placeholder="Должность или название компании"
          leftSection={
            <IconSearch
              size={16}
              style={{ color: "#0F0F10", opacity: "0.3" }}
            />
          }
        />
        <Button
          onClick={() => dispatch(clickOnSearch())}
          style={{ fontWeight: "400", backgroundColor: "#4263EB" }}
        >
          Найти
        </Button>
      </div>
    </section>
  );
};

export default SearchBar;
