import { IBasicProps } from '../baseTypes';

export type Renderable = any;

export type TableSize = 'small' | 'medium' | 'large';
export type SelectionMode = 'single' | 'multiple' | 'none';

export interface IColumnProps extends IBasicProps {
	header: string;
	code: string;
}

export interface ITableHeaderProps extends IBasicProps {
	columns: IColumnProps[];
	showGridlines: boolean;
}


export interface ITableBodyProps extends IBasicProps {
	columns: IColumnProps[];
	data: any[];

	selectionMode?: SelectionMode;
	selection?: any;
	onRowSelected?: (row: any) => any;

	strippedRows?: boolean;

	rows?: number;

	showGridlines?: boolean;
}

export interface ITableDefaultProps extends IBasicProps {
	showGridlines: boolean;
}

export interface ITableProps extends ITableDefaultProps {
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

	columns: IColumnProps[];
}
