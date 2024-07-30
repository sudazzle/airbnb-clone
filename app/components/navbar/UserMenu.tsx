'use client'

import { GiHamburgerMenu } from 'react-icons/gi'
import { LuChevronDown } from 'react-icons/lu'
import { CiMail } from 'react-icons/ci'
import { Avatar } from '../Avatar'
import { useState, useCallback, useEffect, useRef, KeyboardEvent, ChangeEvent, MouseEvent } from 'react'
import { Modal } from '../modal/Modal'
import { ModalHeader } from '../modal/ModalHeader'
import { ModalContent } from '../modal/ModalContent'
import signUpData from './signUpModalData.json'
import { Google } from '../icons/Google'
import { FaApple } from 'react-icons/fa'
import { Facebook } from '../icons/Facebook'
import { OAuthButton } from './OAuthButton'
import { phoneNumber, setPhoneNumber, setIsOtpVerifyModalOpen } from '@/app/states/auth'
import auth0 from 'auth0-js'
import { VerifyOtpModal } from '../modal/VerifyOtpModal'
import { sanitizePhoneNumber } from '@/utils/helpers'


type CountryCodeData = typeof signUpData.phone_countries[0]

const getSelectOptionValue = (value: CountryCodeData) => {
  return value.prefix + value.code
}

