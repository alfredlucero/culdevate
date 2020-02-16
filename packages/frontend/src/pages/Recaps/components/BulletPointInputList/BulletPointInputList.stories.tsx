import React, { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { storiesOf } from "@storybook/react";
import BulletPointInputList, { BulletPointInputListItem } from "./index";

const StatefulBulletPointInputList = () => {
  const [bulletPointInputList, setBulletPointInputList] = useState<BulletPointInputListItem[]>([
    {
      value: "",
      id: "bulletpoint-0",
      errorInfo: "",
      valid: true,
    },
  ]);

  const handleChangeBulletPointInput = (e: React.FormEvent<HTMLInputElement>) => {
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

  const handleBlurBulletPointInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    const newBulletPointList = bulletPointInputList.map(bulletPointInputListItem => {
      if (bulletPointInputListItem.id === id) {
        const errorInfo = value === "" ? "Bullet point is required." : "";
        const valid = errorInfo === "";
        return {
          ...bulletPointInputListItem,
          valid,
          errorInfo,
        };
      }
      return bulletPointInputListItem;
    });

    setBulletPointInputList(newBulletPointList);
  };

  const handleDeleteBulletPointInput = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;

    const newBulletPointInputList = bulletPointInputList
      .filter(bulletPointInputListItem => {
        return bulletPointInputListItem.id !== id;
      })
      .map((bulletPointInputListItem, index) => ({
        ...bulletPointInputListItem,
        id: `bulletpoint-${index}`,
      }));

    setBulletPointInputList(newBulletPointInputList);
  };

  const handleAddBulletPointInput = () => {
    const newBulletPointInputList = [
      ...bulletPointInputList,
      {
        value: "",
        id: `bulletpoint-${bulletPointInputList.length}`,
        errorInfo: "",
        valid: true,
      },
    ];

    setBulletPointInputList(newBulletPointInputList);
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

  const handleDragEnd = (dropResult: DropResult) => {
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

  return (
    <div>
      <p>Bullet Point Input List</p>
      <BulletPointInputList
        bulletPointInputList={bulletPointInputList}
        onDragEnd={handleDragEnd}
        onChangeBulletPointInput={handleChangeBulletPointInput}
        onBlurBulletPointInput={handleBlurBulletPointInput}
        onDeleteBulletPointInput={handleDeleteBulletPointInput}
        onAddBulletPointInput={handleAddBulletPointInput}
        isAddBulletPointInputDisabled={false}
      />
    </div>
  );
};

storiesOf("RecapsPage/BulletPointInputList", module).add("Stateful Example", () => <StatefulBulletPointInputList />);
