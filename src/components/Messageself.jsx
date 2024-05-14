import React from 'react'

function Messageself({props}) {
  var props2 ={name:"You",message:"This is sample message"}
  return (
    <div>
      <div className=' px-[3%] flex flex-col items-end my-[1%]'>
      <div className='bg-green-500 rounded-xl p-[2%]'>
      <p>{props.content}</p>
      
      </div>
      </div>
    
    </div>
  )
}

export default Messageself
