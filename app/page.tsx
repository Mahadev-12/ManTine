'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SimpleGrid } from '@mantine/core';
import UserCard from './Components/UserCard';

interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  phone: string;
  website: string;
  color: string;
}

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const initialMapping = (name: string) => {
    const nameLength = name.split(' ');
    return nameLength[0][0] + nameLength[nameLength.length - 1][0]
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersData: User[] = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          initials: initialMapping(user.name),
          email: user.email,
          phone: user.phone,
          website: user.website,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
      <SimpleGrid
        // breakpoints={[
          //   { maxWidth: 768, cols: 1 }, 
          //   { minWidth: 769, maxWidth: 992, cols: 2 },
          //   { minWidth: 993, maxWidth: 1200, cols: 3 }, 
          //   { minWidth: 1201, cols: 4 }, 
        // ]}
        cols={4}
        m={20}
        spacing="lg"
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user}  onDelete={() => handleDeleteUser(user.id)}/>
        ))}
      </SimpleGrid>
  );
};

export default Page;
