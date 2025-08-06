import { Select as SelectUi } from "@mantine/core";
import { useDispatch } from "react-redux";
import { switchArea } from "../../store/slices/appSlice";
import { IconMapPin } from "@tabler/icons-react";
import "./Select.css";

const Select = () => {
  const dispatch = useDispatch();

  return (
    <section className="select">
      <SelectUi
        w={296}
        placeholder="Все города"
        leftSection={<IconMapPin size={16} />}
        onChange={(e) => dispatch(switchArea({ area: e }))}
        data={["Все города", "Москва", "Санкт-Петербург"]}
      />
    </section>
  );
};

export default Select;
