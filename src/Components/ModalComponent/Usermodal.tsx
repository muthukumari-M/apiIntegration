
import { Modal,Form,Button } from 'antd';

import Input from 'antd/es/input/Input';
import { useEffect } from 'react';
import { useCreateUserMutation, useUpdatedUserMutation } from '../../State/Users/userApi';
import type { User } from '../../types/User';





interface ModalProps {
    user: User | null ;
    open: boolean;
    setOpen: (value: boolean) => void;
}


const Usermodal = ({ user,open, setOpen }: ModalProps) => {

 const [form] = Form.useForm()
    const [createUser] = useCreateUserMutation();
    const [updateUser]=useUpdatedUserMutation();

    useEffect(()=>{
          if(user)   
            {
                form.setFieldsValue(user)
            } 
            else
            {
                form.resetFields();
            }
    },[user,form])

    
    const onFinish=async (values: User)=>
    {
       try{
          if (user && user.id !== undefined) 
         {
             await updateUser({id:user.id,updatedUser:values}).unwrap();
         }
         else
         {
            await createUser(values).unwrap();
         }
         
         setOpen(false)
       }
       catch(error)
       {
          console.error("Something went wrong",error)
       }
       form.resetFields();
    }





    return (
        <div>
            <Modal
                title={user ? 'Edit User' : 'Create User'}
                open={open}
                onCancel={()=>setOpen(false)}
                getContainer={false}
                footer={null}

            >
                <Form form={form}  onFinish={onFinish} >
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true }]}>
                        <Input placeholder='Enter your Name' />
                    </Form.Item>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ required: true }, { type: 'email' }]}>
                        <Input placeholder='Enter your Email'   />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                           {user? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Usermodal
