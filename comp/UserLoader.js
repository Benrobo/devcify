import style from "../styles/loader.module.css";

export default function UserLoader() {
  return (
    <>
      {Array.from("12345").map((_, i) => {
        return (
          <div className={style.loaderCard} key={i}>
            <div className={style.img}></div>
            <div className={style.fname}></div>
            <div className={style.aka}></div>
            <div className={style.info}>
              <div className={style.repo}></div>
              <div className={style.follower}></div>
            </div>
          </div>
        );
      })}
    </>
  );
}
