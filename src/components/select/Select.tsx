import { Select as SelectUi } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { switchArea } from "../../store/slices/appSlice";
import { IconMapPin } from "@tabler/icons-react";
import type { RootState } from "../../store";
import { useEffect } from "react";
import "./Select.css";

const Select = () => {
  const currentArea = useSelector((state: RootState) => state.app.currentArea);
  const searchText = useSelector((state: RootState) => state.app.searchText);
  const skilsItems = useSelector((state: RootState) => state.app.itemsSkils);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentArea) {
      const newParams = new URLSearchParams(searchParams);
      if (searchText) {
        newParams.set("search", searchText);
      } else {
        newParams.delete("search");
      }

      if (skilsItems.length > 0) {
        newParams.set("skills", skilsItems.join(" "));
      } else {
        newParams.delete("skills");
      }

      if (currentArea === 1) {
        newParams.set("location", "Москва");
      } else if (currentArea === 2) {
        newParams.set("location", "Санкт-Петербург");
      }

      setSearchParams(newParams);
    }
  }, [currentArea, searchText, searchParams, setSearchParams, skilsItems]);

  const handleChange = (e: string | null) => {
    if (e) {
      dispatch(switchArea({ area: e }));
      const newParams = new URLSearchParams(searchParams);

      if (e == "Все города") {
        newParams.delete("location");
      } else {
        newParams.set("location", e);
      }

      setSearchParams(newParams);
    }
  };

  return (
    <section data-testid="select" className="select">
      <SelectUi
        w={296}
        value={
          currentArea === 1
            ? "Москва"
            : currentArea === 2
              ? "Санкт-Петербург"
              : "Все города"
        }
        leftSection={<IconMapPin size={16} />}
        onChange={(e) => handleChange(e)}
        itemProp="ssssda"
        data={["Все города", "Москва", "Санкт-Петербург"]}
      />
    </section>
  );
};

export default Select;
