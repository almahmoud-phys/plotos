import { 
  Canvas, 
  Object as FabricObject,
  Rect, 
  Triangle, 
  Circle,
  Line as FabricLine,
  IText,
  Image,
  Object as FabricObjectProps,
  Path
} from 'fabric/fabric-impl';
import { v4 as uuidv4 } from "uuid";

import {
  CustomFabricObject,
  ElementDirection,
  ImageUpload,
  ModifyShape,
} from "@/types";

// Default shape properties
const defaultShapeOptions = {
  cornerColor: '#0066cc',
  cornerSize: 8,
  cornerStyle: 'circle' as 'circle',
  transparentCorners: false,
  strokeWidth: 2,
  strokeUniform: true,
  selectable: true,
  hasControls: true,
} as const;

// Create shape with common properties
const createShapeWithDefaults = <T extends FabricObject>(
  shape: T, 
  pointer: PointerEvent
): T & CustomFabricObject<T> => {
  const commonProps = {
    ...defaultShapeOptions,
    left: pointer.x,
    top: pointer.y,
    objectId: uuidv4(),
    fill: "#aabbcc",
  };

  Object.assign(shape, commonProps);
  return shape as T & CustomFabricObject<T>;
};

export const createRectangle = (pointer: PointerEvent) => {
  const rect = new Rect({
    width: 100,
    height: 100,
  });
  return createShapeWithDefaults(rect, pointer);
};

export const createTriangle = (pointer: PointerEvent) => {
  const triangle = new Triangle({
    width: 100,
    height: 100,
  });
  return createShapeWithDefaults(triangle, pointer);
};

export const createCircle = (pointer: PointerEvent) => {
  const circle = new Circle({
    radius: 50,
  });
  return createShapeWithDefaults(circle, pointer);
};

export const createLine = (pointer: PointerEvent) => {
  const line = new FabricLine([pointer.x, pointer.y, pointer.x + 100, pointer.y + 100], {
    stroke: "#aabbcc",
    strokeWidth: 2,
  });
  return createShapeWithDefaults(line, pointer);
};

export const createText = (pointer: PointerEvent, text: string) => {
  const textObj = new IText(text, {
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    editable: true,
  });
  return createShapeWithDefaults(textObj, pointer);
};

export const createArrow = (pointer: PointerEvent) => {
  const arrow = new Path('M 0 0 L 100 0 L 90 -10 M 100 0 L 90 10', {
    stroke: "#aabbcc",
    strokeWidth: 2,
    fill: '',
  });
  return createShapeWithDefaults(arrow, pointer);
};

export const createStar = (pointer: PointerEvent) => {
  const numPoints = 5;
  const outerRadius = 50;
  const innerRadius = 25;
  const path = [];
  
  for (let i = 0; i < numPoints * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / numPoints;
    const x = radius * Math.sin(angle);
    const y = -radius * Math.cos(angle);
    
    if (i === 0) {
      path.push('M', x, y);
    } else {
      path.push('L', x, y);
    }
  }
  path.push('Z');
  
  const star = new Path(path.join(' '), {
    stroke: "#aabbcc",
    strokeWidth: 2,
    fill: "#aabbcc",
  });
  return createShapeWithDefaults(star, pointer);
};

export const createSpecificShape = (
  shapeType: string,
  pointer: PointerEvent
) => {
  switch (shapeType) {
    case "rectangle":
      return createRectangle(pointer);
    case "triangle":
      return createTriangle(pointer);
    case "circle":
      return createCircle(pointer);
    case "line":
      return createLine(pointer);
    case "arrow":
      return createArrow(pointer);
    case "star":
      return createStar(pointer);
    case "text":
      return createText(pointer, "Tap to Type");
    default:
      console.warn(`Shape type '${shapeType}' not supported`);
      return null;
  }
};

export const createShape = (
  canvas: Canvas,
  pointer: PointerEvent,
  shapeType: string
) => {
  if (shapeType === "freeform") {
    canvas.isDrawingMode = true;
    return null;
  }

  return createSpecificShape(shapeType, pointer);
};

