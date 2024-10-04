import {Task} from "@/contexts/board/domain/task";
import {Board} from "@/contexts/board/domain/board";

export class BoardMother {
	static random({tasks} : {tasks: Task[]} = {tasks: []}): Board {
		return new Board({tasks});
	}
}