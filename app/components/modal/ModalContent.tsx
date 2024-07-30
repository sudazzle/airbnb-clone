import { HtmlHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export const ModalContent: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={clsx('overflow-y-scroll p-6', className)}>
      { children }
    </div>
  )
}