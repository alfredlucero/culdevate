import React from "react";
import Link from "next/link";

const Home: React.FC<{}> = () => {
  return (
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
  );
};

export default Home;
