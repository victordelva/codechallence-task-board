import {Task} from "@/board-context/domain/task";
import {Board} from "@/board-context/domain/board";

export class BoardMother {
	static random({tasks} : {tasks: Task[]} = {tasks: []}): Board {
		return new Board({tasks});
	}
}