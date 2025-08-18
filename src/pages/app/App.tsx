import { MantineProvider } from "@mantine/core";
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
import {
  useLocation,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import type { RootState } from "../../store";
import ErrorPage from "../../components/errorPage";
import AboutPage from "../../components/aboutPage";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />} element={<Layout />}>
        <Route
          path="/"
          index
          element={
            <Navigate
              to={`/vacancies/${currentArea === null ? "all-region" : currentArea === 1 ? "moscow" : "petersburg"}`}
              replace
            />
          }
        />

        <Route
          path="about"
          element={<AboutPage />}
          errorElement={<ErrorPage />}
        />

        <Route path="vacancies" errorElement={<ErrorPage />}>
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
      </Route>
    )
  );

  return (
    <section className="app">
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </section>
  );
};

export default App;
