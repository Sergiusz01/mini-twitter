import React from 'react';
import 'tailwindcss/tailwind.css';
import Link from "next/link";
import {BsBell, BsEnvelope, BsThreeDots, BsTwitter} from "react-icons/bs";
import {BiBookmark, BiHomeCircle, BiUser} from "react-icons/bi";
import {HiOutlineHashtag} from "react-icons/hi";

const NAVIGATION = [
    {
        title: "Twitter",
        icon: BsTwitter,
    },
    {
        title: 'Home',
        icon: BiHomeCircle
    },
    {
        title: 'Explore',
        icon: HiOutlineHashtag
    },
    {
        title: 'Notification',
        icon: BsBell
    },
    {
        title: 'Messages',
        icon: BsEnvelope
    },
    {
        title: 'Bookmarks',
        icon: BiBookmark
    },
    {
        title: 'Profile',
        icon: BiUser
    },
]

const LeftMenu = () => {
    return (
        <section className="w-[30%] flex flex-col items-stretch h-screen sticky top-0">
            <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
                {
                    NAVIGATION.map((item) => (
                        <Link
                            className='hover:bg-black/5 text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6'
                            href={`/${item.title.toLowerCase()}`}
                            key={item.title}>
                            <div>
                                {React.createElement(item.icon)}
                            </div>
                            {item.title !== "Twitter" && <div>{item.title}</div>}
                        </Link>
                    ))
                }</div>
            <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
                <button
                    className="rounded-full m-4 bg-primary p-4 text-2xl text-center font-bold text-white hover:bg-opacity-70 transition duration-200">
                    Tweet
                </button>
            </div>
            <button
                className="justify-between w-full hover:bg-black/5 flex items-center space-x-2 rounded-full bg-transparent p-4 text-center hover:bg-opacity-70 transition duration-200">
                <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-slate-400 w-12 h-12 "></div>
                    <div className="text-left text-sm">
                        <div className="font-semibold">User</div>
                        <div className="">@user</div>
                    </div>
                </div>
                <div><BsThreeDots /></div>
            </button>
        </section>
    );
}

export default LeftMenu;
