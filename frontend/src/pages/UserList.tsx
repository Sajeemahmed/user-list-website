import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  CircularProgress, 
  Alert,
  IconButton,
  TextField, 
  InputAdornment,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import UserCard from '../components/UserCard';
import { User, UserResponse } from '../types/User';
import axios from 'axios';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<UserResponse>(`/api/users?page=${page}`);
      setUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleRefresh = () => {
    fetchUsers();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setAnchorEl(null);
  };

  const filteredUsers = users.filter((user) => {
    return user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isMobile ? 'Team' : 'Meet Our Team'}
        </Typography>
        <IconButton onClick={handleRefresh} color="primary" aria-label="refresh">
          <RefreshIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search Users by Name or Email"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#f9f9f9',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              height: '40px',
              color: theme.palette.text.primary,
            },
            '& .MuiInputBase-input::placeholder': {
              color: theme.palette.mode === 'dark' ? '#aaa' : '#666',
              opacity: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />

        <IconButton
          onClick={handleFilterClick}
          color="primary"
          aria-label="filter"
          sx={{
            ml: 2,
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#e0e0e0',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#f5f5f5' : '#d5d5d5',
            },
          }}
        >
          <FilterListIcon sx={{ color: theme.palette.mode === 'dark' ? '#000' : '#000' }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={() => handleFilterSelect('Name')}>
            <ListItemIcon>
              <SearchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Filter by Name" />
          </MenuItem>
          <MenuItem onClick={() => handleFilterSelect('Email')}>
            <ListItemIcon>
              <SearchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Filter by Email" />
          </MenuItem>
        </Menu>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Static Footer */}
      <Box
        sx={{
          mt: 6,
          py: 3,
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.secondary,
          fontSize: '0.875rem',
        }}
      >
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Box>
    </Container>
  );
};

export default UserList;
