'use client'
import { useState } from 'react'

interface AsyncButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>
  loadingText?: string
  spinnerClassName?: string
}

export default function AsyncButton({
  onClick,
  disabled,
  children,
  className,
  loadingText,
  spinnerClassName,
  ...rest
}: AsyncButtonProps) {
  const [pending, setPending] = useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!onClick) return
    const result = onClick(e)
    if (result && typeof (result as any).then === 'function') {
      try {
        setPending(true)
        await result
      } finally {
        setPending(false)
      }
    }
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={disabled || pending}
      className={`${className || ''} ${pending ? 'opacity-80 cursor-progress' : ''}`}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <span className={`inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ${spinnerClassName || ''}`} />
          <span>{loadingText || 'Processing...'}</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}


