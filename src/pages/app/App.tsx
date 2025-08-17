import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@mantine/core/styles.css";
import Header from "../../modules/header";
import SearchBar from "../../modules/searchBar";
import CardList from "../../modules/cardList";
import Pagination from "../../components/pagination";
import PillsInput from "../../components/pillsInput";
import VacancyPage from "../../components/vacancyPage";
import Tabs from "../../components/tabs";
import { useDispatch, useSelector } from "react-redux";
import { switchArea } from "../../store/slices/appSlice";
import { useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import type { RootState } from "../../store";

const App = () => {
  const dispatch = useDispatch();
  const currentArea = useSelector((state: RootState) => state.app.currentArea);

  const VacanciesPage = ({ area }: { area: string }) => {
    const location = useLocation();

    useEffect(() => {
      dispatch(switchArea({ area: location.pathname.split("/").at(-1) }));
    }, [area, dispatch, currentArea]);

    return (
      <>
        <SearchBar />
        <div className="vacancyContainer">
          <div className="sidebar">
            <PillsInput />
          </div>
          <div>
            <Tabs />
            <CardList />
          </div>
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
            <Route
              path="/"
              element={
                <Navigate
                  to={`/vacancies/${currentArea === null ? "all-region" : currentArea === 1 ? "moscow" : "petersburg"}`}
                  replace
                />
              }
            />

            <Route path="vacancies">
              <Route path=":vacancyId" element={<VacancyPage />} />
              <Route path="moscow" element={<VacanciesPage area="moscow" />} />
              <Route
                path="petersburg"
                element={<VacanciesPage area="petersburg" />}
              />
              <Route
                path="all-region"
                element={<VacanciesPage area="all-region" />}
              />
            </Route>
          </Routes>
        </MantineProvider>
      </section>
    </BrowserRouter>
  );
};

export default App;
