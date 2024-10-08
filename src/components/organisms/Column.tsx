import { ReactNode } from "react";
import { Board } from "@/contexts/board/domain/models/board";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";

export default function Column({
  status,
  children,
  totalTasks,
}: {
  status: TaskStatus;
  children?: ReactNode;
  totalTasks: number;
}) {
  return (
    <div className="min-w-96 w-96 m-2 bg-gray-200 p-2 rounded-md">
      <div className="flex justify-between">
        <div className="text-lg font-bold text-center border-b border-black">
          {status}
        </div>
        <div className="px-2 text-right">
          {totalTasks} tasks
          {Board.maxCardsInColumn[status] !== null &&
            // @ts-expect-error:possibly-null
            totalTasks >= Board.maxCardsInColumn[status] && (
              <span className="ml-2">(Task limit reached)</span>
            )}
        </div>
      </div>

      <div className="py-2 overflow-y-scroll max-h-full">{children}</div>
    </div>
  );
}
