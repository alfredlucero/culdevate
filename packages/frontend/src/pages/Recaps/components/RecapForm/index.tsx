import React from "react";

import { Recap } from "../../recaps.interface";

interface RecapFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isSubmitError: boolean;
}

const RecapForm: React.FC<RecapFormProps> = ({}) => {
  return <div>Recap Parent Form</div>;
};

export default RecapForm;
