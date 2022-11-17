export default async (req, res) => {
	const lat = '37.8136';
	const lon = '144.9631';
	const apiKey = process.env.OPENWEATHER_API_KEY;
	const exclude = 'minutely,hourly,daily,alerts';

	console.log('apiKey', apiKey);

	const data = fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`, {
		method: 'GET',
	})
		.then((response) => {
			response.json()
			// console.log('response', response);
		})
		.then((data) => {
			return data;
		})

	res.status(200).json(data);
}