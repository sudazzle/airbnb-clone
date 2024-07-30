export const OAuthButton: React.FC<{
  icon: React.ReactNode,
  text: string,
}> = ({ icon, text }) => {
  return (
    <button className="my-4 last:mb-0 flex w-full hover:bg-gray-50 transition-all active:scale-95 text-sm justify-between rounded-lg items-center p-[13px_23px] border border-black">
      <span>{ icon }</span>
      <span>{ text }</span>
      <span>
      </span>
    </button>
  )
}