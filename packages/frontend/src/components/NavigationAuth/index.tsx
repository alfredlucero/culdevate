import React from "react";
import { useHistory } from "react-router-dom";
import Text from "../Text";
import Heading from "../Heading";
import Button from "../Button";

interface NavigationAuthProps {
  username: string;
  onLogOut: () => void;
}

// This must be under a BrowserRouter to use the useHistory hook
const NavigationAuth: React.FC<NavigationAuthProps> = ({ username, onLogOut }) => {
  const history = useHistory();
  const handleLogOut = () => {
    onLogOut();
    history.push("/");
  };
  return (
    <nav className="h-full bg-gray-100">
      <div className="flex justify-between items-center p-4">
        <Text variant="p" bold={true}>
          {username}
        </Text>

        <Button type="button" variant="secondary" onClick={handleLogOut} testId="logOutButton">
          Log Out
        </Button>
      </div>
    </nav>
  );
};

export default NavigationAuth;
