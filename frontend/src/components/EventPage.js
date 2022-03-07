import { API } from "aws-amplify";
import React from "react";

class EventPage extends React.Component{

    state = {
              eventID: this.props.match.params.eventID,
              eventName: '', 
              startDate: '',
              endDate:   '',
              startTime: '',
              endTime:   '',
            }

    async componentDidMount(){
        console.log(this.props);

        try {
            await this.getEvent(this.state.eventID);   
        } catch (error) {
            console.log(error);
        }

    }
    
    getEvent(eventID){
        return API.get("events", `/events/${eventID}`)
        .then(res =>{
            console.log(res);

            this.setState({
              eventName: res.eventName, 
              startDate: res.startDate,
              endDate:   res.endDate,
              startTime: res.startTime,
              endTime:   res.endTime,
            })
        });
    }


    render() {
        return(
        <div className="EventPage">
            <h1>Hello!</h1>
            <h2>ID: {this.state.eventID}</h2>
            <h2>Name: {this.state.eventName}</h2>
            <h2>Start Time: {this.state.startTime}</h2>
            <h2>End Time: {this.state.endTime}</h2>
            <h2>Start Date: {this.state.startDate}</h2>
            <h2>End Time: {this.state.endDate}</h2>
        </div>
        )
    }
}

export default EventPage;