import uuid from 'uuid/v4';
import casual from 'casual-cjs';

const createTitleImage = () =>
	`http://placekitten.com/${casual.integer(300, 1500)}/${casual.integer(300, 1500)}`;

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
	data: {
		title: casual.title,
		author: casual.full_name,
		text: casual.text,
		category: casual.random_element([
			'design-thinking',
			'big-data',
			'data-literacy',
			'design-attitude',
			'new-work',
			'filter-bubble',
			'privacy-monitoring-tracking',
			'critical-speculative-fiction-design',
			'artificial-intelligence-deep-learning-machine-learning',
			'portfolio-businessmodel-job-offers',
			'interface-interaction-service-social-sustainable-business-strategy-design',
		]),
		type: casual.random_element([
			'event',
			'text',
			'video',
			'image',
			'social',
			'quote',
			'audio',
		]),
		startDate: new Date(casual.date('YYYY-MM-DD')),
		endDate: casual.coin_flip ? casual.date('YYYY-MM-DD') : null,
		titleImage: createTitleImage(),
		video: createVideo(),
		externalLinks: casual.array_of_words(casual.integer(0, 2)).map(() => casual.url),
	},
	state: {
		selected: false,
		hovered: false,
	},
});

const eventsInitalState = casual.array_of_words(
	casual.integer(200, 300),
).map(createFaxeEvent);

export default eventsInitalState;
