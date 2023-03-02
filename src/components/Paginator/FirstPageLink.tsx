export const FirstPageLink = (props: any) => {
	const iconClassName = 's-paginator-icon pi pi-angle-double-left';
	return (
		<button type="button" classList={{
			's-paginator-first': true,
		}} onClick={props.onClick} disabled={props.disabled}>
			<span class={iconClassName}></span>
		</button>
	)
}
