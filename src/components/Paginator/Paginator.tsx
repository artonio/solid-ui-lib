import { IPaginatorProps } from './types';
import { FirstPageLink } from './FirstPageLink';
import { createEffect, createSignal, mergeProps } from 'solid-js';
import { PaginatorBaseProps } from './PaginatorBase';
import { PageLinks } from './PageLinks';
import { LastPageLink } from './LastPageLink';
import { PrevPageLink } from './PrevPageLink';
import { NextPageLink } from './NextPageLink';

export const Paginator = (props: IPaginatorProps) => {
	const mergedProps = mergeProps(PaginatorBaseProps, props)

	// Derived signals
	const page = () => Math.floor(mergedProps.first / mergedProps.rows);
	const pageCount = () => Math.ceil(mergedProps.totalRecords / mergedProps.rows);
	const isFirstPage = () => page() === 0;
	const isLastPage = () => page() === pageCount() - 1;
	const isEmpty = () => pageCount() === 0;
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
	const pageLinks = (): number[] => {
		let pageLinks = [];
		// Get the start and end indices of the page links to display from the calculatePageLinkBoundaries() function
		const [start, end] = calculatePageLinkBoundaries();

		// Loop through the page links to display and add them to the pageLinks array
		for (let i = start; i <= end; i++) {
			pageLinks.push(i + 1);
		}

		return pageLinks;
	};
	// end of derived signals

	createEffect(() => {
		// Update the page links to display when props change
		// updatePageLinks();
		if (page() > 0 && props.first >= props.totalRecords) {
			changePage((pageCount() - 1) * props.rows, props.rows);
		}
	});

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

	const changePageToPrev = (event: any) => {
		changePage((page() - 1) * props.rows, props.rows);
		event.preventDefault();
	}

	const changePageToLast = (event: any) => {
		changePage((pageCount() - 1) * props.rows, props.rows);
		event.preventDefault();
	}

	const changePageToNext = (event: any) => {
		changePage((page() + 1) * props.rows, props.rows);
		event.preventDefault();
	}

	const onPageLinkClick = (event: any) => {
		console.log('onPageLinkClick', event)
		changePage((event.value - 1) * props.rows, props.rows);
	};

	return (
		<div class="s-paginator">
			<FirstPageLink onClick={changePageToFirst} disabled={isFirstPage() || isEmpty()} />
			<PrevPageLink onClick={changePageToPrev} disabled={isFirstPage() || isEmpty()} />
			<PageLinks
				onClick={onPageLinkClick}
				value={pageLinks()}
				page={page()}
				rows={mergedProps.rows}/>
			<NextPageLink onClick={changePageToNext} disabled={isLastPage()}/>
			<LastPageLink onClick={changePageToLast} disabled={isLastPage()}/>
		</div>
	)
}
