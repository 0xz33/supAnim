"use client";
import Dots from "./Components/Dots";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Dots />
    </main>
  );
}
