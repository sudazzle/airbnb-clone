import { ReactNode, useContext } from 'react'
import { ModalContext } from './Modal'

export const ModalFooter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('ModalHeader must be used within a Modal')
  }

  const { titleId, onClose } = context

  return <footer className="px-6 border-t dark:border-slate-700/40 py-0">
    { children }
  </footer>
}