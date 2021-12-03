import React from 'react'

function AlertWindow(props) {
    const {mobileView,alertMessage,alertWindowVisible,setAlertWindowVisible} = props

    function hideAlert(){
        setAlertWindowVisible(false)
    }

    return (
        <div className={`w-full h-full bg-gray-300 bg-opacity-50 pt-24 ${alertWindowVisible ? "absolute" : "hidden"}`}>
            <div className={`${mobileView ? "w-1/2": "w-1/4"} rounded-md overflow-hidden m-auto`}>   
                <div className="flex bg-purple-800 text-white py-1 px-4 font-bold">
                    <span className="mr-0 ml-auto cursor-pointer" onClick={hideAlert}>X</span>
                </div>
                <div className="bg-white p-4 text-center ">
                    {alertMessage}
                </div>
            </div>
        </div>
    )
}

export default AlertWindow
