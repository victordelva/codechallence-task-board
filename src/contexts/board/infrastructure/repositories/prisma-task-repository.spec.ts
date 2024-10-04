import { PrismaClient } from "@prisma/client";
import {PrismaTaskRepository} from "@/contexts/board/infrastructure/repositories/prisma-task-repository";
import {TaskMother} from "@/contexts/board/domain/models/task.mother";

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
			expect((await repository.findAll()).map((t) => t.id)).toContainEqual(task.id);
		});
	});
})