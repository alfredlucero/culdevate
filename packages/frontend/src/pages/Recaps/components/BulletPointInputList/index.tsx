import React from "react";
import cn from "classnames";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import BulletPointInput, { BulletPointInputProps } from "../BulletPointInput";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import { CommonProps } from "../../../../components/commonProps";
import "./index.css";

export interface BulletPointInputListProps extends CommonProps {
  bulletPointInputList: BulletPointInputListItem[];
  onDragEnd: (dropResult: DropResult) => void;
  onChangeBulletPointInput: BulletPointInputProps["onChange"];
  onBlurBulletPointInput: BulletPointInputProps["onBlur"];
  onDeleteBulletPointInput: BulletPointInputProps["onDelete"];
  onAddBulletPointInput: () => void;
  isAddBulletPointInputDisabled: boolean;
}

export interface BulletPointInputListItem {
  value: string;
  id: string;
  errorInfo: string;
  valid: boolean;
}

const BulletPointInputList: React.FC<BulletPointInputListProps> = ({
  bulletPointInputList,
  onDragEnd,
  onChangeBulletPointInput,
  onBlurBulletPointInput,
  onDeleteBulletPointInput,
  onAddBulletPointInput,
  isAddBulletPointInputDisabled,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={cn(className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
        <Droppable droppableId="bulletPointInputList">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn(
                {
                  "bg-gray-300": !snapshot.isDraggingOver,
                  "bg-green-200": snapshot.isDraggingOver,
                },
                "pt-6",
                "px-4",
                "pb-4",
                "bullet-point-list-droppable",
              )}
            >
              {bulletPointInputList.map((bulletPointInputListItem, index) => (
                <Draggable key={bulletPointInputListItem.id} draggableId={bulletPointInputListItem.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        {
                          "bg-white": !snapshot.isDragging,
                          "bg-blue-200": snapshot.isDragging,
                        },
                        "hover:bg-blue-100",
                        "rounded",
                      )}
                    >
                      <BulletPointInput
                        onChange={onChangeBulletPointInput}
                        onBlur={onBlurBulletPointInput}
                        onDelete={onDeleteBulletPointInput}
                        value={bulletPointInputListItem.value}
                        id={bulletPointInputListItem.id}
                        valid={bulletPointInputListItem.valid}
                        errorInfo={bulletPointInputListItem.errorInfo}
                        className="mb-2"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  type="button"
                  disabled={isAddBulletPointInputDisabled}
                  onClick={onAddBulletPointInput}
                  className="mt-4 flex items-center"
                >
                  <Icon variant="plus" size="small" className="mr-2 add-bullet-point-plus-icon" />
                  Add Bullet Point
                </Button>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default BulletPointInputList;
