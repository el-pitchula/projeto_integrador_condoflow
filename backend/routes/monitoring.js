const express = require('express');
const router = express.Router();
const MonitoringData = require('../models/MonitoringData');

// Rota para adicionar dados de monitoramento
router.post('/add', async (req, res) => {
  const { sensorId, value } = req.body;
  try {
    const newData = new MonitoringData({ sensorId, value });
    await newData.save();
    res.json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Rota para obter dados de monitoramento
router.get('/', async (req, res) => {
  try {
    const data = await MonitoringData.find();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
