export interface TableParams {
	rows: number;
	cols: number;
	border?: number;
	cellPadding?: number;
	cellSpacing?: number;
	includeHeaders?: boolean;
}

export function createHTMLTable(params: TableParams): string {
	let borderString = params.border !== undefined ? `${params.border}px solid black` : '1px solid black';
	let paddingString = params.cellPadding !== undefined ? `${params.cellPadding}px` : '8px';
	let borderSpacingString = params.cellSpacing !== undefined ? `${params.cellSpacing}px` : '';

	let tableHTML = `<table
		style="border-collapse: separate; border-spacing: ${borderSpacingString}; width: 100%; table-layout: fixed;"
>`;

	if (params.includeHeaders) {
		tableHTML += '<tr>';
		for (let j = 0; j < params.cols; j++) {
			tableHTML += `<th style="border: ${borderString}; padding: ${paddingString};">Header ${j + 1}</th>`;
		}
		tableHTML += '</tr>';
	}

	for (let i = 0; i < params.rows; i++) {
		tableHTML += '<tr>';
		for (let j = 0; j < params.cols; j++) {
			tableHTML += `<td style="border: ${borderString}; padding: ${paddingString};"></td>`;
		}
		tableHTML += '</tr>';
	}

	tableHTML += '</table>';

	console.log(tableHTML);

	return tableHTML;
}

export default createHTMLTable;
