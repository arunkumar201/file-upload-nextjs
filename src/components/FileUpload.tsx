import * as React from "react";
import { FaUpload } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface FileUploadProps {
	file: File | undefined;
	progress: number;
	fileData: {
		url: string;
		thumbnailUrl: string;
		size: number;
		uploadedAt: string;
	};
	onFileChange: (file: File | undefined) => void;
	onUploadClick: () => Promise<void>;
	isDragDropEnabled: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
	file,
	progress,
	fileData,
	onFileChange,
	onUploadClick,
	isDragDropEnabled,
}: FileUploadProps) => {
	return (
		<div className="w-full flex justify-center bg-slate-200 min-h-screen text-zinc-50 p-2 md:p-3">
			<div className="w-full md:w-[50%] max-w-xl h-full border-2 border-green-400 px-12 py-6 mt-4 bg-slate-800 rounded-3xl shadow-xl">
				<div className="flex w-full flex-col gap-4 h-full justify-center items-center p-4">
					<div className="flex w-full flex-col">
						{isDragDropEnabled && (
							<input
								type="file"
								onChange={(e) => {
									onFileChange(e.target.files?.[0]);
								}}
								className="p-2"
							/>
						)}
							<p>Prograss Bar</p>
						<div className="w-[13rem] relative h-[6px] rounded-lg overflow-hidden mt-4 border-2 text-center border-gray-50 py-2">
							<div
								className={`h-full top-0 absolute transition-width duration-1000 ease-in-out bg-zinc-50 py-4`}
								style={{
									width: `${progress}%`,
								}}
							></div>
						</div>
					</div>
					  <button
						onClick={onUploadClick}
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4 transition-colors"
					>
						<FaUpload className="inline-block mr-2" /> Upload File
					</button>
					{progress === 100 && (
						<div className="text-gray-200 mt-4 flex flex-col justify-start w-full gap-4">
							<h1>
								Uploaded URL{" "}
								<Link href={fileData.url} target="_blank">
									<p className="text-blue-500 hover:underline">File Url</p>
								</Link>
							</h1>
							<h1>
								Thumbnail Uploaded URL{" "}
								<Link href={fileData.thumbnailUrl} target="_blank">
									<p className="text-blue-500 hover:underline">Thumbnail Url</p>
								</Link>
							</h1>
							<h1>
								Uploaded File Size{" "}
								<span className="text-lg text-amber-300">
									{fileData.size / 1000} KB
								</span>
							</h1>
							<h1>Timestamp</h1>
							{fileData.uploadedAt}
						</div>
					)}
					{progress === 100 && (
						<div className="relative h-[200px] w-[200px]">
							<Image
								src={fileData.url}
								alt="uploaded file"
								layout="fill"
								objectFit="cover"
								className="rounded-xl"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FileUpload;
