import { signal } from '@preact/signals-react'

export const phoneNumber = signal('')
export const otp = signal('')
export const isCodeInputFocused = signal(false)
export const isOtpVerifyModalOpen = signal(true)

export const setIsOtpVerifyModalOpen = (value: boolean) => {
  isOtpVerifyModalOpen.value = value
}

export const setOpt = (value: string) => {
  console.log('fdfad')
  otp.value = value
}

export const setIsCodeInputFocused = (value: boolean) => {
  isCodeInputFocused.value = value
}

export const setPhoneNumber = (value: string) => {
  phoneNumber.value = value
}