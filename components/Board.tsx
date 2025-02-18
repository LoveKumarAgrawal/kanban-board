"use client"
import axios from "axios";
import { IBoard, Task } from "@/types/type"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"
import Column from "./Column"
import Modal from "./ui/Modal"
import { FaPlus } from "react-icons/fa"
import { createTask } from "@/actions/board"

const Board = ({ board }: { board: IBoard | null }) => {

    const [tasks, setTasks] = useState<Task[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        if (board) {
            setTasks(board.tasks)
            setIsLoading(false)
        } else {
            router.push("/onboarding")
        }
    }, [board])

    const openModal = () => {
        setIsCreate(true);
    };

    const closeModal = () => {
        setIsCreate(false);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const draggedTask = tasks?.find((task) => task.id === draggableId)

        let updatedStatus: string;

        switch (destination.droppableId) {
            case "todo":
                updatedStatus = "TODO";
                break;
            case "inProgress":
                updatedStatus = "IN_PROGRESS";
                break;
            case "completed":
                updatedStatus = "DONE";
                break;
            default:
                updatedStatus = draggedTask!.status;
        }
        
        try {
            axios.post("/api/updateTaskStatus", {
              taskId: draggableId,
              newStatus: updatedStatus,
            });
          } catch (error) {
            console.log(error);
          }
      
          const updatedTask = tasks!.map((task) => {
            if (task.id === draggableId) {
              return {
                ...task,
                status: updatedStatus,
              };
            }
            return task;
          });
      
          setTasks(updatedTask);
    }

    if (isLoading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <SyncLoader color="#fff" />
            </div>
        );
    }

    return (
        <div className="dark:bg-gray-900 py-10 relative h-screen">
            <h1 className="font-bold text-center mb-10 text-3xl">
                {board!.name}
            </h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
                    <button
                        className="bg-gray-700 rounded-full hover:bg-gray-600 text-white font-bold p-4 absolute right-10 bottom-10"
                        onClick={openModal}
                    >
                        <FaPlus />
                    </button>
                    {isCreate && (
                        <Modal
                            closeModal={closeModal}
                            title="Create New Task"
                            isCreate={isCreate}
                            action={createTask}
                            value={board!.id}
                        />
                    )}
                    <Column
                        title="Todo"
                        tasks={tasks!.filter(
                            (task) => task.status === "TODO"
                        )}
                        droppableId="todo"
                    />
                    <Column
                        title="In Progress"
                        tasks={tasks!.filter(
                            (task) => task.status === "IN_PROGRESS"
                        )}
                        droppableId="inProgress"
                    />
                    <Column
                        title="Completed"
                        tasks={tasks!.filter(
                            (task) => task.status === "DONE"
                        )}
                        droppableId="completed"
                    />
                </div>
            </DragDropContext>
        </div>
    )
}

export default Board