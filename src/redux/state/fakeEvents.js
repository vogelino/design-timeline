import uuid from 'uuid/v4';
import { de_DE as casual } from 'casual-cjs';

const createTitleImage = () =>
	`https://placeimg.com/${casual.integer(300, 1500)}/${casual.integer(300, 1500)}/tech`;

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
			'artificial-intelligence-deep-learning-machine-learning',
			'big-data',
			'critical-speculative-fiction-design',
			'portfolio-businessmodel-job-offers',
			'design-thinking',
			'data-literacy',
			'filter-bubble',
			'design-attitude',
			'new-work',
			'design-niche',
			'privacy-monitoring-tracking',
		]),
		type: casual.random_element([
			'audio',
			'event',
			'image',
			'person',
			'quote',
			'social',
			'terminology',
			'text',
			'video',
			'web',
		]),
		startDate: new Date(casual.date('YYYY-MM-DD')),
		endDate: casual.coin_flip ? casual.date('YYYY-MM-DD') : null,
		titleImage: casual.coin_flip ? createTitleImage() : undefined,
		video: createVideo(),
		externalLinks: casual.array_of_words(casual.integer(0, 2)).map(() => casual.url),
		mediaCredits: casual.coin_flip ? 'Wikipedia DE, CC-by-sa-3.0' : undefined,
		future: casual.coin_flip ? casual.random_element(['trend', 'extreme', undefined]) : undefined,
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
