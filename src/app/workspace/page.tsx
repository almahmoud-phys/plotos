'use client';

import { FC, useState } from 'react';
import styles from './workspace.module.css';
import LeftSidebar from './components/left-sidebar';
import CollapsedLeftSidebar from './components/collapsed-left-sidebar';
import RightSidebar from './components/right-sidebar';
import CollapsedRightSidebar from './components/collapsed-right-sidebar';
import CanvasControls from './components/canvas-controls';
import WorkspaceCanvas from './components/workspace-canvas';
import { Menu } from 'lucide-react';
import { IconButton } from '@radix-ui/themes';
import { Page } from '@/types';

const DEFAULT_PAGES: Page[] = [
  { id: 'page1', title: 'Page 1' },
  { id: 'page2', title: 'Page 2' }
];

const WorkspacePage: FC = () => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [pages] = useState<Page[]>(DEFAULT_PAGES);
  const [activePage] = useState<string>(DEFAULT_PAGES[0].id);

  return (
    <div className={styles.container}>
      {isLeftSidebarCollapsed ? (
        <CollapsedLeftSidebar
          onExpand={() => setIsLeftSidebarCollapsed(false)}
          selectedPageId={activePage}
        />
      ) : (
        <LeftSidebar
          pages={pages}
        //   activePage={activePage}
        selectedPageId={activePage}
          onCollapse={() => setIsLeftSidebarCollapsed(true)}
          onPageSelect={() => {}}
        />
      )}
      <div className={styles.main}>
        <div className={styles.header}>
          <IconButton
            onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
          >
            <Menu />
          </IconButton>
          <CanvasControls />
        </div>
        <WorkspaceCanvas />
      </div>
      {isRightSidebarCollapsed ? (
        <CollapsedRightSidebar
          onExpand={() => setIsRightSidebarCollapsed(false)}
        />
      ) : (
        <RightSidebar onCollapse={() => setIsRightSidebarCollapsed(true)} />
      )}
    </div>
  );
};

export default WorkspacePage;
