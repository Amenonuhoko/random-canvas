import "./App.css";
import { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Color from "./Color";

function App() {
	// DEFINE
	// OPTIONS
	const [canvas, setCanvas] = useState({
		x: [],
		y: [],
	});
	const [canvasX, setCanvasX] = useState(32);
	const [canvasY, setCanvasY] = useState(32);
	const [colors, setColors] = useState([]);
	const [quantity, setQuantity] = useState(100);

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
	// INIT
	useEffect(() => {
		setCanvas(() => ({
			x: new Array(canvasX).fill(0).map((ele, i) => ele + i),
			y: new Array(canvasY).fill(0).map((ele, i) => ele + i),
		}));
	}, [canvasX, canvasY]);
	// RETURN
	return (
		<div className="App">
			<div className="Canvas">
				<Canvas
					colors={colors}
					canvas={canvas}
					canvasX={canvasX}
					canvasY={canvasY}
					quantity={quantity}
				/>
			</div>

			<div className="Options">
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
				{colors.map((colorBox, i) => {
					return (
						<div className="color-squares">
							<Color
								key={i}
								colors={colorBox}
								colorChange={colorChange}
								index={i}
							/>
						</div>
					);
				})}
				<button name="add" onClick={handleClick}>
					+
				</button>
				<input
					type="text"
					name="quantity"
					onChange={handleChangeQuantity}
					value={quantity}
				/>
			</div>
		</div>
	);
}

export default App;
