import style from "../styles/loader.module.css";

export default function OrgLoader() {
  return (
    <>
      {Array.from("12345").map((_, i) => {
        return (
          <div className={style.OrgLoaderCard} key={i}>
            <div className={style.img}></div>
            <div className={style.info}>
              <div className={style.fname}></div>
              <div className={style.aka}></div>
            </div>
          </div>
        );
      })}
    </>
  );
}
