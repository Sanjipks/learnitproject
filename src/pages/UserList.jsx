import React from 'react'
import { useEffect, useState } from 'react';
import User from '../components/User';

export default function UserList() {
const [userlist, setUserlist] = useState([])

 async function getUsers(){
  const getusers = await fetch('https://api.github.com/users');
  const data = await getusers.json();
  setUserlist(data)
}


 useEffect(()=>{
  getUsers()
 }, []);


  return (
    
<div className="container mx-auto p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {userlist.map((user, id) => (
      <div key={id} className="p-2">
       <User user = {user.login} key = {user.node_id} userId = {user.id}  userImage = {user.avatar_url}/>
      </div>
    ))}
  </div>
</div>
  )
}

