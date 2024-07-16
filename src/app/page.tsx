import React from 'react';
import 'tailwindcss/tailwind.css';
import LeftMenu from "@/components/LeftMenu";
import Main from "@/components/Main";
import './globals.css'
import RightSections from "@/components/RightSections";
const Home = () => {
    return (
        <div className="w-full h-full flex justify-center items-center relative bg-white ">
            <div className="max-w-[80%] w-full h-full flex relative">
                <LeftMenu />
                <Main />
                <RightSections/>
            </div>
        </div>
    );
}

export default Home;
