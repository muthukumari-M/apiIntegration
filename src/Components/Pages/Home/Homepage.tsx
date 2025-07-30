import React from 'react'
import { Button, Typography } from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Homepage:React.FC = () => {
    const navigate=useNavigate();
  return (
    <>
     <div className=' flex justify-center bg-gray-700 p-10 '>
        <h1 className='text-xl font-bold text-white tracking-wider'>User Management Application</h1>
    </div>
    <div className='flex  justify-center items-baseline my-20 '>
       
          <Title level={3} className='font-bold'><span className='text-red-500 '>Welcome ! </span> to Homepage</Title>
           <Button type='text'className='ml-1' onClick={()=>navigate('/dashboard')}><ArrowRightOutlined /></Button>
    </div>
    </>
   
  )
}

export default Homepage