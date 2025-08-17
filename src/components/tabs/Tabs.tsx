import { Tabs as TabsUi } from "@mantine/core";
import type { TabsTabProps } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import "./Tabs.css";

const Tabs = () => {
  const location = useLocation();
  const activeTab =
    (location.pathname.split("/").at(-1) as
      | "moscow"
      | "petersburg"
      | "all-region") || "moscow";

  return (
    <section className="tabs">
      <TabsUi
        style={{ display: "flex" }}
        value={activeTab}
        color="#364FC7"
        defaultValue="moscow"
      >
        <TabsUi.Tab
          value="moscow"
          component={(
            props: React.ComponentPropsWithoutRef<"a"> & TabsTabProps
          ) => <Link to="/vacancies/moscow" {...props} />}
        >
          Москва
        </TabsUi.Tab>
        <TabsUi.Tab
          value="petersburg"
          component={(
            props: React.ComponentPropsWithoutRef<"a"> & TabsTabProps
          ) => <Link to="/vacancies/petersburg" {...props} />}
        >
          Санкт-Петербург
        </TabsUi.Tab>
        <TabsUi.Tab
          value="all-region"
          component={(
            props: React.ComponentPropsWithoutRef<"a"> & TabsTabProps
          ) => <Link to="/vacancies/all-region" {...props} />}
        >
          Все регионы
        </TabsUi.Tab>
      </TabsUi>
    </section>
  );
};

export default Tabs;
