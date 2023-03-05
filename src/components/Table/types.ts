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
	size: TableSize;
	sortMode: 'single' | 'multiple' | 'none';
	onSort: (column: IColumnProps) => void;
}


export interface ITableBodyProps extends IBasicProps {
	columns: IColumnProps[];
	data: any[];

	selectionMode?: SelectionMode;
	selection?: any;
	onRowSelected?: (row: any) => any;

	strippedRows?: boolean;

	rows?: number;

	showGridlines: boolean;
	size: TableSize;
}

export interface ITableDefaultProps extends IBasicProps {
	showGridlines?: boolean;
	size?: TableSize;
	sortMode?: 'single' | 'multiple' | 'none';
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
