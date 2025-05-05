'use client';

import { useRef } from 'react';
import styles from '../workspace.module.css';
import CanvasCore from './canvas-core';
import { fabric } from 'fabric';

interface WorkspaceCanvasProps {
  selectedTool?: string;
  selectedShape?: string;
}

const WorkspaceCanvas = ({ 
  selectedTool = '', 
  selectedShape = '' 
}: WorkspaceCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleObjectModified = (obj: fabric.Object) => {
    console.log('Object modified:', obj);
  };

  const handleSelectionChange = (obj: fabric.Object | null) => {
    // Convert fabric.Object to CanvasObject if needed
    // const canvasObject = obj ? { id: obj.id } : null;
    // console.log('Selection changed:', canvasObject);
  };

  return (
    <div className={styles.canvasContainer}>
      <CanvasCore
        ref={canvasRef}
        selectedTool={selectedTool}
        selectedShape={selectedShape}
        onObjectModified={handleObjectModified}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};

export default WorkspaceCanvas;
