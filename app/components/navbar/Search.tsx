'use client'

import { BiSearch } from 'react-icons/bi'

export const Search = () => {
  return (
    <div
      className="
        border-[1px]
        mx-6
        grow-0
        shrink
        basis-auto
        rounded-full
        shadow
        hover:shadow-md
        transition
        cursor-pointer
        min-w-1
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          h-12
        "
      >
        <button
          className="
            text-sm
            font-semibold
            pr-4
            pl-6
            py-[3px]
            min-w-[80px]
            truncate
          "
        >
          Anywhere
        </button>
        <button
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-2
            border-x-[1px]
            flex-1
            text-center
            py-[3px]

          "
        >
          <div className="min-w-[80px] overflow-hidden truncate">
            Any week
          </div>
        </button>
        <button
          className="
            text-sm
            pl-3
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            gap-3
            py-[3px]
          "
        >
          <div className="hidden font-light min-w-[80px] sm:block">Add guests</div>
          <div
            className="
              p-2
              pr-1
              bg-rose-500
              rounded-full
              text-white
              w-8
              h-8
            "
          >
            <BiSearch size={15} />
          </div>
        </button>
      </div>
    </div>
  )
}