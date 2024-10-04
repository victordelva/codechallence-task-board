import {describe, expect, it} from '@jest/globals';
import {BoardMother} from "@/board-context/domain/board.mother";
import {TaskMother} from "@/board-context/domain/task.mother";
import {TaskStatus} from "@/board-context/domain/task-status.enum";

describe('Board tests', () => {
	describe('checks possible movements', () => {
		it('should return all possible movements for a task in BACKLOG', () => {
			const task = TaskMother.random({status: TaskStatus.BACKLOG});
			const board = BoardMother.random({tasks: [task]});
			expect(board.getPossibleMoves(task)).toEqual([TaskStatus.TODO]);
		});
		it('should return all possible movements for a task in TODO', () => {
			const task = TaskMother.random({status: TaskStatus.TODO});
			const board = BoardMother.random({tasks: [task]});
			expect(board.getPossibleMoves(task)).toEqual([TaskStatus.BACKLOG, TaskStatus.DOING]);
		});
		it('should return all possible movements for a task in DOING', () => {
			const task = TaskMother.random({status: TaskStatus.DOING});
			const board = BoardMother.random({tasks: [task]});
			expect(board.getPossibleMoves(task)).toEqual([TaskStatus.TODO, TaskStatus.DONE]);
		});
		it('should return all possible movements for a task in DONE', () => {
			const task = TaskMother.random({status: TaskStatus.DONE});
			const board = BoardMother.random({tasks: [task]});
			expect(board.getPossibleMoves(task)).toEqual([]);
		});
	});

	describe('check restriction when the column DOING has 2 or more tasks', () => {
		it('should return DOING when it has less than 2 tasks - movement from TODO', () => {
			const task = TaskMother.random({status: TaskStatus.TODO});
			const board = BoardMother.random({tasks: [
				task,
					TaskMother.random({status: TaskStatus.DOING}),
				]});
			expect(board.getPossibleMoves(task)).toEqual([TaskStatus.BACKLOG, TaskStatus.DOING]);
		});
		it('should NOT return DOING when it has 2 tasks - movement from TODO', () => {
			const task = TaskMother.random({status: TaskStatus.TODO});
			const board = BoardMother.random({tasks: [
				task,
					TaskMother.random({status: TaskStatus.DOING}),
					TaskMother.random({status: TaskStatus.DOING}),
				]});
			expect(board.getPossibleMoves(task)).toEqual([TaskStatus.BACKLOG]);
		});
		it('should NOT return DOING when it has more than 2 tasks - movement from TODO', () => {
			const task = TaskMother.random({status: TaskStatus.TODO});
			const board = BoardMother.random({tasks: [
				task,
					TaskMother.random({status: TaskStatus.DOING}),
					TaskMother.random({status: TaskStatus.DOING}),
					TaskMother.random({status: TaskStatus.DOING}),
				]});
			expect(board.getPossibleMoves(task)).toEqual([TaskStatus.BACKLOG]);
		});
	});
});