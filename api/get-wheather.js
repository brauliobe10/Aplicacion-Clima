export default async function handler(req, res) {
    const { city } = req.query;

    // 1. Validar que la ciudad exista en la petición
    if (!city) {
        return res.status(400).json({ error: "Falta el parámetro de ciudad" });
    }

    const API_KEY = process.env.WEATHER_API_KEY; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 2. Si la API de OpenWeather responde con error (ej. 404), enviarlo al cliente
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        // 3. Respuesta exitosa
        return res.status(200).json(data);

    } catch (error) {
        console.error("Error en la Serverless Function:", error);
        return res.status(500).json({ error: "Error interno al conectar con el servicio de clima" });
    }
}