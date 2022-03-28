import { API, loadingBar } from "aws-amplify";
import React from "react";
import FullCalendar, { getDayClassNames } from '@fullcalendar/react'
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import ClipboardCopy from './ClipboardCopy';
import { createEventId } from './event-utils'
import { onError } from "../lib/errorLib";
import "./EventPage.css";


class EventPage extends React.Component{

    calendarRef = React.createRef() //Needed to access calendar API

    state = {
              eventID: this.props.match.params.eventID,
              eventName: '', 
              startDate: '',
              endDate:   '',
              startTime: '00:00:00',
              endTime:   '00:00:00',
              initialEvents: [],
              userName: '',
              currentEvents: [],
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
    
    getEvent = async (eventID) => {
        return API.get("events", `/events/${eventID}`)
        .then(async (res) =>{
            console.log(res);
            let name = ''

            this.setState({
                participants: res.participants
            }
            )

            res.events.forEach( event => this.heatmapColour(event));

            while(name===''){
                name = prompt("Please enter your name")
            }
    
            this.setState({
                userName: name,
            })
            console.log(this.state.userName)
            
            if(!this.state.participants.includes(this.state.userName)){
                this.state.participants.push(this.state.userName);

                try{
                    await this.updateParticipants(this.state.participants);
                } catch(e){
                    console.log(e);
                }
            } else {
                res.events.forEach( event => this.highlightEvent(event));
            }

            this.setState({
              eventName: res.eventName, 
              startDate: res.startDate,
              endDate:   res.endDate,
              startTime: res.startTime,
              endTime:   res.endTime,
              initialEvents: res.events,
            })
            
            
            
            
            
        });
    }

    updateEvents = async (events) =>{
        console.log(events)
        return API.put("events", `/events/${this.state.eventID}`,{
            body: {events}
        });
    }

    updateParticipants = async(participants) =>{
        return API.put("events",`/events/participants/${this.state.eventID}`,{
            body: {participants}
        } )
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
            end: selectInfo.endStr,
            extendedProps: {
                participants: [`${this.state.userName}`]
            }
        })
    }

    handleEventClick = (clickInfo) => {
        let calendarApi = this.calendarRef.current.getApi()

        console.log(clickInfo.event.extendedProps.participants);

        // Remove user from specific event participants, otherwise add
        if(clickInfo.event.extendedProps.participants.includes(this.state.userName)){
            let index = clickInfo.event.extendedProps.participants.indexOf(this.state.userName)

            if(index > -1){
                clickInfo.event.extendedProps.participants.splice(index,1);
            }

            if(clickInfo.event.extendedProps.participants.length===0){
                clickInfo.event.remove();
            }

            clickInfo.event.setProp("title", "");
        }
        else{
            clickInfo.event.extendedProps.participants.push(this.state.userName)
            clickInfo.event.setProp("title", "✔"); // Checkmark
        }
        console.log(clickInfo.event.extendedProps.participants);

        this.handleEvents(calendarApi.getEvents());
    }

    handleEvents = async (events) => {
        this.setState({
          currentEvents: events
        })

        console.log("Events: ", events);
        
        
        try{
            await this.updateEvents(events);
        } catch(e){
            onError(e);
        }
        
      }

    heatmapColour = (event) => {
        let divider = this.state.participants.length;
        let particNum = event.extendedProps.participants.length;
        console.log(particNum, "/", divider);

        if(divider>0){
                let percent = (particNum / divider * 100);
                console.log("test percent :" , percent);
        
                if (percent>=75){
                    event.backgroundColor = ("green");
                }
                else if (percent>=50){
                    event.backgroundColor = ("orange");
                }
                else{
                    event.backgroundColor = ("red");
                }
            }
        }

    highlightEvent = (event) => {
        if(event.extendedProps.participants.includes(this.state.userName)){
            event.title = '✔'; // Checkmark
        }
        else{
            event.title = '';
        }
    }
    

    


    render() {
        if(this.state.eventName===""){
            return (
                <div className="NotFound text-center">
                    <h3>Loading...</h3>
                </div>
            )
                
        } else{
            return(
                <div className="EventPage">
                    
                    <h2 className="text-center">Event Name: {this.state.eventName || 'Event Not Found'}</h2>
                    
                    <div className="Clipboard">
                        <ClipboardCopy copyText={window.location.href} />
                    </div>

                    <div className="calendar">
                        <FullCalendar
                            plugins={[ timeGridPlugin, interactionPlugin ]}
                            initialView="timeGridWeek"
                            allDaySlot={false}
                            selectOverlap={false}
                            expandRows={true}
                            height={"100%"}
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
                            eventClick={this.handleEventClick}
                            eventsSet={this.handleEvents}
                            ref={this.calendarRef}
                        />
                    </div>
            
                    
            </div>
            )
        }
    }
}

export default EventPage;