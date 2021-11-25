import {useState} from 'react'

function AddMember(props) {
    const {channelID,userHeaders} = props
    const [accountID,setAccountID] = useState("")

    async function addUser(body){
        await fetch("http://206.189.91.54/api/v1/channel/add_member",
            {method: "POST",
            headers: userHeaders, 
            mode:"cors",
            body: JSON.stringify(body)})
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch((error) => {
            console.log(error)
        })
    }

    function handleChange(e){
        setAccountID(e.target.value)
    }

    function handleClick(){
        const body={
            "id": channelID,
            "member_id": accountID
        }
        addUser(body)
        setAccountID("")
    }

    return (
        <div className="text-center py-5">
            <h1 className="font-semibold text-3xl my-2">Add new member: </h1>
            <fieldset>
                <label className="my-2">Account ID: </label>
                <input className="my-2" type="text" onChange={handleChange} value={accountID}></input>
            </fieldset>
            <button onClick={handleClick} className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 border border-purple-900 rounded my-2">
                Add Member
            </button>
            
        </div>
    )
}

export default AddMember
