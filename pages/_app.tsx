import React from 'react';
import App from 'next/app';

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
