"use client"

import { IBoard, Task } from "@/types/type"
import { DragDropContext } from "@hello-pangea/dnd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SyncLoader } from "react-spinners"
import Column from "./Column"

const Board = ({ board }: { board: IBoard | null }) => {

    const [tasks, setTasks] = useState<Task[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()
    useEffect(() => {
        if(board) {
            setTasks(board.tasks)
            setIsLoading(false)
        }else{
            router.push("/onboarding")
        }
    }, [board])

    const onDragEnd = () => {
        
    }

    if (isLoading) {
        return (
          <div className="h-screen w-full flex justify-center items-center">
            <SyncLoader color="#fff" />
          </div>
        );
      }

    return (
        <div className="dark:bg-gray-900 py-10 relative h-screen text-white">
            <h1 className="font-bold text-center mb-10 text-3xl">{board?.name}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid md:grid-cols-3 max-md:items-center w-[90%] mx-auto md:gap-5 gap-10">
                    <Column />
                    <Column />
                    <Column />
                </div>
            </DragDropContext>
        </div>
    )
}

export default Board