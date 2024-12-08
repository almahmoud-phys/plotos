"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/layout/main-nav";
import { LoginDialog } from "@/features/auth/components/LoginDialog";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-header-container">
        <Link href="/" className="site-header-logo">
          <Image
            src="/images/logo-light.png"
            alt="Plotos.ai Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </Link>

        <MainNav />

        <div className="site-header-buttons">
          <Link href="/contact" className="btn btn-ghost">
            Contact Sales
          </Link>
          <LoginDialog />
          <Link href="/signup" className="btn btn-solid">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
