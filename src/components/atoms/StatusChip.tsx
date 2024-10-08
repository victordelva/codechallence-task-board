import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";

export default function StatusChip({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
        status === TaskStatus.BACKLOG
          ? "bg-gray-500"
          : status === TaskStatus.TODO
            ? "bg-blue-500"
            : status === TaskStatus.DOING
              ? "bg-yellow-500"
              : status === TaskStatus.DONE
                ? "bg-green-500"
                : ""
      }`}
    >
      {status}
    </span>
  );
}
