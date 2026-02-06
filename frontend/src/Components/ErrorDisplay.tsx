import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import './ErrorDisplay.css'; // Import the CSS file

interface ErrorDisplayProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  message?: string; // Optional custom message
}

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, message }) => {
  if (!error) {
    return null;
  }

  let errorMessage: string;

  if (message) {
    errorMessage = message;
  } else if (isFetchBaseQueryError(error)) {
    // This is a FetchBaseQueryError (e.g., from an RTK Query API call)
    if (typeof error.data === 'object' && error.data != null && 'error' in error.data) {
      errorMessage = (error.data as { error: string }).error;
    } else {
      errorMessage = JSON.stringify(error.data);
    }
    // Optionally, you can add more specific handling based on error.status
    if (error.status === 404) {
      errorMessage = 'Resource not found.';
    } else if (error.status === 'FETCH_ERROR') {
      errorMessage = 'Network error or server unreachable.';
    }
  } else {
    // This is a SerializedError (e.g., from Redux Toolkit) or a generic Error
    errorMessage = error.message || 'An unknown error occurred.';
  }

  return (
    <div className="error-display">
      <p>Error: {errorMessage}</p>
    </div>
  );
};

export default ErrorDisplay;
