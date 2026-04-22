// Este código corre en el servidor de Vercel, el usuario NO lo puede ver.
export default async function handler(req, res) {
    const { city } = req.query;
    // Usamos process.env para que la llave no esté escrita en el código
    const API_KEY = process.env.WEATHER_API_KEY; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el clima" });
    }
}