import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-6">
        {children}
        <h1 className="text-4xl font-bold text-foreground">{title}</h1>
        {subtitle && <div className="text-muted-foreground mt-2">{subtitle}</div>}
      </div>
    </header>
  );
}
