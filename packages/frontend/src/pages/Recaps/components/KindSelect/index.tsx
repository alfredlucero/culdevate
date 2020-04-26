import React from "react";
import Select, { SelectProps, SelectOption } from "../../../../components/Select";
import { RecapKind } from "../../recaps.interface";

interface KindSelectProps extends Omit<SelectProps, "label" | "options" | "placeholder" | "required"> {
  value: RecapKind | "";
}

const recapKindOptionMap = {
  ...RecapKind,
};

const kindOptions: SelectOption[] = Object.entries(recapKindOptionMap).map(([kindKey, kindValue]) => ({
  label: kindValue,
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