export const handleImageUpload = ({
  file,
  canvas,
  shapeRef,
  syncShapeInStorage,
}: ImageUpload) => {
  // TODO: Implement proper image upload handling for Fabric.js v6
  // Issues to address:
  // 1. Proper type handling for Image.fromURL in v6
  // 2. Error handling for image loading
  // 3. Image scaling and dimension constraints
  // 4. Memory management for large images
  console.warn('Image upload functionality is temporarily disabled');
  
  /* Commented until proper v6 implementation
  const reader = new FileReader();

  reader.onload = () => {
    Image.fromURL(reader.result as string, (img: Image) => {
      if (!img) return;
      
      img.scaleToWidth(200);
      img.scaleToHeight(200);

      canvas.current.add(img);
      (img as CustomFabricObject<Image>).objectId = uuidv4();
      shapeRef.current = img;

      syncShapeInStorage(img);
      canvas.current.requestRenderAll();
    });
  };

  reader.readAsDataURL(file);
  */
};

export const modifyShape = ({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}: ModifyShape) => {
  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // Handle different property types
  switch(property) {
    case "width":
    case "height":
      selectedElement.set(`scale${property === "width" ? "X" : "Y"}`, 1);
      selectedElement.set(property, Number(value));
      break;
    
    case "rotation":
      selectedElement.rotate(Number(value));
      break;
    
    case "opacity":
      selectedElement.set(property, Number(value) / 100);
      break;
      
    case "fontFamily":
    case "fontSize":
    case "fontWeight":
    case "fill":
    case "stroke":
      if (selectedElement[property as keyof object] === value) return;
      selectedElement.set(property as keyof object, value);
      break;
      
    default:
      if (selectedElement[property as keyof object] === value) return;
      selectedElement.set(property as keyof object, value);
  }

  // Update references and storage
  activeObjectRef.current = selectedElement;
  canvas.requestRenderAll();
  syncShapeInStorage(selectedElement);
};

export const bringElement = ({
  canvas,
  direction,
  syncShapeInStorage,
}: ElementDirection) => {
  if (!canvas) return;

  const selectedElement = canvas.getActiveObject();
  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  switch (direction) {
    case "front":
      canvas.bringToFront(selectedElement);
      break;
    case "back":
      canvas.sendToBack(selectedElement);
      break;
  }

  canvas.requestRenderAll();
  syncShapeInStorage(selectedElement);
};

// New utility functions
// export const cloneShape = async (
//   canvas: Canvas,
//   shape: FabricObject,
//   syncShapeInStorage: (shape: FabricObject) => void
// ): Promise<void> => {
//   try {
//     const cloned = await shape.clone();
//     if (!cloned) return;

//     cloned.set({
//       left: (shape.left || 0) + 20,
//       top: (shape.top || 0) + 20,
//       objectId: uuidv4(),
//     });

//     canvas.add(cloned);
//     canvas.setActiveObject(cloned);
//     canvas.requestRenderAll();
//     syncShapeInStorage(cloned);
//   } catch (error) {
//     console.error('Error cloning shape:', error);
//   }
// };

export const deleteShape = (
  canvas: Canvas,
  syncShapeInStorage: (shape: FabricObject | null) => void
) => {
  const selectedElement = canvas.getActiveObject();
  if (!selectedElement) return;
  
  canvas.remove(selectedElement);
  syncShapeInStorage(null);
  canvas.requestRenderAll();
};

export const alignShape = (
  canvas: Canvas,
  alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom',
  syncShapeInStorage: (shape: FabricObject) => void
) => {
  const selectedElement = canvas.getActiveObject();
  if (!selectedElement) return;

  const boundingRect = selectedElement.getBoundingRect();
  const canvasCenter = canvas.getCenter();
  
  let newLeft = selectedElement.left;
  let newTop = selectedElement.top;

  switch(alignment) {
    case 'left':
      newLeft = boundingRect.width / 2;
      break;
    case 'center':
      newLeft = canvasCenter.left;
      break;
    case 'right':
      newLeft = canvas.width! - boundingRect.width / 2;
      break;
    case 'top':
      newTop = boundingRect.height / 2;
      break;
    case 'middle':
      newTop = canvasCenter.top;
      break;
    case 'bottom':
      newTop = canvas.height! - boundingRect.height / 2;
      break;
  }

  selectedElement.set({
    left: newLeft,
    top: newTop,
  });

  canvas.requestRenderAll();
  syncShapeInStorage(selectedElement);
};

export type PointerEvent = { x: number; y: number };