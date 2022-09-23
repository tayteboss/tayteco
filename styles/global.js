import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
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
	p
	{
		font-size: ${theme.size.body1};
		letter-spacing: -0.033rem;
		line-height: 1.556rem;
	}

	strong
	{
		font-weight: 700;
	}

	a
	{
		color: ${theme.colours.black};
	}

	small
	{
		font-size: ${theme.size.utility};
		letter-spacing: -0.014rem;
		line-height: 1.222rem;
	}

	h1,
	.type-h1
	{
		font-size: ${theme.size.h1};
		letter-spacing: -0.361rem;
		line-height: 6.778rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h1};
			letter-spacing: -0.222rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h1};
			line-height: 5.111rem;
		}
	}

	h2,
	.type-h2
	{
		font-size: ${theme.size.h2};
		letter-spacing: -0.222rem;
		line-height: 5.111rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h2};
			letter-spacing: -0.139rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h2};
			line-height: 2.9724rem;
		}
	}

	h3,
	.type-h3
	{
		font-size: ${theme.size.h3};
		letter-spacing: -0.042rem;
		line-height: 2.444rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h3};
			line-height: 1.889rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h3};
			line-height: 1.889rem;
		}
	}

	h4,
	.type-h4
	{
		font-size: ${theme.size.h4};
		letter-spacing: -0.042rem;
		line-height: 1.889rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h4};
			letter-spacing: -0.028rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h4};
			letter-spacing: -0.028rem;
		}
	}

	h5,
	.type-h5
	{
		font-size: ${theme.size.h5};
		letter-spacing: -0.028rem;
		line-height: 1.778rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h5};
			letter-spacing: -0.042rem;
			line-height: 1.667rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h5};
			letter-spacing: -0.042rem;
		}
	}

	h6,
	.type-h6
	{
		font-size: ${theme.size.h6};
		letter-spacing: -0.025rem;
		line-height: 1.667rem;

		@media ${theme.mediaBreakpoints.tabletPortrait}
		{
			font-size: ${theme.sizeTablet.h6};
			letter-spacing: -0.014rem;
			line-height: 1.333rem;
		}

		@media ${theme.mediaBreakpoints.mobile}
		{
			font-size: ${theme.sizeMobile.h6};
			line-height: 1.333rem;
		}
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
		background: ${theme.colours.white};
		font-size: 18px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: antialiased;
		font-smooth: antialiased;

		transition: all 300ms ease;

		@media ${theme.mediaBreakpoints.mobile}
		{
			cursor: initial;
		}
	}

	html
	{
		scroll-behavior: smooth;

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
	}

	button
	{
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
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

	html
	{
		overflow-y: scroll;
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
