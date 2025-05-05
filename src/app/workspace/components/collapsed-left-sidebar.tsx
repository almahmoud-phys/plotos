'use client';

import { FC } from 'react';
import { 
  DropdownMenu, 
  Flex, 
  IconButton,
  Text
} from '@radix-ui/themes';
import { 
  ChevronDown,
  Menu
} from 'lucide-react';
import Image from 'next/image';

interface CollapsedLeftSidebarProps {
  onExpand: () => void;
  selectedPageId: string;
}

const CollapsedLeftSidebar: FC<CollapsedLeftSidebarProps> = ({ 
  onExpand,
  selectedPageId 
}) => {
  return (
    <Flex 
      direction="column" 
      style={{
        margin: '24px 16px',
        backgroundColor: 'var(--gray-1)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-3)',
        padding: '16px',
        border: '1px solid var(--gray-4)',
        backdropFilter: 'blur(10px)',
        width: 'calc(100% - 32px)',
        maxWidth: '300px',
        height: '72px'
      }}
    >
      <Flex direction="column" gap="3">
        <Flex justify="between" align="center" gap="2">
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

          <Text 
            size="2" 
            weight="medium"
            style={{ 
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              margin: '0 8px'
            }}
          >
            My Awesome Project
          </Text>

          <IconButton 
            variant="ghost" 
            size="3" 
            onClick={onExpand}
          >
            <Menu size={20} />
          </IconButton>
        </Flex>

        {/* <Text size="2" color="gray" style={{ opacity: 0.7 }}>
          {selectedPageId === 'page1' ? 'Page 1' : 'Page 2'}
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default CollapsedLeftSidebar;
