import styles from "../styles/layout.module.css";

function Layout({ children }) {
  return (
    <>
      <main className={styles.main}>
        <div>{children}</div>
      </main>
    </>
  );
}

export default Layout;
