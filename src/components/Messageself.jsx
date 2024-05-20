import React from 'react'

function Messageself({props}) {

  var image = null;
  console.log(props)
  
  if(props.image!==null){
    image = props.image
   }
  return (
    <div>
      {image===null ?(<div className=' px-[3%] flex flex-col items-end my-[1%]'>
      <div className='bg-green-500 rounded-xl p-[2%]'>
      
      <p>{props.content}</p>
      
      </div>
      </div>)
      :(<div className=' px-[3%] flex flex-col items-end my-[1%]'>
      <div className='bg-gray-100 rounded-xl p-[2%]'>
      <img src={image} alt="" className='h-40 w-64 bg-white'/>
      <p>{props.content}</p>
      
      </div>
      </div>
 )   }
    </div>
  )
}

export default Messageself
