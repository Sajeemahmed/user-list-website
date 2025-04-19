
  import React, { useState } from 'react';
  import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Box,
    IconButton,
  } from '@mui/material';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import { User } from '../types/User';

  interface UserCardProps {
    user: User;
  }

  const UserCard: React.FC<UserCardProps> = ({ user }) => {
    // State to track whether the heart is liked or not
    const [liked, setLiked] = useState(false);

    // Toggle the liked state
    const handleLike = () => {
      setLiked((prev) => !prev);
    };

    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 aspect ratio
            backgroundColor: '#C7D2FE',
            overflow: 'hidden',
          }}
        >
          {/* Heart icon on top-right, changes color based on 'liked' state */}
          <IconButton
    aria-label="like"
    sx={{
      position: 'absolute',  // Positioning the button in the top-right corner
      top: 8,               // Distance from the top
      right: 8,             // Distance from the right
      color: liked ? 'red' : 'white',  // Red color when liked, white when not liked
      backgroundColor: 'transparent', // No background, just the icon
      border: 'none',       // No border around the heart
      padding: 0,           // Removes padding, just the icon
      '&:hover': {
        backgroundColor: 'transparent',  // No hover effect background
      },
    }}
    onClick={handleLike}  // Toggle liked state on button click
  >
    <FavoriteIcon />
  </IconButton>

          {/* Avatar in center */}
          <Avatar
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 120,
              border: '4px solid white',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  export default UserCard;