export const UserMenu = () => {
  const [menuDisplayState, setMenuDisplayState] = useState('none')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPhoneFocused, setIsPhoneFocused] = useState(false)
  const [isCountryCodeFocused, setIsCountryCodeFocused] = useState(false)
  const defaultCountry = signUpData.phone_countries.find(country => signUpData.default_country === country.code)
  const [countryCode, setCountryCode] = useState<CountryCodeData | undefined>(defaultCountry)
  const [_phoneNumber, _setPhoneNumber] = useState<string>()
  const refGradiantSpan = useRef<HTMLSpanElement>(null)
  
  const onClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const togglePhoneFocus = useCallback(() => {
    setIsPhoneFocused(value => !value)
  }, [])

  const setCountryCodeOptimized = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const countryCode = signUpData.phone_countries.find(country => getSelectOptionValue(country) === e.target.value)
    if (countryCode) {
      setCountryCode(countryCode)
    }
  }, [])

  const setPhoneNumberOptimized = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    _setPhoneNumber(e.target.value)
  }, [])

  const toggleCountryCodeFocus = () => {
    setIsCountryCodeFocused(value => !value)
  }

  const onMouseMoveEventHandler = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    const thisElement = refGradiantSpan.current
    if (thisElement) {
      var rect = thisElement.getBoundingClientRect()
      var x = (e.clientX - rect.left) / 5
      var y = (e.clientY - rect.top)
      
      thisElement.style.backgroundPosition = `calc((100 - ${x}) * 1%) calc((100 - ${y}) * 1%)`
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuDisplayState(value => value === 'none' ? 'block' : 'none')
  }, [])

  const clickHandler = useCallback((e: globalThis.MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.closest('#user-profile-button')) {
        return
      } 
      
      if (!e.target.closest('#user-profile-menu') ) {
        toggleMenu()
      }
    }
  }, [])

  useEffect(() => {
    if (menuDisplayState === 'block') {
      window.document.addEventListener('click', clickHandler)
    }
    
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [])

  return (
    <>
        <button
          onClick={toggleMenu}
          className="
            p-2
            pl-3.5
            h-12
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
          id="user-profile-button"
        >
          <GiHamburgerMenu />
          <span className="hidden text-[#717171] md:block pl-0.5">
            <Avatar />
          </span>
        </button>
          <div
            id="user-profile-menu"
            className={`
              absolute
              rounded-xl
              airbnb-box-shadow-sm
              w-60
              bg-white
              overflow-hidden
              right-0
              top-14
              text-sm
              py-2
            ` + (menuDisplayState === 'block' ? 'block' : 'hidden')}
          >
            <div className="flex flex-col cursor-pointer">
              <MenuItem
                onClick={() => {
                  setIsModalOpen(true)
                  toggleMenu()
                }}
                label="Sign up"
                className="font-semibold"
              />
              <MenuItem
                onClick={() => {
                  window.location.href = '/api/auth/login'
                }}
                label="Login"
                className="font-light"
              />
              <hr className="my-2" />
              <MenuItem
                onClick={() => {}}
                label="Gift cards"
                className="font-light"
              />
              <MenuItem
                onClick={() => {}}
                label="Airbnb your home"
                className="font-light"
              />
              <MenuItem
                onClick={() => {}}
                label="Help center"
                className="font-light"
              />
            </div>
          </div>
      <Modal onClose={onClose} isOpen={isModalOpen}>
        <ModalHeader>Log in or sign up</ModalHeader>
        <ModalContent>
          <h3 className="text-[1.375rem] leading-[1.625rem] font-semibold mb-5">Welcome to Airbnb</h3>
          <form onSubmit={(e) => {
            const phoneNumber = '+' + countryCode?.prefix + ' ' + _phoneNumber
            e.preventDefault()
            fetch('/api/auth/get-otp', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ phoneNumber: sanitizePhoneNumber(phoneNumber) }),
            }).then(res => res.json()).then(() => {
              setPhoneNumber(phoneNumber)
              setIsOtpVerifyModalOpen(true)
            })
            // var webAuth = new auth0.WebAuth({
            //   domain: 'wandaspace-dev.eu.auth0.com',
            //   clientID:     '1vLmjWGImTieo8XbzLvcHsBNASiqMwpg',
            //   redirectUri: 'http://localhost:3000',
            //   clientSecret: 'J-jiQp69cK3ojuPjSWoPH6-qNFr2gpfw4thQko8EjCM5gBpatO9X6Y2idEfA75bs',
            //   responseType: 'id_token'
            // })

            // console.log(webAuth.client)

            // if (countryCode && phoneNumber) {
            //   webAuth.passwordlessStart({
            //     connection: 'email',
            //     send: 'code',
            //     email: 'shrestha.sudaman@gmail.com',
            //     phoneNumber: '+' + countryCode?.prefix + phoneNumber
            //   }, function(err: unknown, res: unknown) {
            //     if (err) {
            //       console.log(err)
            //       return
            //     }

            //     console.log(res)
            //   })
            // }
          }}>
            <div className="rounded-lg border border-gray-200 font-light">
              <div className="relative">
                { isCountryCodeFocused && 
                  <div className="absolute border-2 top-[-1px] start-[-1px] end-[-1px] w-full+2 h-full+2 rounded-lg">
                  </div>
                }
                <label htmlFor="country-select" className={`relative block`}>
                  <div className="absolute pointer-events-none pt-1.5 pb-2 px-3 text-sm text-gray-500">Country Code</div>
                  <select
                    onChange={setCountryCodeOptimized}
                    value={countryCode && getSelectOptionValue(countryCode)}
                    onFocus={toggleCountryCodeFocus}
                    onBlur={toggleCountryCodeFocus}
                    id="country-select"
                    className="w-full outline-none bg-transparent pt-[26px] pl-3 pr-8 pb-2 appearance-none"
                  >
                    {
                      signUpData.phone_countries.map((countryCode, index) => (
                        <option key={index} value={getSelectOptionValue(countryCode)}>{countryCode.country_name} (+{countryCode.prefix})</option>
                      ))
                    }
                  </select>
                  <div className="absolute pointer-events-none right-0 top-0 h-full flex items-center pr-3">
                    <LuChevronDown size={22} />
                  </div>
                </label>
              </div>
              <hr className={`border-t ${(isCountryCodeFocused || isPhoneFocused) ? 'border-t-transparent	' : 'border-t-gray-200'}`}></hr>
              <div className="relative">
                { isPhoneFocused && 
                  <div className="absolute border-2 top-[-1px] start-[-1px] end-[-1px] w-full+2 h-full+2 rounded-lg">
                  </div>
                }
                <label htmlFor="phone-number" className={`relative block`}>
                  <div className={`absolute top-[18px] flex px-3 text-gray-500 transition-all items-center ${(_phoneNumber || isPhoneFocused) ? 'text-sm translate-y-[-10px] scale-[1]' : ''}`}>Phone number</div>
                  <div className="flex w-full">
                    <div className="pt-[26px] pointer-events-none pl-3">{(_phoneNumber || isPhoneFocused) ? ('+' + countryCode?.prefix) : '  '}</div>
                    <input name="phoneNumber" placeholder={ isPhoneFocused && countryCode && countryCode.format_excluding_country_prefix ? countryCode.format_excluding_country_prefix : '' } onChange={setPhoneNumberOptimized} type="tel" onFocus={togglePhoneFocus} onBlur={togglePhoneFocus} id="phone-number" className="mt-[26px] pl-2 autofill:shadow-[0_0_0_30px_white_inset] mb-2 bg-transparent outline-none" />
                  </div>
                </label>
              </div>
            </div>
            <p className="text-xs mt-1.5 text-gray-800 font-light">We’ll call or text you to confirm your number. Standard message and data rates apply. <a href="#" className="font-semibold underline">Privacy Policy</a></p>
             
            <button type="submit" className="my-5 relative overflow-hidden block bg-gradient-to-r from-[#E61E4D] from-50% via-[#E31C5F] to-[#D70466] text-white rounded-lg p-3 w-full">
              <span className="absolute top-0 bottom-0 right-0 left-0 w-full h-full">
                <span
                  style={{ transition: 'opacity 1.5s' }}
                  onMouseMove={onMouseMoveEventHandler}
                  ref={refGradiantSpan}
                  className="absolute opacity-0 hover:opacity-100 top-0 left-0 w-full h-full block bg-[length:200%_200%] bg-gradient-radial-circle-at-center from-[#FF385C] from-20% via-[#e61e4d] from-30% via-[#e31c5f] from-55% via-[#d70466] from-75% via-[#bd1e59] to-[#bd1e59] top-0 width-full height-full left-0">
                </span>
              </span>
              <span className="relative block pointer-events-none">
                Continue
              </span>
            </button>

            <div className="flex items-center text-xs text-gray-800 mt-7 mb-5 gap-5">
              <hr className="w-full"/>or<hr className="w-full"/>
            </div>

            <OAuthButton icon={<Facebook />} text="Continue with facebook" />
            <OAuthButton icon={<Google />} text="Continue with google" />
            <OAuthButton icon={<FaApple size={22} />} text="Continue with apple" />
            <OAuthButton icon={<CiMail size={22} />} text="Continue with email" />
          </form>
        </ModalContent>
      </Modal>
      <VerifyOtpModal />
    </>
  )
}

interface MenuItemProps {
  onClick: () => void
  label: string
  className?: string
}

export const MenuItem: React.FC<MenuItemProps> = ({
  className,
  onClick,
  label
}) => {
  const _className = 'px-4 py-3 hover:bg-neutral-100 transition' + (className ? ` ${className}` : '')
  return (
    <div
      onClick={onClick}
      className={_className}
    >
      {label}
    </div>
  )
}