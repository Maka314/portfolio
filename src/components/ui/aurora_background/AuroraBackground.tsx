'use client';
import style from './AuroraBackground.module.css';
import React, { ReactNode } from 'react';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const AuroraBackground = ({ children, ...props }: AuroraBackgroundProps) => {
  return (
    <div
      className={
        'transition-bg relative flex h-[100vh] w-full flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900'
      }
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className={style.auroraBack}></div>
      </div>
      {children}
    </div>
  );
};
