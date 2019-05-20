import React from "react";
import Link from "next/link";
import Recap, { RecapProps } from "../components/Recap";

interface RecapsPageProps {
  recaps: RecapProps[];
}

const RecapsPage: React.FC<RecapsPageProps> = ({ recaps }) => {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/your_daily">
          <a>Your Daily</a>
        </Link>
        <Link href="/endeavors">
          <a>Endeavors</a>
        </Link>
      </nav>
      <h1>Culdevate</h1>
      <h2>Recaps</h2>
      <p>Recap for your resume/CV/reflection of experiences</p>
      {recaps.map((recap, idx) => (
        <Recap {...recap} key={idx} />
      ))}
    </div>
  );
};

RecapsPage.defaultProps = {
  recaps: [
    {
      title: "Summaries and Goals",
      subtitle: "Subtitle: Position, Emphasis, Etc.",
      bulletPoints: ["I endeavor to achieve something!", "Software architect!"],
      type: "objectives",
      startDate: "2019/04/20",
      endDate: null,
    },
    {
      title: "Sandia National Labs",
      subtitle: "Subtitle: Position, Emphasis, Etc.",
      bulletPoints: ["Web Developer R&D Intern", "Software Development Technical Intern"],
      type: "work",
      startDate: "2016/06/20",
      endDate: "2017/06/10",
    },
    {
      title: "University of California, Los Angeles",
      subtitle: "BS in Computer Science, 3.56 GPA",
      bulletPoints: ["Upsilon Pi Epsilon Honor Society 2016-2017", "Daily Bruin Web Developer Intern"],
      type: "education",
      startDate: "2013/10/01",
      endDate: "2017/6/10",
    },
    {
      title: "SJB Tennis",
      subtitle: "Spring Season",
      bulletPoints: ["Varsity Tennis all 4 years", "Captain - Senior Year", "MVP - Third Year"],
      type: "extracurricular",
      startDate: "2009/09/15",
      endDate: "2013/5/20",
    },
    {
      title: "Terraform",
      subtitle: "Subtitle: Position, Emphasis, Etc.",
      bulletPoints: ["Learned how to do infrastructure as code with AWS stuff!"],
      type: "skills",
      startDate: "2018/01/10",
      endDate: null,
    },
    {
      title: "Promoted to Software Engineer II",
      subtitle: "Subtitle: Position, Emphasis, Etc.",
      bulletPoints: ["After 1 year and many projects, I earned my stripes!"],
      type: "achievements",
      startDate: "2018/10/20",
      endDate: null,
    },
    {
      title: "Arm in Arm Award",
      subtitle: "Subtitle: Position, Emphasis, Etc.",
      bulletPoints: ["Helped out CGE with Billing Rewrite to steer them back on time."],
      type: "awards",
      startDate: "2019/01/07",
      endDate: "2019/05/20",
    },
    {
      title: "Reference from Sandia Mentors",
      subtitle: "Subtitle: Position, Emphasis, Etc.",
      bulletPoints: ["Can check them out on LinkedIn"],
      type: "proof",
      startDate: "2016/06/20",
      endDate: "2017/06/05",
    },
    {
      title: "Code Complete Book",
      subtitle: "Subtitle: Position, Emphasis, Etc.",
      bulletPoints: ["Finished reading this book!"],
      type: "other",
      startDate: "2018/10/12",
      endDate: "2019/07/25",
    },
  ],
};

export default RecapsPage;
