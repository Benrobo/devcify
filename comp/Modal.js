import style from "../styles/modal.module.css";

export default function Modal({ children }) {
  return (
    <>
      <div className={style.modalCont}>
        <div className={style.content}>{children}</div>
      </div>
    </>
  );
}
