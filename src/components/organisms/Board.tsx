"use client"
import {useState} from "react";
import Column from "@/components/organisms/Column";
import Task from "@/components/organisms/Task";


export function Board() {
	return (
		<div className="flex overflow-x-scroll h-dvh m-2">
			<Column
				title="BACKLOG"
			>
				<Task title={"Task 1"} />
			</Column>
			<Column
				title="TODO"
			/>
			<Column
				title="DOING"
			/>
			<Column
				title="DONE"
			/>
		</div>
	);
}