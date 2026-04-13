import React from 'react';
import PropTypes from 'prop-types';
import BaseHighlight from './BaseHighlight';

const Python = ({ code }) => <BaseHighlight language="python" code={code} />;

Python.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Python;
