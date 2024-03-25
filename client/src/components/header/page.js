"use client";
import Link from "next/link";
import React from "react";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <Link href="/">Logo</Link>
      <div>
        <button onClick={() => router.push("/login")}>Login</button>
      </div>
    </header>
  );
};

export default Header;
