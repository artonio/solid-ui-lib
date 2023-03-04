import { IFirstLinkProps } from './types';

export const FirstPageLink = (props: IFirstLinkProps) => {
	const iconClassName = 's-paginator-icon pi pi-angle-double-left';
	return (
		<button type="button" classList={{
			's-paginator-first': true,
		}} onClick={props.onClick} disabled={props.disabled}>
			<span class={iconClassName}></span>
		</button>
	)
}
