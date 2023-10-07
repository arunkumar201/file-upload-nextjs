"use client";
// import * as React from "react";
// import { useEdgeStore } from "../lib/edgestore";
// import { FaUpload } from "react-icons/fa"; // Example: Using Font Awesome icons
// import Link from "next/link";
// import Image from "next/image";

// interface fileDataType {
// 	url: string;
// 	size: number;
// 	uploadedAt: string;
// 	thumbnailUrl: string;
// }

// export default function Page() {
// 	const [file, setFile] = React.useState<File | string>();
// 	const [fileData, setFileData] = React.useState<fileDataType>({
// 		url: "",
// 		size: 0,
// 		uploadedAt: "",
// 		thumbnailUrl: "",
// 	});
// 	const [progress, setProgress] = React.useState<number>(0);
// 	const { edgestore } = useEdgeStore();

// 	const fileUploadHandler = async (file: File) => {
// 		if (file) {
// 			const res = await edgestore.publicImages.upload({
// 				file,
// 				onProgressChange: (progress: number) => {
// 					setProgress(progress);
// 				},
// 				options: {
// 					temporary: true,
// 				},
// 			});
// 			setFileData({
// 				url: res.url,
// 				size: res.size,
// 				uploadedAt: res.uploadedAt.toDateString(),
// 				thumbnailUrl: res.thumbnailUrl!,
// 			});
// 		}
// 		setFile("");
// 	};
// 	React.useEffect(() => {
// 		setProgress(0);
// 	}, []);
// 	return (
// 		<div className="w-full flex justify-center bg-slate-200 min-h-screen text-zinc-50 p-2 md:p-3">
// 			<div className=" w-full md:w-[50%] max-w-xl h-full border-2 border-green-400 px-12 py-6 mt-4 bg-slate-800 rounded-3xl shadow-xl">
// 				<div className="flex w-full flex-col gap-4 h-full justify-center items-center p-4">
// 					<div className="flex w-full flex-col">
// 						<input
// 							type="file"
// 							onChange={(e) => {
// 								setFile(e.target.files?.[0]);
// 							}}
// 							className="p-2"
// 						/>
// 						<div className="w-[13rem] relative h-[6px] rounded-lg overflow-hidden mt-4 border-2 border-gray-50 py-2">
// 							<div
// 								className={`h-full top-0 absolute transition-width duration-1000 ease-in-out bg-zinc-50 py-4`}
// 								style={{
// 									width: `${progress}%`,
// 								}}
// 							></div>
// 						</div>
// 					</div>
// 					<button
// 						onClick={async () => await fileUploadHandler(file)}
// 						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 transition-colors"
// 					>
// 						<FaUpload className="inline-block mr-2" /> Upload File
// 					</button>
// 					{progress === 100 && (
// 						<div className="text-gray-200 mt-4 flex flex-col justify-start w-full gap-4">
// 							<h1>
// 								Uploaded URL{" "}
// 								<Link href={fileData.url} target="_blank">
// 									<p className="text-blue-500 hover:underline">File Url</p>
// 								</Link>
// 							</h1>
// 							<h1>
// 								ThumbnailUploaded URL{" "}
// 								<Link href={fileData.thumbnailUrl} target="_blank">
// 									<p className="text-blue-500 hover:underline">thumbnail Url</p>
// 								</Link>
// 							</h1>
// 							<h1>
// 								Uploaded File Size{" "}
// 								<span className="text-lg text-amber-300">
// 									{fileData.size / 1000} KB
// 								</span>
// 							</h1>
// 							<h1>Timestamp</h1>
// 							{fileData.uploadedAt}
// 						</div>
// 					)}
					// {progress === 100 && (
					// 	<div className="relative h-[200px] w-[200px]">
					// 		<Image
					// 			src={fileData.url}
					// 			alt="uploaded file"
					// 			layout="fill"
					// 			objectFit="cover"
					// 			className="rounded-xl"
					// 		/>
					// 	</div>
					// )}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import * as React from "react";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import FileUpload from "@/components/FileUpload";

export default function Page() {
	const [file, setFile] = useState<File | undefined>();
	const [fileData, setFileData] = useState({
		url: "",
		thumbnailUrl: "",
		size: 0,
		uploadedAt: "",
	});
	const [progress, setProgress] = useState<number>(0);
	const { edgestore } = useEdgeStore();

	const fileUploadHandler = async (file: File | undefined) => {
		if (file && typeof file === "string") {
			// Handle the file URL case here
			// e.g., setFileData({ url: file, size: 0, uploadedAt: '', thumbnailUrl: '' });
		} else if (file instanceof File) {
			const res = await edgestore.publicImages.upload({
				file,
				onProgressChange: (progress: number) => {
					setProgress(progress);
				},
				options: {
					temporary: true,
				},
			});
			setFileData({
				url: res.url,
				size: res.size,
				uploadedAt: res.uploadedAt.toDateString(),
				thumbnailUrl: res.thumbnailUrl!,
			});
		}
		setFile(undefined);
	};

	return (
		<FileUpload
			file={file}
			progress={progress}
			fileData={fileData}
			onFileChange={setFile}
			onUploadClick={async () => await fileUploadHandler(file)}
			isDragDropEnabled={true}
		/>
	);
}
