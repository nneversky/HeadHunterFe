import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "../../modules/header";
import SearchBar from "../../modules/searchBar";
import CardList from "../../modules/cardList";
import "./App.css";

const App = () => {
  return (
    <section className="app">
      <MantineProvider>
        <Header />
        <SearchBar />
        <div className="vacancyContainer">
          <CardList />
        </div>
      </MantineProvider>
    </section>
  );
};

export default App;
