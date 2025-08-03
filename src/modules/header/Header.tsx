import { useState } from "react";
import logo from "../../assets/image/logoFe.svg";
import AboutImage from "../../ui/about";
import "./Header.css";

const Header = () => {
  const [state, setState] = useState("vacancies");

  const handleClick = (link : string) => {
    if (link === "vacancies") return setState("vacancies");
    if (link === "about") return setState("about");
  };

  return (
    <section className="header">
      <img className="header__logo" onClick={() => window.location.reload()} src={logo} alt="Logo" />
      <div className="header__links link">
        <span
          onClick={() => handleClick("vacancies")}
          className={`link__text ${state === "vacancies" ? "active" : null}`}
        >
          Вакансии FE
        </span>
        <span
          onClick={() => handleClick("about")}
          className={`link__text ${state === "about" ? "active" : null}`}
        >
          <div className="link__text-image">
            <AboutImage active={state === "about" ? true : false} />
          </div>
          Обо мне
        </span>
      </div>
    </section>
  );
};

export default Header;
