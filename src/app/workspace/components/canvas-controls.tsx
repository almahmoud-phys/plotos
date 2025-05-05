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
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [recentTool, setRecentTool] = useState<'cursor' | 'pan'>('cursor');
  const [recentShape, setRecentShape] = useState<string>('rectangle');

  const handleToolChange = (tool: 'cursor' | 'pan') => {
    // Disable previous tool
    if (tool !== selectedTool) {
      if (tool === 'cursor' && onCursor) {
        onCursor();
      } else if (tool === 'pan' && onPan) {
        onPan();
      }
      
      // Reset cursor and tool state
      setSelectedTool(tool);
      setRecentTool(tool);
      document.body.style.cursor = tool === 'pan' ? 'grab' : 'default';
      
      // Disable any active feature
      setActiveFeature(null);
    }
  };

  const handleShapeSelect = (shape: string) => {
    // Disable previous shape if different
    if (shape !== selectedShape) {
      setSelectedShape(shape);
      setRecentShape(shape);
      document.body.style.cursor = 'crosshair';
      
      // Call shape selection handler
      if (onShapeSelect) {
        onShapeSelect(shape);
      }
      
      // Disable any active feature
      setActiveFeature(null);
    }
  };

  const handleFeatureClick = (feature: string, handler?: () => void) => {
    // If clicking the same feature, disable it
    if (activeFeature === feature) {
      setActiveFeature(null);
      handler?.();
    } else {
      // Set new active feature and call its handler
      setActiveFeature(feature);
      handler?.();
      
      // Reset shape and tool selection
      setSelectedShape(null);
      setSelectedTool('cursor');
      document.body.style.cursor = 'default';
    }
  };

  // Helper function to get the correct icon based on recent selection
  const getToolIcon = () => {
    if (selectedTool === 'cursor') return <MousePointer size={24} />;
    return <Hand size={24} />;
  };

  const getShapeIcon = () => {
    switch (recentShape) {
      case 'rectangle': return <Square size={24} />;
      case 'line': return <Slash size={24} />;
      case 'arrow': return <ArrowRight size={24} />;
      case 'ellipse': return <Circle size={24} />;
      case 'polygon': return <Triangle size={24} />;
      case 'star': return <Star size={24} />;
      case 'image': return <Image size={24} />;
      default: return <Square size={24} />;
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
        <Flex align="center" gap="2">
          <IconButton size="3" variant="ghost" style={{ padding: '12px' }}>
            {getToolIcon()}
          </IconButton>
          <DropdownMenu.Trigger>
            <IconButton size="3" variant="ghost" style={{ padding: '12px' }}>
              <ChevronDown size={16} />
            </IconButton>
          </DropdownMenu.Trigger>
        </Flex>
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
        <Flex align="center" gap="2">
          <IconButton size="3" variant="ghost" style={{ padding: '12px' }}>
            {getShapeIcon()}
          </IconButton>
          <DropdownMenu.Trigger>
            <IconButton size="3" variant="ghost" style={{ padding: '12px' }}>
              <ChevronDown size={16} />
            </IconButton>
          </DropdownMenu.Trigger>
        </Flex>
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
        <IconButton size="3" variant="ghost" onClick={() => handleFeatureClick('frame', onFrame)} style={{ padding: '12px' }}>
          <Frame size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Chart">
        <IconButton size="3" variant="ghost" onClick={() => handleFeatureClick('chart', onChart)} style={{ padding: '12px' }}>
          <ChartSplineIcon size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Zoom In">
        <IconButton size="3" variant="ghost" onClick={() => handleFeatureClick('zoomIn', onZoomIn)} style={{ padding: '12px' }}>
          <ZoomIn size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Zoom Out">
        <IconButton size="3" variant="ghost" onClick={() => handleFeatureClick('zoomOut', onZoomOut)} style={{ padding: '12px' }}>
          <ZoomOut size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Fit to Screen">
        <IconButton size="3" variant="ghost" onClick={() => handleFeatureClick('fitToScreen', onFitToScreen)} style={{ padding: '12px' }}>
          <Maximize2 size={24} />
        </IconButton>
      </Tooltip>

      <Tooltip content="Reset View">
        <IconButton size="3" variant="ghost" onClick={() => handleFeatureClick('resetView', onResetView)} style={{ padding: '12px' }}>
          <Home size={24} />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default CanvasControls;
