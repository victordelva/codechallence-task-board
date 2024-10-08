import {ReactNode} from "react";
import clx from "classnames";

export function Button({
	                       children,
	                       onClick,
	                       className,
                       disabled,
                       }: {
	children: ReactNode;
	onClick: () => void;
	className?: string;
	disabled?: boolean;
}) {
	return (
		<button
			onClick={() => {
				if (!disabled) {
				onClick()
			}}}
			className={clx(className,
				" font-bold py-2 px-4 rounded-xl",
				{ "cursor-not-allowed bg-gray-500 hover:bg-gray-700 text-gray-800": disabled,
					"bg-blue-500 hover:bg-blue-700 text-white": !disabled }
				)}>
			{children}
		</button>
	);

}