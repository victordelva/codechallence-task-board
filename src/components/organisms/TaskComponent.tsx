import StatusChip from "@/components/atoms/StatusChip";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";
import { EditIcon } from "@/components/atoms/svg/EditIcon";

export default function TaskComponent({
  title,
  status,
  onClick,
}: {
  title: string;
  status: TaskStatus;
  onClick: () => void;
}) {
  return (
    <div
      className="my-4 mx-2 p-2 relative rounded bg-white flex justify-between cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute top-[-10px] left-0 bg-white rounded-xl p-1 border-blue-400 hover:border">
        <EditIcon />
      </div>
      <div className="font-bold my-1 ml-4">{title}</div>
      <div>
        <StatusChip status={status} />
      </div>
    </div>
  );
}
