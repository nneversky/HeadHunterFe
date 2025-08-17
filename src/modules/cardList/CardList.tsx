import "./CardList.css";
import { useEffect } from "react";
import { Image } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../store/slices/appSlice";
import Card from "../../components/card";
import sadCatImg from "../../assets/image/sad-cat.gif";
import type { RootState, AppDispatch } from "../../store";

const CardList = () => {
  const itemsSkils = useSelector((state: RootState) => state.app.itemsSkils);
  const items = useSelector((state: RootState) => state.app.items);
  const currentPage = useSelector((state: RootState) => state.app.currentPage);
  const searchText = useSelector((state: RootState) => state.app.searchText);
  const currentArea = useSelector((state: RootState) => state.app.currentArea);
  const statusLoad = useSelector((state: RootState) => state.app.status);
  const dispatch = useDispatch<AppDispatch>();
  const itemsState = items.length > 0;

  useEffect(() => {
    let searchTextParm = "";
    if (searchText.trim().length === 0) {
      searchTextParm = itemsSkils.join(" AND ");
    } else {
      searchTextParm = `${searchText} AND ${itemsSkils.join(" AND ")}`;
    }
    dispatch(
      getItems({
        page: currentPage,
        text: searchTextParm,
        area: currentArea,
      })
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, dispatch, searchText, currentArea, itemsSkils]);

  return (
    <>
      <section className="cardList">
        {!itemsState && statusLoad === "resolved" && (
          <div className="nothing">
            <Image src={sadCatImg} />
          </div>
        )}

        {items.map((item) => {
          return <Card key={item.id} {...item} />;
        })}
      </section>
    </>
  );
};

export default CardList;
