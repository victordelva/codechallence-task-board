import { NextRequest, NextResponse } from "next/server";
import { containerDependencies } from "@/contexts/board/infrastructure/dependencies/containerDependencies";

export async function GET() {
  const { getTaskUseCase } = containerDependencies();

  return NextResponse.json(
    {
      tasks: await getTaskUseCase.execute(),
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  const { createTaskUseCase } = containerDependencies();
  const body = await request.json();

  await createTaskUseCase.execute({
    title: body.title,
  });

  return NextResponse.json("", { status: 201 });
}
