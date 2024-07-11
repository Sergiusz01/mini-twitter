import React from 'react';
import {BsSearch} from 'react-icons/bs';

const RightSections = () => {
    return (

            <section
                className="w-[40%] sticky top-2 flex flex-col items-stretch h-screen px-6 mt-2  right-40 overflow-scroll scroll-hidden">
                <div>
                    <div className=" w-full h-full group sticky top-0 z-10   ">
                        <input
                            id="search"
                            type="text"
                            placeholder="Search Twitter"
                            className=" peer focus:border-primary transition duration-200 border-2 py-4 pr-4 pl-14 w-full h-full outline-none bg-neutral-900/10 rounded-xl"/>
                        <label
                            htmlFor="search"
                            className="absolute justify-center top-0  left-0 h-full flex items-center p-4 peer-focus:text-primary">
                            <BsSearch className="w-5 h-5 "/>
                        </label>

                    </div>
                </div>

                <div className="flex flex-col rounded-xl border-neutral-200 border-[0.5px]  my-4">
                    <h3 className="font-bold text-xl my-4 px-4">Poland trends</h3>
                    <div>
                        {
                            Array.from({length: 6}).map((_, item) => (
                                <div key={item} className="hover:bg-black/5 transition duration-200 p-4">
                                    <div className="font-bold text-lg">#trending {item + 1}</div>
                                    <div className="text-xs text-neutral-500">10.2k</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col rounded-xl border-neutral-200 border-[0.5px]  my-4">
                    <h3 className="font-bold text-xl my-4 px-4">Follow</h3>
                    <div>
                        {
                            Array.from({length: 6}).map((_, item) => (
                                <div key={item}
                                     className="hover:bg-black/5 transition duration-200 p-4 flex items-center justify-between ">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-10 h-10 bg-neutral-600 rounded-full flex-none"></div>
                                        <div className="flex flex-col ">
                                            <div className="font-bold text-black">Other User</div>
                                            <div className="text-gray-500 text-xs">@otheruser111</div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <button
                                            className="rounded-full px-6 py-2 bg-black text-white hover:bg-white hover:text-black transition duration-200 hover:rounded-1">Follow
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

    );
};

export default RightSections;