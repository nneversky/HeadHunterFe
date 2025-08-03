import "./Card.css";
import { Button } from "@mantine/core";

const Card = () => {
  return (
    <section className="card">
      <h1 className="card__title">Frontend разработчик в EdTech продукт</h1>
      <div className="card__salary-experience">
        <span className="salary">80 000 – 170 000 ₽</span>
        <span className="experience">Опыт 1-3 года</span>
      </div>
      <span className="card__company">Kata Academy</span>
      <div className="card__format format--bg">
        <span className="format--text">МОЖНО УДАЛЁННО</span>
      </div>
      <span className="card__city">Набережные Челны</span>
      <div className="card__buttons">
        <Button
          style={{ fontWeight: "400" }}
          variant="filled"
          color="rgba(0, 0, 0, 1)"
        >
          Смотреть вакансию
        </Button>
        <Button
          style={{ fontWeight: "400" }}
          variant="light"
          color="rgba(0, 0, 0, 1)"
        >
          Откликнуться
        </Button>
      </div>
    </section>
  );
};

export default Card;
