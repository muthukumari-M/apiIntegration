import React, { useState } from 'react'
import UsersTable from '../TableComponent/UsersTable'
import { useGetUsersQuery, useCreateUserMutation,useUpdatedUserMutation } from '../../State/Users/userApi';

// export interface User {

//   id: number;
//   name: string;
//   email: string;
 
  
// }

const UserForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedid, setSelectedId] = useState<number | null>(null);
  const [iseditmode, setIsEditMode] = useState<boolean>(false);

  const { data: users = [], isLoading, isError } = useGetUsersQuery();

  const [createuser] = useCreateUserMutation();
  const[updateUser]=useUpdatedUserMutation();
 

  const handleBtn = async () => {
    try {
      if(iseditmode && selectedid !== null)
      {
         await updateUser({id:selectedid,updatedUser:{name,email}}).unwrap();
      }
      else
      {
        await createuser({name,email}).unwrap();
      }

      setName('');
      setEmail('');
      setIsEditMode(false);
      setSelectedId(null);
    }
    catch (error) {
      console.log('failed to create user', error);
    }
  }





  if (isLoading) return <p className='text-center font-bold text-lg text-gray-400'>Loading...</p>
  if (isError) return <div className='text-center font-bold text-lg'>Something went wrong!</div>
  return (
    <div className='flex justify-center items-center gap-10 '>
      <div>

        <div>
          <h1 >Create User</h1>
        </div><br />
        <div>
          <label>Name: </label>
          <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='border  rounded-md' />
        </div><br />
        <div>
          <label>Email: </label>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className='border  rounded-md' />
        </div><br />
        <div>
          <button className='bg-blue-500 px-5 py-2 rounded-full text-white font-bold cursor-pointer' onClick={handleBtn}>{iseditmode ? "Edit User" :" Add User"}</button>
        </div>

      </div>
      <div>
        <UsersTable 
         users={users}  
         setEditMode={setIsEditMode} 
         setName={setName} 
         setEmail={setEmail}
         setSelectedId={setSelectedId}
         />
      </div>
    </div>
  )
}

export default UserForm