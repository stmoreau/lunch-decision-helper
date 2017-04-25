import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';
import './Application.css';
import introImage from './intro-image.jpg'

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      restaurants: null
    };

    this.restaurantRef = database.ref('/restaurants');
  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({ currentUser });

      this.restaurantRef.on('value', (snapshot) => {
        this.setState({ restaurants: snapshot.val() });
      });
    });
  }

  render() {
    const { currentUser, restaurants } = this.state;
    return (
      <div className="Application">
        <header className="Application--header">
          <h1>Welcome Dashboard Team</h1>
          <h3>(and invited members)</h3>
        </header>
        <div>
          {
            !currentUser &&
            <div>
              <SignIn />
              {
                window.innerWidth > 992 &&
                <img className="Application--image" src={introImage} alt="dashboard-logo" />
              }
            </div>
          }
          {
            currentUser &&
            <div className="Application--signedin">
              <NewRestaurant />
              <Restaurants restaurants={restaurants} user={currentUser} />
              <CurrentUser user={currentUser} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Application;
