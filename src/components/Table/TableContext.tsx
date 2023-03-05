import { createContext, createSignal, useContext } from 'solid-js';

export const TableContext = createContext();

export const TableProvider = (props: any) => {
	const [sortOrder, setSortOrder] = createSignal('asc');
	const tableContext = [
		sortOrder,
		{
			asc: () => setSortOrder('asc'),
			desc: () => setSortOrder('desc')
		}
	]

  return (
	<TableContext.Provider value={tableContext}>
	  {props.children}
	</TableContext.Provider>
  );
};

export const useTableContext = () => {
	return useContext(TableContext);
}
