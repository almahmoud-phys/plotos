'use client';

import { FC, useState, useRef, useEffect } from 'react';
import styles from './workspace.module.css';
import LeftSidebar from './components/left-sidebar';
import RightSidebar from './components/right-sidebar';
import CollapsedLeftSidebar from './components/collapsed-left-sidebar';
import CanvasControls from './components/canvas-controls';
import WorkspaceCanvas from './components/workspace-canvas';
import { Menu } from 'lucide-react';
import { IconButton } from '@radix-ui/themes';
import { Page } from '../../types';
import CollapsedRightSidebar from './components/collapsed-right-sidebar';

const DEFAULT_PAGES: Page[] = [
  { id: 'page1', title: 'Page 1' },
  { id: 'page2', title: 'Page 2' }
];

const WorkspacePage: FC = () => {
  // const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  // const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [pages, setPages] = useState<Page[]>(DEFAULT_PAGES);
  const [currentPageId, setCurrentPageId] = useState<string>(DEFAULT_PAGES[0].id);
  const [isCanvasControlsVisible, setIsCanvasControlsVisible] = useState(true);
  const [selectedTool, setSelectedTool] = useState<string>('cursor');
  const [selectedShape, setSelectedShape] = useState<string>('rectangle');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToolChange = (tool: string) => {
    setSelectedTool(tool);
  };

  const handleShapeSelect = (shape: string) => {
    setSelectedTool('shape');
    setSelectedShape(shape);
  };

  return (
    <div className={styles.workspaceContainer}>
      {isSidebarCollapsed ? (
        <CollapsedLeftSidebar 
          onExpand={toggleSidebar} 
          selectedPageId={currentPageId} 
        />
      ) : (
        <div className={styles.leftSidebar}>
          <LeftSidebar 
            onCollapse={toggleSidebar} 
            pages={pages}
            selectedPageId={currentPageId}
            onPageSelect={setCurrentPageId}
          />
        </div>
      )}
      
      <div className={styles.mainContent}>
        <WorkspaceCanvas
          selectedTool={selectedTool}
          selectedShape={selectedShape}
        />
        {isCanvasControlsVisible && (
          <div className={styles.canvasControlsContainer}>
            <CanvasControls
              onZoomIn={() => {}}
              onZoomOut={() => {}}
              onFitToScreen={() => {}}
              onResetView={() => {}}
              onPan={() => handleToolChange('pan')}
              onCursor={() => handleToolChange('cursor')}
              onFrame={() => {}}
              onChart={() => {}}
              onShapeSelect={handleShapeSelect}
            />
          </div>
        )}
        <WorkspaceCanvas />
      </div>

      {isSidebarCollapsed ? (
        <CollapsedRightSidebar 
          onExpand={toggleSidebar} 
          className={styles.rightSidebarCollapsed} 
        />
      ) : (
        <div className={styles.rightSidebar}>
          <RightSidebar 
            onCollapse={toggleSidebar} 
          />
        </div>
      )}

    </div>
  );
};

const page = () => {
  return <WorkspacePage />;
};

export default page;
