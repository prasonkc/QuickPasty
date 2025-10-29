import React from 'react'
import { Trash2 } from 'lucide-react'

const PasteComponent = () => {
  return (
    <div className='border border-gray-700 rounded-lg h-20 p-2 cursor-pointer mb-3'>
        {/* title */}
        <div className='font-bold text-lg flex items-center justify-between pr-2'>
            <span>Title</span>
            <Trash2 size={18}/>
        </div>
        {/* desc */}
        <div className='text-sm'>Description</div>
    </div>
  )
}

export default PasteComponent