import Backbone from 'backbone';
import $ from 'jquery';
import settings from '../settings';
import {hashHistory} from 'react-router';
import store from '../store';
import _ from 'underscore';

const User = Backbone.Model.extend({
    urlRoot: `https://baas.kinvey.com/user/${settings.appId}`,
    idAttribute: '_id',
    defaults: {
        name: '',
        username: '',
        imgUrl: 'http://www.bradleysbookoutlet.com/wp-content/uploads/2013/06/bradleys-book-outlet-books-only-logo.png',
        followers: []
    },
    toggleFollow: function(data, username) {
        //data = this.props from user profile
        // console.log(data);
        let id = data.id
            // console.log(data.username);
        let user = store.users.get(id);
        // console.log(user);
        // console.log('user', user.toJSON());
        let followers = user.get('followers')
            // let followerId;
            // console.log(followers);
        if (followers.length === 0) {
            // console.log('Thanks for following me!');
            $.ajax({
                type: 'POST',
                url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`,
                data: JSON.stringify({
                    username: data.username,
                    userId: data.id,
                    followerName: username
                }),
                contentType: 'application/json',
                success: (response) => {
                    // console.log('followers', followers.concat(username));
                    // followerId = response._id;
                    // console.log(followerId);
                    user.save({
                        followers: followers.concat(username)
                    }, {
                        success: function(response) {
                            // console.log(response);
                        }
                    });
                }
            })
        } else if (followers.indexOf(this.get('username')) === -1) {
            // console.log('You haven\'t followed this person yet...');
            $.ajax({
                type: 'POST',
                url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`,
                data: JSON.stringify({
                    username: data.username,
                    userId: data.id,
                    followerName: username

                }),
                contentType: 'application/json',
                success: (response) => {
                    user.save({
                            followers: followers.concat(username)
                        })
                        // console.log(user.toJSON())
                },
                error: (err) => {
                    // console.log(err);
                }
            })
        } else {
            // console.log('user:', user);
            // console.log('followerId:', followerId);
            $.ajax({
                    type: 'GET',
                    url: `https://baas.kinvey.com/appdata/${settings.appId}/followers`,
                    data: {
                        query: JSON.stringify({
                            username: data.username,
                            _acl: {
                                creator: store.session.get('_id')
                            }
                        })
                    },
                    success: (response) => {
                        let followerId = response[0]._id;
                        // console.log(followerId);
                        // console.log(follower);
                        // console.log(_.without(followers, username));
                        user.save({
                                followers: _.without(followers, username)
                                //return new array without the username of person who unfollowed
                            }, {
                                success: (response) => {
                                    // console.log("DELETED!!");
                                    // console.log(followers);
                                }
                            })
                    $.ajax({
                        type: 'DELETE',
                        url: `https://baas.kinvey.com/appdata/${settings.appId}/followers/` + followerId,
                        dataType: 'application/json'
                    })
                }
            })
    }
},

login: function(data, url) {
    this.save(data, {
        url: `https://baas.kinvey.com/user/${settings.appId}/login`,
        success: (response) => {
            hashHistory.push('/')
            localStorage.setItem("authtoken", response.attributes.authtoken);
        },
        error: (err) => {
          alert('You entered an incorrect password or username!')
        }
    })
},

signup: function(data) {
    this.save(data, {
        success: (response) => {
            // console.log(response);
            // console.log(response.attributes.authtoken);
            hashHistory.push('/')
            localStorage.setItem("authtoken", response.attributes.authtoken);
        },
        error: (err) => {
          alert('Sorry, that username is already taken')
        }
    })

},
parse: function(response) {
    // console.log('parsed data:', response)
    //anything that you want returned from the user, you need to set here!
    if (response) {
        return {
            username: response.username,
            _id: response._id,
            name: response.name,
            authtoken: response._kmd.authtoken,
            followers: response.followers,
            imgUrl: response.imgUrl
        };
    }
},

retrieve: function() {
    this.fetch({
        url: `https://baas.kinvey.com/user/${settings.appId}/_me`,
        success: () => {
            // console.log('you got your authtoken:', localStorage.getItem('authtoken'));
            localStorage.getItem("authtoken")
        },
        error: function(e) {
            console.log(e);
        }
    });
},

logout: function() {
    $.ajax(null, {
            url: `https://baas.kinvey.com/user/${settings.appId}/_logout`,
        })
        .then((response) => {
            this.clear();
            hashHistory.push('/')
            localStorage.clear();
            // console.log('You are logged out. Goodbye!');
        })
        .fail((error) => {
            console.error('Failed to log out!')
            console.log(error);
        })
}
});

export default User;
