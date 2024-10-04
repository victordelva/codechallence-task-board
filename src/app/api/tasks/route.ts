import {NextRequest, NextResponse} from "next/server";
import {containerDependencies} from "@/contexts/board/infrastructure/dependencies/containerDependencies";
import {TaskStatus} from "@/contexts/board/domain/models/task-status.enum";

export async function GET() {
	const {getTaskUseCase} = containerDependencies();

	return NextResponse.json({
		tasks: await getTaskUseCase.execute(),
	}, { status: 200 });
}

export async function POST(request: NextRequest) {
	const {createTaskUseCase} = containerDependencies();
	const body = await request.json();

	if (!Object.values(TaskStatus).find(body.status)) {
		return NextResponse.json({
			error: 'Invalid status',
		}, { status: 400 });
	}

	await createTaskUseCase.execute({
		title: body.title,
		status: body.status,
	})

	return NextResponse.json("", { status: 201 });
}