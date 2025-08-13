import "./Card.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import SampleCard from "../SampleCard";
import type { VacancyItem } from "../../store/slices/appSlice";

const Card = (data: VacancyItem) => {
  const { id } = data;
  const navigate = useNavigate();

  return (
    <section className="card">
      <SampleCard {...data} />
      <div className="card__buttons">
        <Button
          onClick={() => navigate(`/vacancies/${id}`, { state: { ...data } })}
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
