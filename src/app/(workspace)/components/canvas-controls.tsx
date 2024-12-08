'use client';

import { FC, useState } from 'react';
import { 
  Button, 
  Flex,
  IconButton,
  Tooltip,
  DropdownMenu
} from '@radix-ui/themes';
import { 
  ZoomIn,
  ZoomOut,
  Maximize2,
  Home,
  Hand,
  MousePointer,
  ChevronDown,
  Frame,
  ChartSplineIcon,
  Square,
  Slash,
  ArrowRight,
  Circle,
  Triangle,
  Star,
  Image
} from 'lucide-react';

import { CanvasControlsProps } from '@/types';

const CanvasControls: FC<CanvasControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onResetView,
  onPan,
  onCursor,
  onFrame,
  onChart,
  onShapeSelect
}) => {
  const [selectedTool, setSelectedTool] = useState<'cursor' | 'pan'>('cursor');
  const [selectedShape, setSelectedShape] = useState<string>('rectangle');

  const handleToolChange = (tool: 'cursor' | 'pan') => {
    setSelectedTool(tool);
    if (document && document.body) {
      document.body.style.cursor = tool === 'pan' ? 'grab' : 'default';
    }
    if (tool === 'cursor' && onCursor) {
      onCursor();
    } else if (tool === 'pan' && onPan) {
      onPan();
    }
  };

  const handleShapeSelect = (shape: string) => {
    setSelectedShape(shape);
    if (document && document.body) {
      document.body.style.cursor = 'crosshair';
    }
    if (onShapeSelect) {
      onShapeSelect(shape);
    }
  };

  return (
    <Flex 
      gap="4" 
      align="center" 
      justify="center"
      style={{
        backgroundColor: 'var(--gray-1)',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-2)',
        padding: '8px 12px',
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--gray-4)'
      }}
    >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton size="3" variant="ghost" style={{ padding: '12px' }}>
            <Flex gap="1" align="center">
              {selectedTool === 'cursor' ? <MousePointer size={24} /> : <Hand size={24} />}
              <ChevronDown size={16} />
            </Flex>
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => handleToolChange('cursor')}>
            <Flex gap="2" align="center">
              <MousePointer size={16} />
              <span>Cursor</span>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => handleToolChange('pan')}>
            <Flex gap="2" align="center">
              <Hand size={16} />
              <span>Pan</span>
            </Flex>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton size="3" variant="ghost" style={{ padding: '12px' }}>
            <Flex gap="1" align="center">
              {selectedShape === 'rectangle' && <Square size={24} />}
              {selectedShape === 'line' && <Slash size={24} />}
              {selectedShape === 'arrow' && <ArrowRight size={24} />}
              {selectedShape === 'ellipse' && <Circle size={24} />}
              {selectedShape === 'polygon' && <Triangle size={24} />}
              {selectedShape === 'star' && <Star size={24} />}
              {selectedShape === 'image' && <Image size={24} />}
              <ChevronDown size={16} />
            </Flex>
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => handleShapeSelect('rectangle')}>
            <Flex gap="2" align="center">
              <Square size={16} />
              <span>Rectangle</span>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => handleShapeSelect('line')}>
            <Flex gap="2" align="center">
              <Slash size={16} />
              <span>Line</span>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => handleShapeSelect('arrow')}>
            <Flex gap="2" align="center">
              <ArrowRight size={16} />
              <span>Arrow</span>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => handleShapeSelect('ellipse')}>
            <Flex gap="2" align="center">
              <Circle size={16} />
              <span>Ellipse</span>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => handleShapeSelect('polygon')}>
            <Flex gap="2" align="center">
              <Triangle size={16} />
              <span>Polygon</span>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => handleShapeSelect('star')}>
            <Flex gap="2" align="center">
              <Star size={16} />
              <span>Star</span>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => handleShapeSelect('image')}>
            <Flex gap="2" align="center">
              <Image size={16} />
              <span>Image</span>
            </Flex>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Tooltip content="Frame">
        <IconButton size="3" variant="ghost" onClick={onFrame} style={{ padding: '12px' }}>
          <Frame size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Chart">
        <IconButton size="3" variant="ghost" onClick={onChart} style={{ padding: '12px' }}>
          <ChartSplineIcon size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Zoom In">
        <IconButton size="3" variant="ghost" onClick={onZoomIn} style={{ padding: '12px' }}>
          <ZoomIn size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Zoom Out">
        <IconButton size="3" variant="ghost" onClick={onZoomOut} style={{ padding: '12px' }}>
          <ZoomOut size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Fit to Screen">
        <IconButton size="3" variant="ghost" onClick={onFitToScreen} style={{ padding: '12px' }}>
          <Maximize2 size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Reset View">
        <IconButton size="3" variant="ghost" onClick={onResetView} style={{ padding: '12px' }}>
          <Home size={24} />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default CanvasControls;
