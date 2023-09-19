import {App, ComponentOptions, defineCustomElement, markRaw} from "vue";
import {customAlphabet} from "nanoid/non-secure";

export type SelectionAndRange = { range: Range | undefined; sel: Selection | null };

export function retrieveSelectionAndRange(): SelectionAndRange {
	let sel: Selection | null = null, range: Range | undefined;

	// Check if browser supports window.getSelection()
	if (window.getSelection) {
		sel = window.getSelection();

		// If some text is already selected or cursor is somewhere in the document
		if (sel?.getRangeAt && sel.rangeCount) {
			// Get the first range of the selection
			range = sel.getRangeAt(0);
		}
	}

	return {
		sel,
		range
	}
}

export function insertHtmlAtCursor(
	html: string | Node | Element | App<Element>,
	selectionRangePosition: ReturnType<typeof retrieveSelectionAndRange> = retrieveSelectionAndRange()
) {
	let { sel, range } = selectionRangePosition;

	if (!sel || !range) return;

	// Delete any selected text
	range.deleteContents();

	// Create a new div element and set its inner HTML to the passed HTML string
	let el: HTMLDivElement = document.createElement("div");

	if (typeof html === 'string') {
		el.innerHTML = html;
	} else if (html instanceof Node || html instanceof Element) {
		el.appendChild(html);
	} else {
		html.mount(el)
	}

	// Create an empty DocumentFragment that will hold the nodes for insertion
	let frag: DocumentFragment = document.createDocumentFragment(), node: ChildNode | null,
		lastNode: ChildNode | null = null;

	// Move all child nodes of the div element to the DocumentFragment
	while ((node = el.firstChild)) {
		lastNode = frag.appendChild(node);
	}

	// Insert the DocumentFragment at the current cursor position (i.e., where the range starts)
	range.insertNode(frag);

	// If there is a last node after inserting the fragment, move the cursor after the last inserted node
	if (lastNode) {
		range = range.cloneRange();
		range.setStartAfter(lastNode);
		range.collapse(true);

		// Clear all ranges from the selection and add the new range
		sel.removeAllRanges();
		sel.addRange(range);
	}
}

const nanoid = customAlphabet('1234567890', 5);

export const insertVueComponentAtCursor = (componentOptions: ComponentOptions, props: Record<any, any>) => {
	console.log(props);
	if (!componentOptions.template) return;

	console.log(componentOptions);
	console.log(componentOptions.template);

	// const componentElement = defineCustomElement(componentOptions.template as any);

	// const name = `component-table`;
	// customElements.define(name, componentElement);

	// const html = new componentElement({
	// 	modelValue: props,
	// });
	//
	// console.log('html', html);

	// insertHtmlAtCursor(html);
}
