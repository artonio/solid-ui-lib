import { IBasicProps } from '../baseTypes';

export interface IPaginatorProps extends IBasicProps {
	first: number;
	rows: number;
	totalRecords: number;

	onPageChange: (event: { first: number, rows: number, page: any, pageCount: any }) => void;
}
