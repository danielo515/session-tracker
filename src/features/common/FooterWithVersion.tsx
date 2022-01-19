import React from 'react';
import { Copyright } from '../common/Copyright';
import { Version } from '../common/Version';

type Props = {
  className?: string;
};

const FooterWithVersion = (props: Props) => {
  const classNames = ['common-footer-with-version', props.className].join(' ');
  return (
    <div className={classNames}>
      <Copyright />
      <Version />
    </div>
  );
};

export default FooterWithVersion;
