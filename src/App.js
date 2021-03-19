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
	const [colors, setColors] = useState([]);
	const [quantity, setQuantity] = useState(100);
	const [sizeRange, setSizeRange] = useState(20);
	// HANDLE
	// AMOUNT
	const handleHidden = () => {
		if (hidden) {
			optionsRef.current.style.display = "flex";
		} else {
			optionsRef.current.style.display = "none";
		}

		setHidden((prev) => !prev);
	};
	// CANVAS
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
	const colorChange = (color) => {
		setColors(color);
	};

	// RETURN
	return (
		<div className="App">
			<div className="Canvas" ref={canvasRef}>
				<Canvas
					colors={colors}
					canvas={canvas}
					quantity={quantity}
					size={sizeRange}
				/>
			</div>

			<div className="Options">
				<div className="button">
					<button onClick={handleHidden}>Options</button>
				</div>
				<div className="box" ref={optionsRef}>
					<div className="color-squares">
						<Color colorChange={colorChange} />
					</div>
					<Slider
						className="Slider"
						value={quantity}
						setValue={setQuantity}
						name="Quantity"
					/>
					<Slider
						className="min"
						value={sizeRange}
						setValue={setSizeRange}
						name="Size"
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
