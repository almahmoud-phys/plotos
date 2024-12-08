"use client";

import { Box, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  
  // Get the page name based on the pathname
  const getPageName = () => {
    if (pathname === "/dashboard") {
      return "Recents";
    }
    const pageName = pathname.split("/").pop() || "Dashboard";
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  return (
    <Box style={{ paddingBottom: '1rem', marginBottom: '1rem' }}>
      <Text size="5" weight="bold" style={{ display: 'block' }}>
        {getPageName()}
      </Text>
      <hr style={{ borderTop: '1px solid #e5e7eb' }} />
    </Box>
  );
}
