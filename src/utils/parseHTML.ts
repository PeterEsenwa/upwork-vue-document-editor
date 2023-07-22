/**
 * Parses HTML string into an array of elements
 * @param {string} html - string to parse
 * @returns {Array<Element>} of elements
 */
export const parseHTML = (html: string): Element[] => {
	const parser = new DOMParser();
	const dom = parser.parseFromString(html, 'text/html');
	const body = dom.body;
	return Array.from(body.children);
};
