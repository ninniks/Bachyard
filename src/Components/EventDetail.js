import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';


class EventDetail extends Component {
    renderContent(event) {
        return event.performance.map((p) => {
            const artistImage = `https://images.sk-static.com/images/media/profile_images/artists/${p.artist.id}/huge_avatar`;
            return(
                <Container key={p.artist.id} style={{padding:"30px"}}>
                    <div className="ui container">
                        <img alt="" className="ui small circular image" src={artistImage} />
                    </div>
                    <h3><b>Performance</b>: {p.artist.displayName}</h3>
                    <p><b>Artist n°</b>: {p.billingIndex}</p>
                    <p><b>Billing</b>: {p.billing}</p>
                </Container>
            );
        })
    }

    render() {
        const { event } = this.props;
        const imgURLConcert = `https://images.sk-static.com/images/media/profile_images/artists/${event.performance[0].artist.id}/huge_avatar`;
        const imgURLEvent = `https://images.sk-static.com/images/media/profile_images/events/${event.id}/huge_avatar`;
        const eventImage = (event.type === "Concert" ? imgURLConcert : imgURLEvent)
        const eventColor = (event.type === "Concert" ? "red" : "blue")
        const date = (event.start === null ? "" : new Date(event.start.date).toLocaleDateString());
        
        return(
            <div style={{marginTop: "7em"}}>
                <div className="ui raised very padded text container segment">
                    <div onClick={() => this.props.returnToEventsList()} className="ui animated button" tabIndex="0">
                        <div className="visible content">Back</div>
                        <div className="hidden content">
                            <i className="left arrow icon"></i>
                        </div>
                    </div>
                    <button className={"ui "+eventColor+" tag label"}>{event.type}</button>
                    <h2 className="ui header">{event.displayName}</h2>
                    <img alt="" className="ui centered medium circular image" src={eventImage} />
                    <h3><b>Date</b>: {date}</h3>
                    <p><b>Venue</b>: {event.venue.displayName}</p>
                    <p><b>City</b>: {event.venue.metroArea.displayName} </p>
                        {this.renderContent(event)}
                </div>
            </div>
        );
    }
}

export default connect(null,actions)(EventDetail);