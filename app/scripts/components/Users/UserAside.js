import React from 'react';

const UserAside = React.createClass({
  render: function () {
    return (
      <aside>
        <h2>{this.props.name}'s Profile</h2>
        <img className="user-profile-img" src={`${this.props.userImg}`}/>
      </aside>
    )
  }
})

export default UserAside;
