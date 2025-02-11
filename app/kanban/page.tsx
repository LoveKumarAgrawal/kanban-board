import getAuthUser from "@/actions/auth"
import prisma from "../db"
import Board from "@/components/Board"

const page = async() => {
    const user = await getAuthUser()
    const board = await prisma.kanbanBoard.findFirst({
        where: {
            userId: user?.id
        },
        include: {
            tasks: true
        }
    })

    return <Board board={board}/>
}

export default page