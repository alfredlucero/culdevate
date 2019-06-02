import React from "react";
import Link from "next/link";

const YourDaily: React.FC<{}> = () => {
  return (
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
  );
};

export default YourDaily;
