import "./VacancyPage.css";
import { useLocation } from "react-router-dom";
import SampleCard from "../SampleCard";
import { Button } from "@mantine/core";

type PropsTypeObj = {
  str: string;
  title: string;
};

const VacancyPage = () => {
  const location = useLocation();
  const { state } = location;

  const GetReplaceText = (props: PropsTypeObj) => {
    const { str, title } = props;

    if (!str || typeof str !== "string") {
      return null;
    }

    const newStr = str
      .replace(/<highlighttext>/g, "")
      .replace(/<\/highlighttext>/g, "");

    return (
      <>
        <h3>{title}</h3>
        <span>{newStr}</span>
      </>
    );
  };

  return (
    <section className="vacancy-page vacancy">
      <div className="vacancy__card">
        <SampleCard {...state} />
        <div className="card__buttons">
          <form action={state.url} method="get">
            <Button
              component="a"
              href={state.alternate_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: "400" }}
              variant="filled"
              color="rgba(0, 0, 0, 1)"
            >
              Откликнуться на hh.ru
            </Button>
          </form>
        </div>
      </div>
      <div className="vacancy__text text">
        <div className="text__about">
          <GetReplaceText str={state.snippet.responsibility} title="Компания" />
          <GetReplaceText str={state.snippet.requirement} title="О проекте:" />
        </div>
      </div>
    </section>
  );
};

export default VacancyPage;
