
import Link from "next/link";
import getAuthUser, { logout } from "@/actions/auth";

const Navbar = async () => {
    const user = await getAuthUser();

    return (
        <nav className="w-full py-3 flex justify-between items-center px-8 bg-gray-900 text-white shadow-md">
            <Link href="/" className="text-2xl font-bold text-blue-300">Kanban Board</Link>
            <div className="flex justify-center items-center gap-3">
                {user && (
                    <Avatar name={user?.name} size={"big"} />
                )}
                {user ? (
                    <form action={logout}>
                        <button className="text-blue-300 hover:text-blue-500 font-sm">Logout</button>
                    </form>
                ) : (
                    <Link href="/login" className="text-blue-300 hover:text-blue-500 text-lg font-bold">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-300`}>{name[0]}</span>
        </div>
    );
}
