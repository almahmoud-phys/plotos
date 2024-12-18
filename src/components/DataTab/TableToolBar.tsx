import { Button, UndoIcon, RedoIcon, MaximizeIcon } from "@canva/app-ui-kit";
import React, { useRef } from "react";
import { TbColumnInsertRight, TbRowInsertBottom, TbRowRemove, TbColumnRemove } from "react-icons/tb";

interface TableToolBarProps {
  onAddRow: () => void;
  onDeleteRow: () => void;
  onAddColumn: () => void;
  onDeleteColumn: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onFileUpload: (file: File) => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const TableToolBar: React.FC<TableToolBarProps> = ({
  onAddRow,
  onDeleteRow,
  onAddColumn,
  onDeleteColumn,
  onUndo,
  onRedo,
  onFileUpload,
  canUndo,
  canRedo,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
      // Reset the input so the same file can be uploaded again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        <Button
          variant="tertiary"
          icon={() => <TbRowInsertBottom size={20} />}
          onClick={onAddRow}
          tooltipLabel="Add Row"
        />
        <Button
          variant="tertiary"
          icon={() => <TbRowRemove size={20} />}
          onClick={onDeleteRow}
          tooltipLabel="Delete Row"
        />
        <div style={{ width: '1px', background: '#e5e5e5', margin: '0 4px' }} />
        <Button
          variant="tertiary"
          icon={() => <TbColumnInsertRight size={20} />}
          onClick={onAddColumn}
          tooltipLabel="Add Column"
        />
        <Button
          variant="tertiary"
          icon={() => <TbColumnRemove size={20} />}
          onClick={onDeleteColumn}
          tooltipLabel="Delete Last Column"
        />
        <div style={{ width: '1px', background: '#e5e5e5', margin: '0 4px' }} />
        <Button
          variant="tertiary"
          icon={UndoIcon}
          onClick={onUndo}
          tooltipLabel="Undo"
          disabled={!canUndo}
        />
        <Button
          variant="tertiary"
          icon={RedoIcon}
          onClick={onRedo}
          tooltipLabel="Redo"
          disabled={!canRedo}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          id="csvInput"
        />
      </div>
      <Button
          variant="tertiary"
          icon={MaximizeIcon}
          onClick={onRedo}
          tooltipLabel="Redo"
          disabled={!canRedo}
        />
    </div>
  );
};