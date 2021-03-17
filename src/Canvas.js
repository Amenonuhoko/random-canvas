import { useEffect, useState, useRef, useCallback } from "react";
import "./Canvas.css";

const Canvas = ({ colors, quantity }) => {
	const canvasRef = useRef(null);
	const containerRef = useRef(null);

	const [particles, setParticles] = useState([]);

	const [canvasWidth, setCanvasWidth] = useState(900);
	const [canvasHeight, setCanvasHeight] = useState(900);

	const randomColor = () => {
		const random = Math.floor(Math.random() * colors.length);
		const randomColor = colors[random];
		return randomColor;
	};

	class Particle {
		constructor(x, y, vx, vy, color, radius) {
			this.x = x;
			this.y = y;
			this.vx = vx;
			this.vy = vy;
			this.color = color;
			this.radius = radius;
			this.sAngle = 0;
			this.eAngle = Math.PI * 2;
			this.bounce = -1;
		}
	}
	useEffect(() => {
		const stuff = particles;
		let q = quantity;
		for (let i = 0; i < q; i++) {
			var ranNum = Math.random() * (Math.round(Math.random()) ? 1 : -1);
			var ranNum2 = Math.random() * (Math.round(Math.random()) ? 1 : -1);
			let choice = Math.floor(Math.random() * colors.length);
			let radius = Math.floor(Math.random() * 40 + 20);
			let speed = 0.05;
			stuff[i] = new Particle(
				Math.random() * canvasWidth,
				Math.random() * canvasHeight,
				// X SPEED
				ranNum - speed,
				// Y SPEED
				ranNum2 - speed,
				colors[choice],
				radius
			);
		}
		setParticles(stuff);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colors, quantity]);

	const update = useCallback((ctx, frameCount) => {
		const stuff = particles;
		let particle;
		let i = 0;
		while (i < quantity) {
			particle = stuff[i];
			// BUMP WALL
			if (particle.x > canvasWidth) {
				particle.vx *= particle.bounce;
			} else if (particle.x < 0) {
				particle.vx *= particle.bounce;
			}
			// BUMP CEILING / ROOF
			if (particle.y > canvasHeight) {
				particle.vy *= particle.bounce;
			} else if (particle.y < 0) {
				particle.vy *= particle.bounce;
			}
			// TRAVEL
			particle.x += particle.vx;
			particle.y += particle.vy;
			// for (let j = i; j < quantity; j++) {
			// 	if (particle.x >= stuff[j].x) {
			// 		particle.vx *= particle.bounce;
			// 		particle.x += particle.vx;
			// 	} else if (stuff[i].y === particle.y) {
			// 		console.log();
			// 		particle.vy *= particle.bounce;
			// 		particle.y += particle.vy;
			// 	}
			// }
			i++;
		}
		setParticles(stuff);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const draw = useCallback((ctx) => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		for (let i = 0; i < quantity; i++) {
			const particle = particles[i];
			ctx.beginPath();
			ctx.fillStyle = particle.color;
			ctx.arc(
				particle.x,
				particle.y,
				particle.radius,
				particle.sAngle,
				particle.eAngle
			);
			ctx.fill();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const context = canvasRef.current.getContext("2d");

		let frameCount = 0;
		let animationFrameID;

		const render = () => {
			frameCount++;
			draw(context, frameCount);
			update(context);
			animationFrameID = window.requestAnimationFrame(render);
		};

		render();
		return () => window.cancelAnimationFrame(animationFrameID);
	}, [draw, update, colors]);

	return (
		<div ref={containerRef} id="canvas-container">
			<canvas
				ref={canvasRef}
				width="900"
				height="900"
				style={{ border: "1px solid #000000" }}
			></canvas>
		</div>
	);
};

export default Canvas;
