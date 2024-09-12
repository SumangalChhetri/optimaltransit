import React from 'react';

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return <label className="block text-sm font-medium text-gray-700" htmlFor={htmlFor}>{children}</label>;
}
