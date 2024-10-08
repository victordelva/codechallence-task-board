import { NextRequest, NextResponse } from "next/server";
import { containerDependencies } from "@/contexts/board/infrastructure/dependencies/containerDependencies";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const { title, status } = body;

  const { updateTaskFromBoardUseCase } = containerDependencies();

  await updateTaskFromBoardUseCase.execute({
    id: params.id,
    title,
    status,
  });

  return NextResponse.json({
    id: params.id,
    title,
    status,
  });
}
