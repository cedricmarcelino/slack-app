import {useState} from 'react'

function Sidebar(props) {
    const {setActivePage,userHeaders} = props
    const [addButtonVisible, setAddButtonVisible] = useState(false)
    const [usersChannelVisible, setUsersChannelVisible] = useState(false)
    const [listOfChannels, setListOfChannels] = useState([])
        
    userHeaders[`Content-Type`] =  "application/json"

    function showAddButton(){
        setAddButtonVisible(true)
    }

    function hideAddButton(){
        setAddButtonVisible(false)
    }

    function showAddChannel(){
        setActivePage("AddChannel")
    }

    async function showUsersChannel(){

        if(usersChannelVisible){    
            setUsersChannelVisible(false)
        } else {
            setUsersChannelVisible(true)
            let response = await fetch("http://206.189.91.54/api/v1/channels",
                {method: "GET",
                headers: userHeaders, 
                mode:"cors"})
            .then(response=>response.json())
            .then(userChannels=>{
                userChannels = userChannels.data.map(data => 
                    data.name
                )
                setListOfChannels(userChannels)
            })
        }
    }

    return (
        <div className="bg-purple-900 text-white w-1/4">
            {addButtonVisible===false &&
            <>
                <span className="cursor-pointer flex item-stretch mx-4" onMouseEnter={showAddButton}>Channels</span>
            </>
            }

            {addButtonVisible &&
            <>
                <div className="cursor-pointer flex justify-between mx-4" onMouseLeave={hideAddButton}> 
                    <span onClick={showUsersChannel}>Channels</span>
                    <span onClick={showAddChannel}>+</span>
                </div>
            </>
            }
            
            {(usersChannelVisible)&& 
                <ul className="mx-10">
                    {listOfChannels.map((channel,id) => <li key={id}>{channel}</li>)}
                </ul>
            
            }
            <span className="cursor-pointer mx-4">Direct Messages</span> 
        </div>
    )
}

export default Sidebar
