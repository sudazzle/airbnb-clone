'use client'

import { ReactNode, createContext, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const isHTMLElement = (element: any): element is HTMLElement => {
  return element instanceof HTMLElement
}

export const ModalContext = createContext<{ titleId: string, descriptionId: string,  onClose: () => void } | null>(null)

export const Modal: React.FC<{ isOpen: boolean, onClose: () => void, children: ReactNode }> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const modalId =  useRef<string>('modal' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  const titleId = 'modal-title-' + modalId.current
  const descriptionId = 'modal-description-' + modalId.current
  const [documentBody, setDocumentBody] = useState<HTMLElement>()

  const closeModalOnOverlayClick = useCallback((e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.closest('#' + modalId.current)) {
        return
      }
    }

    onClose()
  }, [])

  useEffect(() => {
    if (modalRef.current) {
      const possibleFocusableElements = Array.from(modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      const firstFocusableElement = possibleFocusableElements[0]
      const lastFocusableElement = possibleFocusableElements[possibleFocusableElements.length - 1]
      modalRef.current.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (isHTMLElement(lastFocusableElement) && isHTMLElement(e.target) && isHTMLElement(firstFocusableElement)) {
            if (e.shiftKey && e.target.isSameNode(firstFocusableElement)) {
              e.preventDefault()
              lastFocusableElement.focus()
            } else if (e.target.isSameNode(lastFocusableElement)) {
              e.preventDefault()
              firstFocusableElement.focus()
            }
          }
        }
      })
      
      modalRef.current.focus()
      
      document.addEventListener('click', closeModalOnOverlayClick)
    }
    
    setDocumentBody(document.body)

    return () => {
      document.removeEventListener('click', closeModalOnOverlayClick)
    }
  }, [isOpen])

  return <>
    {
      isOpen && documentBody ? createPortal(
      <ModalContext.Provider value={{ 
        titleId,
        descriptionId,
        onClose
      }}>
        <div>
          <div className="fixed z-30 animate-fade-in left-0 right-0 top-0 bottom-0 h-full w-full bg-black/50">
          </div>
          <div className="fixed flex justify-center items-center z-40 left-0 right-0 top-0 bottom-0">
            <div
              id={modalId.current}
              tabIndex={-1}
              role="dialog"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              aria-modal="true"
              ref={modalRef}
              className="modal animate-slide-in-bottom w-full max-w-[568px] bg-white dark:bg-slate-800 rounded-lg shadow-[0_8px_28px_rgba(0,0,0,0.28)]"
            >
              { children }
            </div>
          </div>
        </div>
      </ModalContext.Provider>, documentBody) : null
    }
  </>
}