"use client";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import StatusChip from "@/components/atoms/StatusChip";
import { useState} from "react";
import {Button} from "@/components/atoms/Button";
import {OptionButton} from "@/components/molecules/OptionButton";

export function TaskForm({
	id,
	title,
	status,
	possibleMoves,
	onSave,
}: {
	id: string;
	title: string;
	status: TaskStatus;
	possibleMoves: TaskStatus[];
	onSave: () => void;
}) {
	const [isLoading, setIsLoading] = useState(false)
	const [_title, setTitle] = useState(title);
	const [_status, setStatus] = useState<TaskStatus | null>(null);

	const save = async () => {
		if (isLoading) return;
		setIsLoading(true);
		console.log({
			method: 'PUT',
			body: JSON.stringify({
				title: _title,
				status: _status,
			}),
		});
		await fetch(`/api/tasks/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				title: _title,
				status: _status,
			}),
		});

		setIsLoading(false);
		onSave && onSave();
	}

	return (
		<>
			<h2 className="font-bold text-2xl mb-4">Edit task</h2>
			<div className="flex gap-1 justify-between">
				<input
					onChange={(e) => setTitle(e.target.value)}
					type="text" value={_title}
				/>
				<StatusChip status={status} />
			</div>
			<div className="mt-5 font-semibold">
				Move task
			</div>
			<div className="flex gap-2 mt-2">
				{possibleMoves?.length > 0 && possibleMoves.map((newStatus) => (
					<>
						<OptionButton
							key={newStatus}
							isSelected={newStatus === _status}
							onClick={() => setStatus(newStatus)}
						>{newStatus}</OptionButton>
					</>
				))}
				{!(possibleMoves?.length > 0) && (
					<div>No possible movements</div>
				)}
			</div>
			<div className="w-full flex justify-end">
				{isLoading}
			<Button
				disabled={isLoading}
				onClick={save}
				className="my-2"
			>
				Save
			</Button>
			</div>
		</>
	);
}