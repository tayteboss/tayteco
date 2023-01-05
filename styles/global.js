import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
	:root {
		--colour-intro-back: ${theme.colours.backThunder};
		--colour-intro-back-engaged: ${theme.colours.backThunderEngaged};
		--colour-intro-fore: ${theme.colours.foreThunder};
		--colour-black: ${theme.colours.black};
		--colour-true-black: ${theme.colours.trueBlack};
		--colour-white: ${theme.colours.white};
		--transition-speed-fast: ${theme.transitionSpeed.fast};
		--transition-speed-default: ${theme.transitionSpeed.default};
		--transition-speed-slow: ${theme.transitionSpeed.slow};
	}

	/* Set Font Family's */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6
	{
		font-family: ${theme.fonts.default};
		font-feature-settings: 'lnum' 1;
	}

	p
	{
		font-family: ${theme.fonts.default};
	}

	/* Set Font Styles */
	p,
	div,
	.type-p
	{
		font-size: ${theme.size.body};
		line-height: 1.25rem;
	}

	strong
	{
		font-weight: 700;
	}

	a
	{
		color: ${theme.colours.black};
	}

	h1,
	.type-h1
	{
		font-size: ${theme.size.h1};
		line-height: 1.25rem;
	}

	h2,
	.type-h2
	{
		font-size: ${theme.size.h2};
		line-height: 1.25rem;
	}

	h3,
	.type-h3
	{
		font-size: ${theme.size.h3};
		line-height: 1.25rem;
	}

	h4,
	.type-h4
	{
		font-size: ${theme.size.h4};
		line-height: 1.25rem;
	}

	h5,
	.type-h5
	{
		font-size: ${theme.size.h5};
		line-height: 1.25rem;
	}

	h6,
	.type-h6
	{
		font-size: ${theme.size.h6};
		line-height: 1.25rem;
	}

	body
	{
		font-weight: normal;
		font-family: ${theme.fonts.default};
	}

	.main-wrapper
	{
		min-height: 80vh;
	}

	.view-element-bottom-top
	{
		opacity: 0;
		transform: translateY(50px);

		transition: opacity 500ms ease, transform 500ms ease;
		transition-delay: 50ms;

		&--in-view
		{
			opacity: 1;
			transform: translateY(0);
		}
	}

	.view-element-left-right
	{
		opacity: 0;
		transform: translateX(-50px);

		transition: opacity 500ms ease, transform 500ms ease;
		transition-delay: 50ms;

		&--in-view
		{
			opacity: 1;
			transform: translateX(0);
		}
	}

	.view-element-fade-in
	{
		opacity: 0;

		transition: opacity 500ms ease;
		transition-delay: 50ms;

		&--in-view
		{
			opacity: 1;
		}
	}

	.content {
		p:not(:last-child) {
			margin-bottom: 16px;
		}
	}

	/* Resets */
	*
	{
		&::selection
		{
			background-color: grey;
		}

		backface-visibility: hidden;
	}

	.container::-webkit-scrollbar { display: none; }.container { -ms-overflow-style: none; }

	body,
	html,
	#root
	{
		background: var(--colour-black);
		font-size: 18px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: antialiased;
		font-smooth: antialiased;
		cursor: none !important;

		transition: all 300ms ease;

		@media ${theme.mediaBreakpoints.mobile}
		{
			cursor: initial;
		}
	}

	html
	{
		scroll-behavior: smooth;
		scroll-snap-type: y mandatory;
		overflow-y: hidden;

		&.no-scroll
		{
			overflow-y: hidden;
		}
	}

	body
	{
		margin: 0;
		background: ${theme.colours.white};

		-ms-overflow-style: none;
		&::-webkit-scrollbar { display: none; }
	}

	a
	{
		text-decoration: none;
		color: ${theme.colours.black};
		cursor: none;
	}

	button
	{
		background: none;
		outline: none;
		border: none;
		cursor: none;
	}

	button,
	input,
	select,
	textarea
	{
		margin: 0;

		&:focus
		{
			outline: none;
		}
	}

	html, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, figure, footer, header, menu, nav, section, time, mark, audio, video, details, summary, button
	{
		margin: 0;
		padding: 0;
		border: 0;
		font-weight: normal;
		vertical-align: baseline;
	}

	main, article, aside, figure, footer, header, nav, section, details, summary 
	{
		display: block;
	}

	html
	{
		box-sizing: border-box;
	}

	*,
	*:before,
	*:after
	{
		box-sizing: inherit;
	}

	a
	{
		margin: 0;
		padding: 0;
		font-size: 100%;
		vertical-align: baseline;
		background: transparent;
	}

	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
		-webkit-appearance:none;
	}
`;
