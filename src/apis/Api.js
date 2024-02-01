export const getUsers = async () => {
   const getUsers  = await fetch('https://api.github.com/users')
   const data = await getUsers.json();
   return data;
}

const registerUser = async (inputs) => {
    try {
        const response = await fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        return await response.json();
    } catch (error) {
        throw new Error('Error:', error);
    }
};

export { registerUser };