import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="p-8 text-red-600">Unexpected error occurred.</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
