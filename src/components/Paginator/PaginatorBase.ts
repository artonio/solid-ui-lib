import { IBasicProps } from '../baseTypes';

export interface IPaginatorDefaultProps extends IBasicProps {
	totalRecords: number;
	rows: number;
	first: number;
	pageLinkSize: number;
	template: string;
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


export const PaginatorBaseProps: IPaginatorDefaultProps = {
	totalRecords: 0,
	rows: 0,
	first: 0,
	pageLinkSize: 5,
	template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',

}

export const PageLinksBaseProps: IPageLinksBaseProps = {
	value: [],
	page: null,
	rows: 0,
	pageCount: 0,
	links: null,
	template: null,
}
