'use client';

import { ReactNode } from 'react';

interface CollapseProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Collapse({ title, children, defaultOpen = true }: CollapseProps) {
  return (
    <div className="collapse collapse-plus bg-base-100">
      <input type="checkbox" defaultChecked={defaultOpen} />
      <div className="collapse-title text-xl font-medium">
        {title}
      </div>
      <div className="collapse-content">
        {children}
      </div>
    </div>
  );
}
