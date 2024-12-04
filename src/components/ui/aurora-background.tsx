'use client'
import style from './aurora-background.module.css'
import React, { ReactNode } from 'react'

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
}

export const AuroraBackground = ({
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={
        'relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg w-full'
      }
      {...props}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div className={style.auroraBack}></div>
      </div>
      {children}
    </div>
  )
}
