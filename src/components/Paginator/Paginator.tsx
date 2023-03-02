import { IPaginatorProps } from './types';
import { FirstPageLink } from './FirstPageLink';
import { createEffect, createSignal, mergeProps, onMount } from 'solid-js';
import { PaginatorBaseProps } from './PaginatorBase';
import { PageLinks } from './PageLinks';

export const Paginator = (props: IPaginatorProps) => {
	const mergedProps = mergeProps(PaginatorBaseProps, props)
	const [pageLinks, setPageLinks] = createSignal<number[]>([]);

	const page = () => Math.floor(mergedProps.first / mergedProps.rows);
	const pageCount = () => Math.ceil(mergedProps.totalRecords / mergedProps.rows);
	const isFirstPage = () => page() === 0;
	const isLastPage = () => page() === pageCount() - 1;
	const isEmpty = () => pageCount() === 0;

+
	createEffect(() => {
		console.log('first', mergedProps.first);
		console.log('rows', mergedProps.rows);
		console.log('page', page());
		console.log('pageCount', pageCount());
		const pLinks = updatePageLinks();
		setPageLinks(pLinks);
		console.log('pageLinks', pageLinks());
		// changePage(mergedProps.first, mergedProps.rows);
		//
		// if (page() > 0 && props.first >= props.totalRecords) {
		// 	changePage((pageCount() - 1) * props.rows, props.rows);
		// }
	});

	const calculatePageLinkBoundaries = () => {
		let numberOfPages = pageCount();
		let visiblePages = Math.min(mergedProps.pageLinkSize, numberOfPages);

		//calculate range, keep current in middle if necessary
		let start = Math.max(0, Math.ceil(page() - visiblePages / 2));
		let end = Math.min(numberOfPages - 1, start + visiblePages - 1);

		//check when approaching to last page
		let delta = mergedProps.pageLinkSize - (end - start + 1);

		start = Math.max(0, start - delta);

		return [start, end];
	};

	const updatePageLinks = () => {
		let pageLinks = [];
		let boundaries = calculatePageLinkBoundaries();
		let start = boundaries[0];
		let end = boundaries[1];

		for (let i = start; i <= end; i++) {
			pageLinks.push(i + 1);
		}

		return pageLinks;
	};

	const changePage = (first: number, rows: number) => {
		let pc = pageCount();
		let p = Math.floor(first / rows);

		if (p >= 0 && p < pc) {
			let newPageState = {
				first: first,
				rows: rows,
				page: p,
				pageCount: pc
			};

			if (mergedProps.onPageChange) {
				mergedProps.onPageChange(newPageState);
			}
		}
	};

	const onPageLinkClick = (event: any) => {
		console.log('onPageLinkClick', event)
		changePage((event.value - 1) * props.rows, props.rows);
	};

	return (
		<div class="s-paginator">
			{/*<FirstPageLink />*/}
			<PageLinks
				onClick={onPageLinkClick}
				value={pageLinks()}
				page={page()}
				rows={mergedProps.rows}/>
		</div>
	)
}
