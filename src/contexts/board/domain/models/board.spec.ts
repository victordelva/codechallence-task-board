import { describe, expect, it } from "@jest/globals";
import { BoardMother } from "@/contexts/board/domain/models/board.mother";
import { TaskMother } from "@/contexts/board/domain/models/task.mother";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";
import { InvalidTaskMovementError } from "@/contexts/board/domain/errors/invalid-task-movement.error";

describe("BoardComponent tests", () => {
  describe("checks possible movements", () => {
    it("should return all possible movements for a task in BACKLOG", () => {
      const task = TaskMother.random({ status: TaskStatus.BACKLOG });
      const board = BoardMother.random({ tasks: [task] });
      expect(board.getPossibleMoves(task)).toEqual([TaskStatus.TODO]);
    });
    it("should return all possible movements for a task in TODO", () => {
      const task = TaskMother.random({ status: TaskStatus.TODO });
      const board = BoardMother.random({ tasks: [task] });
      expect(board.getPossibleMoves(task)).toEqual([
        TaskStatus.BACKLOG,
        TaskStatus.DOING,
      ]);
    });
    it("should return all possible movements for a task in DOING", () => {
      const task = TaskMother.random({ status: TaskStatus.DOING });
      const board = BoardMother.random({ tasks: [task] });
      expect(board.getPossibleMoves(task)).toEqual([
        TaskStatus.TODO,
        TaskStatus.DONE,
      ]);
    });
    it("should return all possible movements for a task in DONE", () => {
      const task = TaskMother.random({ status: TaskStatus.DONE });
      const board = BoardMother.random({ tasks: [task] });
      expect(board.getPossibleMoves(task)).toEqual([]);
    });
  });

  describe("check restriction when the column DOING has 2 or more tasks", () => {
    it("should return DOING when it has less than 2 tasks - movement from TODO", () => {
      const task = TaskMother.random({ status: TaskStatus.TODO });
      const board = BoardMother.random({
        tasks: [task, TaskMother.random({ status: TaskStatus.DOING })],
      });
      expect(board.getPossibleMoves(task)).toEqual([
        TaskStatus.BACKLOG,
        TaskStatus.DOING,
      ]);
    });
    it("should NOT return DOING when it has 2 tasks - movement from TODO", () => {
      const task = TaskMother.random({ status: TaskStatus.TODO });
      const board = BoardMother.random({
        tasks: [
          task,
          TaskMother.random({ status: TaskStatus.DOING }),
          TaskMother.random({ status: TaskStatus.DOING }),
        ],
      });
      expect(board.getPossibleMoves(task)).toEqual([TaskStatus.BACKLOG]);
    });
    it("should NOT return DOING when it has more than 2 tasks - movement from TODO", () => {
      const task = TaskMother.random({ status: TaskStatus.TODO });
      const board = BoardMother.random({
        tasks: [
          task,
          TaskMother.random({ status: TaskStatus.DOING }),
          TaskMother.random({ status: TaskStatus.DOING }),
          TaskMother.random({ status: TaskStatus.DOING }),
        ],
      });
      expect(board.getPossibleMoves(task)).toEqual([TaskStatus.BACKLOG]);
    });
  });

  describe("move task to another status", () => {
    it("should move a task from BACKLOG to TODO", () => {
      let movedTask = TaskMother.random({ status: TaskStatus.BACKLOG });
      const board = BoardMother.random({ tasks: [movedTask] });
      movedTask = board.moveTask(movedTask, TaskStatus.TODO);
      expect(movedTask.status).toBe(TaskStatus.TODO);
    });
    it("should move a task from TODO to DOING", () => {
      let movedTask = TaskMother.random({ status: TaskStatus.TODO });
      const board = BoardMother.random({ tasks: [movedTask] });
      movedTask = board.moveTask(movedTask, TaskStatus.DOING);
      expect(movedTask.status).toBe(TaskStatus.DOING);
    });
    it("should move a task from DOING to DONE", () => {
      let movedTask = TaskMother.random({ status: TaskStatus.DOING });
      const board = BoardMother.random({ tasks: [movedTask] });
      movedTask = board.moveTask(movedTask, TaskStatus.DONE);
      expect(movedTask.status).toBe(TaskStatus.DONE);
    });
    it("should not be able to move from DONE", () => {
      const movedTask = TaskMother.random({ status: TaskStatus.DONE });
      const board = BoardMother.random({ tasks: [movedTask] });
      expect(() => {
        board.moveTask(movedTask, TaskStatus.DONE);
      }).toThrow(InvalidTaskMovementError);
    });
    it("should not be able to move to DOING when there are more than 2 tasks", () => {
      const movedTask = TaskMother.random({ status: TaskStatus.TODO });
      const board = BoardMother.random({
        tasks: [
          movedTask,
          TaskMother.random({ status: TaskStatus.DOING }),
          TaskMother.random({ status: TaskStatus.DOING }),
        ],
      });
      expect(() => {
        board.moveTask(movedTask, TaskStatus.DOING);
      }).toThrow(InvalidTaskMovementError);
    });
  });
});
