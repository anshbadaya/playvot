import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
}

export interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: number;
  className?: string;
}

export interface SidebarProps {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: 'permanent' | 'temporary' | 'persistent';
}

export interface ContentAreaProps {
  children: ReactNode;
  sidebarOpen?: boolean;
  className?: string;
} 