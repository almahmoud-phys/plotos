'use client';

import { FC, PropsWithChildren } from 'react';

const WorkspaceLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
};

export default WorkspaceLayout;
