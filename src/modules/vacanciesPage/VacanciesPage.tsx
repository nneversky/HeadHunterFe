import { useEffect } from "react";
import { switchArea } from "../../store/slices/appSlice";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../modules/searchBar";
import CardList from "../cardList";
import Pagination from "../../components/pagination";
import PillsInput from "../../components/pillsInput";
import Tabs from "../../components/tabs";
import type { RootState } from "../../store";
import './VacanciesPage.css'


const VacanciesPage = ({ area }: { area: string }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentArea = useSelector((state: RootState) => state.app.currentArea);

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

export default VacanciesPage;
