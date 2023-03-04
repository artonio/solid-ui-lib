import { ILastLinkProps } from './types';

export const LastPageLink = (props: ILastLinkProps) => {
	const iconClassName = 's-paginator-icon pi pi-angle-double-right';
	return (
		<button type="button" classList={{
			's-paginator-last': true,
		}} onClick={props.onClick} disabled={props.disabled}>
			<span class={iconClassName}></span>
		</button>
	)
}
