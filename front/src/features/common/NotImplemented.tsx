import React, { Component } from 'react';
//@ts-ignore
import meme from '../../images/not-implemented-meme.png';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default class NotImplemented extends Component {
  render() {
    return (
      <div className="not-implemented">
        <h2>I wanted to implement this feature but...</h2>
        <p>
          <img src={meme} alt="not implemented meme" />
        </p>
        <h2>Didn't had time...</h2>
        <Button
          variant="outlined"
          size="large"
          onClick={this.props.history.goBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </div>
    );
  }
}
