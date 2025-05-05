'use client';

import { useRef, useEffect, useState, useCallback, forwardRef } from 'react';
import styles from '../workspace.module.css';
import debounce from 'lodash.debounce';
import { fabric } from 'fabric';
import { handleKeyDown } from '@/lib/key-events';

interface CanvasProps {
  onObjectModified?: (obj: fabric.Object) => void;
  onSelectionChange?: (obj: fabric.Object | null) => void;
  selectedTool?: string;
  selectedShape?: string;
}

const initializeFabric = async () => {
  if (typeof window !== 'undefined') {
    const { fabric } = await import('fabric');
    return fabric;
  }
  return null;
};

const CanvasCore = forwardRef<HTMLCanvasElement, CanvasProps>(({ 
  onObjectModified, 
  onSelectionChange,
  selectedTool = 'cursor',
  selectedShape = 'rectangle'
}, ref) => {
  // Core refs
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State tracking refs
  const isDrawing = useRef(false);
  const selectedObject = useRef<fabric.Object | null>(null);
  const clipboard = useRef<fabric.Object | null>(null);
  
  // Canvas state
  const [zoom, setZoom] = useState(1);
  const [selectedToolState, setSelectedToolState] = useState(selectedTool);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const initializeCanvas = useCallback(async () => {
    if (!containerRef.current || !canvasRef.current) return;

    try {
      // Dynamic import of fabric.js
      const fabric = await initializeFabric();
      
      if (!fabric) return;

      // Get container dimensions
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Clean up existing canvas if it exists
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }

      // Initialize Fabric canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
        selection: true,
      });

      // Set up event handlers
      canvas.on('mouse:wheel', (opt) => {
        if (!opt.e) return;
        
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        
        zoom = Math.min(Math.max(0.01, zoom), 20);
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        
        opt.e.preventDefault();
        opt.e.stopPropagation();
        
        setZoom(zoom);
      });

      fabricRef.current = canvas;
    } catch (error) {
      console.error('Error initializing canvas:', error);
    }
  }, []);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !fabricRef.current) return;
      
      const container = containerRef.current;
      const canvas = fabricRef.current;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      canvas.setDimensions({
        width: containerWidth,
        height: containerHeight
      });
      
      setCanvasSize({ width: containerWidth, height: containerHeight });
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, []);

  const addShape = useCallback((shapeType: string, pointer: { x: number, y: number }) => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    let shape;

    const defaultProps = {
      left: pointer.x,
      top: pointer.y,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
    };

    switch (shapeType) {
      case 'rectangle':
        shape = new fabric.Rect({
          ...defaultProps,
          width: 100,
          height: 100,
        });
        break;
      case 'ellipse':
        shape = new fabric.Ellipse({
          ...defaultProps,
          rx: 50,
          ry: 50,
        });
        break;
      case 'line':
        shape = new fabric.Line([pointer.x, pointer.y, pointer.x + 100, pointer.y], {
          ...defaultProps,
        });
        break;
      case 'arrow':
        // Create an arrow using path
        const dx = 100;
        const dy = 0;
        const arrowPath = `M ${pointer.x} ${pointer.y} L ${pointer.x + dx} ${pointer.y + dy} M ${pointer.x + dx - 15} ${pointer.y + dy - 15} L ${pointer.x + dx} ${pointer.y + dy} L ${pointer.x + dx - 15} ${pointer.y + dy + 15}`;
        shape = new fabric.Path(arrowPath, {
          ...defaultProps,
          fill: undefined,
        });
        break;
      case 'polygon':
        const points = [
          { x: 0, y: -50 },
          { x: 43.3, y: 25 },
          { x: -43.3, y: 25 }
        ];
        shape = new fabric.Polygon(points, {
          ...defaultProps,
          left: pointer.x,
          top: pointer.y + 50,
        });
        break;
      case 'star':
        const starPoints = [];
        const spikes = 5;
        const outerRadius = 50;
        const innerRadius = 25;
        
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          starPoints.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          });
        }
        shape = new fabric.Polygon(starPoints, {
          ...defaultProps,
          left: pointer.x,
          top: pointer.y + outerRadius,
        });
        break;
    }

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
  }, []);

  useEffect(() => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    
    const handleMouseDown = (e: any) => {
      if (selectedToolState === 'cursor') return;
      
      const pointer = canvas.getPointer(e.e);
      const target = canvas.findTarget(e.e, false);
      
      // Prevent shape creation if:
      // 1. Clicking on an existing shape
      // 2. Clicking on a control point (for resizing/rotating)
      if (target || e.target) {
        return;
      }
      
      if (selectedShape) {
        addShape(selectedShape, pointer);
      }
    };

    canvas.on('mouse:down', handleMouseDown);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
    };
  }, [selectedToolState, selectedShape, addShape]);

  useEffect(() => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;

    const keyDownHandler = (e: KeyboardEvent) => {
      handleKeyDown({
        e,
        canvas,
        undo: () => {}, // Implement undo functionality if needed
        redo: () => {}, // Implement redo functionality if needed
        syncShapeInStorage: () => {}, // Implement storage sync if needed
        deleteShapeFromStorage: () => {}, // Implement delete from storage if needed
      });
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [fabricRef]);

  return (
    <div ref={containerRef} className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
});

CanvasCore.displayName = 'CanvasCore';

export default CanvasCore;
