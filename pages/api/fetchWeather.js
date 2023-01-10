export default async (req, res) => {
	const lat = '-37.813629';
	const lon = '144.963058';
	const apiKey = process.env.OPENWEATHER_API_KEY;

	const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`, {
		method: 'GET',
	})
		.then((response) => {
			return response.json();
		})

	res.status(200).json(data);
}