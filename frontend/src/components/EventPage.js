import { API } from "aws-amplify";
import React from "react";
import FullCalendar, { getDayClassNames } from '@fullcalendar/react'
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import ClipboardCopy from './ClipboardCopy';

class EventPage extends React.Component{

    state = {
              eventID: this.props.match.params.eventID,
              eventName: '', 
              startDate: '',
              endDate:   '',
              startTime: '00:00:00',
              endTime:   '00:00:00',
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

    // Returns a number (0-6 for the days of the week) so we can set
    // appropriate first day in calendar view
    dateToDay(d){
        let date = new Date(d);
        return date.getDay();
    }


    render() {
        return(
        <div className="EventPage">
            
            <h2>Event Name: {this.state.eventName}</h2>
            

            <FullCalendar
                plugins={[ timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                slotMinTime={this.state.startTime}
                slotMaxTime={this.state.endTime}
                editable={true}
                selectable={true}
                selectMirror={true}
                validRange={{
                    start:  this.state.startDate,
                    end:    this.state.endDate
                }}
                firstDay={this.dateToDay(this.state.startDate) || 0}  // OR 0 to fix initial loading issues before data is ready
            />
        
                <ClipboardCopy copyText={'localhost:3000/event/' + this.state.eventID} />
        </div>
        )
    }
}

export default EventPage;