import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = (Component, fallback) => (props) => (
  <ErrorBoundary fallback={fallback}>
    <Component {...props} />
  </ErrorBoundary>
);

export default withErrorBoundary;
