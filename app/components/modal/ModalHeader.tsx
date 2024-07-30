import { ReactNode, useContext } from 'react'
import { ModalContext } from './Modal'
import { IoCloseSharp } from 'react-icons/io5'

export const ModalHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('ModalHeader must be used within a Modal')
  }

  const { titleId, onClose } = context

  return <header id={titleId} className="text-lg relative flex justify-center items-center px-6 border-b dark:border-slate-700/40 w-full font-bold text-[1.1rem] text-gray-900 dark:text-white min-h-[64px]">
    <button onClick={onClose} type="button" className="text-gray-400 absolute p-2 rounded-full left-4 hover:text-gray-500 hover:bg-gray-100 text-center">
      <IoCloseSharp color="black" size="18" />
    </button>
    { children }
  </header>
}