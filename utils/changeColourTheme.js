const changeColourTheme = (back, backEngaged, fore) => {
	var root = document.querySelector(':root');

	root.style.setProperty('--colour-intro-back', back);
	root.style.setProperty('--colour-intro-back-engaged', backEngaged);
	root.style.setProperty('--colour-intro-fore', fore);
};

export default changeColourTheme;