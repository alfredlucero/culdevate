import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import Button from "../../components/Button";
import WorkingSvg from "./components/WorkingSvg";

const LandingPage = () => {
  return (
    <div className="py-2 px-4 h-screen flex flex-col" data-testid="landingPage">
      <div className="w-full my-4 h-48 sm:h-56 md:h-64">
        <WorkingSvg />
      </div>
      <Heading className="text-center mb-4" variant="h3">
        cultivate your development
      </Heading>
      <Text className="text-center mb-6" variant="p">
        your private career highlights
        <br />
        recap your experiences
        <br />
        measure your impact
        <br />
        personal reviews
        <br />
      </Text>
      <div className="w-full flex justify-center">
        <Link to="/signup">
          <Button variant="primary" onClick={() => {}}>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
