import React, { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { BulletPointInputListProps, BulletPointInputListItem } from "../components/BulletPointInputList";
import { MAX_BULLETPOINTS, MAX_BULLETPOINT_LENGTH, recapBaseErrors } from "../recaps.schema";

export interface UseBulletPointInputListArgs {
  initialBulletPoints: string[];
  idPrefix: string; // i.e. idPrefix = bulletpoint will have each input with id like bulletpoint-0, bulletpoint-1, ...
}

export interface UseBulletPointInputList {
  bulletPointInputList: BulletPointInputListProps["bulletPointInputList"];
  resetBulletPointInputList: (newBulletPoints: string[]) => void;
  onDragEnd: BulletPointInputListProps["onDragEnd"];
  onChangeBulletPointInput: BulletPointInputListProps["onChangeBulletPointInput"];
  onBlurBulletPointInput: BulletPointInputListProps["onBlurBulletPointInput"];
  onDeleteBulletPointInput: BulletPointInputListProps["onDeleteBulletPointInput"];
  onAddBulletPointInput: BulletPointInputListProps["onAddBulletPointInput"];
  isAddBulletPointInputDisabled: BulletPointInputListProps["isAddBulletPointInputDisabled"];
}

const initializeBulletPointInputList = (bulletPoints: string[], idPrefix: string): BulletPointInputListItem[] => {
  if (bulletPoints.length === 0) {
    return [
      {
        value: "",
        id: `${idPrefix}-0`,
        errorInfo: "",
        valid: true,
      },
    ];
  }

  return bulletPoints.map((bulletPoint, index) => ({
    value: bulletPoint,
    id: `${idPrefix}-${index}`,
    errorInfo: "",
    valid: true,
  }));
};

const reorderBulletPointInputList = (
  bulletPointInputList: BulletPointInputListItem[],
  startIndex: number,
  endIndex: number,
): BulletPointInputListItem[] => {
  const currentBulletPointInputList = Array.from(bulletPointInputList);
  const [removedBulletPointIndex] = currentBulletPointInputList.splice(startIndex, 1);
  currentBulletPointInputList.splice(endIndex, 0, removedBulletPointIndex);

  return currentBulletPointInputList;
};

const initializeIsAddBulletPointInputDisabled = (bulletPointInputListLength: number): boolean => {
  return bulletPointInputListLength < MAX_BULLETPOINTS ? false : true;
};

const validateBulletPoint = (bulletPoint: string): string => {
  if (bulletPoint.length > MAX_BULLETPOINT_LENGTH) {
    return recapBaseErrors.bulletPointMaxLength;
  }

  return "";
};

export const useBulletPointInputList = ({
  initialBulletPoints,
  idPrefix,
}: UseBulletPointInputListArgs): UseBulletPointInputList => {
  const [bulletPointInputList, setBulletPointInputList] = useState<BulletPointInputListItem[]>(() =>
    initializeBulletPointInputList(initialBulletPoints, idPrefix),
  );
  const [isAddBulletPointInputDisabled, setIsAddBulletPointInputDisabled] = useState(() =>
    initializeIsAddBulletPointInputDisabled(initialBulletPoints.length),
  );

  const resetBulletPointInputList = (newBulletPoints: string[]) => {
    const newBulletPointInputList = initializeBulletPointInputList(newBulletPoints, idPrefix);
    setBulletPointInputList(newBulletPointInputList);
    const newIsAddBulletPointInputDisabled = initializeIsAddBulletPointInputDisabled(newBulletPoints.length);
    setIsAddBulletPointInputDisabled(newIsAddBulletPointInputDisabled);
  };

  const onDragEnd = (dropResult: DropResult) => {
    const isDroppedOutsideList = !dropResult.destination;
    if (isDroppedOutsideList) {
      return;
    }

    if (dropResult.source && dropResult.destination) {
      const isDroppedAtSamePlaceInList = dropResult.destination.index === dropResult.source.index;
      if (isDroppedAtSamePlaceInList) {
        return;
      }

      const reorderedBulletPointInputList = reorderBulletPointInputList(
        bulletPointInputList,
        dropResult.source.index,
        dropResult.destination.index,
      );

      setBulletPointInputList(reorderedBulletPointInputList);
    }
  };

  const onChangeBulletPointInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;

    const newBulletPointList = bulletPointInputList.map(bulletPointInputListItem => {
      if (bulletPointInputListItem.id === id) {
        return {
          ...bulletPointInputListItem,
          value,
        };
      }

      return bulletPointInputListItem;
    });

    setBulletPointInputList(newBulletPointList);
  };

  const onBlurBulletPointInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    const newBulletPointList = bulletPointInputList.map(bulletPointInputListItem => {
      if (bulletPointInputListItem.id === id) {
        const errorInfo = validateBulletPoint(value);
        const valid = errorInfo === "";

        return {
          ...bulletPointInputListItem,
          errorInfo,
          valid,
        };
      }
      return bulletPointInputListItem;
    });

    setBulletPointInputList(newBulletPointList);
  };

  const onDeleteBulletPointInput = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;

    const newBulletPointInputList = bulletPointInputList
      .filter(bulletPointInputListItem => {
        return bulletPointInputListItem.id !== id;
      })
      .map((bulletPointInputListItem, index) => ({
        ...bulletPointInputListItem,
        id: `${idPrefix}-${index}`,
      }));

    setBulletPointInputList(newBulletPointInputList);
    const newIsAddBulletPointInputDisabled = initializeIsAddBulletPointInputDisabled(newBulletPointInputList.length);
    setIsAddBulletPointInputDisabled(newIsAddBulletPointInputDisabled);
  };

  const onAddBulletPointInput = () => {
    const newBulletPointInputList = [
      ...bulletPointInputList,
      {
        value: "",
        id: `${idPrefix}-${bulletPointInputList.length}`,
        errorInfo: "",
        valid: true,
      },
    ];

    setBulletPointInputList(newBulletPointInputList);
    const newIsAddBulletPointInputDisabled = initializeIsAddBulletPointInputDisabled(newBulletPointInputList.length);
    setIsAddBulletPointInputDisabled(newIsAddBulletPointInputDisabled);
  };

  return {
    bulletPointInputList,
    resetBulletPointInputList,
    onDragEnd,
    onChangeBulletPointInput,
    onBlurBulletPointInput,
    onDeleteBulletPointInput,
    onAddBulletPointInput,
    isAddBulletPointInputDisabled,
  };
};
