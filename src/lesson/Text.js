import React from 'react'

const Text = ({text}) => {
  return (
    <div>
        <p className="mt-6 text-xs md:text-sm text-left leading-5 md:leading-7 text-gray-700">
            {text}
        </p>
    </div>
  )
}

export default Text;