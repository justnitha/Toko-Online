import React, { useState } from "react";
import { BiSolidUser, BiLogIn} from "react-icons/bi";


const Navbar = () => {

    return (
        <div>
            <div className="flex items-center justify-between px-5 lg:px-14 py-3 bg-blue-400 ">
                <div className="flex gap-5 items-center text-lg ">
                    <h1>PaMeat</h1>
                </div>
                <div className="flex gap-5 items-center text-lg">
                    <div className="flex items-center gap-2">
                        <BiSolidUser />
                        <p>Administator</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BiLogIn />
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
