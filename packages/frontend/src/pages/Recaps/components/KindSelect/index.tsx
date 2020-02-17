import React from "react";
import Select, { SelectProps, SelectOption } from "../../../../components/Select";
import { RecapKind } from "../../../../interfaces/recaps.interface";

interface KindSelectProps extends Omit<SelectProps, "label" | "options" | "placeholder" | "required"> {
  value: RecapKind | "";
}

type RecapKindOptionMap = {
  [kindLabel in RecapKind]: RecapKind;
};

const recapKindOptionMap: RecapKindOptionMap = {
  ["Work Experience"]: "Work Experience",
  Education: "Education",
  Accomplishments: "Accomplishments",
  Publications: "Publications",
  Skills: "Skills",
  ["Side Projects"]: "Side Projects",
  Organizations: "Organizations",
  References: "References",
  Other: "Other",
};

const kindOptions: SelectOption[] = Object.entries(recapKindOptionMap).map(([kindLabel, kindValue]) => ({
  label: kindLabel,
  value: kindValue,
}));

const KindSelect: React.FC<KindSelectProps> = selectProps => {
  return (
    <Select
      label="Choose what kind of recap"
      options={kindOptions}
      placeholder="Kind of recap i.e. Work Experience, Education..."
      required={true}
      {...selectProps}
    />
  );
};

export default KindSelect;
