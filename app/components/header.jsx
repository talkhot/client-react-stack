import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { grey800 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Header extends Component {

  _handleMove = (to) => {
    browserHistory.push(to);
  }

  render() {
    const style = {
      backgroundColor: grey800
    };

    return (
      <AppBar
        title='Boilerplate'
        style={ style }
        onTitleTouchTap={ ::this._handleMove.bind(this, '/') }
        iconElementLeft={ <span /> }
        iconElementRight={
          <IconMenu
            iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
            anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
            targetOrigin={ { horizontal: 'right', vertical: 'top' } }>
            <MenuItem
              // add style because of mui issue
              // https://github.com/callemall/material-ui/issues/4008
              style={ { WebkitAppearance: 'none' } }
              primaryText='home'
              onTouchTap={ ::this._handleMove.bind(this, '/') } />
            <MenuItem
              style={ { WebkitAppearance: 'none' } }
              primaryText='widget'
              onTouchTap={ ::this._handleMove.bind(this, '/widget') } />
            <MenuItem
              style={ { WebkitAppearance: 'none' } }
              primaryText='fela'
              onTouchTap={ ::this._handleMove.bind(this, '/fela') } />
            <MenuItem
              style={ { WebkitAppearance: 'none' } }
              primaryText='graphql'
              onTouchTap={ ::this._handleMove.bind(this, '/graphql') } />
          </IconMenu>
        } />
    );
  }
}

export default Header;
