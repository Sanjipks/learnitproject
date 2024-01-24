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
    
<div className="text-xl font-bold underline">
{userlist.map((user)=> <User user = {user.login} />)}

 </div>
  )
}
