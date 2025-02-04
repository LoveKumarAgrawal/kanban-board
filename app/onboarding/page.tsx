import getAuthUser from "@/actions/auth"
import { getBoardIdForUser } from "@/actions/board"
import OnboardingForm from "@/components/OnboardingForm"

const page = async() => {
    const user = await getAuthUser()
    const boardId = await getBoardIdForUser()

    console.log(user)
    console.log(boardId)

    return (
        <OnboardingForm user={user.name} boardId={boardId} />
    )
}

export default page