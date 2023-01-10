import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useInView } from 'react-intersection-observer';

const wrapperCSS = css`
	grid-column: span 4;
	color: white;
	padding-top: 100%;
	background: var(--colour-trueBlack);
	position: relative;

	video {
		object-fit: cover;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	&:hover {
		.content-wrapper {
			opacity: 1;
		}
	}
`;

const ProjectGridCardDefault = styled.div`
	${wrapperCSS}
`;

const ProjectGridCardLink = styled.a`
	${wrapperCSS}
`;

const LoadingWrapper = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--colour-true-black);
	z-index: 2;
	pointer-events: none;
`;

const Loader = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 16px;
	height: 16px;
	background: var(--colour-intro-fore);
	border-radius: 100%;
`;

const ContentWrapper = styled.div`
	position: absolute;
	bottom: 16px;
	left: 16px;
	z-index: 3;
	opacity: ${(props) => props.$isVisible ? 1 : 0};
	pointer-events: none;
	color: var(--colour-white);
	mix-blend-mode: difference;

	transition: all var(--transition-speed-fast) ease;
`;

const Title = styled.p`
	color: var(--colour-white);
`;

const Categories = styled.p`
	color: var(--colour-white);
`;

const LinkSpread = styled.a`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'linear',
			repeat: 'Infinity',
			repeatType: "reverse",
		}
	}
};

const ProjectGridCardInner = ({ data, inView, forthcoming }) => {
	const [isLoading, setIsLoading] = useState(true);
	let videoUrl = false;

	if (data) {
		videoUrl = data?.video[0]?.video?.url;
	}

	const videoRef = useRef();

	const randInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	const handleHasLoaded = () => {
		setTimeout(() => {
			if (!forthcoming) {
				setIsLoading(false);
			}
		}, randInt(100, 500));
	}

	useEffect(() => {
		if (!videoRef?.current) return;
		videoRef.current.play();
	}, [videoRef]);

	return (
		<>
			{inView && (
				<>
					<AnimatePresence>
						{isLoading && (
							<LoadingWrapper
								variants={wrapperVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
							>
								<Loader
									variants={childVariants}
									initial="hidden"
									animate="visible"
									exit="hidden"
								/>
							</LoadingWrapper>
						)}
					</AnimatePresence>
					{videoUrl && (
						<video
							autoPlay
							muted
							playsInline
							loop
							ref={videoRef}
							preload="auto"
							onLoadedData={() => handleHasLoaded()}
							key={inView}
						>
							<source src={videoUrl} type="video/mp4" />
						</video>
					)}
					{!forthcoming && (
						<ContentWrapper className='content-wrapper'>
							{data.title && (
								<Title>{data.title}</Title>
							)}
							{data.categories && (
								<Categories>{data.categories}</Categories>
							)}
							{data.year && (
								<Categories>{data.year}</Categories>
							)}
						</ContentWrapper>
					)}
					{forthcoming && (
						<ContentWrapper className='content-wrapper' $isVisible={forthcoming}>
							<Title>Have a project?</Title>
							<Categories>Get in touch</Categories>
						</ContentWrapper>
					)}
				</>
			)}
		</>
	);
};

const ProjectGridCard = ({ data, forthcoming }) => {
	const hasLink = data?.link?.length > 0;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '300px'
	});

	return (
		<>
			{hasLink && !forthcoming && (
				<ProjectGridCardLink href={data.link} target="_blank" ref={ref}>
					<ProjectGridCardInner data={data} inView={inView} />
				</ProjectGridCardLink>
			)}
			{forthcoming && (
				<ProjectGridCardLink href="mailto: speakto@tayte.co" target="_blank" ref={ref} forthcoming={forthcoming}>
					<ProjectGridCardInner data={data} inView={inView} forthcoming={forthcoming} />
				</ProjectGridCardLink>
			)}
			{!hasLink && !forthcoming && (
				<ProjectGridCardDefault ref={ref}t>
					<ProjectGridCardInner data={data} inView={inView} />
				</ProjectGridCardDefault>
			)}
		</>
	);
};

export default ProjectGridCard;

