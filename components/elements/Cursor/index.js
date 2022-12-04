import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../../utils/UseMousePosition';
import { useRouter } from 'next/router';

const CursorWrapper = styled.div`
	mix-blend-mode: ${props => props.isHoveringViewLink ? 'normal' : 'difference'};
	height: 27px;
	width: 27px;
	z-index: 1000;
	position: fixed;
	display: ${props => props.isOnDevice ? 'none' : 'block'};

	transition: opacity ${props => props.theme.transitionSpeed.default} ease;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		display: none;
	}
`;

const CursorRing = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	top: ${props => props.$isHoveringLink ? '-15px' : '-7px'};
	left: ${props => props.$isHoveringLink ? '-15px' : '-7px'};
	height: ${props => props.$isHoveringLink ? '30px' : '15px'};
	width: ${props => props.$isHoveringLink ? '30px' : '15px'};
	background: ${props => props.$isHoveringLink ? props.theme.colours.white : 'none'};
	border-radius: 50%;
	border: 1px solid ${props => props.theme.colours.white};
	mix-blend-mode: ${props => props.isHoveringViewLink ? 'normal' : 'difference'};
	pointer-events: none;
	text-align: center;
	z-index: 2;

	transition: height 300ms ease, width 300ms ease, background 200ms ease, top 300ms ease, left 300ms ease, border-radius 300ms ease;
`;

const CursorText = styled.span`
	padding-top: ${props => props.isMouseDownOnCarousel ? '26px' : '30px'};
	text-transform: uppercase;
	letter-spacing: 0.036rem;
	font-size: 0.667rem;
	color: ${props => props.isHoveringVideoLink || props.isCloseStyle ? props.theme.colours.white : props.theme.colours.black};
	mix-blend-mode: difference;
	font-family: ${props => props.theme.fonts.DMMonoReg};

	transition: opacity 300ms ease 300ms, padding-top 300ms ease;
`;

const Cursor = ({ cursorRefresh }) => {
	const [isHoveringLink, setIsHoveringLink] = useState(false);
	const [cursorText, setCursorText] = useState('');
	const [isOnDevice, setIsOnDevice] = useState('');
	const position = useMousePosition();
	const router = useRouter();

	let mouseXPosition = position.x;
	let mouseYPosition = position.y;

	const variantsWrapper = {
		visible: {
			x: mouseXPosition,
			y: mouseYPosition,
			transition: {
				type: 'spring',
				mass: 0.1,
				stiffness: 800,
				damping: 20,
				ease: 'linear'
			}
		}
	};

	const clearCursor = () => {
		setIsHoveringLink(false);
		setCursorText('');
		setIsOnDevice(false);
	};

	useEffect(() => {
		const aTags = document.querySelectorAll('a');
		const buttonTags = document.querySelectorAll('button');

		aTags.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				setIsHoveringLink(true);
			});
			link.addEventListener('mouseleave', () => {
				setIsHoveringLink(false);
			});
		});

		buttonTags.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				setIsHoveringLink(true);
			});
			link.addEventListener('mouseleave', () => {
				setIsHoveringLink(false);
			});
		});

		// checking if on a device
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsOnDevice(true);
		} else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
			setIsOnDevice(true);
		}

		return function cleanUp() {
			setIsHoveringLink(false);
			setIsOnDevice(false);
		};
	}, [cursorRefresh]);

	// reset cursor on page change
	useEffect(() => {
		clearCursor();
	}, [router.pathname, router.asPath, router.query.slug]);

	return (
		<CursorWrapper
			isOnDevice={isOnDevice}
			className="cursor-wrapper"
		>
			<CursorRing
				$isHoveringLink={isHoveringLink}
				variants={variantsWrapper}
				animate="visible"
			>
				{/* <CursorText>
					{cursorText}
				</CursorText> */}
			</CursorRing>
		</CursorWrapper>
	);
};

export default Cursor;
