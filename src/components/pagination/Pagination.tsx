import { Pagination as PaginationUi } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { switchPage } from "../../store/slices/appSlice";
import type { RootState } from "../../store";
import "./Pagination.css";

const Pagination = () => {
  const pages = useSelector((state : RootState) => state.app.pages);
  const currentPage = useSelector((state : RootState) => state.app.currentPage);
  const dispatch = useDispatch();

  const handleChange = (e : number) => {
    dispatch(switchPage({ page: e }));
  };

  return (
    <section className="pagination">
      <PaginationUi
        value={currentPage}
        onChange={(e) => handleChange(e)}
        total={pages}
      />
    </section>
  );
};

export default Pagination;
