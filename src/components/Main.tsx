import React from 'react';
import {BsChat, BsDot, BsThreeDots} from "react-icons/bs";
import {AiOutlineHeart, AiOutlineRetweet} from "react-icons/ai";
import {IoShareOutline, IoStatsChart} from "react-icons/io5";

const Main = () => {
    return (
        <div className="w-[80%] h-full ">
            <main className="flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-neutral-200">
                <h1 className="text-xl font-bold p-6 backdrop-blur sticky top-0">Home</h1>
                <div className="border-t-[0.5px] border-b-[0.5px] px-4 py-6 space-x-2 border-neutral-200 relative flex items-stretch ">
                    <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
                    <div className="flex flex-col w-full h-full">
                        <input type="text"
                               placeholder="What's happening?"
                               className="w-full h-full text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5px] border-neutral-200 p-4 outline-none border-none" />
                        <div className="w-full justify-end items-center flex">
                            <div></div>
                            <div className="w-full max-w-[100px]">
                                <button
                                    className="rounded-full text-white font-bold bg-primary px-4 py-2 w-full text-lg text-center hover:bg-opacity-70 transition duration-200">
                                    Post
                                </button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {
                        Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="flex space-x-4 items-stretch p-4 border-b-[0.5px] border-neutral-200">
                                <div>
                                    <div className="w-12 h-12 bg-slate-400 rounded-full"></div>
                                </div>
                                <div className="flex flex-col ">
                                    <div className="flex items-center w-full justify-between">
                                        <div className="flex items-center space-x-1 w-full">
                                            <div className="font-bold">Name user</div>
                                            <div className="text-gray-500">@username</div>
                                            <div className="text-gray-500"><BsDot /></div>
                                            <div className="text-gray-500">2 hour ago</div>
                                        </div>
                                        <div className="cursor-pointer rounded-full hover:bg-primary/20 hover:text-primary p-2.5 transition duration-200">
                                            <BsThreeDots />
                                        </div>
                                    </div>
                                    <div className="text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate illo molestiae mollitia quisquam ullam unde? Dolorem maxime porro veritatis!
                                    </div>
                                    <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div>
                                    <div className="flex items-center justify-start space-x-20 mt-4 w-full">
                                        <div className="rounded-full hover:bg-primary/20 hover:text-primary p-2.5 cursor-pointer transition duration-200">
                                            <BsChat />
                                        </div>
                                        <div className="rounded-full hover:bg-green/20 hover:text-green p-2.5 cursor-pointer transition duration-200">
                                            <AiOutlineRetweet />
                                        </div>
                                        <div className="rounded-full hover:bg-red/20 p-2.5 hover:text-red cursor-pointer transition duration-200">
                                            <AiOutlineHeart />
                                        </div>
                                        <div className="rounded-full hover:bg-primary/20 hover:text-primary p-2.5 cursor-pointer transition duration-200">
                                            <IoStatsChart />
                                        </div>
                                        <div className="rounded-full hover:bg-primary/20 hover:text-primary p-2.5 cursor-pointer transition duration-200">
                                            <IoShareOutline />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </main>
        </div>
    );
}

export default Main;
