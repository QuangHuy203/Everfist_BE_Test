const express = require('express');
const { 
    createMetric, 
    getMetricValuesById, 
    getMetricListByType 
} = require('./controllers/metricsController');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post('/api/metrics-service/create-metric', createMetric);
app.post('/api/metrics-service/get-values', getMetricValuesById);
app.post('/api/metrics-service/get-metrics-list', getMetricListByType);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});