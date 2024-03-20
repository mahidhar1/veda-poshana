"use client";
import { mantras } from "@/lib/mantras";
import Head from "next/head";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const styles = {};

function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Audio Player </title>
        <meta name="description" content="Audio Player for mantras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <nav></nav>
      </nav>
      <main>
        {mantras.map((el, i) => (
          <div key={i}>
            <Link href={`${el.slug}`}>
              <div>{el.title}</div>
            </Link>
          </div>
        ))}
      </main>

      {/* <main className={styles.main}>
        <AudioPlayer timeJump={t} />
      </main> */}
    </div>
  );
}

export default Dashboard;
