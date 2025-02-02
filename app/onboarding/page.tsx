import OnboardingForm from "@/components/OnboardingForm"
import getAuthUser from "@/lib/getAuthUser"

const page = async() => {
    const user = await getAuthUser()
    console.log(user)

    return <OnboardingForm />
}

export default page