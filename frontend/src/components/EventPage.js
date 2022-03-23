import { API } from "aws-amplify";
import React from "react";
import FullCalendar, { getDayClassNames } from '@fullcalendar/react'
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import ClipboardCopy from './ClipboardCopy';
import { createEventId } from './event-utils'


class EventPage extends React.Component{

    state = {
              eventID: this.props.match.params.eventID,
              eventName: '', 
              startDate: '',
              endDate:   '',
              startTime: '00:00:00',
              endTime:   '00:00:00',
              initialEvents: [{
                  start: '2022-03-15T05:00:00',
                  end: '2022-03-15T06:0:00'
              }],
              userName: '',
              events: [],
              participants: []
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
            let name = ''

            this.setState({
              eventName: res.eventName, 
              startDate: res.startDate,
              endDate:   res.endDate,
              startTime: res.startTime,
              endTime:   res.endTime,
            })

            while(name===''){
                name = prompt("Please enter your name")
            }
    
            this.setState({
                userName: name,
            })
            console.log(this.state.userName)
            if(this.state.participants.includes(this.state.userName)){
    
            } else{
                this.state.participants.push(this.state.userName)
            }


        });
    }

    // Returns a number (0-6 for the days of the week) so we can set
    // appropriate first day in calendar view
    dateToDay(d){
        let date = new Date(d);
        return date.getDay();
    }

    // Only allows selections of 1 hour in length (3600000 ms) and name is selected
    limitSelect = (selectInfo) => {
        let hour = 3600000

        if(selectInfo.start.valueOf() + hour === selectInfo.end.valueOf() && !(this.state.userName==='')){
            return true
        }

        return false
    }

    handleTimeSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect()

        calendarApi.addEvent({
            id: createEventId(),
            start: selectInfo.startStr,
            end: selectInfo.endStr
        })
    }

    handleEvents = (events) => {
        this.setState({
          currentEvents: events
        })
      }


    render() {
        return(
        <div className="EventPage">
            
            <h2>Event Name: {this.state.eventName || 'Event Not Found'}</h2>
            
            <ClipboardCopy copyText={window.location.href} />

            <FullCalendar
                plugins={[ timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                allDaySlot={false}
                selectOverlap={false}
                expandRows={true}
                headerToolbar={{
                    end: 'prev,next'
                }}
                slotMinTime={this.state.startTime}
                slotMaxTime={this.state.endTime}
                slotDuration={'01:00:00'}
                editable={false}
                selectable={true}
                selectAllow={this.limitSelect}
                validRange={{
                    start:  this.state.startDate,
                    end:    this.state.endDate
                }}
                firstDay={this.dateToDay(this.state.startDate) || 0}  // OR 0 to fix initial loading issues before data is ready
                initialEvents={this.state.initialEvents}
                select={this.handleTimeSelect}
                eventsSet={this.handleEvents}
            />
        
                
        </div>
        )
    }
}

export default EventPage;