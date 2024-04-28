"use client"
import { useEffect, useState } from 'react';
import firebase, { firestore } from './firebase';
interface User {
  id: string;
  username: string;
  password: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]); // Specify User[] as the type for users state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logUsername, setLogUsername] = useState('')
  const [logPassword, setLogPassword] = useState('')
  const [errmsg, setErrmsg] = useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await firestore.collection('users').get();
        const usersData: User[] = usersCollection.docs.map(doc => {
          const userData = doc.data();
          const id = doc.id;
          return { id, ...userData } as User; // Cast to User type
        });
        setUsers(usersData);
        setLoading(false);
      } catch (error:any) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleSubmit = (e:any) => {
    e.preventDefault()
    firestore.collection('users').add({
      username,
      password
    })

  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const usersCollection = await firestore.collection('users').get();
      const usersData: User[] = usersCollection.docs.map((doc) => {
        const userData = doc.data();
        const id = doc.id;
        return { id, ...userData } as User; // Cast to User type
      });
  
      const user = usersData.find((user) => user.username === logUsername && user.password === logPassword);
  
      if (user) {
        // User found, perform login action
        // For example, you can use Firebase authentication to sign in the user
        console.log('User logged in:', user);
        localStorage.setItem('logged', 'true')
      } else {
        // No user found with matching credentials
        setError('Invalid username or password');
        localStorage.setItem('logged', 'false')
      }
    } catch (error:any) {
      setError(error.message);
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if(localStorage.getItem('logged') == 'false') {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}, {user.password}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input value={username} className='bg-red-700' onChange={(e) => setUsername(e.target.value.toLowerCase())} />
        <label>Password</label>
        <input value={password} className="bg-red-700" onChange={(e) => setPassword(e.target.value.toLowerCase())} />
        <button type="submit" className=''>Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
      <label>usr</label>
        <input className="bg-blue-700" value={logUsername} onChange={(e) => setLogUsername(e.target.value.toLowerCase())} />
        <label>pss</label>
        <input className="bg-blue-700" value={logPassword} onChange={(e) => setLogPassword(e.target.value.toLowerCase())} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
} if(localStorage.getItem('logged') == 'true') {
  return(
    <h1>Heello</h1>
  )
}
};

export default Home