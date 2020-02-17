import React from "react";
import Icon, { IconProps } from "../Icon";

type LoadingIconProps = Omit<IconProps, "variant">;

const LoadingIcon: React.FC<LoadingIconProps> = ({ className = "text-teal-400", ...iconProps }) => {
  return <Icon variant="loadingFan" spin={true} className={className} {...iconProps} />;
};

export default LoadingIcon;
