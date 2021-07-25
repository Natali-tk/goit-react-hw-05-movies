import s from './Button.module.css';
export default function ButtonGoBack({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={s.btnBack}>
      Go back
    </button>
  );
}
