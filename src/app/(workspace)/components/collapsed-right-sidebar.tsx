'use client';

import { FC } from 'react';
import { 
  DropdownMenu, 
  Flex, 
  IconButton,
  Text,
  Avatar
} from '@radix-ui/themes';
import { 
  Share2,
  User
} from 'lucide-react';

interface CollapsedRightSidebarProps {
  onExpand: () => void;
  className?: string;
}

const CollapsedRightSidebar: FC<CollapsedRightSidebarProps> = ({ 
  onExpand,
  className
}) => {
  return (
    <Flex 
      direction="column" 
      className={className}
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
              <Avatar
                src="/images/default-avatar.png"
                fallback={<User />}
                size="3"
                radius="full"
                style={{ cursor: 'pointer' }}
                width={24} 
                height={24}

              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
              <DropdownMenu.Item>Settings</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red">Logout</DropdownMenu.Item>
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
            User Profile
          </Text>

          <IconButton 
            variant="ghost" 
            size="3" 
            onClick={onExpand}
          >
            <Share2 size={20} />
          </IconButton>
        </Flex>

        {/* <Text size="2" color="gray" style={{ opacity: 0.7 }}>
          Collaboration Tools
        </Text> */}
      </Flex>
    </Flex>
  );
};

export default CollapsedRightSidebar;
