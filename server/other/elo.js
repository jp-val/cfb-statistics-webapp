export function calcNewRating(ratingA, ratingB, score) {

	const expectedScore = 1.0 / (1.0 + 10.0 ** ((ratingB - ratingA) / 400.0));
	const k = 20.0;
	return ratingA + k * (score - expectedScore);
}