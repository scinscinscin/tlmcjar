import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import VersionCollapsible from "./components/VersionCollapsible";
import Header from "./components/Header";

function App() {
	const [minecraftVersions, setminecraftVersions] = useState(undefined);
	const [versionsToRender, setversionsToRender] = useState(undefined);
	useEffect(() => {
		fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json")
			.then((res) => res.json())
			.then(({ versions }) => {
				setminecraftVersions(versions);
				setversionsToRender(versions);
			});
	}, []);

	if (versionsToRender === undefined) {
		return <div>Not loaded versions yet</div>;
	} else {
		return (
			<div className="flex">
				{/* Navigashun */}
				<aside className="fixed h-screen py-5 shadow px-10 bg-transparent">
					<Header />
					<Formik
						initialValues={{
							query: "",
							type: "all",
						}}
						onSubmit={async ({ query: keyword, type }) => {
							if (type === "" && keyword === "") {
								setversionsToRender(minecraftVersions);
							} else {
								let newArray = [];
								newArray = minecraftVersions.filter((obj) => {
									if (
										type === "snapshot" ||
										type === "release"
									) {
										if (
											keyword !== "" &&
											keyword !== undefined
										) {
											// specified type and keyword
											return (
												obj.id.includes(keyword) &&
												obj.type === type
											);
										} else {
											// specified type but no keyword
											return obj.type === type;
										}
									} else if (type === "other") {
										if (
											keyword !== "" &&
											keyword !== undefined
										) {
											// specified other but with keyword
											return (
												obj.id.includes(keyword) &&
												obj.type !== "snapshot" &&
												obj.type !== "release"
											);
										} else {
											// specified other and no keyword
											return (
												obj.type !== "snapshot" &&
												obj.type !== "release"
											);
										}
									} else {
										// all input, just keyword
										return obj.id.includes(keyword);
									}
								});
								if (newArray.length > 0) {
									setversionsToRender(newArray);
								}
							}
						}}
					>
						<Form>
							<Field
								id="query"
								name="query"
								placeholder="Filter here"
								className="text-lg font-bold rounded p-1 mt-5"
							/>
							<div role="group" aria-labelledby="my-radio-group">
								<label className="text-white font-bold">
									<Field
										type="radio"
										name="type"
										value="release"
									/>
									Release
								</label>
								<label className="text-white font-bold">
									<Field
										type="radio"
										name="type"
										value="snapshot"
									/>
									Snapshot
								</label>
								<label className="text-white font-bold">
									<Field
										type="radio"
										name="type"
										value="other"
									/>
									Other
								</label>
								<label className="text-white font-bold">
									<Field
										type="radio"
										name="type"
										value="all"
									/>
									All
								</label>
							</div>
							<button
								type="submit"
								className="bg-green-400 text-base font-bold py-2 px-4 rounded text-black"
							>
								Filter!
							</button>
						</Form>
					</Formik>

					<p className="text-white break-word max-w-xs pb-12 absolute bottom-0">
						All downloadable jars are provided by official Mojang
						servers. Content is never re-distributed. This site is
						not affiliated with Mojang Studios.
					</p>
				</aside>

				<div className="flex-1 ml-96 mr-16">
					{versionsToRender.map((version, index) => (
						<VersionCollapsible
							versionObject={version}
							key={index}
							index={index}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default App;
