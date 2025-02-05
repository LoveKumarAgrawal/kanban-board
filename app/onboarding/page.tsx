import getAuthUser from "@/actions/auth"
import { getBoardIdForUser } from "@/actions/board"
import OnboardingForm from "@/components/OnboardingForm"
import { SessionPayload } from "@/types/type"

const page = async() => {
    const user: SessionPayload | null = await getAuthUser()
    const boardId = await getBoardIdForUser()

    return (
        <OnboardingForm user={user?.name} boardId={boardId} />
    )
}

export default page