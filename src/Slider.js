import { useRef, useState } from "react";
import "./Slider.css";

const Slider = ({ value, setValue, name }) => {
	const inputRef = useRef(null);
	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const [collapse, setCollapse] = useState(false);
	const handleClick = () => {
		setCollapse((prev) => !prev);
	};

	const [min, setMin] = useState(1);
	const handleMin = (e) => {
		setMin(e.target.value);
	};
	const [max, setMax] = useState(100);
	const handleMax = (e) => {
		setMax(e.target.value);
	};

	return (
		<div className="slider-container">
			<div className="slide">
				<button onClick={handleClick}>{name}</button>
				<input
					ref={inputRef}
					type="range"
					min={min}
					max={max}
					onChange={handleChange}
					value={value}
					className="slider"
					id="myRange"
				></input>
			</div>

			{collapse ? (
				<div className="min-max">
					<input className="min" value={min} onChange={handleMin} />
					<input className="max" value={max} onChange={handleMax} />
				</div>
			) : null}
		</div>
	);
};

export default Slider;
