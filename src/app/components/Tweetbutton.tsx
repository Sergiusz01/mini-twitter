import React from 'react';

const Tweetbutton = () => {
    return (
        <div className="flex flex-col items-stretch h-full space-y-4 mt-4">
            <button
                className="rounded-full m-4 bg-primary p-4 text-2xl text-center font-bold text-white hover:bg-opacity-70 transition duration-200">
                Tweet
            </button>
        </div>
    );
}

export default Tweetbutton;