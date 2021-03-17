import { BlockPicker } from "react-color";

const Picker = ({ colors, colorChange, index }) => {
	const handleChange = (color, event) => {
		console.log(colorChange);
		colorChange(color, event, index);
	};
	return (
		<>
			<div className="color-picker">
				<BlockPicker onChangeComplete={handleChange} />
			</div>
		</>
	);
};
export default Picker;
