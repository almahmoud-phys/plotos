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
  },
  {
    name: 'Presentation.pptx',
    editedDate: new Date('2024-01-12')
  },
  {
    name: 'Research Paper.pdf',
    editedDate: new Date('2024-01-11')
  },
  {
    name: 'Client Requirements.doc',
    editedDate: new Date('2024-01-10')
  }
];

export default function DashboardPage() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  return (
    <main className={styles.main}>
      <div className={styles.viewSelector}>
        <div className={styles.segmentedControl}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              styles.segmentButton,
              viewType === 'grid' && styles.active
            )}
            onClick={() => setViewType('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              styles.segmentButton,
              viewType === 'list' && styles.active
            )}
            onClick={() => setViewType('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className={cn(styles.grid, viewType === 'list' && styles.listView)}>
        {sampleFiles.map((file, index) => (
          <FileCard
            key={index}
            title={file.name}
            lastModified={file.editedDate}
            type="Document"
            isStarred={false}
          />
        ))}
      </div>
    </main>
  );
}
