require('normalize.css/normalize.css');
require('styles/App.css');
import React from 'react';


// other third party
var $ = require("jquery");
var validator = require("email-validator");
import Notifications, {notify} from 'react-notify-toast';

// images
let binoculars = require("../images/binoculars.svg");

// constants and colors
const blue = '#350087';
const white = '#FFFFFF';
let notifyColor = { background: blue, text: white };

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      sEmail: "",
      bEmailSubmitted: false
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

  }
  handleButtonPress() {
    // First validate email
		console.log(this.state.sEmail);
    if (!validator.validate(this.state.sEmail)) {
      notify.show("Please enter a valid email!", "custom", 5000, notifyColor); // prompt the user for a proper email
      return; // end the process
    }

		var data = JSON.stringify({ email: this.state.sEmail });
    var that = this;
    // post to server
     $.ajax({
        url: "/new_email",
        type: "POST",
        dataType: "json",
        data: data,
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        success: function(data) {
          that.setState({bEmailSubmitted: true});
          notify.show("Thank you!", "custom", 5000, notifyColor); // keep thank you forever
        },
        error: function(data) {
          notify.show("Sorry, there was an error submitting your email. Care to try again?", "custom", 5000, notifyColor); // prompt the user for a proper email
        },
      });
  }
  onChangeInput(event) {
    this.setState({sEmail: event.target.value});
  }
  render() {
    return (
    <div>
      <Notifications/>
      <canvas id="world" width="1920"></canvas>
      <div id="wrapper">
          <div id="welcome">
              <div id="warp2">
                  <img id="heartbeat5" src={binoculars} style={{width:40 + 'px !important', height:40 + 'px !important'}}/>
                  <h2 id="intro" style={{color:blue}}>SkillScout is your personal job assistant.</h2>
                  <p className="smallp2"><span style={{color:white, fontWeight:500, fontSize: 1 + 'em'}}>Being perfectly prepared for your dream job is <span id="redpulse" style={{color: white, fontWeight:500, fontSize: 1 + 'em'}}>hard.</span> There are dozens of job search engines, company websites, and recruiting methods to sift through. Even worse is that each posting seems to described desired skills in a different way. </span></p>
                  <br/>
                  <p className="smallp2" style={{color:blue, fontWeight:500, fontSize: 1.2 + 'em'}}>Now imagine a fully automated tool that saves you time by:</p>
                  <br/>
                  <p className="smallp2"><span style={{color:white, fontWeight:500, fontSize: 1 + 'em'}}>-Compiling job skills based your criteria</span></p>
                  <p className="smallp2"><span style={{color:white, fontWeight:500, fontSize: 1 + 'em'}}>-Showing trending and recommended cities based on your skills</span></p>
                  <p className="smallp2"><span style={{color:white, fontWeight:500, fontSize: 1 + 'em'}}>-Suggesting jobs based on a quick scan of your resume</span></p>
                  <br/>
                  <p className="smallp2timer" style={{color:blue, fontWeight:500, fontSize: 1.2 + 'em'}}>Be notified by email when we go live:</p>
                  <div id="help">
                      <h3>
                        <a id="share3" style={{fontWeight:500}}>
                        {!this.state.bEmailSubmitted && <span className="cursor">
                          <input type="text" autoFocus id="input" value={this.state.sEmail} onChange={this.onChangeInput}/><i></i>
                        </span>}
                          {this.state.bEmailSubmitted && <input type="text" autoFocus id="input" value="Thank you!" disabled/>}
                        </a>
                        <br/>
                        <br/>
                        <a id="share3" style={{fontWeight:500}}>
                          <button onClick={this.handleButtonPress}>Submit!</button>
                        </a>
                      </h3>
                  </div>
                  <p className="smallp2timer"><span style={{color:white, fontWeight:500, fontSize: 1 + 'em'}}>(We promise to email you <span id="redpulse" style={{color: white, fontWeight:500, fontSize: 1 + 'em'}}>only once</span>.)</span></p>
              </div>
          </div>
      </div>
    </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
