import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@mantine/core/styles.css";
import Header from "../../modules/header";
import SearchBar from "../../modules/searchBar";
import CardList from "../../modules/cardList";
import Pagination from "../../components/pagination";
import Select from "../../components/select";
import PillsInput from "../../components/pillsInput";
import VacancyPage from "../../components/VacancyPage";
import "./App.css";

const App = () => {
  const VacanciesPage = () => {
    return (
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
    );
  };

  return (
    <BrowserRouter>
      <section className="app">
        <MantineProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/vacancies" />} />
            <Route index path="/vacancies" element={<VacanciesPage />} />
            <Route path="/vacancies/:vacancyId" element={<VacancyPage />} />
          </Routes>
        </MantineProvider>
      </section>
    </BrowserRouter>
  );
};

export default App;
