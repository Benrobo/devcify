import { FaGithub } from "react-icons/fa";
import style from "../styles/cards.module.css";
import { UserLoader } from "../comp/";

function UsersCards({
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
          <h3>Top users</h3>
        </div>
        <br />
        <div className={style.cards}>
          {loadingState ? (
            <UserLoader />
          ) : error === null ? (
            <p>{error}</p>
          ) : data !== null &&
            data.message === undefined &&
            data.login === undefined ? (
            data.map((res, i) => {
              return (
                <div
                  className={style.box}
                  key={i}
                  data-login={res.login}
                  data-type={"user"}
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
                  </div>
                  <br />
                  <a href={res.html_url} target="_blank">
                    <FaGithub className={style.githubIcon} />
                  </a>
                </div>
              );
            })
          ) : error ? (
            <p>{error}</p>
          ) : data !== null && data.message === undefined && data.login ? (
            <div
              className={style.box}
              key={data.login}
              onClick={() => {
                setModalShow(true);
              }}
              data-login={data.login}
              data-type={"user"}
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
              </div>
              <br />
              <a href={data.html_url} target="_blank">
                <FaGithub className={style.githubIcon} />
              </a>
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

export default UsersCards;
