import {PrismaClient} from "@prisma/client";
import {PrismaTaskRepository} from "@/contexts/board/infrastructure/repositories/prisma-task-repository";
import {TaskMother} from "@/contexts/board/domain/models/task.mother";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";

describe('PrismaTaskRepository Integration Tests', () => {
	let prisma: PrismaClient;
	let repository: PrismaTaskRepository;

	beforeAll(async () => {
		prisma = new PrismaClient();
		repository = new PrismaTaskRepository(prisma);
	});

	describe("task is saved in the database", () => {
		it('should create a task and find it on the list of all task', async () => {
			const task = TaskMother.random();
			await repository.save(task);
			const savedTask = await repository.findById(task.id);
			expect(savedTask?.id).toEqual(task.id);
			expect(savedTask?.title).toEqual(task.title);
			expect(savedTask?.status).toEqual(task.status);
		});

		it('should update the task title and status', async () => {
			const task = TaskMother.random({
				title: 'old',
				status: TaskStatus.BACKLOG,
			});
			await repository.save(task);
			const savedTask = await repository.findById(task.id);
			expect(savedTask?.id).toEqual(task.id);
			expect(savedTask?.title).toEqual(task.title);
			expect(savedTask?.status).toEqual(task.status);
			task.update({
				title: 'new',
				status: TaskStatus.TODO,
			});
			await repository.save(task);
			const updatedTask = await repository.findById(task.id);
			expect(updatedTask?.id).toEqual(task.id);
			expect(updatedTask?.title).toEqual('new');
			expect(updatedTask?.status).toEqual(TaskStatus.TODO);
		});
	});
})