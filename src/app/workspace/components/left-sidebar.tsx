'use client';

import { FC } from 'react';
import { 
  Button, 
  DropdownMenu, 
  Flex, 
  IconButton, 
  Text, 
  Separator,
  SegmentedControl,
  ScrollArea
} from '@radix-ui/themes';
import { 
  ChevronDown, 
  Sidebar,
  Search,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import { Page } from '../../../types';

interface LeftSidebarProps {
  onCollapse?: () => void;
  pages: Page[];
  selectedPageId: string;
  onPageSelect: (pageId: string) => void;
}

const LeftSidebar: FC<LeftSidebarProps> = ({ 
  onCollapse,
  pages,
  selectedPageId,
  onPageSelect
}) => {
  return (
    <Flex direction="column" gap="4" align="start" style={{ height: '100%' }}>
      <Flex className="topNav" justify="between" align="center" width="100%" mb="4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" size="3">
              <Flex align="center" gap="1">
                <Image 
                  src="/images/logo-light.png" 
                  alt="Project Logo" 
                  width={24} 
                  height={24}
                  className="dark:invert"
                />
                <ChevronDown className="chevronIcon" size={16} />
              </Flex>
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Project Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Share Project</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Close Project</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <IconButton 
          className="collapseButton" 
          variant="ghost" 
          size="3" 
          onClick={onCollapse}
        >
          <Sidebar size={24} />
        </IconButton>
      </Flex>
      
      <Button 
        variant="ghost"
        size="2" 
        color="gray" 
        className="text-left hover:text-gray-800 transition-colors"
        style={{ width: '100%', textAlign: 'left' }}
      >
        My Awesome Project
      </Button>

      <Separator size="4" color="gray" my="0" style={{ width: '100%' }} />

      <Flex justify="between" align="center" width="100%">
        <SegmentedControl.Root 
          defaultValue="file" 
          size="2" 
          variant='surface'
        >
          <SegmentedControl.Item value="file">
            File
          </SegmentedControl.Item>
          <SegmentedControl.Item value="assets">
            Assets
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <IconButton variant="ghost" size="2">
          <Search size={16} />
        </IconButton>
      </Flex>

      <Separator size="4" color="gray" my="0" style={{ width: '100%' }} />

      <Flex justify="between" align="center" width="100%">
        <Text size="2" color="gray" weight="bold">Pages</Text>
        <IconButton variant="ghost" size="2">
          <Plus size={16} />
        </IconButton>
      </Flex>
      
      <ScrollArea type="hover" scrollbars="vertical" style={{ height: '100%', width: '100%' }}>
        <Flex direction="column" gap="1" width="100%" align="start">
          {pages.map(page => (
            <Button 
              key={page.id}
              variant="ghost"
              size="2"
              onClick={() => onPageSelect(page.id)}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                padding: '8px 12px',
                backgroundColor: selectedPageId === page.id ? 'var(--gray-3)' : 'transparent',
                outline: 'none',
                border: 'none',
                boxShadow: 'none'
              }}
              className="hover:text-gray-800 transition-colors focus:outline-none"
            >
              {page.title}
            </Button>
          ))}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default LeftSidebar;
