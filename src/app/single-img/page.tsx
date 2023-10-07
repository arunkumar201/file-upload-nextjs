"use client";

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/SingleImage";
import FileUpload from "@/components/FileUpload";

const Page = () => {
	const { edgestore } = useEdgeStore();
	const [file, setFile] = useState<File | null>();
	const [progress, setProgress] = useState<number>(0);
	const [fileData, setFileData] = useState({
		url: "",
		thumbnailUrl: "",
		size: 0,
		uploadedAt: "",
	});
	const fileUploadHandler = async (file: File) => {
		if (file && typeof file === "string") {
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
		<>
			<div className=" bg-slate-200 text-white flex justify-center">
				<div className="w-full h-full ">
					<div className="w-full flex justify-center -mb-8">
						<SingleImageDropzone
							width={200}
							height={200}
							className=" mt-12 bg-slate-800 text-gray-50 "
							dropzoneOptions={{
								maxSize: 1024 * 1024 * 1, // 1MB
							}}
							value={file!}
							onChange={(file) => {
								setFile(file);
							}}
						/>
					</div>
					<FileUpload
						file={file!}
						progress={progress}
						fileData={fileData}
						onFileChange={setFile}
						onUploadClick={async () => await fileUploadHandler(file!)}
						isDragDropEnabled={false}
					/>
				</div>
			</div>
		</>
	);
};

export default Page;
