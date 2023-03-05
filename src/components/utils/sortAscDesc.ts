import { IColumnProps } from '../Table/types';

export const sortAsc = (data: any[], column: IColumnProps) => {
	return data.sort((a: any, b: any) => {
		if (a[column.code] < b[column.code]) {
			return -1;
		}
		if (a[column.code] > b[column.code]) {
			return 1;
		}
		return 0;
	})
}

export const sortDesc = (data: any[], column: IColumnProps) => {
	return data.sort((a: any, b: any) => {
		if (a[column.code] < b[column.code]) {
			return 1;
		}
		if (a[column.code] > b[column.code]) {
			return -1;
		}
		return 0;
	})
}
