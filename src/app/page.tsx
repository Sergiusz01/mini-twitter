import React from 'react';
import 'tailwindcss/tailwind.css';
import LeftMenu from "@/app/components/LeftMenu";
import Main from "@/app/components/Main";
import './globals.css'
import RightSections from "@/app/components/RightSections";
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
