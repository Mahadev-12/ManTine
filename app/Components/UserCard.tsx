'use client'
import React, {useState} from 'react';
import { Card, Text, Group, Button, Flex } from '@mantine/core';
import { IconTrash, IconUserPlus, IconUserMinus, IconStar , IconAt, IconPhone, IconWorld } from '@tabler/icons-react';

interface User {
  name: string;
  initials: string;
  email: string;
  phone: string;
  website: string;
  color: string;
  phoneColor?: string; 
}

interface UserCardProps {
  user: User;
  onDelete?: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
  };
  
  const handleDelete = () => {
    onDelete && onDelete(user.id);
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder style={{maxWidth: 600}}>
      <Group style={{marginBottom: 5, width: '100%'}}>
        <Flex 
      align="center"
      direction="column"
      style={{width: '100%'}}>
          <Flex
      justify="center"
      align="center"
          style={{width: 120, height: 120, borderRadius: '50%', marginRight: 15, backgroundColor: user.color}}>
            <Text size="lg" style={{ color: 'white', fontWeight: 'bold', fontSize: 50 }}>{user.initials}</Text>
          </Flex>
          <div my={10} style={{ width: '100%', textAlign: 'center', marginTop: 10, marginBottom: 10}}>
            <Flex 
      justify="flex-start"
      align="flex-start"
      >
            <Text weight={500}>{user.name}</Text>
            {isFollowed && <IconStar size={16} style={{ marginLeft: 5 }} />}
            </Flex>
            <Group my={5} spacing="xs" noWrap>
              <IconAt size={16} color="rgba(0, 0, 0, 0.5)" />
          <Text size="sm" color="rgba(0, 0, 0, 0.5)" component="a" href={`mailto:${user.email}`} style={{ textDecoration: 'none' }}>
            {user.email}
              </Text>
            </Group>
        <Group my={5} spacing="xs" noWrap align="center">
          <IconPhone size={16} color="rgba(0, 0, 0, 0.5)" />
          <Text size="sm" color="rgba(0, 0, 0, 0.5)" component="a" href={`tel:${user.phone}`} style={{ textDecoration: 'none' }}>
            {user.phone}
          </Text>
        </Group>
            <Group my={5} spacing="xs" noWrap>
              <IconWorld size={16} color="rgba(0, 0, 0, 0.5)" />
              <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.5)" }}>
                {user.website}
              </a>
            </Group>
          </div>
        </Flex>
      </Group>
      <Group position="right" style={{ marginTop: 5 ,display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      
        <Button
          variant={isFollowed ? "white" : "blue"}
          color={isFollowed ? "black" : "white"}
          onClick={handleFollowClick}
          style={{width: '45%', borderColor: isFollowed ? "rgba(0, 0, 0, 0.2)" : '#1C7ED6'}}
          justify="center"
        >
          {isFollowed ? <IconUserMinus size={16} /> : <IconUserPlus size={16} />}
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
<Button
  variant="subtle"
  color="blue"
  onClick={handleDelete}
  style={{width: '45%', borderColor: '#1C7ED6'}}
  justify="center"
>
  <IconTrash size={16} style={{marginRight: 3 }} />
  Delete
</Button>

      </Group>
    </Card>
  );
};

export default UserCard;
