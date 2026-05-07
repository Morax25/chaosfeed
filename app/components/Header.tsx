import { Flame } from 'lucide-react'

const Header = () => {
  return (
    <div className='min-h-15 fixed bg-black z-50 fixed-top rounded flex justify-between p-4 items-center max-h-max w-full border-b border-b-white/30 shadow shadow-lg'>
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Chaos
          </span>
          <span className="text-2xl font-bold tracking-tight text-white">
            Feed
          </span>
        </div>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <div className='flex justify-center items-center'>
          <Flame color='violet'/>
          <p className='font-bold text-pink-300'>20</p>
        </div>
        <div>
           <div className='w-8 h-8 flex justify-center items-center bg-gray-800 rounded-full'>
            <div>
                <svg
                  viewBox="0 0 120 120"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                >
                  <polygon
                    points="60,10 103.3,35 103.3,85 60,110 16.7,85 16.7,35"
                    fill="black"
                    stroke="#7C3AED"
                    strokeWidth="18"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Header
