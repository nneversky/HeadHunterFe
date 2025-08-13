import type {
  Salary,
  WorkFormat,
  VacancyItem,
} from "../../store/slices/appSlice";
import './SampleCard.css'

const GetSalary = ({ salary }: { salary: Salary | null }) => {
  if (!salary) return null;
  const { from, to, currency } = salary;
  let cur = "₽";

  switch (currency) {
    case "USD":
      cur = "$";
      break;
    case "EUR":
      cur = "€";
      break;
    case "KZT":
      cur = "₸";
      break;
    default:
      cur = currency;
      break;
  }

  if (!from && to)
    return (
      <span className="salary">
        до {to} {cur}
      </span>
    );

  if (from && !to)
    return (
      <span className="salary">
        от {from} {cur}
      </span>
    );

  if (from && to)
    return (
      <span className="salary">
        {from} – {to} {cur}
      </span>
    );
};

const GetWorkFormat = ({ data }: { data: WorkFormat[] }) => {
  const formatData = Array.isArray(data) ? data[0] : data;

  if (!formatData) return null;

  switch (formatData.id) {
    case "REMOTE":
      return (
        <div className="card__format format--bg">
          <span className="format--text">Можно удалённо</span>
        </div>
      );
    case "HYBRID":
      return (
        <div className="card__format format--bg hybrid--bg">
          <span className="format--text">Гибрид</span>
        </div>
      );
    case "ON_SITE":
      return (
        <div className="card__format format--bg site--bg">
          <span className="format--text site--text">Офис</span>
        </div>
      );
    default:
      return null;
  }
};

const SampleCard = (data: VacancyItem) => {
  const { name, salary, experience, employer, work_format, area } = data;

  return (
    <>
      <h1 className="card__title">{name}</h1>
      <div className="card__salary-experience">
        <GetSalary salary={salary} />
        <span className="experience">{experience.name}</span>
      </div>
      <span className="card__company">{employer.name}</span>
      <GetWorkFormat data={work_format} />
      <span className="card__city">{area.name}</span>
    </>
  );
};

export default SampleCard;
