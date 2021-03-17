import "./App.css";
import { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas";
import Color from "./Color";
import Slider from "./Slider";

function App() {
	// DEFINE
	const canvasRef = useRef(null);
	const optionsRef = useRef(null);
	// OPTIONS
	const [hidden, setHidden] = useState(false);
	const [canvas, setCanvas] = useState({});
	const [canvasX, setCanvasX] = useState(32);
	const [canvasY, setCanvasY] = useState(32);
	const [colors, setColors] = useState([]);
	const [quantity, setQuantity] = useState(100);
	const [sizeRange, setSizeRange] = useState(20);
	// HANDLE
	// CANVAS
	const handleChangeX = (e) => {
		const value = parseInt(e.target.value);
		setCanvasX(value);
	};
	const handleChangeY = (e) => {
		const value = parseInt(e.target.value);
		setCanvasY(value);
	};
	function getBoundingClientRect(element) {
		var rect = element.getBoundingClientRect();
		return {
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			left: rect.left,
			width: rect.width,
			height: rect.height,
			x: rect.x,
			y: rect.y,
		};
	}
	useEffect(() => {
		const stuff = getBoundingClientRect(canvasRef.current);
		setCanvas(stuff);
	}, []);

	// COLOR
	const colorChange = (color, event, index) => {
		console.log(index);
		const stuff = [...colors];
		stuff[index] = color.hex;
		setColors(stuff);
	};
	const handleClick = () => {
		setColors([...colors, colors]);
	};
	// AMOUNT
	const handleChangeQuantity = (e) => {
		setQuantity(e.target.value);
	};
	const handleHidden = () => {
		if (hidden) {
			optionsRef.current.style.display = "flex";
		} else {
			optionsRef.current.style.display = "none";
		}

		setHidden((prev) => !prev);
	};

	// RETURN
	return (
		<div className="App">
			<div className="Canvas" ref={canvasRef}>
				<Canvas
					colors={colors}
					canvas={canvas}
					canvasX={canvasX}
					canvasY={canvasY}
					quantity={quantity}
					size={sizeRange}
				/>
			</div>

			<div className="Options">
				<div className="button">
					<button onClick={handleHidden}>HERE</button>
				</div>
				<div className="box" ref={optionsRef}>
					<input
						type="text"
						name="canvasX"
						onChange={handleChangeX}
						value={canvasX}
					/>
					<input
						type="text"
						name="canvasY"
						onChange={handleChangeY}
						value={canvasY}
					/>
					<div className="color-squares">
						<button name="add" onClick={handleClick}></button>
						{colors.map((colorBox, i) => {
							return (
								<Color
									key={i}
									colors={colorBox}
									colorChange={colorChange}
									index={i}
								/>
							);
						})}
					</div>

					<input
						type="text"
						name="quantity"
						onChange={handleChangeQuantity}
						value={quantity}
					/>
					<Slider className="Slider" value={quantity} setValue={setQuantity} />
					<Slider className="min" value={sizeRange} setValue={setSizeRange} />
				</div>
			</div>
		</div>
	);
}

export default App;
