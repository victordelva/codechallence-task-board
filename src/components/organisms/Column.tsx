import {ReactNode} from "react";

export default function Column({
	title,
	children,
                               }: {
	title: string;
	children?: ReactNode;
}) {
	return (
		<div className="min-w-96 w-96 m-2 bg-gray-200 p-2">
			<div
				className="text-lg font-bold text-center border-b border-black"
			>
				{title}
			</div>
			<div className="py-2 overflow-y-scroll max-h-full">
				{children}
			</div>
		</div>
	);
}