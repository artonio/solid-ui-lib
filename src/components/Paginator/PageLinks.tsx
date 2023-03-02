import { IPageLinksBaseProps, IPageLinksProps, PageLinksBaseProps } from './PaginatorBase';
import { createEffect, For, mergeProps } from 'solid-js';

export const PageLinks = (props: IPageLinksProps) => {
	const mergedProps = mergeProps(PageLinksBaseProps, props);

	const onPageLinkClick = (event: any, pageLink: any) => {
		if (mergedProps.onClick) {
			mergedProps.onClick({
				originalEvent: event,
				value: pageLink
			});
		}

		event.preventDefault();
	};

	if (mergedProps.value) {
		const startPageInView = mergedProps.value[0];
		const endPageInView = mergedProps.value[props.value.length - 1];
	}

	return <span>
		<For each={mergedProps.value}>
			{(page: number) => {
				return (
					<button type="button" classList={{
						's-paginator-page': true,
						's-paginator-current': page === mergedProps.page
					}} onClick={(e) => onPageLinkClick(e, page)}>
						{page}
					</button>
				)
			}}
		</For>
	</span>;

}
