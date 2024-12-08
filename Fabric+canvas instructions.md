# Important Notice for AI Agents

This documentation is derived from a Figma Clone project implementation and serves as a reference for canvas setup using Fabric.js. When using these instructions, please note:

1. **Project Context**: These instructions are from a specific implementation of a Figma-like collaborative drawing application. While the core concepts are transferable, they should be adapted to fit your project's specific needs.

2. **Adaptation Guidelines**:
   - Evaluate which components are necessary for your use case
   - Modify the collaboration features based on your requirements
   - Adjust the state management approach to match your application's architecture
   - Consider your application's specific performance needs when implementing canvas operations

3. **Implementation Strategy**:
   - Start with the basic canvas setup
   - Gradually add features based on priority
   - Test thoroughly after each major integration
   - Ensure proper error handling for your specific use case

---

# Fabric.js Canvas Setup Guide

## Project Structure Overview

The canvas implementation is organized across three main directories:
- `/app`: Contains the main application setup and canvas initialization
- `/components`: Houses UI components and canvas-related interface elements
- `/lib`: Contains core canvas functionality and utilities

## 1. Canvas Initialization (`/lib/canvas.ts`)

### Basic Setup
```typescript
export const initializeFabric = ({
  fabricRef,
  canvasRef,
}) => {
  const canvasElement = document.getElementById("canvas");
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });
  fabricRef.current = canvas;
  return canvas;
};
```

### Key References
- `fabricRef`: React ref holding the Fabric.js canvas instance
- `canvasRef`: React ref for the HTML canvas element

## 2. Core Components

### Main App Component (`/app/App.tsx`)
- Manages canvas state and initialization
- Handles canvas events and user interactions
- Key state variables:
  ```typescript
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  ```

### Canvas Event Handlers (`/lib/canvas.ts`)

1. Mouse Events:
```typescript
handleCanvasMouseDown: Initiates shape creation
handleCanvaseMouseMove: Handles shape resizing during creation
handleCanvasMouseUp: Finalizes shape creation
```

2. Object Manipulation:
```typescript
handleCanvasObjectModified: Manages object modifications
handleCanvasObjectMoving: Handles object movement
handleCanvasObjectScaling: Manages object scaling
```

3. Zoom and Resize:
```typescript
handleCanvasZoom: Controls canvas zoom (min: 20%, max: 100%)
handleResize: Adjusts canvas dimensions on window resize
```

## 3. Shape Management (`/lib/shapes.ts`)

### Shape Creation
- Shapes are created using Fabric.js objects
- Each shape has a unique ID using UUID
- Supported shapes: Rectangle, Circle, Triangle, Line, and custom shapes

### Shape Modification
```typescript
modifyShape({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
});
```

## 4. UI Components (`/components`)

### Key Components:
1. `LeftSidebar`: Shape selection and tools
2. `RightSidebar`: Property controls (dimensions, color, etc.)
3. `Navbar`: Top navigation and actions

### Property Controls:
- Dimensions: Width and height controls
- Color: Fill and stroke color pickers
- Text: Font family, size, and weight controls

## 5. Live Collaboration Features

### Room Setup (`/app/Room.tsx`)
```typescript
<RoomProvider
  id="fig-room"
  initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
  initialStorage={{ canvasObjects: new LiveMap() }}
>
```

### Cursor and Reactions
- Live cursor tracking
- Real-time reactions and comments
- Collaborative editing synchronization

## 6. Best Practices

1. State Management:
   - Use refs for values needed in event listeners
   - Maintain separate states for UI and canvas objects

2. Performance:
   - Implement proper cleanup in useEffect hooks
   - Use memoization for expensive calculations
   - Optimize canvas rendering

3. Error Handling:
   - Validate canvas operations
   - Handle null checks for refs
   - Manage async operations properly

## 7. Implementation Steps

1. Initialize Canvas:
```typescript
const canvas = initializeFabric({ fabricRef, canvasRef });
```

2. Set Up Event Listeners:
```typescript
useEffect(() => {
  const canvas = fabricRef.current;
  if (!canvas) return;

  canvas.on("mouse:down", handleCanvasMouseDown);
  canvas.on("mouse:move", handleCanvaseMouseMove);
  canvas.on("mouse:up", handleCanvasMouseUp);

  return () => {
    canvas.off("mouse:down", handleCanvasMouseDown);
    canvas.off("mouse:move", handleCanvaseMouseMove);
    canvas.off("mouse:up", handleCanvasMouseUp);
  };
}, []);
```

3. Implement Shape Creation:
```typescript
const handleActiveElement = (elem: ActiveElement) => {
  selectedShapeRef.current = elem.value;
  setActiveElement(elem);
};
```

4. Add Property Controls:
```typescript
const handleInputChange = (property: string, value: string) => {
  modifyShape({
    canvas: fabricRef.current,
    property,
    value,
    activeObjectRef,
    syncShapeInStorage,
  });
};
```

## 8. Additional Features

