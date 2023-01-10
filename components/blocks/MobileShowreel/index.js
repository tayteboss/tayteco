import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const MobileShowreelWrapper = styled.div`
	height: calc(var(--vh) * 50);
	position: relative;
	background: var(--colour-true-black);

	video {
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
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

const MobileShowreel = ({ data }) => {
	const [isLoading, setIsLoading] = useState(true);

	const videoRef = useRef();

	const handleHasLoaded = () => {
		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	}

	useEffect(() => {
		if (!videoRef?.current) return;
		videoRef.current.play();
	}, [videoRef]);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-5%'
	});

	return (
		<MobileShowreelWrapper ref={ref}>
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
			{data?.url && (
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
					<source src={data.url} type="video/mp4" />
				</video>
			)}
		</MobileShowreelWrapper>
	);
};

export default MobileShowreel;
