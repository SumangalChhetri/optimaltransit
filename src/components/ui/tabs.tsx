import React from 'react';

export function Tabs({ children }: { children: React.ReactNode }) {
  return <div className="tabs">{children}</div>;
}

export function TabsContent({ children }: { children: React.ReactNode }) {
  return <div className="tabs-content">{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list">{children}</div>;
}

export function TabsTrigger({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="tabs-trigger">{children}</button>;
}
