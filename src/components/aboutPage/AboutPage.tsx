import "./AboutPage.css";
import { Button } from "@mantine/core";
import { linkTg } from "../../service/config";

const AboutPage = () => {
  return (
    <section className="aboutPage">
      <div className="aboutPage__description">
        <h2>Я артем, Артем Кузин</h2>
        <span>Пишу код, Пишу на React/TypeScript/RTK.</span>
        <div className="aboutPage__buttons">
          <Button component="a" target="_blank" href={linkTg}>
            TG
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
