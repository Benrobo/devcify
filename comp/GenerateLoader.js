import style from "../styles/generateLoader.module.css";

export default function GenerateLoader() {
  return (
    <div className={style.generateLBox}>
      <div className={style.top}>
        <div className={style.circleB}>
          <div className={style.avatar}></div>
          <div className={style.langContA}></div>
          <div className={style.langContB}></div>
          <div className={style.langContC}></div>
        </div>
      </div>
      {/* bottom */}
      <div className={style.bottom}>
        <div className={style.top}>
          <h2></h2>
          <h3></h3>
        </div>
        <div className={style.bottom}>
          <div className={style.box}>
            <h2></h2>
          </div>
          <div className={style.box}>
            <h2></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
