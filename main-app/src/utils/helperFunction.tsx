export const getRandomItem = (array: string[]) =>
	array[Math.floor(Math.random() * array.length)];

export const getRandomDate = () => {
	const start = new Date(2022, 0, 1);
	const end = new Date();
	const date = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
	return `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}pm`;
};
