const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.externo.com/endpoint');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al hacer la petición al servidor externo' });
  }
}
