import { Button, Card, Table } from 'antd'
import React, { useState } from 'react'
import type { TableProps } from 'antd';
import { useDeleteUserMutation, useGetUsersQuery } from '../../State/Users/userApi';
import editIcon from '../../assets/edit.png'
import deleteIcon from '../../assets/delete.png'
import Usermodal from '../ModalComponent/Usermodal';
import type {User} from '../../types/User'




const Usertable: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [selecteduser,setSelectedUser]=useState<User | null>(null);
    const { data: users = [], isLoading, isError } = useGetUsersQuery();

    const [deleteUser]=useDeleteUserMutation();
    

  
   
    const columns: TableProps<User>['columns'] = [

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
            render: (_, record) =>
                <div className='flex justify-center item-center gap-3'>
                    <Button onClick={()=>handleEdit(record)}><img src={editIcon} alt="Edit" className='w-5 h-5 ' /></Button>
                    <Button 
                    onClick={()=>{if(record.id !== undefined) handleDelete(record.id)}}><img src={deleteIcon} alt="Delete" className='w-5 h-5 ' /></Button>
                </div>


        }

    ]
    
    const handleEdit=(user:User)=>
    {
        
          setSelectedUser(user)
          setOpen(true)
          
    }

    const handleDelete=async (id:number)=>
    {
        if (window.confirm("Do you want to delete this user?")) {
        try
        {
            await deleteUser(id).unwrap();
        }
        catch(error)
        {
            console.error("Failed to delete User",error)
        }
    }
   
  
}
  if (isLoading) return <p className='text-center font-bold text-lg text-gray-400'>Loading...</p>
    if (isError) return <div className='text-center font-bold text-lg'>Something went wrong!</div>
    return (
        <>
            <Card title="Users" extra={<Button type='primary' onClick={() => setOpen(true)}>Add User</Button>} style={{ width: '70%' }}>
                <Table rowKey="id" columns={columns} dataSource={users} size="middle" />
            </Card>
            <Usermodal open={open} setOpen={setOpen} user={selecteduser} />
        </>
    )
}

export default Usertable