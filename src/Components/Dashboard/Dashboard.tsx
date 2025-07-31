import React from 'react'

import Usertable from '../UserTable/Usertable'

const Dashboard:React.FC = () => {
  return (
    <div className='max-h-screen flex justify-center mt-10'>
        <Usertable/>
    </div>
  )
}

export default Dashboard