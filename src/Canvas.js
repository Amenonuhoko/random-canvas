/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useCallback } from "react";
import "./Canvas.css";

const Canvas = ({ colors, canvas, quantity, size }) => {
	// Define
	const canvasRef = useRef(null);
	const containerRef = useRef(null);

	const [particles, setParticles] = useState([]);

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

	// Renders on Changes
	useEffect(() => {
		if (particles.length > quantity) {
			let newParticles = particles.slice(0, quantity);
			setParticles(newParticles);
		}
		// Initiate initial Particles
		const stuff = particles;
		let q = quantity;
		for (let i = 0; i < q; i++) {
			var ranNum = Math.random() * (Math.round(Math.random()) ? 1 : -1);
			var ranNum2 = Math.random() * (Math.round(Math.random()) ? 1 : -1);
			let choice = Math.floor(Math.random() * colors.length);
			let radius = Math.floor(Math.random() * size + 20);
			let speed = 0.05;
			stuff[i] = new Particle(
				Math.random() * canvas.width,
				Math.random() * canvas.height,
				// X SPEED
				ranNum - speed,
				// Y SPEED
				ranNum2 - speed,
				// Color
				colors[choice],
				// Size
				radius
			);
		}
		setParticles(stuff);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colors, quantity, size, canvas]);
	// Update Particle Positions
	const update = useCallback(
		(ctx, frameCount) => {
			const stuff = particles;
			let particle;
			let i = 0;
			while (i < quantity) {
				particle = stuff[i];
				// BUMP WALL
				if (particle.x > canvas.width) {
					particle.vx *= particle.bounce;
				} else if (particle.x < 0) {
					particle.vx *= particle.bounce;
				}
				// BUMP CEILING / ROOF
				if (particle.y > canvas.height) {
					particle.vy *= particle.bounce;
				} else if (particle.y < 0) {
					particle.vy *= particle.bounce;
				}
				// TRAVEL
				particle.x += particle.vx;
				particle.y += particle.vy;
				i++;
			}
			setParticles(stuff);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[canvas]
	);
	// Draw Particle paths
	const draw = useCallback(
		(ctx) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
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
		},
		[size, quantity, canvas]
	);
	// Renders every update
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
				width={canvas.width - 2}
				height={canvas.height - 2}
				style={{ border: "1px solid #000000" }}
			></canvas>
		</div>
	);
};

export default Canvas;
