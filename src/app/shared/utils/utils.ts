export function hasIntersection(arr1: any, arr2: any) {
	const intersection = [];
	for (let i = 0; i < arr1.length; i++) {
		const element = arr1[i];
		if (arr2.indexOf(element) !== -1 && intersection.indexOf(element) === -1) {
			intersection.push(element);
		}
	}

	return intersection.length > 0;
}
