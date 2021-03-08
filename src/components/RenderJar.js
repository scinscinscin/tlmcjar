import React from "react";

function RenderJar({ object, type }) {
	if (object !== undefined) {
		return (
			<div className={type === "Client" ? "mb-8" : undefined}>
				<div className="flex flex-wrap justify-center">
					<button
						className="bg-green-400 text-base font-bold py-2 px-4 rounded text-black flex-3"
						onClick={() => {
							//download button here
							window.open(`${object.url}`);
						}}
					>
						{type} Download
					</button>
					<p className="flex-1 sm:text-center md:text-left md:px-5">
						{(parseInt(object.size) / 1048576)
							.toFixed(1)
							.toString()}
						MB
					</p>
				</div>
				<p className="text-white text-base break-all graytext">
					sha1: {object.sha1}
				</p>
			</div>
		);
	} else {
		return null;
	}
}

export default RenderJar;
