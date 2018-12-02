import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import * as actions from '../actions';
import EventDetail from './EventDetail';


class EventsList extends Component {
    renderList() {
        if(this.props.events !== undefined && this.props.results !== 0){
            return this.props.events.map((e) => {
                const date = (e.start === null ? "" : new Date(e.start.date).toLocaleDateString());
                const imgURLConcert = `https://images.sk-static.com/images/media/profile_images/artists/${e.performance[0].artist.id}/huge_avatar`;
                const imgURLEvent = `https://images.sk-static.com/images/media/profile_images/events/${e.id}/huge_avatar`;
                const eventColor = (e.type === "Concert" ? "red" : "blue")
                const eventImage = (e.type === "Concert" ? imgURLConcert : imgURLEvent)
                return(  
                    <div key={e.id} className="item">
                        <div className="ui tiny image">
                            <img alt={e.displayName} className="ui avatar image" src={eventImage} />
                        </div>
                        <div className="content">
                            <div className="column">
                                <div className="ui raised segment">
                                    <button onClick={() => this.showModal()} className={"ui "+eventColor+" right ribbon label icon link"}>{e.type}</button>
                                    <div className="header"><h3 onClick={() =>this.props.selectEvent(e)}>{e.displayName}</h3></div>
                                    <div className="description">
                                        <p>{date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        }else if(this.props.loading === true){
            return (
                    <div className="ui active inverted dimmer">
                        <div className="ui large text loader">Loading</div>
                    </div>
            );
        }else if(this.props.results === 0){
            return (
                <h2>No results.</h2>
            );
        }
    }

    render() {
        if(this.props.selectedEvent === null){
        return (
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>Search events by Artist name</Header>
                        <div className="ui search">
                            <div className="ui icon input">
                                <input value={this.props.value} onChange={e => this.props.fetchEvents(e.target.value)} className="prompt" type="text" placeholder="Search for events..." />
                                <i className="search icon"></i>
                            </div>
                            <div className="results">
                            </div>
                        </div>
                        <div style={{paddingBottom: "20px"}} className="ui link items">
                            {this.renderList()}
                        </div>
            </Container>
        );
        }else{
            return <EventDetail event={this.props.selectedEvent} />;
        }
    }
}


const mapStateToProps = state => {
    console.log(state);
    return { events: state.events.data.events,
             selectedEvent: state.selectedEvent,
             results: state.events.results,
             loading: state.events.loading,
             error: state.events.error }
}


export default connect(mapStateToProps,actions)(EventsList);