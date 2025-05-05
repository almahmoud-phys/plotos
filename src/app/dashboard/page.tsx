'use client';

import React, { useState } from 'react';
import FileCard from './components/file-card';
import styles from './page.module.css';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sampleFiles = [
  {
    name: 'Project Proposal.pdf',
    editedDate: new Date('2024-01-15')
  },
  {
    name: 'Meeting Notes.docx',
    editedDate: new Date('2024-01-14')
  },
  {
    name: 'Budget Report.xlsx',
    editedDate: new Date('2024-01-13')
  }
];

const DashboardPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Recent Files</h1>
        <div className={styles.viewControls}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={cn(viewMode === 'grid' && 'bg-accent')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('list')}
            className={cn(viewMode === 'list' && 'bg-accent')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className={cn(styles.fileGrid, viewMode === 'list' && styles.listView)}>
        {sampleFiles.map((file) => (
          <FileCard
            key={file.name}
            title={file.name}
            lastModified={file.editedDate}
            type="Document"
            isStarred
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
