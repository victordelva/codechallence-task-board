"use client";
import {Task} from "@/contexts/board/domain/models/task";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";
import StatusChip from "@/components/atoms/StatusChip";
import {useEffect, useState} from "react";

export function TaskForm({
	id,
	title,
	status,
	possibleMoves,
}: {
	id: string;
	title: string;
	status: TaskStatus;
	possibleMoves: TaskStatus[];
}) {
	const [loading, setLoading] = useState(false)
	const [_title, setTitle] = useState(title);
	const [_status, setStatus] = useState<TaskStatus | null>(null);

	const save = async () => {
		if (loading) return;
		setLoading(true);
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

		setLoading(false)
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
			<div className="flex gap-2 ">
				{possibleMoves && possibleMoves.map((newStatus) => (
					<>
						<div
							onClick={() => setStatus(newStatus)}
						>{newStatus}</div>
					</>
				))}
				{!possibleMoves && (
					<div>No movements possible</div>
				)}
			</div>
			<div onClick={save}>
				Save
			</div>
		</>
	);
}