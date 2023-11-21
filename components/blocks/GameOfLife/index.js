import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CELL_SIZE = 10;

const Canvas = styled.canvas`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	touch-action: none;
	opacity: 0.5;
`;

const GameOfLife = () => {
	const canvasRef = useRef(null);
	const [cells, setCells] = useState([]);
	const [running, setRunning] = useState(true);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (width === 0 || height === 0) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.fillStyle = 'transparent';
		ctx.fillRect(0, 0, width, height);

		const rootStyles = getComputedStyle(document.documentElement);
		const rawColorValue = rootStyles.getPropertyValue('--colour-intro-fore');

		cells.forEach(cell => {
			ctx.fillStyle = rawColorValue;
			ctx.fillRect(cell.x * CELL_SIZE, cell.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
		});
	}, [width, height, cells]);

	const handleCanvasClick = e => {
		if (running) {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
			const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

			setCells(prevCells => [...prevCells, { x, y }]);
		}
	};

	const handleMouseMove = e => {
		if (running) {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const rect = canvas.getBoundingClientRect();
			const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
			const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

			setCells(prevCells => [...prevCells, { x, y }]);
		}
	};

	const simulateGame = () => {
		if (!running) return;

		const neighborOffsets = [
			[-1, -1], [0, -1], [1, -1],
			[-1, 0], /* [0, 0] */ [1, 0],
			[-1, 1], [0, 1], [1, 1]
		];

		const neighborCount = {};

		cells.forEach(cell => {
			neighborOffsets.forEach(offset => {
				const neighborX = cell.x + offset[0];
				const neighborY = cell.y + offset[1];
				const key = `${neighborX}_${neighborY}`;
				neighborCount[key] = (neighborCount[key] || 0) + 1;
			});
		});

		const newCells = Object.keys(neighborCount)
			.filter(key => {
				const [x, y] = key.split('_').map(Number);
				const count = neighborCount[key];
				const isCellAlive = cells.some(cell => cell.x === x && cell.y === y);

				if (isCellAlive) {
					return count === 2 || count === 3;
				} else {
					return count === 3;
				}
			})
			.map(key => {
				const [x, y] = key.split('_').map(Number);
				return { x, y };
			});

		setCells(newCells);
	};

	useEffect(() => {
		const interval = setInterval(simulateGame, 500); // Change the speed here (milliseconds)
		return () => clearInterval(interval);
	}, [cells, running]);

	return (
		<Canvas
			ref={canvasRef}
			onClick={handleCanvasClick}
			onMouseMove={handleMouseMove}
		></Canvas>
	);
};

export default GameOfLife;
