import React from 'react'

const PasteContent = () => {
  return (
    <div className='w-full bg-card ml-0 m-3 rounded-2xl p-3'>
      {/* Title */}
      <div>
        <input type="text" disabled placeholder='Your title here' className='font-bold text-2xl flex items-center m-3 outline-none w-full' />
      </div>

      {/* Border */}
      <div className="my-6 h-0.5 w-full bg-border mx-auto"></div>

{/* Description */}
      <div className='m-3'>
          <textarea
    placeholder="Your text here..."
    className="w-full resize-none text-white p-2 outline-none"
    rows={30}
  />
      </div>
    </div>
  )
}

export default PasteContent