import { Button, Card, Table,Modal } from 'antd'
import React, { useState } from 'react'
import type { TableProps } from 'antd';
import { useGetUsersQuery } from '../../State/Users/userApi';
import editIcon from '../../assets/edit.png'
import deleteIcon from '../../assets/delete.png'

interface User {
    key: React.Key;
    id: number;
    image: string;
    name: string;
    email: string;
}
const columns: TableProps<User>['columns'] = [
    {
        title: 'Logo',
        dataIndex: 'image',
        key: 'image',
        render: (image) => (
            <img src={image} alt="user" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'

    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'

    },
    {
        title: 'Action',
        dataIndex: 'action',
        render: (_, _record) =>
            <div className='flex justify-center item-center gap-3'>
                <Button><img src={editIcon} alt="Edit" className='w-5 h-5 ' /></Button>
                <Button><img src={deleteIcon} alt="Delete" className='w-5 h-5 ' /></Button>
            </div>


    }

]

const Usertable: React.FC = () => {
     const [open, setOpen] = useState(false);
    const { data: users = [], isLoading, isError } = useGetUsersQuery();

    const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    console.log('Clicked ok button');
    setOpen(true);
  }
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


    if (isLoading) return <p className='text-center font-bold text-lg text-gray-400'>Loading...</p>
    if (isError) return <div className='text-center font-bold text-lg'>Something went wrong!</div>
    return (
        <>
            <Card title="Users" extra={<Button type='primary'onClick={showModal}>Add User</Button>} style={{ width: '70%' }}>
                <Table columns={columns} dataSource={users} size="middle" />
            </Card>
            <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>hello</p>
      </Modal>
        </>
    )
}

export default Usertable