import React from "react";

type State = { hasError: boolean; error?: Error | null };

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // log to console and keep the UI helpful
    // You can extend this to send errors to a monitoring service
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: "sans-serif", color: '#1C352D', background: '#F9F6F3', borderRadius: 12, border: '2px solid #A6B28B' }}>
          <h2 style={{ marginTop: 0, color: '#F5C9B0' }}>Something went wrong</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: '#A6B28B' }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
