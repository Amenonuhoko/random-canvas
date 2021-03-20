import { useEffect, useState } from "react";

import "./Color.css";
import { BlockPicker } from "react-color";

const Color = ({ colorChange }) => {
	// DEFINE
	const [currentColors, setCurrentColors] = useState([
		"#f47373",
		"#2ccce4",
		"#37d67a",
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
						<Picker
							key={color}
							currentColors={currentColors}
							setCurrentColors={setCurrentColors}
							index={i}
							colorChange={colorChange}
						/>
					);
				})}
			</div>

			<button onClick={handleClick}>Add Color</button>
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
		console.log(event);
		// let stuff = currentColors;
		// stuff[index] = color.hex;
		// setCurrentColors(stuff);
		setCurrentColors((prev) =>
			prev.map((colors, i) => {
				if (index === i) {
					return color.hex;
				}
				return colors;
			})
		);
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
