import uuid from 'uuid/v4';
import casual from 'casual-cjs';

const createTitleImage = () => ({
	url: `http://placekitten.com/${casual.integer(300, 1500)}/${casual.integer(300, 1500)}`,
	title: casual.title,
	author: casual.full_name,
	license: casual.random_element([
		'https://opensource.org/licenses/MIT',
		'https://opensource.org/licenses/MirOS',
		'https://creativecommons.org/licenses/by/2.0/',
		'https://creativecommons.org/licenses/by/4.0/',
		'https://opensource.org/licenses/CNRI-Python',
		'https://opensource.org/licenses/RSCPL',
	]),
});

const createVideo = () => ({
	url: casual.random_element([
		'https://www.youtube.com/watch?v=vUZ3x6Xk0uo',
		'https://www.youtube.com/watch?v=GE7_S1XxNvY',
		'https://www.youtube.com/watch?v=cfzHmb_uZZI',
		'https://www.youtube.com/watch?v=UQgMao_B5CE',
		'https://www.youtube.com/watch?v=3hYWgp2fEg8',
		'https://www.youtube.com/watch?v=aUeqR84G17M',
		'https://vimeo.com/164316513',
		'https://vimeo.com/218543813',
		'https://vimeo.com/218705523',
		'https://vimeo.com/217793841',
		'https://vimeo.com/218678539',
		'https://vimeo.com/67043628',
	]),
	title: casual.title,
	description: casual.description,
});

const createFaxeEvent = () => ({
	id: uuid(),
	title: casual.title,
	text: casual.text,
	types: casual.random_element([
		'event',
		'text',
		'video',
		'image',
		'social',
		'quote',
		'audio',
	]),
	startDate: casual.date('YYYY-MM-DD'),
	endDate: null,
	titleImage: createTitleImage(),
	video: createVideo(),
	selected: false,
	hovered: false,
	externalLinks: casual.array_of_words(casual.integer(0, 5)).map(() => casual.url),

});

const eventsInitalState = casual.array_of_words(
	casual.integer(20, 40),
).map(createFaxeEvent);

export default eventsInitalState;