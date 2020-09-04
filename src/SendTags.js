import React, {useState} from 'react'
import axios from 'axios';
 
// GET Request for sample data

export default function SendTags (data) {
    const [recipients, updateRecipients] = useState("")
    const [qualifier, updateQualifier] = useState("")
    const [sendTo, updateSendTo] = useState("")
    const [sendType, updateSendType] = useState("")
    const [sent, updateSent] = useState(false)

    const handleChange = (event) => {
        const value = event.target.value
        switch(event.target.name) {
            case "sendType":
                updateSendType(value)
                return
            case "sendTo":
                updateSendTo(value)
                return
            case "qualifier":
                updateQualifier(value)
                return
            default:
                return;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.get('https://sheetdb.io/api/v1/aka2sv6jd00dh')
        .then(function (response) {
            if(sendType === 'Tags'){
                if(qualifier === 'AND'){
                    let comparator = sendTo.split(',');
                    console.log(comparator, 'comparator')
                    return response.data.map(item=>{
                        let results = [];
                        let temp = item.tags.split(',');
                        // let flag = false;
                        for(let i = 0; i < temp.length; i++){
                            if(item.tags.includes(temp[i])){
                                // flag = true
                                let recipient = `${item.firstName + ' ' + item.lastName}`;
                                results.push(recipient);
                                console.log('res',results);
                            }
                        }
                        return results;
                    });
                }
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function (results) {
            // always executed
            updateSent(true);
                updateRecipients(sendTo);
            console.log('boom');
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{textAlign: "left"}}>
                <label style={{paddingRight: "10px"}}>
                    <div>
                        <span style={{paddingRight: "10px"}}>Send Type (Organization, First Name, Last Name, or Tags):</span>
                        <input type="text" name="sendType" onChange={handleChange}/>
                    </div>
                    <div>
                        <span style={{paddingRight: "10px", paddingTop: "20px"}}>Send To (separated by commas):</span>
                        <input type="text" name="sendTo" onChange={handleChange}/>
                    </div>
                    <div>
                        <span style={{paddingRight: "10px", paddingTop: "20px"}}>AND/OR?: </span>
                        <input type="text" name="qualifier" onChange={handleChange}/>
                    </div>
                </label>
                <input type="submit" value="Send Messages" />
            </form>
            { sent && <div>Sent to: {recipients}</div> }
        </div>
    )
}