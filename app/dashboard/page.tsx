import Logout from "@/components/modules/logout";
import Test from "@/components/modules/test";

export default function Page(){
    return (
        <div className="p-10 text-2xl text-green-300">
            dashboard page
            <Test />
            <Logout />
        </div>
    )
}