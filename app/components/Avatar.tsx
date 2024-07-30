'use client'
import { signal } from '@preact/signals-react'
import { useSignals } from '@preact/signals-react/runtime'

import { User } from './icons/User'

export const Avatar = () => {
  return (
    <div
      className="rounded-full h-[32px] w-[32px]"
    >
      <User />
    </div>
  )
}