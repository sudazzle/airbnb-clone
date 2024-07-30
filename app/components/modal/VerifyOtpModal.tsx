'use client'

import React from 'react'
import { phoneNumber, setOpt, otp, isOtpVerifyModalOpen, isCodeInputFocused, setIsCodeInputFocused } from '@/app/states/auth'
import { useSignals } from '@preact/signals-react/runtime'
import { Modal } from './Modal'
import { ModalHeader } from './ModalHeader'
import { ModalContent } from './ModalContent'
import { sanitizePhoneNumber } from '@/utils/helpers'
import { FaExclamationCircle } from 'react-icons/fa'
import { GradiantButton } from '../GradiantButton'
import { ModalFooter } from './ModalFooter'
import { clsx } from 'clsx'

export const VerifyOtpModal = () => {
  useSignals()

  return (
    <Modal onClose={() => {
      setOpt('')
    }} isOpen={isOtpVerifyModalOpen.value}>
      <ModalHeader>Confirm your number</ModalHeader>
      <ModalContent className="pb-8">
        <p className="mb-5 dark:text-slate-400">Enter the code we&apos;ve sent via SMS to +47 45848680:</p>
        <div className={clsx(
          'py-3.5 w-[186px] px-5 rounded-lg',
          {
            'shadow-[inset_0_0_0_2px_#222222] dark:shadow-[inset_0_0_0_2px_#69696a]': isCodeInputFocused.value,
            'shadow-[inset_0_0_0_1px_#B0B0B0] dark:shadow-[inset_0_0_0_1px_#434649]': !isCodeInputFocused.value,
          })
        }>
          <input
            onFocus={() => setIsCodeInputFocused(true) }
            onBlur={() => setIsCodeInputFocused(false) }
            maxLength={6}
            autoComplete="one-time-code"
            type="tel"
            placeholder="------"
            className="w-[166px] placeholder:text-center bg-transparent outline-none border-none tracking-[18px]" value={otp.value} name="code" onChange={(e) => {
              if (isNaN(Number(e.target.value)) === false) {
                setOpt(e.target.value)
              }
          }} />
        </div>
        <div className="flex text-xs text-red-600 mt-3 leading-tight">
          <span className="inline-block mr-2 mt-0.5">
            <FaExclamationCircle />
          </span>
          <span>
            Sorry, we are not able to verify the code. Please make sure you enter the right mobile number and code.
          </span>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-end my-4">
          <GradiantButton disabled={otp.value.length < 6} className="!w-auto px-7" onClick={() => {
            fetch('/api/auth/verify-otp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                phoneNumber: sanitizePhoneNumber(phoneNumber.value),
                code: otp.value
              }),
            }).then(() => {
              window.location.href = '/dashboard'
            })
          }}>Continue</GradiantButton>
        </div>
      </ModalFooter>
    </Modal>
  )
}