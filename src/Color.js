import { useEffect, useState } from "react";

import "./Color.css";
import { BlockPicker } from "react-color";

const Color = ({ colorChange }) => {
	// DEFINE
	const [currentColors, setCurrentColors] = useState([
		"rgba(220, 0, 0, 0.7)",
		"rgba(0, 200, 0, 0.7)",
		"rgba(0, 0, 230, 0.7)",
	]);
	// HANDLE
	const handleClick = () => {
		setCurrentColors([...currentColors, currentColors]);
	};
	// RENDER

	// RETURN
	return (
		<div className="color-boxes">
			<div className="color-list" style={{ display: "flex" }}>
				{currentColors.map((color, i) => {
					return (
						<>
							<Picker
								currentColors={currentColors}
								setCurrentColors={setCurrentColors}
								index={i}
								colorChange={colorChange}
							/>
						</>
					);
				})}
			</div>

			<button onClick={handleClick} style={{}}>
				Add Color
			</button>
		</div>
	);
};
const Picker = ({ setCurrentColors, currentColors, index, colorChange }) => {
	// DEFINE
	const [collapse, setCollapse] = useState(false);
	// HANDLE
	const handleClick = () => {
		setCollapse((prev) => !prev);
	};
	const handleChange = (color, event) => {
		let stuff = currentColors;
		stuff[index] = color.hex;
		setCurrentColors(stuff);
	};
	useEffect(() => {
		colorChange(currentColors);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentColors]);
	// RETURN
	return (
		<div
			className="color-box"
			onClick={handleClick}
			style={{
				backgroundColor: `${currentColors[index]}`,
			}}
		>
			<div
				className="color-picker"
				style={{ display: collapse ? "inline" : "none" }}
			>
				<BlockPicker onChangeComplete={handleChange} />
			</div>
		</div>
	);
};
export default Color;
