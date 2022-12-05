export default async (req, res) => {
	// const lat = '37.8136';
	// const lon = '144.9631';
	const apiKey = process.env.OPENWEATHER_API_KEY;

	const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Melbourne,aus&APPID=${apiKey}`, {
		method: 'GET',
	})
		.then((response) => {
			return response.json();
		})

	res.status(200).json(data);
}