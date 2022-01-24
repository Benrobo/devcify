import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/main.module.css";
import {
  Header,
  UsersCards,
  OrgCards,
  Modal,
  Generate,
  Customize,
  Footer,
} from "../comp/";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalshow, setModalShow] = useState(false);
  const [userdata, setUserData] = useState(null);
  const [orgdata, setOrgData] = useState(null);
  const [search, setSearch] = useState("");
  // generating devcard states
  const [generateloading, setGenerateLoading] = useState(false);
  const [generateError, setGeneratingError] = useState(null);
  const [generateDetails, setGenerateDetails] = useState(null);

  // customize states
  const [customize, setCustomize] = useState(false);
  const [radius, setRadius] = useState(0);
  const [color, setColor] = useState(null);

  const l = (e) => console.log(e);

  useEffect(() => {
    init();
  }, [search]);

  // handle fetching github users initially

  async function init() {
    setLoading(true);
    let userinfo = await getUsers(search);
    let orginfo = await getOrganizations(search);

    // return console.log(userinfo, orginfo);

    if (userinfo && orginfo) {
      if (userinfo.success === false) {
        setError(userinfo.message);
        setLoading(false);
      }

      if (orginfo.success === false) {
        setError(orginfo.message);
        setLoading(false);
      }

      if (orginfo.message) {
        setError(orginfo.message);
        setLoading(false);
        setOrgData(null);
      }

      if (userinfo.res !== undefined) {
        setError("");
        setUserData(userinfo.data);
        setLoading(false);
      }

      if (orginfo.res !== undefined) {
        setError("");
        setOrgData(orginfo.data);
        setLoading(false);
      }
    }
  }

  async function getUserMainGithubInfo(e) {
    let { login, type } = e.target.parentElement.dataset;

    if (type === "user") {
      try {
        setGenerateLoading(true);
        const api = `https://api.github.com/users/${login}`;
        let req = await fetch(api);
        let dataRes = await req.json();

        if (dataRes) {
          // check for github api rate limiting error
          if (dataRes.message !== undefined) {
            setError(dataRes.message);
            setGenerateLoading(false);
          }

          setGenerateDetails(dataRes);
          setGeneratingError(null);
          setGenerateLoading(false);
        }
      } catch (err) {
        setGenerateDetails(null);
        setGeneratingError(err.message);
        setGenerateLoading(false);
        console.log(err.message);
      }
    }

    if (type === "organization") {
      try {
        setGenerateLoading(true);
        const api = `https://api.github.com/orgs/${login}`;
        let req = await fetch(api);
        let dataRes = await req.json();

        if (dataRes) {
          // check for github api rate limiting error
          if (dataRes.message !== undefined) {
            setError(dataRes.message);
            setGenerateLoading(false);
          }

          setGenerateDetails(dataRes);
          setGeneratingError(null);
          setGenerateLoading(false);
        }
      } catch (err) {
        setGenerateDetails(null);
        setGeneratingError(err.message);
        setGenerateLoading(false);
        console.log(err.message);
      }
    }
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Devcify</title>
        <meta
          name="description"
          content="Devcify: easily generate github developer cards."
        />
        <meta
          property="og:title"
          content="Devcify: generate a slick unique github dev badge"
        />
        <meta
          property="og:description"
          content="Generate slick, uniquely github devs card"
        />
        <meta property="og:site_name" content="Devcify" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devcify.netlify.app/" />
        <meta property="og:image" content="/logo.png" />
        {/* twitter */}
        <meta
          name="twitter:card"
          content="Generate slick, uniquely github devs card"
        />
        <meta name="twitter:creator" content="@AlumonaBenaiah" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header setSearch={setSearch} />
      <UsersCards
        setModalShow={setModalShow}
        loadingState={loading}
        data={userdata}
        error={error}
        getUserMainGithubInfo={getUserMainGithubInfo}
      />
      <OrgCards
        setModalShow={setModalShow}
        loadingState={loading}
        data={orgdata}
        error={error}
        getUserMainGithubInfo={getUserMainGithubInfo}
      />
      {modalshow && (
        <Modal>
          <Generate
            setModalShow={setModalShow}
            generateDetails={generateDetails}
            generateError={generateError}
            generateloading={generateloading}
            setCustomize={setCustomize}
            customize={customize}
            radius={radius}
            color={color}
          />
        </Modal>
      )}
      <br />
      <Footer />
      {customize && <Customize setRadius={setRadius} setColor={setColor} />}
      <br />
    </div>
  );
}

async function getUsers(word) {
  try {
    const uapi =
      word === ""
        ? "https://api.github.com/users"
        : `https://api.github.com/users/${word}`;
    let res = await fetch(uapi);
    let data = await res.json();

    return { res, data };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

async function getOrganizations(word) {
  try {
    const orapi =
      word === ""
        ? "https://api.github.com/organizations"
        : `https://api.github.com/orgs/${word}`;

    let res = await fetch(orapi);
    let data = await res.json();

    return { res, data };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}
