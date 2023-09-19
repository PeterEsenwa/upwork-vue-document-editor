export type TableOptions = {
	rows: number;
	cols: number;
	// width: number;
	height: number;
	border: number;
	cellPadding: number;
	cellSpacing: number;
	includeHeaders: boolean;
}

export type ExistingTableInfo = {
	options?: TableOptions,
	key?: string,
};
