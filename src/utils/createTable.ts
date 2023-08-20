export interface TableParams {
	rows: number;
	cols: number;
	includeHeaders?: boolean; // This is optional and defaults to false if not provided
}

export function createHTMLTable(params: TableParams): string {
	let tableHTML = `<table
		style="border-collapse: collapse; width: 100%; table-layout: fixed;"
>`;

	// Add headers if includeHeaders is true
	if (params.includeHeaders) {
		tableHTML += '<tr>';
		for (let j = 0; j < params.cols; j++) {
			tableHTML += '<th style="border: 1px solid black; padding: 8px;">Header ' + (j + 1) + '</th>';
		}
		tableHTML += '</tr>';
	}

	// Add rows and cols
	for (let i = 0; i < params.rows; i++) {
		tableHTML += '<tr>';
		for (let j = 0; j < params.cols; j++) {
			tableHTML += '<td style="border: 1px solid black; padding: 8px;"></td>';
		}
		tableHTML += '</tr>';
	}

	tableHTML += '</table>';

	return tableHTML;
}

export default createHTMLTable;
