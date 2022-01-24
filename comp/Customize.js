import style from "../styles/customize.module.css";

export default function Customize({ setColor, setRadius }) {
  return (
    <div className={style.mainCont}>
      <div className={style.box}>
        <label htmlFor="label">border-radius</label>
        <input
          type="range"
          className={style.slider}
          onChange={(e) => {
            setRadius(e.target.value);
          }}
        />
      </div>
      <div className={style.box}>
        <label htmlFor="label">border-color</label>
        <input
          type="color"
          className={style.color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
