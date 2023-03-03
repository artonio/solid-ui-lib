import { IBasicProps } from '../baseTypes';

export interface IPaginatorProps extends IBasicProps {
	first: number;
	rows: number;
	totalRecords: number;

	onPageChange: (event: { first: number, rows: number, page: any, pageCount: any }) => void;
}

export interface IPageLinksBaseProps extends IBasicProps {
	value: any[];
	page: unknown;
	rows: number;
	pageCount?: number;
	links?: unknown;
	template?: unknown;
}

export interface IPageLinksProps extends IPageLinksBaseProps {
	onClick: (event: {originalEvent: any, value: any}) => void;
}

export interface IFirstLinkProps extends IBasicProps {
	onClick: (event: any) => void;
	disabled: boolean;
}
