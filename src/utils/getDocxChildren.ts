import { Paragraph } from 'docx';
import { convertElement } from '@/utils/htmlConverter';
import { FileChild } from 'docx/build/file/file-child';

/**
 * Transforms an array of HTML elements into an array of Paragraph objects
 * for the 'docx' library.
 *
 * Each element from the `htmlElements` array is processed. If the converted
 * element is not an instance of Paragraph, a new Paragraph is created and
 * added to the returned array. If the converted element is an instance of
 * Paragraph, it's directly added to the returned array.
 *
 * @param {Element[]} htmlElements - The array of HTML elements to be transformed.
 * @returns {FileChild[]} - An array of FileChild objects for the 'docx' library.
 */
export const getDocxChildren = (htmlElements: Element[]): FileChild[] => {
	return htmlElements.map(node => {
		const docElement = convertElement(node);

		if (docElement instanceof Paragraph) {
			return docElement;
		}

		const innerChildren = Array.isArray(docElement) ? docElement : [docElement];

		// we need to wrap the text run in a paragraph
		return new Paragraph({children: innerChildren});
	});
}
