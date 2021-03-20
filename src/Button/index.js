import React from "react";
import "./Button.css";

function Button({ variant, size, onClick, content }) {
	return (
		<div className="btn-container">
			<button className={`btn btn-${variant} btn-${size} `} onClick={onClick}>
				{content}
			</button>
		</div>
	);
}
export default Button;
