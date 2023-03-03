export const isTwoObjectsEqual = (obj1: any, obj2: any) => {
	if (obj1 && obj2) {
		return JSON.stringify(obj1, Object.keys(obj1).sort()) === JSON.stringify(obj2, Object.keys(obj2).sort());
	}
}
