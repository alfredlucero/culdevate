import React, { useEffect, useState } from "react";
import cn from "classnames";
import { reach } from "yup";
import TextInput from "../../../../../components/TextInput";
import BulletPointInputList from "../../BulletPointInputList";
import Button from "../../../../../components/Button";
import { RecapsCreateErrorAlert, RecapsUpdateErrorAlert } from "../../RecapsAlerts";
import { CommonProps } from "../../../../../components/commonProps";
import { RecapReferences, RecapCreate, RecapKind } from "../../../recaps.interface";
import { useBulletPointInputList } from "../../../hooks/useBulletPointInputList";
import { createRecap, updateRecap } from "../../../recaps.service";
import { RecapReferencesSchema, RecapFields } from "../../../recaps.schema";

export interface ReferencesFormProps extends CommonProps {
  initialRecap: RecapReferences | null;
  onSaveSuccess: (savedRecap: RecapReferences) => void;
  isShowing: boolean;
  onHide: () => void;
}

const ReferencesForm: React.FC<ReferencesFormProps> = ({
  initialRecap,
  onSaveSuccess,
  isShowing,
  onHide,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onBlurTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentTitle = e.currentTarget.value;
    try {
      reach(RecapReferencesSchema, "title").validateSync(currentTitle);
      setTitleError("");
    } catch (err) {
      setTitleError(err.message);
    }
  };

  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");
  const onChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.currentTarget.value);
  };
  const onBlurCompany = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentCompany = e.currentTarget.value;
    try {
      reach(RecapReferencesSchema, "company").validateSync(currentCompany);
      setCompanyError("");
    } catch (err) {
      setCompanyError(err.message);
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onBlurEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentEmail = e.currentTarget.value;
    try {
      reach(RecapReferencesSchema, "email").validateSync(currentEmail);
      setEmailError("");
    } catch (err) {
      setEmailError(err.message);
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.currentTarget.value);
  };
  const onBlurPhoneNumber = (e: React.FocusEvent<HTMLInputElement>) => {
    const currentPhoneNumber = e.currentTarget.value;
    try {
      reach(RecapReferencesSchema, "phoneNumber").validateSync(currentPhoneNumber);
      setTitleError("");
    } catch (err) {
      setTitleError(err.message);
    }
  };

  const {
    bulletPointInputList,
    onDragEnd,
    onChangeBulletPointInput,
    onBlurBulletPointInput,
    onAddBulletPointInput,
    onDeleteBulletPointInput,
    isAddBulletPointInputDisabled,
    resetBulletPointInputList,
  } = useBulletPointInputList({
    initialBulletPoints: [],
    idPrefix: "referencesBulletPoint",
  });

  const clearOutInputs = () => {
    setTitle("");
    setTitleError("");
    setCompany("");
    setCompanyError("");
    setPhoneNumber("");
    setPhoneNumberError("");
    setEmail("");
    setEmailError("");
    resetBulletPointInputList([]);
  };

  useEffect(() => {
    // Upon closing out the modal/swapping forms, clear out all the inputs to their default empty values
    if (!isShowing) {
      clearOutInputs();
      return;
    }

    // Upon showing the form/modal to edit a recap, set the inputs to match the recap's initial values
    if (initialRecap !== null) {
      setTitle(initialRecap.title);
      setTitleError("");
      setCompany(initialRecap.company);
      setCompanyError("");
      setEmail(initialRecap.email);
      setEmailError("");
      setPhoneNumber(initialRecap.phoneNumber);
      setPhoneNumberError("");
      resetBulletPointInputList(initialRecap.bulletPoints);
    } else {
      // Otherwise, for creating a modal, clear out all the inputs to their default empty values
      clearOutInputs();
    }
  }, [initialRecap, isShowing]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitCreateError, setIsSubmitCreateError] = useState(false);
  const [isSubmitUpdateError, setIsSubmitUpdateError] = useState(false);
  const onHideSubmitCreateError = () => {
    setIsSubmitCreateError(false);
  };
  const onHideSubmitUpdateError = () => {
    setIsSubmitUpdateError(false);
  };

  const triggerUpdateRecap = () => {
    if (!initialRecap) {
      return;
    }

    const { _id, userId, kind } = initialRecap;
    const updatedBulletPoints = bulletPointInputList
      .filter(bulletPoint => bulletPoint.value !== "")
      .map(bulletPoint => bulletPoint.value);
    const updatedReferencesRecap: RecapReferences = {
      _id,
      userId,
      kind,
      bulletPoints: updatedBulletPoints,
      title,
      company,
      phoneNumber,
      email,
    };

    setIsSubmitting(true);
    updateRecap(updatedReferencesRecap)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitUpdateError(false);
        onSaveSuccess(savedRecap as RecapReferences);
        onHide();
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitUpdateError(true);
      });
  };

  const triggerCreateRecap = () => {
    const updatedBulletPoints = bulletPointInputList
      .filter(bulletPoint => bulletPoint.value !== "")
      .map(bulletPoint => bulletPoint.value);
    const recapToCreate: RecapCreate = {
      kind: RecapKind.References,
      bulletPoints: updatedBulletPoints,
      title,
      company,
      email,
      phoneNumber,
    };

    setIsSubmitting(true);
    createRecap(recapToCreate)
      .then(savedRecap => {
        clearOutInputs();
        setIsSubmitting(false);
        setIsSubmitCreateError(false);
        onSaveSuccess(savedRecap as RecapReferences);
        onHide();
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitCreateError(true);
      });
  };

  const hasValidInputs =
    title &&
    !titleError &&
    company &&
    !companyError &&
    !emailError &&
    !phoneNumberError &&
    bulletPointInputList.every(bulletPointInput => bulletPointInput.valid);
  const isSaveButtonDisabled = isSubmitting || !hasValidInputs;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSaveButtonDisabled) {
      return;
    }

    const isEditingRecap = initialRecap !== null;
    if (isEditingRecap) {
      triggerUpdateRecap();
    } else {
      triggerCreateRecap();
    }
  };

  return (
    <div className={cn("mt-4", className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      <RecapsCreateErrorAlert
        kind={RecapKind.References}
        isShowing={isSubmitCreateError}
        onHide={onHideSubmitCreateError}
        className="mb-4"
      />
      <RecapsUpdateErrorAlert
        kind={RecapKind.References}
        isShowing={isSubmitUpdateError}
        onHide={onHideSubmitUpdateError}
        className="mb-4"
      />
      <form onSubmit={onSubmit}>
        <div className="w-full mb-4">
          <TextInput
            id="title"
            placeholder="What is the name or title of someone you worked with?"
            value={title}
            onChange={onChangeTitle}
            onBlur={onBlurTitle}
            type="text"
            required={true}
            label={RecapFields.referencesTitle}
            valid={!titleError}
            errorInfo={titleError}
            className="mr-4"
          />
        </div>

        <div className="w-full mb-4">
          <TextInput
            id="company"
            placeholder="Which company did you both work together at?"
            value={company}
            onChange={onChangeCompany}
            onBlur={onBlurCompany}
            type="text"
            required={true}
            label={RecapFields.referencesCompany}
            valid={!companyError}
            errorInfo={companyError}
            className="mr-4"
          />
        </div>

        <div className="flex w-full mb-4">
          <TextInput
            id="email"
            placeholder="What is your reference's email?"
            value={email}
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            type="text"
            required={true}
            label={RecapFields.referencesEmail}
            valid={!emailError}
            errorInfo={emailError}
            className="w-1/2 mr-4"
          />
          <TextInput
            id="phoneNumber"
            placeholder="What was your reference's phone number?"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
            onBlur={onBlurPhoneNumber}
            type="text"
            required={true}
            label={RecapFields.referencesPhoneNumber}
            valid={!phoneNumberError}
            errorInfo={phoneNumberError}
            className="w-1/2 mr-4"
          />
        </div>

        <BulletPointInputList
          bulletPointInputList={bulletPointInputList}
          onDragEnd={onDragEnd}
          onChangeBulletPointInput={onChangeBulletPointInput}
          onBlurBulletPointInput={onBlurBulletPointInput}
          onDeleteBulletPointInput={onDeleteBulletPointInput}
          onAddBulletPointInput={onAddBulletPointInput}
          isAddBulletPointInputDisabled={isAddBulletPointInputDisabled}
          className="mb-6"
        />
        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={onHide} className="mr-2">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSaveButtonDisabled}
            testId="referencesSaveButton"
          >
            {isSubmitting && <>Saving Recap...</>}
            {!isSubmitting && <>Save Recap</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReferencesForm;
