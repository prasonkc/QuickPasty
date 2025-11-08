import React from 'react'

interface StatusPopupInterface {
    status: string
    stbool: boolean
}

const StatusPopup: React.FC<StatusPopupInterface> = ({status, stbool}) => {
  return (
    <div className={`absolute bottom-0 left-0 w-[15%] hidden md:flex p-3 text-center rounded-xl text-background m-5 ${stbool? "bg-positive": "bg-negative"}`}>
      {status}
    </div>
  )
}

export default StatusPopup
