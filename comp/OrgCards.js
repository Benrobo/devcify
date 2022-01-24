import { FaCheckCircle } from "react-icons/fa";
import style from "../styles/cards.module.css";
import { OrgLoader } from "../comp/";

function OrgCards({
  setModalShow,
  loadingState,
  error,
  data,
  getUserMainGithubInfo,
}) {
  return (
    <>
      <div className={style.userCardCont}>
        <div className={style.head}>
          <h3>Top organizations</h3>
        </div>
        <br />
        <div className={style.cards}>
          {loadingState ? (
            <OrgLoader />
          ) : error ? (
            <p>{error}</p>
          ) : data !== null &&
            data.message === undefined &&
            data.login === undefined ? (
            data
              .sort((a, b) => a - b)
              .map((res, i) => {
                return (
                  <div
                    className={(style.box, style.orgCards)}
                    key={i}
                    data-login={res.login}
                    data-type={"organization"}
                  >
                    <img
                      src={res.avatar_url}
                      className={style.avatar}
                      onClick={(e) => {
                        setModalShow(true);
                        getUserMainGithubInfo(e);
                      }}
                    />
                    <br />
                    <div className={style.userInfo}>
                      <p className={style.fname}>{`@${res.login}`}</p>
                      <p className={style.login}>@organization</p>
                    </div>
                    <FaCheckCircle className={style.githubIcon} />
                  </div>
                );
              })
          ) : error ? (
            <p>{error}</p>
          ) : data !== null && data.message === undefined && data.login ? (
            <div
              className={(style.box, style.orgCards)}
              key={data.login}
              data-login={data.login}
              data-type={"organization"}
            >
              <img
                src={data.avatar_url}
                className={style.avatar}
                onClick={(e) => {
                  setModalShow(true);
                  getUserMainGithubInfo(e);
                }}
              />
              <br />
              <div className={style.userInfo}>
                <p className={style.fname}>{`@${data.login}`}</p>
                <p className={style.login}>@organization</p>
              </div>
              <FaCheckCircle className={style.githubIcon} />
            </div>
          ) : data && data.message ? (
            data.message
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default OrgCards;
