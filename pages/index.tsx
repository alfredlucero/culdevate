import React from "react";
import { ThemeProvider } from "styled-components";
import Link from "next/link";
import { culdevateDefaultTheme } from "../components/defaultTheme";

const Home: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={culdevateDefaultTheme}>
      <div>
        <nav>
          <Link href="/your_daily">
            <a>Your Daily</a>
          </Link>
          <Link href="/endeavors">
            <a>Endeavors</a>
          </Link>
          <Link href="/recaps">
            <a>Recaps</a>
          </Link>
        </nav>
        <h1>Culdevate</h1>
        <h2>Home</h2>
      </div>
    </ThemeProvider>
  );
};

export default Home;
