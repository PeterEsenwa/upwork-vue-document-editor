import { convertToHtml } from 'mammoth';
import { Ref } from 'vue';

export default (content: Ref) => {
	// use mammoth to convert docx to html
	const convertDocxToHtml = async (docxBuffer: ArrayBuffer) => {
		const { value } = await convertToHtml({ arrayBuffer: docxBuffer });
		return value;
	}

	// read a file as an ArrayBuffer
	const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer | string | null> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = () => reject(reader.error);
			reader.readAsArrayBuffer(file);
		});
	}

	// get the file from the input
	const getFile = async (event: Event) => {
		const target = event.target;

		if (!(target instanceof HTMLInputElement)) {
			console.error('event.target is not an HTMLInputElement');
			return null;
		}
		return target.files?.[0];
	}

	// remove the hidden input from the DOM
	const removeHiddenInput = (input: HTMLInputElement) => {
		document.body.removeChild(input);
	}

	const handleEvent = async (event: Event) => {
		const file = await getFile(event);
		if (!file) return;

		const docxBuffer = await readFileAsArrayBuffer(file);

		if (!docxBuffer || !(docxBuffer instanceof ArrayBuffer)) {
			console.error('docxBuffer is not an ArrayBuffer');
			return;
		}

		const html = await convertDocxToHtml(docxBuffer);

		content.value = [html];
	}

	// add hidden input to the DOM
	const addHiddenInput = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.docx';
		input.style.display = 'none';
		document.body.appendChild(input);

		input.addEventListener('change', (event) => {
			handleEvent(event).then(() => {
				removeHiddenInput(input);
			});
		})

		input.click();
	}

	const doImport = () => {
		addHiddenInput();
	}

	return {
		doImport
	}
}
