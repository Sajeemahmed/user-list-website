import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Proxy Endpoint
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', (error as Error).message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
