import { Component } from "react";

export class ErrorBoundary extends Component<
  { children: any },
  { error: any }
> {
  componentDidCatch(error: any, errorInfo: any) {
    if (errorInfo && errorInfo.componentStack) {
      // The component stack is sometimes useful in development mode
      // In production it can be somewhat obfuscated, so feel free to omit this line.
      console.log(errorInfo.componentStack);
    }
    const trackjs = (window as any)?.TrackJS;
    trackjs && trackjs.track(error);
    this.setState({ error });
  }

  render() {
    if (this.state?.error) {
      return (
        <h1 style={{ color: "white" }}>
          Something has gone wrong try and refresh this page
        </h1>
      );
    }
    return this.props.children;
  }
}
