import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "../../modules/header";
import VacancyPage from "../../components/vacancyPage";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./App.css";
import type { RootState } from "../../store";
import ErrorPage from "../../components/errorPage";
import AboutPage from "../../components/aboutPage";
import VacanciesPage from "../../modules/vacanciesPage";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {
  const currentArea = useSelector((state: RootState) => state.app.currentArea);

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
