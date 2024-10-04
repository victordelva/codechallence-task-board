import {Task} from "@/contexts/board/domain/models/task";
import {Board} from "@/contexts/board/domain/models/board";

export class BoardMother {
	static random({tasks} : {tasks: Task[]} = {tasks: []}): Board {
		return new Board({tasks});
	}
}