1. Export Functionality:
```typescript
const exportToPdf = () => {
  const canvas = document.querySelector("canvas");
  // Implementation using jsPDF
};
```

2. Image Upload:
```typescript
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Image upload implementation
};
```

3. Keyboard Shortcuts:
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  // Keyboard shortcut implementations
};
```

## Detailed Shape Implementation Guide

## 1. Shape System Architecture (`/lib/shapes.ts`)

### Core Components

1. **Shape Creation Functions**
```typescript
// Base shape creation functions for each shape type
createRectangle(pointer: PointerEvent)
createTriangle(pointer: PointerEvent)
createCircle(pointer: PointerEvent)
createLine(pointer: PointerEvent)
createText(pointer: PointerEvent, text: string)
```

2. **Factory Function**
```typescript
createSpecificShape(shapeType: string, pointer: PointerEvent)
```

3. **Shape Modification**
```typescript
modifyShape({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}: ModifyShape)
```

### Shape Types and Interfaces

1. **CustomFabricObject Interface**
```typescript
interface CustomFabricObject<T extends fabric.Object> extends fabric.Object {
  objectId?: string;
}
```

2. **Shape Data Structure**
```typescript
type ShapeData = {
  type: string;
  width: number;
  height: number;
  fill: string | Pattern | Gradient;
  left: number;
  top: number;
  objectId: string | undefined;
};
```

## 2. Creating Shapes

### Basic Shape Creation
```typescript
// Example: Creating a rectangle
const rect = new fabric.Rect({
  left: pointer.x,
  top: pointer.y,
  width: 100,
  height: 100,
  fill: "#aabbcc",
  objectId: uuidv4(),  // Unique identifier for collaboration
});
```

### Shape Properties
- **Position**: `left`, `top`
- **Dimensions**: `width`, `height`, `radius` (for circles)
- **Appearance**: `fill`, `stroke`, `strokeWidth`
- **Identification**: `objectId` (UUID for tracking)

## 3. Shape Modification

### Property Modification
```typescript
modifyShape({
  canvas,
  property,  // The property to modify (e.g., 'width', 'height', 'fill')
  value,     // New value for the property
  activeObjectRef,
  syncShapeInStorage,
});
```

### Special Handling
1. **Dimension Changes**:
```typescript
if (property === "width") {
  selectedElement.set("scaleX", 1);
  selectedElement.set("width", value);
} else if (property === "height") {
  selectedElement.set("scaleY", 1);
  selectedElement.set("height", value);
}
```

2. **Style Properties**:
```typescript
// For properties like fill, stroke, etc.
selectedElement.set(property as keyof object, value);
```

## 4. Image Handling

### Image Upload Process
```typescript
handleImageUpload({
  file,
  canvas,
  shapeRef,
  syncShapeInStorage,
}: ImageUpload)
```

Key Steps:
1. Read file using FileReader
2. Create fabric.Image from URL
3. Scale image to reasonable dimensions
4. Add to canvas with unique ID
5. Sync with storage for collaboration

## 5. Shape Management Best Practices

1. **Unique Identification**:
   - Always assign a UUID to new shapes
   - Use objectId for tracking and collaboration

2. **State Management**:
   - Keep track of active objects using refs
   - Sync modifications with storage
   - Handle selection states properly

3. **Error Handling**:
   ```typescript
   if (!selectedElement || selectedElement?.type === "activeSelection") return;
   ```

4. **Performance Considerations**:
   - Use appropriate event handlers
   - Optimize shape rendering
   - Handle canvas updates efficiently

## 6. Implementation Example

```typescript
// 1. Create shape factory instance
const createShape = (canvas, pointer, shapeType) => {
  // Handle freeform drawing mode
  if (shapeType === "freeform") {
    canvas.isDrawingMode = true;
    return null;
  }

  return createSpecificShape(shapeType, pointer);
};

// 2. Add shape to canvas
canvas.add(shape);

// 3. Set up modification handlers
canvas.on('object:modified', (options) => {
  handleCanvasObjectModified({
    options,
    syncShapeInStorage,
  });
});

// 4. Handle shape selection
canvas.on('selection:created', (options) => {
  handleCanvasSelectionCreated({
    options,
    isEditingRef,
    setElementAttributes,
  });
});
```

## 7. Troubleshooting Common Issues

1. **Shape Not Appearing**:
   - Verify pointer coordinates
   - Check canvas boundaries
   - Ensure proper shape initialization

2. **Modification Issues**:
   - Validate property values
   - Check selection state
   - Verify sync operations

3. **Performance Problems**:
   - Optimize event handlers
   - Manage canvas rendering
   - Handle large shapes efficiently

Remember:
- Always sync shape changes with storage
- Handle cleanup properly
- Maintain proper state management
- Consider collaboration aspects when modifying shapes

Remember to:
- Initialize Fabric.js before any canvas operations
- Clean up event listeners in useEffect returns
- Implement proper error handling
- Consider performance optimizations for large canvases
- Test across different browsers and devices
