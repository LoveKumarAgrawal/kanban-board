"use client"

import { IBoard, Task } from "@/types/type"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

    return <div>Board</div>
}

export default Board