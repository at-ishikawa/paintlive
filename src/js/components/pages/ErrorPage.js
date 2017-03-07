import React from 'react';

class ErrorPage extends React.Component {
  render() {
    return (
      <div>
        <div style={{
          "background-color": "white",
          "font-size": "2rem",
          "padding": "32px",
          "text-align": "center"
        }}>
          Sorry, the requested page was not found.<br />
          <br />
          <a href="/" style={{
            "color": "blue",
            "text-decoration": "underline"
          }}>
            Back to TOP
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
