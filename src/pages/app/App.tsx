import { MantineProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import "@mantine/core/styles.css";
import Header from "../../modules/header";
import SearchBar from "../../modules/searchBar";
import CardList from "../../modules/cardList";
import Pagination from "../../components/pagination";
import Select from "../../components/select";
import PillsInput from "../../components/pillsInput";
import type { RootState } from "../../store";
import "./App.css";

const App = () => {
  const stateApp = useSelector((state: RootState) => state.app.stateApp);
  const state = stateApp === "vacancies";

  return (
    <section className="app">
      <MantineProvider>
        <Header />

        {state && (
          <>
            <SearchBar />
            <div className="vacancyContainer">
              <div className="sidebar">
                <PillsInput />
                <Select />
              </div>
              <CardList />
            </div>
            <Pagination />
          </>
        )}
      </MantineProvider>
    </section>
  );
};

export default App;
