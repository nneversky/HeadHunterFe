import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clickOnLink } from "../../store/slices/appSlice";
import logo from "../../assets/image/logoFe.svg";
import AboutImage from "../../ui/about";
import type { RootState } from "../../store";
import "./Header.css";

const Header = () => {
  const state = useSelector((state: RootState) => state.app.stateApp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    if (link === "vacancies") return dispatch(clickOnLink("vacancies"));
    if (link === "about") return dispatch(clickOnLink("about"));
  };

  const handleLogoClick = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <section className="header">
      <img
        className="header__logo"
        onClick={handleLogoClick}
        src={logo}
        alt="Logo"
      />
      <div className="header__links link">
        <Link to={"/vacancies"}>
          <span
            onClick={() => handleClick("vacancies")}
            className={`link__text ${state === "vacancies" ? "active" : null}`}
          >
            Вакансии FE
          </span>
        </Link>
        <Link to={"/about"}>
          <span
            onClick={() => handleClick("about")}
            className={`link__text ${state === "about" ? "active" : null}`}
          >
            <div className="link__text-image">
              <AboutImage active={state === "about" ? true : false} />
            </div>
            Обо мне
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Header;
