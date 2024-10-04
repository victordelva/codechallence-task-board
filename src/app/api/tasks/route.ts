import { NextResponse } from "next/server";
import {containerDependencies} from "@/contexts/board/infrastructure/dependencies/containerDependencies";

export async function GET(
	// request: NextRequest
) {
	const {getTaskUseCase} = containerDependencies();

	return NextResponse.json({
		tasks: await getTaskUseCase.execute(),
	}, { status: 200 });
}