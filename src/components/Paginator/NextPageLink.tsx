import { INextPageLink } from './types';

export const NextPageLink = (props: INextPageLink) => {
	const iconClassName = 's-paginator-icon pi pi-angle-right';
	return (
		<button type="button" classList={{
			's-paginator-next': true,
		}} onClick={props.onClick} disabled={props.disabled}>
			<span class={iconClassName}></span>
		</button>
	)
}
