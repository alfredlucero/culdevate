export const formRequiredError = ({ field, plural = false }: { field: string; plural?: boolean }) => {
  return `${field} ${plural ? "are" : "is"} required.`;
};

export const formMinLengthError = ({ field, minLength }: { field: string; minLength: number }) => {
  return `${field} must be at least ${minLength} characters.`;
};

export const formMaxLengthError = ({ field, maxLength }: { field: string; maxLength: number }) => {
  return `${field} must be at most ${maxLength} characters.`;
};
