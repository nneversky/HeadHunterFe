import "./ErrorPage.css";
import { Button, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import sadCatImg from "../../assets/image/sad-cat.gif";

const ErrorPage = () => {
  return (
    <section className="errorPage">
      <div className="errorPage__header">
        <div className="text">
          <h1 className="text__title">Упс! Такой страницы не существует</h1>
          <span className="text__description">Давайте перейдём к началу.</span>
        </div>
        <Link to={"/"}>
          <Button color="#4263EB">На главную</Button>
        </Link>
      </div>
      <div className="errorPage__image">
        <Image style={{ borderRadius: "12px" }} src={sadCatImg} />
      </div>
    </section>
  );
};

export default ErrorPage;
