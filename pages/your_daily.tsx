import React from "react";
import { ThemeProvider } from "styled-components";
import Link from "next/link";
import { culdevateDefaultTheme } from "../components/defaultTheme";

const YourDaily: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={culdevateDefaultTheme}>
      <div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/endeavors">
            <a>Endeavors</a>
          </Link>
          <Link href="/recaps">
            <a>Recaps</a>
          </Link>
        </nav>
        <h1>Culdevate</h1>
        <h2>Your Daily</h2>
        <p>Highlights, Insights, Breakthroughs, and Learnings</p>
      </div>
    </ThemeProvider>
  );
};

export default YourDaily;
