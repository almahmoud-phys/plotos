"use client";

import { Box, Flex } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex
      className="h-screen w-screen fixed top-0 left-0 bg-white dark:bg-gray-900 z-50"
      align="center"
      justify="center"
    >
      <Box className="animate-pulse">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
        <div className="h-4 w-48 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </Box>
    </Flex>
  );
}
