import { useState } from "react";
import Picker from "./Picker";
import "./Color.css";

const Color = ({ colors, colorChange, index }) => {
	const [collapse, setCollapse] = useState(false);

	const handleClick = () => {
		setCollapse((prev) => !prev);
	};
	const x = { backgroundColor: `${colors}` };
	return (
		<>
			<div className="color-box" onClick={handleClick} style={x}>
				{collapse ? (
					<Picker colors={colors} colorChange={colorChange} index={index} />
				) : null}
			</div>
		</>
	);
};

export default Color;
