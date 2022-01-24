import { useRef, useContext, useEffect } from "react";
import { toPng } from "html-to-image";
import { GenerateLoader } from "./";
import {
  FaDownload,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaReact,
  FaCss3Alt,
  FaHtml5,
  FaBook,
  FaTimes,
  FaPencilAlt,
  FaGitAlt,
} from "react-icons/fa";
import style from "../styles/generate.module.css";

export default function Generate({
  setModalShow,
  generateDetails,
  generateError,
  generateloading,
  setCustomize,
  customize,
  radius,
  color,
}) {
  let container = useRef(null);

  function handleGeneratingImage() {
    let node = container.current;
    toPng(node)
      .then(function (dataUrl) {
        downloadPng(dataUrl);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  function downloadPng(base64) {
    let a = document.createElement("a");
    a.download = "devcard.png";
    a.href = base64;
    a.click();
  }

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  // handle changing of border cards.
  useEffect(() => {
    let card = document.querySelector("[data-card]");

    if (card !== null) {
      card.style.borderRadius = `${radius}px`;
      card.style.border = `4px solid ${color}`;
    }
  }, [radius, color]);

  let lang = ["a", "b"];
  let rand;

  return (
    <>
      <div className={style.generateMain}>
        {generateloading ? (
          <GenerateLoader />
        ) : generateError !== null ? (
          <p>{generateError}</p>
        ) : (
          <div className={style.generateBox} data-card ref={container}>
            <div className={style.top}>
              <div className={style.circleB}>
                <img
                  src={generateDetails.avatar_url}
                  alt=""
                  className={style.avatar}
                />

                {lang[rand] == "a" ? (
                  <>
                    <FaReact className={style.langContA} />
                    <FaNodeJs className={style.langContB} />
                    <FaCss3Alt className={style.langContC} />
                  </>
                ) : (
                  <>
                    <FaGitAlt className={style.langContA} />
                    <FaHtml5 className={style.langContB} />
                    <FaPython className={style.langContC} />
                  </>
                )}
              </div>
            </div>
            <div className={style.bottom}>
              <div className={style.top}>
                <h2>
                  {generateDetails.name === undefined
                    ? generateDetails.login
                    : generateDetails.name.length >= 20
                    ? generateDetails.name.slice(0, 15) + "..."
                    : generateDetails.name}
                </h2>
                <h3>@{generateDetails.login}</h3>
              </div>
              <div className={style.bottom}>
                <div className={style.box}>
                  <h2>{numberWithCommas(generateDetails.public_repos)}</h2>
                  <FaBook className={style.icon} />
                </div>
                <div className={style.box}>
                  <h2>{numberWithCommas(generateDetails.followers)}</h2>
                  <FaGithub className={style.icon} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={style.action}>
          <FaDownload
            className={style.download}
            onClick={handleGeneratingImage}
          />
          <FaPencilAlt
            className={style.share}
            onClick={() => {
              setCustomize(!customize);
            }}
          />
          <FaTimes
            className={style.close}
            onClick={() => {
              setModalShow(false);
              setCustomize(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
