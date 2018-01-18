export const enter = {
	directives: {
		enter: {
			inserted: (el, binding) => {
				el.parentNode.scrollTop = el.parentNode.scrollHeight;
			}
		}
	}
}