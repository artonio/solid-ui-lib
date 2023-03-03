import { IPaginatorProps } from './types';
import { FirstPageLink } from './FirstPageLink';
import { createEffect, createSignal, mergeProps, onMount } from 'solid-js';
import { PaginatorBaseProps } from './PaginatorBase';
import { PageLinks } from './PageLinks';

export const Paginator = (props: IPaginatorProps) => {
	const mergedProps = mergeProps(PaginatorBaseProps, props)
	const [pageLinks, setPageLinks] = createSignal<number[]>([]);

	// Derived signals
	const page = () => Math.floor(mergedProps.first / mergedProps.rows);
	const pageCount = () => Math.ceil(mergedProps.totalRecords / mergedProps.rows);
	const isFirstPage = () => page() === 0;
	const isLastPage = () => page() === pageCount() - 1;
	const isEmpty = () => pageCount() === 0;

+
	createEffect(() => {
		console.log('first', mergedProps.first);
		console.log('rows', mergedProps.rows);
		console.log('page', page() + 1);
		console.log('pageCount', pageCount());
		// Update the page links to display when props change
		updatePageLinks();
	});

	const calculatePageLinkBoundaries = () => {
		// Calculate the total number of pages from the pageCount() function
		let numberOfPages = pageCount();
		// Determine the number of visible page links based on the mergedProps.pageLinkSize or the total number of pages
		let visiblePages = Math.min(mergedProps.pageLinkSize, numberOfPages);

		// Calculate the start and end index of the page links to display,
		// making sure the current page is in the middle if possible
		let start = Math.max(0, Math.ceil(page() - visiblePages / 2));
		let end = Math.min(numberOfPages - 1, start + visiblePages - 1);

		// Check if we need to adjust the start index due to the page links being smaller than the
		// mergedProps.pageLinkSize
		let delta = mergedProps.pageLinkSize - (end - start + 1);
		start = Math.max(0, start - delta);

		// Return an array of the start and end indices of the page links to display
		return [start, end];
	};

	const updatePageLinks = () => {
		let pageLinks = [];
		// Get the start and end indices of the page links to display from the calculatePageLinkBoundaries() function
		let boundaries = calculatePageLinkBoundaries();
		let start = boundaries[0];
		let end = boundaries[1];

		// Loop through the page links to display and add them to the pageLinks array
		for (let i = start; i <= end; i++) {
			pageLinks.push(i + 1);
		}

		// Set the page links state with the updated pageLinks array
		setPageLinks(pageLinks);
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

	const changePageToFirst = (event: any) => {
		changePage(0, props.rows);
		event.preventDefault();
	};

	const onPageLinkClick = (event: any) => {
		console.log('onPageLinkClick', event)
		changePage((event.value - 1) * props.rows, props.rows);
	};

	return (
		<div class="s-paginator">
			<FirstPageLink onClick={changePageToFirst} disabled={isFirstPage() || isEmpty()} />
			<PageLinks
				onClick={onPageLinkClick}
				value={pageLinks()}
				page={page()}
				rows={mergedProps.rows}/>
		</div>
	)
}
