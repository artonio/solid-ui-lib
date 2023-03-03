import { IBasicProps } from '../baseTypes';

export type Renderable = any;

export type TableSize = 'small' | 'medium' | 'large';
export type SelectionMode = 'single' | 'multiple' | 'none';

export interface IColumnProps extends IBasicProps {
	header: string;
	code: string;
}

export interface ITableBodyProps extends IBasicProps {
	columns: IColumnProps[];
	data: any[];

	selectionMode?: SelectionMode;
	selection?: any;
	onRowSelected?: (row: any) => any;

	strippedRows?: boolean;
}

export interface ITableProps extends IBasicProps {
	data: any[];
	headerRenderer?: Renderable;
	bodyRenderer?: Renderable;

	selectionMode?: SelectionMode;

	selection?: any;

	onSelectionChange?: (value: any) => void

	globalFilter?: boolean;

	strippedRows?: boolean;

	rows?: number;

	paginator?: boolean;

	totalRecords?: number;
}
