import { ButtonHTMLAttributes, useCallback, useRef, MouseEvent } from 'react'
import { clsx } from 'clsx'

export const GradiantButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, disabled, ...rest }) => {
  const refGradiantSpan = useRef<HTMLSpanElement>(null)
    
  const onMouseMoveEventHandler = (e: MouseEvent<HTMLSpanElement>) => {
    const thisElement = refGradiantSpan.current
    if (thisElement && !disabled) {
      var rect = thisElement.getBoundingClientRect()
      var x = (e.clientX - rect.left) / 5
      var y = (e.clientY - rect.top)
      
      thisElement.style.backgroundPosition = `calc((100 - ${x}) * 1%) calc((100 - ${y}) * 1%)`
    }
  }

  return (
    <button {...rest} disabled={disabled} className={clsx(
      'relative overflow-hidden block text-white rounded-lg p-3 w-full',
      { 
        'bg-gray-300 cursor-not-allowed': disabled,
        'bg-gradient-to-r from-[#E61E4D] from-50% via-[#E31C5F] to-[#D70466]': !disabled
      },
      className
    )}>
      <span className="absolute top-0 bottom-0 right-0 left-0 w-full h-full">
        <span
          style={{ transition: 'opacity 1.5s' }}
          onMouseMove={onMouseMoveEventHandler}
          ref={refGradiantSpan}
          className={clsx(
            'absolute opacity-0 top-0 left-0 w-full h-full block bg-[length:200%_200%] bg-gradient-radial-circle-at-center from-[#FF385C] from-20% via-[#e61e4d] from-30% via-[#e31c5f] from-55% via-[#d70466] from-75% via-[#bd1e59] to-[#bd1e59] top-0 width-full height-full left-0',
            { 'hover:opacity-100': !disabled }
          )}>
        </span>
      </span>
      <span className="relative block pointer-events-none">
        {children}
      </span>
    </button>
  )
}