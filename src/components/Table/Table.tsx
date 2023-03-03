import { children, createEffect, createSignal, For } from 'solid-js';
// import './Table.module.css'
import './table-styles.css'
import { IColumnProps, ITableBodyProps, ITableProps } from './types';
import { Paginator } from '../Paginator/Paginator';
import { isTwoObjectsEqual } from '../utils/isTwoObjectsEqual';

export const Column = (props: IColumnProps) => {
	return (
		<>{props}</>
	)
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

const DefaultTableBodyRenderer = (props: ITableBodyProps) => {
	const { onRowSelected } = props;

	const onRowClicked = (row: any): any => {
		onRowSelected!(row)
	}



	const isRowSelected = (row: any) => {
		if (row && props.selection) {
			return isTwoObjectsEqual(row, props.selection);
		}
		return false;
	}

	return (
		<For each={props.data}>
			{person => (
				<tr classList={{
					's-datatable-row-selected': isRowSelected(person),
					's-datatable-row-selectable': props.selectionMode !== 'none',
					's-datatable-row-striped': props.strippedRows
				}} onClick={() => onRowClicked(person)}>
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
	const [firstState, setFirstState] = createSignal(0);
	const [rowsState, setRowsState] = createSignal(props.rows || 5);

	createEffect(() => {
		if (props.data && props.paginator) {
			setDataIfPaginator(props.data)
		}
	});

	const setDataIfPaginator = (data: any[]) => {
		if (props.paginator) {
			setTableData(data.slice(firstState(), firstState() + rowsState()))
		} else {
			setTableData(data)
		}
	}

	// destructure only the props that will not change
	let { headerRenderer, bodyRenderer, selectionMode, onSelectionChange } = props;
	if (!selectionMode) {
		selectionMode = 'none';
	}
	const c = children(() => props.children);
	const columns: IColumnProps[] = c.toArray() as unknown as IColumnProps[]

	const simpleSearch = (search: string) => {
		if (!search) {
			setDataIfPaginator(props.data)
			return;
		}
		const result =  props.data.filter((row: any) => {
			return Object.keys(row).some((key: string) => {
				return row[key].toString().toLowerCase().includes(search.toLowerCase())
			})
		})
		setTableData(result)
	}

	const onRowSelected = (row: any) => {
		if (selectionMode === 'single') {
			onSelectionChange!(row)
		}
	}

	const onPageChange = (event: any) => {
		setFirstState(event.first);
		setRowsState(event.rows);
	}

	  return (
	<>
		<div>
			{props.globalFilter && <DefaultTableHeaderRendererWithFilter onChange={(value => simpleSearch(value))} />}
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
						selectionMode={selectionMode}
						selection={props.selection}
						strippedRows={props.strippedRows}
						onRowSelected={onRowSelected}
					/>}
				</tbody>
			</table>
			</div>
		<div>
			<Paginator first={firstState()} rows={rowsState()} totalRecords={props.data.length} onPageChange={onPageChange} />
		</div>
	</>
  );
};
