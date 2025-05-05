import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Text, Card, Flex, Button } from "@radix-ui/themes";
import {
  FileIcon,
  ClockIcon,
  StarIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './file-card.module.css';

/**
 * Interface for the FileCard component props
 * @property title - The name of the file
 * @property lastModified - When the file was last modified (e.g., "2 hours ago")
 * @property type - The type of file (e.g., "Document", "Spreadsheet")
 * @property isStarred - Whether the file is marked as favorite
 */
interface FileCardProps {
  title: string;
  lastModified: Date;
  type: string;
  isStarred?: boolean;
}

const FileCard: React.FC<FileCardProps> = ({ title, lastModified, type, isStarred = false }) => {
  const router = useRouter();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(lastModified);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/workspace');
  };

  return (
    <div className={styles.card} onClick={handleClick} role="button" tabIndex={0}>
      <Card size="2" className="hover:shadow-lg transition-shadow">
        {/* Main card layout with space between title area and actions */}
        <Flex justify="between" align="center">
          {/* Left side: File icon, title, and metadata */}
          <Flex gap="3" align="center">
            {/* File icon container */}
            <Box className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <FileIcon width={20} height={20} />
            </Box>
            {/* Title and last modified time */}
            <Box>
              <Text size="3" weight="bold">
                {title}
              </Text>
              <Flex gap="2" align="center">
                <ClockIcon width={12} height={12} />
                <Text size="1" color="gray">
                  {formattedDate}
                </Text>
              </Flex>
            </Box>
          </Flex>
          {/* Right side: Action buttons */}
          <Flex gap="2">
            {/* Star/favorite toggle button */}
            <Button variant="ghost" onClick={(e) => { e.stopPropagation(); }}>
              <StarIcon color={isStarred ? "gold" : "gray"} />
            </Button>
            {/* More actions menu button */}
            <Button variant="ghost" onClick={(e) => { e.stopPropagation(); }}>
              <DotsHorizontalIcon />
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default FileCard;
