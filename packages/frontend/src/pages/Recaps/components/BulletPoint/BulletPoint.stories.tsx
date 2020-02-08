import React from "react";
import { storiesOf } from "@storybook/react";
import BulletPoint from "./index";

const bulletPoints = [
  "Migrated web app from on-prem nginx servers to AWS S3 and CloudFront",
  "Collaborated with other developers in creating a redesigned Email Activity",
  "Led the Anti-Spoofing project in building a new Single Sender Verification page and revised onboarding flows",
];

storiesOf("Common/BulletPoint", module).add("List of Bullet Points", () => (
  <div>
    <ul>
      {bulletPoints.map((bulletPoint, idx) => {
        return <BulletPoint bulletPoint={bulletPoint} key={idx} className="mb-2" />;
      })}
    </ul>
  </div>
));
