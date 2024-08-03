"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ManualPanel from "@/components/ManualPanel/ManualPanel";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.body}>
        <ManualPanel />
      </div>
    </main>
  );
}
