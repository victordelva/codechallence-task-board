import {NextRequest, NextResponse} from "next/server";
import {TaskMother} from "@/contexts/board/domain/task.mother";

export async function GET(request: NextRequest) {
	return NextResponse.json({
		tasks: [
			TaskMother.random(),
			TaskMother.random(),
			TaskMother.random(),
			TaskMother.random(),
		],
	}, { status: 200 });
}