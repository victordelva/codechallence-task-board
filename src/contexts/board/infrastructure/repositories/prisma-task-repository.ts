import { TaskRepositoryInterface } from "@/contexts/board/domain/interfaces/task-repository.interface";
import { Task } from "@/contexts/board/domain/models/task";
import { TaskStatus } from "@/contexts/board/domain/models/task-status.enum";
import { PrismaClient } from "@prisma/client";

export class PrismaTaskRepository implements TaskRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll() {
    const tasks = await this.prisma.tasks.findMany();
    return tasks.map((t) => {
      return new Task({
        id: t.id,
        status: t.status as TaskStatus,
        title: t.title,
      });
    });
  }

  async findById(taskId: string) {
    const taskRaw = await this.prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!taskRaw) {
      return null;
    }

    return new Task({
      id: taskRaw.id,
      status: taskRaw.status as TaskStatus,
      title: taskRaw.title,
    });
  }

  async save(task: Task) {
    await this.prisma.tasks.upsert({
      where: { id: task.id },
      update: {
        status: task.status,
        title: task.title,
      },
      create: {
        id: task.id,
        title: task.title,
        status: task.status,
      },
    });
  }
}
