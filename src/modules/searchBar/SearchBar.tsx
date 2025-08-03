import "./SearchBar.css";
import { Input, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
const SearchBar = () => {
  return (
    <section className="searchBar">
      <div className="searchBar__title">
        <h2>Список вакансий</h2>
        <span>по профессии Frontend-разработчик</span>
      </div>
      <div className="searchBar__input">
        <Input
          w={403}
          placeholder="Должность или название компании"
          leftSection={<IconSearch size={16} style={{color : '#0F0F10', opacity : '0.3'}}/>}
        />
        <Button style={{ fontWeight: "400", backgroundColor: "#4263EB" }}>
          Найти
        </Button>
      </div>
    </section>
  );
};

export default SearchBar;
