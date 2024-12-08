'use client';

import { FC } from 'react';
import styles from '../workspace.module.css';
import { IconButton } from '@radix-ui/themes';
import { Sidebar } from 'lucide-react';

interface RightSidebarProps {
  onCollapse?: () => void;
}

const RightSidebar: FC<RightSidebarProps> = ({ onCollapse }) => {
  return (
    <div className={styles.sidebar}>
      <div className="flex justify-between items-center mb-4">
        <h2>Properties</h2>
        {onCollapse && (
          <IconButton 
            variant="ghost" 
            size="3" 
            onClick={onCollapse}
          >
            <Sidebar size={24} />
          </IconButton>
        )}
      </div>
      {/* Property controls will go here */}
    </div>
  );
};

export default RightSidebar;
