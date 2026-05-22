import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes';
import speakerRoutes from './routes/speakerRoutes';
import eventRoutes from './routes/eventRoutes';
import pengurusRoutes from './routes/pengurusRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/pengurus', pengurusRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Seminar IPM Pesantunan Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
