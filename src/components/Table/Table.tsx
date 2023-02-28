import { children, createSignal, For } from 'solid-js';
// import './Table.module.css'
import './table-styles.css'
import { Renderable } from './types';

export interface IBasicProps {
	children?: any;
}

export type TableSize = 'small' | 'medium' | 'large';

export interface IColumnProps extends IBasicProps {
	header: string;
	code: string;
}

export const Column = (props: IColumnProps) => {
	return (
		<>{props}</>
	)
}

export interface ITableProps extends IBasicProps {
	data: any[];
	headerRenderer?: Renderable;
	bodyRenderer?: Renderable;

	onSelectionChange?: (value: any) => void

	globalFilter?: boolean;
}

const DefaultTableHeaderRenderer = (props: IColumnProps[]) => {
	return (
		<tr>
			<For each={props}>
				{column => (
					<th>{column.header}</th>
				)}
			</For>
		</tr>
	)
}

const DefaultTableBodyRenderer = (
	props: {
		columns: IColumnProps[],
		data: any[],
		onRowSelected?: (row: any) => any
	}
) => {
	const { onRowSelected } = props;

	const onRowClicked = (row: any): any => {
		onRowSelected!(row)
	}

	return (
		<For each={props.data}>
			{person => (
				<tr onClick={() => onRowClicked(person)}>
					<For each={props.columns}>
						{column => (
							<td>{person[column.code]}</td>
						)}
					</For>
				</tr>
			)}
		</For>
	)
}

const DefaultTableHeaderRendererWithFilter = (props: {onChange: (value: any) => void}) => {
	const { onChange } = props;

	const changeDetected = (e: Event) => {
		const inputVal =  (e.target as HTMLInputElement).value;
		onChange(inputVal)
	}

	return (
		<div classList={{'header-container': true}}>
			<input type="text" onInput={changeDetected} />
		</div>
	)
}

export const Table = (props: ITableProps) => {

	const [tableData, setTableData] = createSignal(props.data);

	// destructure only the props that will not change
	const { headerRenderer, bodyRenderer, onSelectionChange } = props;
	const c = children(() => props.children);
	const columns: IColumnProps[] = c.toArray() as unknown as IColumnProps[]

	const simpleSearch = (data: any[], search: string) => {
		if (!search) {
			setTableData(props.data)
			return;
		}
		const result =  data.filter((row: any) => {
			return Object.keys(row).some((key: string) => {
				return row[key].toString().toLowerCase().includes(search.toLowerCase())
			})
		})
		setTableData(result)
	}

	  return (
	<>
		<div>
			{props.globalFilter && <DefaultTableHeaderRendererWithFilter onChange={(value => simpleSearch(tableData(), value))} />}
		</div>
		<div>
			<table classList={{'s-datatable': true}}>
				<thead classList={{'s-datatable-head': true}}>
					{headerRenderer ? headerRenderer() : <DefaultTableHeaderRenderer {...columns} />}
				</thead>
				<tbody classList={{'s-datatable-tbody': true}}>
					{bodyRenderer ? bodyRenderer(tableData()) : <DefaultTableBodyRenderer
						columns={columns}
						data={tableData()}
						onRowSelected={onSelectionChange}
					/>}
				</tbody>
			</table>
			</div>
	</>
  );
};
