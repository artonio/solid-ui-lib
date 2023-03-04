import { PageLinksBaseProps } from './PaginatorBase';
import { createEffect, For, mergeProps } from 'solid-js';
import { IPageLinksProps } from './types';

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

	return <span class="s-paginator-pages">
		<For each={mergedProps.value}>
			{(page: number) => {
				return (
					<button type="button" classList={{
						's-paginator-page': true,
						's-highlight': page - 1 === mergedProps.page
					}} onClick={(e) => onPageLinkClick(e, page)}>
						{page}
					</button>
				)
			}}
		</For>
	</span>;

}
