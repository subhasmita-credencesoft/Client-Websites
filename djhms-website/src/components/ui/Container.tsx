import type { ElementType, ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return <Tag className={`${styles.container} ${className ?? ''}`}>{children}</Tag>;
}
