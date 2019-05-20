import React from "react";
import { ThemeProvider } from "styled-components";
import Link from "next/link";
import { culdevateDefaultTheme } from "../components/defaultTheme";

const Endeavors: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={culdevateDefaultTheme}>
      <div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/your_daily">
            <a>Your Daily</a>
          </Link>
          <Link href="/recaps">
            <a>Recaps</a>
          </Link>
        </nav>
        <h1>Culdevate</h1>
        <h2>Endeavors</h2>
        <p>High Level Endeavors, Milestones, Tasks</p>
      </div>
    </ThemeProvider>
  );
};

export default Endeavors;
