const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authRoutes = require('./routes/auth.routes');
const jobsRoutes = require('./routes/jobs.routes');
const applicationRoutes = require('./routes/application.routes');
const bookmarkRoutes = require('./routes/bookmark.routes');
const reviewRoutes = require('./routes/review.routes');
const companyRoutes = require('./routes/company.routes');
const activityRoutes = require('./routes/activity.routes');
const jobViewedRoutes = require('./routes/jobViewed.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/jobs', jobsRoutes);
app.use('/applications', applicationRoutes);
app.use('/bookmarks', bookmarkRoutes);
app.use('/reviews', reviewRoutes);
app.use('/companies', companyRoutes);
app.use('/activities', activityRoutes);
app.use('/job-views', jobViewedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});