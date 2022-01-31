import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import { API } from 'aws-amplify';

class CreateEvent extends React.Component {
    state = { eventName: '', 
              startDate: '',
              endDate:   '',
              startTime: '',
              endTime:   '',  
            }

    onFormSubmimt(event){
        event.preventDefault();
    }

    render() {
        return(
            
        <Form onSubmit={this.onFormSubmimt}>
            <Form.Group className="mb-3">
                <Form.Label>Event Name</Form.Label>
                <Form.Control type="input" placeholder="Enter event name" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col}>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date"/>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date"/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                <Form.Label>Start Time</Form.Label>
                <Form.Select> 
                    <option value="0">00:00</option>
                    <option value="1">01:00</option>
                    <option value="2">02:00</option>
                    <option value="3">03:00</option>
                    <option value="4">04:00</option>
                    <option value="5">05:00</option>
                    <option value="6">06:00</option>
                    <option value="7">07:00</option>
                    <option value="8">08:00</option>
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                    <option value="23">23:00</option>
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label>End Time</Form.Label>
                <Form.Select> 
                <option value="0">00:00</option>
                    <option value="1">01:00</option>
                    <option value="2">02:00</option>
                    <option value="3">03:00</option>
                    <option value="4">04:00</option>
                    <option value="5">05:00</option>
                    <option value="6">06:00</option>
                    <option value="7">07:00</option>
                    <option value="8">08:00</option>
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                    <option value="23">23:00</option>
                </Form.Select>
                </Form.Group>

            </Row>
            
            <div className="d-grid gap-2">
                <Button variant="primary" type="submit" size="lg">
                    Submit
                </Button>
            </div>
        </Form>
            
        );
    }
}

export default CreateEvent;