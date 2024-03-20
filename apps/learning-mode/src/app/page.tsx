import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <main className={styles.main}>
      Veda Poshana Jai Sai Ram
      <Button appName={"learning-mode"}>SaiRam</Button>
    </main>
  );
}
