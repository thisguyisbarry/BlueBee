import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API } from 'aws-amplify';
import { onError } from "../lib/errorLib";
import config from "../config";
import { withRouter } from "react-router-dom";

class CreateEvent extends React.Component {
    state = { 
              eventID: '',
              eventName: '', 
              startDate: '',
              endDate:   '',
              startTime: '00:00',
              endTime:   '00:00',  
            }

    async onFormSubmimt(event){
        event.preventDefault();

        console.log(this.state);
        try {
            await this.createEvent(this.state);
            this.props.history.push(`/event/${this.state.eventID}`); 
            console.log(this.state.eventID);
        } catch (e) {
            onError(e);
        }
    }

    createEvent(event) {
        return API.post("events", "/events", {
          body: event
        }).then(res =>{
            console.log(res);
            this.setState({
              eventID: res.eventId
            })
        });
    }
      

    render() {
        return(
        
        <Row className="justify-content-md-center">
            <Form onSubmit={event => this.onFormSubmimt(event)}>
                <Form.Group className="mb-3">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="input" placeholder="Enter event name" 
                                  value={this.state.eventName}
                                  onChange={e => this.setState({ eventName: e.target.value})}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date"
                                  value={this.state.startDate}
                                  onChange={e => this.setState({ startDate: e.target.value})}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date"
                                  value={this.state.endDate}
                                  onChange={e => this.setState({ endDate: e.target.value})}/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Select value={this.state.startTime}
                                 onChange={e => this.setState({ startTime: e.target.value})}> 
                        <option value="00:00">00:00</option>
                        <option value="01:00">01:00</option>
                        <option value="02:00">02:00</option>
                        <option value="03:00">03:00</option>
                        <option value="04:00">04:00</option>
                        <option value="05:00">05:00</option>
                        <option value="06:00">06:00</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                        <option value="23:00">23:00</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>End Time</Form.Label>
                    <Form.Select value={this.state.endTime}
                                 onChange={e => this.setState({ endTime: e.target.value})}> 
                        <option value="00:00">00:00</option>
                        <option value="01:00">01:00</option>
                        <option value="02:00">02:00</option>
                        <option value="03:00">03:00</option>
                        <option value="04:00">04:00</option>
                        <option value="05:00">05:00</option>
                        <option value="06:00">06:00</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                        <option value="23:00">23:00</option>
                    </Form.Select>
                    </Form.Group>

                </Row>
                
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                        Submit
                    </Button>
                </div>
            </Form>
        </Row>
            
        );
    }
}

export default withRouter(CreateEvent);