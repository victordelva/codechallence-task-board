import {ReactNode} from "react";
import classNames from "classnames";

export function OptionButton(
	{
		isSelected,
		onClick,
		children,
	}: {
		isSelected: boolean,
		onClick: () => void,
		children: ReactNode,
	}
) {
	return (
		<div
			onClick={onClick}
			className={classNames("rounded-2xl font-semibold py-2 px-4 cursor-pointer", {
				"border-2 border-gray-400 hover:border-gray-500 text-gray-400 hover:text-gray-600": !isSelected,
				"bg-blue-400 text-blue-900 font-bold": isSelected
			})}>
			{children}
		</div>
	);
}