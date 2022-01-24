import { useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import style from "../styles/head.module.css";

export default function Header({ setSearch }) {
  const [searchText, setSearchText] = useState("");

  function handleSearch(e) {
    if (e.keyCode === 13) {
      setSearch(searchText);
    }
  }

  return (
    <>
      <div className={style.header}>
        <div className={style.top}>
          <div className={style.left}>
            <h1>Hello, 👋👋</h1>
            <small>generate unique profile card.</small>
          </div>
          <div className={style.right}>
            <Image src={logo} />
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.searchCont}>
            <FaSearch className={style.icon} />
            <input
              type="text"
              placeholder="search github users..."
              className={style.input}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                handleSearch(e);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
