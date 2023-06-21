import React from "react";

const LessonFooter = () => {
  return (
    <div className="flex justify-center fixed bottom-0 left-0 w-full h-24 bg-white border border-solid border-t border-gray-200">
        <div className="container w-1/3 h-full flex justify-between items-center">
            <div className="flex order-1">
                <button
                type="button"
                className="w-32 py-3 px-5 mr-2 mb-2 text-sm font-medium text-violet-600 bg-white rounded-lg border border-violet-400 hover:bg-violet-100 hover:violet-600 focus:outline-none focus:z-10 focus:ring-4 focus:ring-violet-400"
                >Back
                </button>
            </div>

            <div className="flex order-2">
                <button
                type="button"
                className="w-32 px-5 py-3 mr-2 mb-2 text-white font-medium text-sm bg-violet-400 rounded-lg  hover:bg-violet-600 focus:ring-4 focus:ring-violet-400"
                >Continue
                </button>
            </div>
        </div>
    </div>
  );
};

export default LessonFooter;
