import style from "../styles/main.module.css";

export default function Footer() {
  let year = new Date().getFullYear();
  return (
    <div className={style.footer}>
      <small className={style.small}>
        Created by{" "}
        <a href="https://github.com/benrobo" className={style.link}>
          @benrobo with 💖
        </a>
      </small>
      <small className={style.small}>{year}</small>
    </div>
  );
}
