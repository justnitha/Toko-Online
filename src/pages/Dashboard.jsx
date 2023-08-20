import { MainNavigasi } from "../components/MainNavigasi"
import { Link } from "react-router-dom"

const Dashboard = () => {
    return(
        <div className="flex">
            <MainNavigasi/>
            <div className="grid grid-cols-4 gap-3 w-[85%] px-7 mt-4">
                <Link to="/penjualan">
                    <div className="bg-red-500">
                        <h2>Penjualan</h2>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, repellat.
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Dashboard