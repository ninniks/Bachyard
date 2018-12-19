import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends Component {
	componentDidMount(){
		navigator.geolocation.getCurrentPosition((position)=> this.positionSuccess(position))	
	}

	positionSuccess(position) {
		this.props.searchEventByPosition(position.coords.latitude,position.coords.longitude)
		console.log(this.props.eventsByPosition)
	}

	renderGrid(){
		if(this.props.eventsByPosition !== null){
		return this.props.eventsByPosition.data.resultsPage.results.event.map((e) => {
			 const date = (e.start === null ? "" : new Date(e.start.date).toLocaleDateString());
             const imgURLConcert = `https://images.sk-static.com/images/media/profile_images/artists/${e.performance[0].artist.id}/huge_avatar`;
             const imgURLEvent = `https://images.sk-static.com/images/media/profile_images/events/${e.id}/huge_avatar`;
             const city = e.location.city;
             const eventImage = (e.type === "Concert" ? imgURLConcert : imgURLEvent)
             return(
             		<div onClick={ () => window.open(e.uri,'_blank') } key={e.id} className="card">
    					<div className="image">
      						<img alt="" src={eventImage} />
    					</div>
    					<div className="content">
      						<div className="header">{e.displayName}</div>
      							<div className="meta">
      							</div>
      						<div className="description">
        						{date}
      						</div>
   						</div>
    					<div className="extra content">
      						<span className="right floated">
        						{city}
      						</span>
      						<span>
        					<i className="arrow right icon"></i>
      						</span>
    					</div>
  					</div>
             );
		})
		}else {
			return (
        <div className="ui raised very padded text container segment">
          <h2 className="ui header">Allow your position to show events nearby!</h2>
            <img alt="" src={require('../img/position.png')}/> 
        </div>
      );
		}
	}
    render() {
        return(
            <main>
                <div className="fullscreen" />
                <h3 className="ui horizontal divider header">
				  <i className="map marker alternate map pin icon"></i>
				  Events by position
				</h3>
                <div className="ui fluid container">
                <div className="ui link cards">
                		{this.renderGrid()}
                </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return { eventsByPosition: state.eventsByPosition,
             loading: state.events.loading,
             error: state.events.error }
}


export default connect(mapStateToProps,actions)(Home);