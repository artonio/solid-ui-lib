import { IPrevPageLink } from './types';

export const PrevPageLink = (props: IPrevPageLink) => {
	const iconClassName = 's-paginator-icon pi pi-angle-left';
	return (
		<button type="button" classList={{
			's-paginator-prev': true,
		}} onClick={props.onClick} disabled={props.disabled}>
			<span class={iconClassName}></span>
		</button>
	)
}
