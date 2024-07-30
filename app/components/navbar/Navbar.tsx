'use client'

import { FiGlobe } from 'react-icons/fi'
import { Container } from '../Container'
import { Logo } from './Logo'
import { Search } from './Search'
import { UserMenu } from './UserMenu'

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10">
      <div className="border-b-[1px]">
        <Container>
          <div
            className="
              flex
              flex-row
              items-center
              justify-between
            "
          >
            <Logo />
            <Search />
            <div className="relative grow shrink-0 basis-[140px]">
              <nav className="flex flex-row justify-end items-center">
                <div
                  onClick={() => {}}
                  className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    rounded-full
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    whitespace-nowrap
                    p-3
                  "
                >
                  Airbnb your home
                </div>
                <button className="p-3 mr-2">
                  <FiGlobe size={17} />
                </button>
                <UserMenu />
              </nav>
            </div>
            
          </div>
        </Container>
      </div>
    </div>
  )
}