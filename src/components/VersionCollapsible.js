import React, { useState } from "react";
import Collapsible from "react-collapsible";
import RenderJar from "./RenderJar";
const parseData = require("../parseData");

function VersionCollapsible({
	versionObject: { id, type, url, time, releaseTime },
	index,
}) {
	const [versionData, setversionData] = useState(undefined);
	const [isOpened, setisOpened] = useState(false);

	return (
		<Collapsible
			trigger={isOpened === true ? `▲${id}: ${type} ` : `▼${id}: ${type}`}
			onOpen={() => {
				if (versionData === undefined) {
					fetch(`${url}`)
						.then((res) => res.json())
						.then((data) => {
							setversionData(parseData(data));
						});
				}
			}}
			// attributes just to change the dropdown icon....
			onOpening={() => setisOpened(!isOpened)}
			onClosing={() => setisOpened(!isOpened)}
			transitionTime="100"
			className="text-white text-3xl mt-8 p-4 closed-div"
			openedClassName="text-white text-3xl mt-8 p-4 opened-div"
		>
			<div>
				{versionData === undefined ? (
					<p className="text-white text-2xl">Fetching Data</p>
				) : (
					<div>
						<RenderJar type="Client" object={versionData.dl.c} />
						<RenderJar type="Server" object={versionData.dl.s} />
					</div>
				)}
				<p className="text-base text-gray-50 mt-8">
					Last updated on: {time}
				</p>
				<p className="text-base text-gray-50">
					Released to public on: {releaseTime}
				</p>
			</div>
		</Collapsible>
	);
}

export default VersionCollapsible;
