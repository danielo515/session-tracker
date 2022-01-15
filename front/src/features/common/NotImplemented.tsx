import React from 'react';
import meme from '../../images/not-implemented-meme.png';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

type Props = {
  history: {
    goBack: () => void;
  };
};

const NotImplemented = (props: Props) => {
  return (
    <div className="not-implemented">
      <h2>I wanted to implement this feature but...</h2>
      <p>
        <img src={meme} alt="not implemented meme" />
      </p>
      <h2>Did not had time...</h2>
      <Button
        variant="outlined"
        size="large"
        onClick={props.history.goBack}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
    </div>
  );
};

export default NotImplemented;
