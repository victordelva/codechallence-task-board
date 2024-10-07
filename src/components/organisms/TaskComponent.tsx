import StatusChip from "@/components/atoms/StatusChip";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";

export default function TaskComponent({
	id,
	title,
	status,
	onClick,
  }:{
	id: string;
	title: string;
	status: TaskStatus
	onClick: () => void;
}) {
	return (
		<div className="m-1 p-2 rounded bg-white flex justify-between cursor-pointer"
			onClick={onClick}
		>
			<div className="font-bold my-1">
				{title}
			</div>
			<div>
				<StatusChip status={status} />
			</div>
		</div>
	)
}