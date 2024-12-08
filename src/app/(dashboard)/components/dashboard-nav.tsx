"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayersIcon,
  GearIcon,
  StarIcon,
  FileIcon,
  PersonIcon,
  ClockIcon,
  BellIcon,
  ChevronDownIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import styles from './dashboard-nav.module.css';

// Predefined colors for avatars
const avatarColors = [
  { bg: '#F87171', text: 'white' }, // Red
  { bg: '#60A5FA', text: 'white' }, // Blue
  { bg: '#34D399', text: 'white' }, // Green
  { bg: '#A78BFA', text: 'white' }, // Purple
  { bg: '#FBBF24', text: 'white' }, // Yellow
  { bg: '#EC4899', text: 'white' }, // Pink
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

const Avatar = ({ name, image }: { name: string; image?: string | null }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const color = getAvatarColor(name);
  
  if (image) {
    return (
      <div className={styles.avatar} style={{ 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
    );
  }

  return (
    <div 
      className={styles.avatar} 
      style={{ 
        backgroundColor: color.bg,
        color: color.text
      }}
    >
      {initials}
    </div>
  );
};

const navItems = [
  {
    title: "Recents",
    href: "/dashboard",
    icon: ClockIcon,
    description: "Recently viewed files",
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: LayersIcon,
    description: "Your project workspaces",
  },
  {
    title: "Files",
    href: "/dashboard/files",
    icon: FileIcon,
    description: "All your documents",
  },
  {
    title: "Starred",
    href: "/dashboard/starred",
    icon: StarIcon,
    description: "Favorite items",
  },
  {
    title: "Drafts",
    href: "/dashboard/drafts",
    icon: FileIcon,
    description: "Work in progress",
  },
];

const bottomNavItems = [];

export function DashboardNav() {
  const pathname = usePathname();
  const userName = "Mahmoud kjhfkjhfkhjgckhgchgckhgcf"; // This could come from your user context/props
  const [searchQuery, setSearchQuery] = useState('');

  const renderNavItems = (items: typeof navItems) => {
    return items.map((item, index) => {
      const Icon = item.icon;
      const isActive = pathname === item.href;
      
      return (
        <>
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              styles.navItem,
              isActive && styles.navItemActive
            )}
            title={item.description}
          >
            <Icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
          {index === 0 && <hr style={{ borderTop: '1px solid #e5e7eb', margin: '1rem 0' }} />}
        </>
      );
    });
  };

  return (
    <Box className={styles.sidebar}>
      <div className={styles.navHeader} style={{ borderBottom: 'none' }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className={styles.userDropdown}>
              <Avatar name={userName} />
              <span className={styles.userName}>
                <span>{userName}</span>
                <ChevronDownIcon />
              </span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className={styles.userDropdownContent} sideOffset={5} align="start">
              <DropdownMenu.Item className={styles.userDropdownItem}>
                <PersonIcon />
                Profile Settings
              </DropdownMenu.Item>
              <DropdownMenu.Item className={styles.userDropdownItem}>
                <GearIcon />
                Preferences
              </DropdownMenu.Item>
              <DropdownMenu.Separator className={styles.userDropdownSeparator} />
              <DropdownMenu.Item className={styles.userDropdownItem}>
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <button className={styles.notificationButton}>
          <BellIcon className="w-5 h-5" />
        </button>
      </div>

      <nav className={styles.nav}>
        <div className={styles.searchContainer}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.navTop}>
          {renderNavItems(navItems)}
        </div>
        
        <div className={styles.navBottom}>
          <div className={styles.upgradeSection}>
            <Link href="/plans" className={styles.upgradeLink}>
              <LightningBoltIcon className="w-4 h-4" />
              <span>View Plans</span>
            </Link>
          </div>
          {/* <div className={styles.upgradeSeparator}></div>
          {renderNavItems(bottomNavItems)} */}
        </div>
      </nav>
    </Box>
  );
}
