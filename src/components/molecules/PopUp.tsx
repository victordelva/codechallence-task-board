import {MouseEventHandler, ReactNode, useEffect, useRef} from 'react';

const Popup = (
	{ isOpen, onClose, children }: {
		isOpen: boolean;
		onClose: () => void;
		children: ReactNode;
	}) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		} else {
			document.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
		>
			<div
				className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md transform transition-all duration-300"
			>
				<button
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none text-3xl"
					onClick={onClose}
					aria-label="Close Popup"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export default Popup;
