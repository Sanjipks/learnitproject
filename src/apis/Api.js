export const getUsers = async () => {
   const getUsers  = await fetch('https://api.github.com/users')
   const data = await getUsers.json();
   return data;
}
