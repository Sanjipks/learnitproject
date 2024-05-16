export const getUsers = async () => {
  const getUsers = await fetch("http://localhost:3000/users");
  const data = await getUsers.json();
  return data;
};
