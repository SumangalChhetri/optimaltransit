import React from 'react';

export function ScrollArea({ children }: { children: React.ReactNode }) {
  return <div className="overflow-y-auto">{children}</div>;
}
