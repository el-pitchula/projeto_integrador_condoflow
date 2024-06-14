import axios from 'axios';

const API_URL = 'http://localhost:5000/api/monitoring';

export const addMonitoringData = async (sensorId, value) => {
  try {
    const response = await axios.post(`${API_URL}/add`, { sensorId, value });
    return response.data;
  } catch (error) {
    console.error('Error adding monitoring data:', error);
    throw error;
  }
};

export const getMonitoringData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching monitoring data:', error);
    throw error;
  }
};
