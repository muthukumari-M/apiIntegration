
import editIcon from '../../assets/edit.png'
import deleteIcon from '../../assets/delete.png'
import type { User } from '../ModalComponent/UserForm';
import { useDeleteUserMutation } from '../../State/Users/userApi';



interface UserTableProps
{
    users:User[];
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setName:React.Dispatch<React.SetStateAction<string>>;
    setEmail:React.Dispatch<React.SetStateAction<string>>;
    setSelectedId:React.Dispatch<React.SetStateAction<number | null>>;
}

const UsersTable=({users,setEditMode,setName,setEmail,setSelectedId}:UserTableProps)=> {
    
   const [deleteUser]=useDeleteUserMutation();


    const handleEdit=(user: User)=>
    {
       setEditMode(true);
       setSelectedId(user.id)
       setName(user.name);
       setEmail(user.email);
    }
    const handleDelete=async (id:number)=>
    {
      if(window.confirm("Do you want to Delete this user?"))
      {
        try{
            await deleteUser(id).unwrap();
        }
        catch(error)
        {
            console.error("Failed to delete User",error)
        }
      }
        
    }
    
    
  return (
    <div className='flex justify-center items-center'>
        
        <table className='border  border-gray-500 '>
            <caption className='text-xl font-bold p-6'>Users</caption>
            <thead>
                <tr>
                    <th className='border border-gray-100'>S.No</th>
                    <th className='border border-gray-100'>Name</th>
                    <th className='border border-gray-100'>Eamil</th>
                    <th className='border border-gray-100'>Actions</th>
                </tr>
            </thead>
            <tbody>
              {
                users?.map((user)=>
                {
                    return(
                        <tr key={user.id}>
                            <td className='border border-gray-100 p-3'>{user.id}</td>
                            <td className='border border-gray-100 p-3'>{user.name}</td>
                            <td className='border border-gray-100 p-3'>{user.email}</td>
                            <td className='border border-gray-100 p-3' >
                                <div className='flex justify-center item-center gap-3'>
                                    <button onClick={()=>handleEdit(user)}><img src={editIcon} alt="Edit" className='w-5 h-5 ' /></button>
                                <button onClick={()=>handleDelete(user.id)}><img src={deleteIcon} alt="Delete" className='w-5 h-5 ' /></button>
                                </div>
                            </td>
                        </tr>
                    )
                }
                )
              }
            </tbody>
        </table>
    </div>
  )
}

export default UsersTable