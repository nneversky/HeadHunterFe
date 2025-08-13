import { Select as SelectUi } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchArea } from "../../store/slices/appSlice";
import { IconMapPin } from "@tabler/icons-react";
import "./Select.css";

const Select = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

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
        placeholder="Все города"
        leftSection={<IconMapPin size={16} />}
        onChange={(e) => handleChange(e)}
        itemProp="ssssda"
        data={["Все города", "Москва", "Санкт-Петербург"]}
      />
    </section>
  );
};

export default Select;
