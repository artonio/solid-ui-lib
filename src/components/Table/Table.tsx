import { createEffect, createSignal, For, mergeProps, Show, useContext } from 'solid-js';
import './table-styles.scss'
import { IColumnProps, ITableBodyProps, ITableHeaderProps, ITableProps } from './types';
import { Paginator } from '../Paginator/Paginator';
import { isTwoObjectsEqual } from '../utils/isTwoObjectsEqual';
import { TableBaseProps } from './TableBase';
import { sortAsc, sortDesc } from '../utils/sortAscDesc';

export const Column = (props: IColumnProps) => {
	return (
		<>{props}</>
	)
}

const [sortOrder, setSortOrder] = createSignal('none');

const DefaultTableHeaderRenderer = (props: ITableHeaderProps) => {

	const onSort = (event: any, column: IColumnProps) => {
		if (props.sortMode !== 'none') {
			props.onSort!(column)
		}
	}

	return (
		<tr>
			<For each={props.columns}>
				{column => (
					<th classList={{
						's-datatable-gridlines': props.showGridlines,
						's-datatable-small': props.size === 'small',
						's-datatable-large': props.size === 'large',
						's-sortable-column': props.sortMode !== 'none'
					}}
					onClick={() => onSort(event, column)}
					>
						<div classList={{'s-column-header-content': true}}>
							<span>{column.header}</span>
							<Show when={props.sortMode !== 'none'} keyed={true}>
								<span class="pi pi-fw" classList={{
									's-sortable-column-icon': props.sortMode !== 'none',
									'pi-sort-alt': sortOrder() === 'none',
									'pi-sort-amount-up-alt': sortOrder() === 'asc',
									'pi-sort-amount-down-alt': sortOrder() === 'desc'
								}}></span>
							</Show>
						</div>
					</th>
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
					's-datatable-row-striped': props.strippedRows,
				}} onClick={() => onRowClicked(person)}>
					<For each={props.columns}>
						{column => (
							<td classList={{
								's-datatable-gridlines': props.showGridlines,
								's-datatable-small': props.size === 'small',
								's-datatable-large': props.size === 'large',
							}}>{person[column.code]}</td>
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

export const Table = (input: ITableProps) => {
	const props = mergeProps(TableBaseProps, input)

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

	const onSort = (column: IColumnProps) => {
		let sortedData = props.data;
		if (sortOrder() === 'none') {
			sortedData = sortAsc(props.data, column);
			setSortOrder('asc')
			setDataIfPaginator(sortedData);
			return;
		}
		if (sortOrder() === 'asc') {
			sortedData = sortDesc(props.data, column);
			setSortOrder('desc')
			setDataIfPaginator(sortedData);
			return;
		}
		if (sortOrder() === 'desc') {
			sortedData = sortAsc(props.data, column);
			setSortOrder('asc');
			setDataIfPaginator(sortedData);
			return;
		}
		console.log('onSort', column)
	}

	  return (
		  <>
		<div>
			{props.globalFilter && <DefaultTableHeaderRendererWithFilter onChange={(value => simpleSearch(value))} />}
		</div>
		<div>
			<table classList={{'s-datatable': true}}>
				<thead classList={{'s-datatable-head': true}}>
					{headerRenderer ? headerRenderer() : <DefaultTableHeaderRenderer
						onSort={onSort}
						sortMode={props.sortMode!}
						size={props.size!}
						columns={props.columns}
						showGridlines={props.showGridlines!} />}
				</thead>
				<tbody classList={{'s-datatable-tbody': true, 's-datatable-gridlines': props.showGridlines}}>
					{bodyRenderer ? bodyRenderer(tableData()) : <DefaultTableBodyRenderer
						columns={props.columns}
						data={tableData()}
						size={props.size!}
						showGridlines={props.showGridlines!}
						selectionMode={selectionMode}
						selection={props.selection}
						strippedRows={props.strippedRows}
						onRowSelected={onRowSelected}
					/>}
				</tbody>
			</table>
			</div>
		<div>
			<Paginator first={firstState()}
					   rows={rowsState()}
					   totalRecords={props.data.length}
					   onPageChange={onPageChange} />
		</div>
		  </>
  );
};
