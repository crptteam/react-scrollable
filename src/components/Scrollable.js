import React from 'react';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom'

import PropTypes from 'prop-types';
import defaultTheme from '../theme/defaultTheme';

const ComponentName = 'Scrollable';

import ScrollableWrap from '../styled/ScrollableWrap';

const InnerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
  padding-right: 23px;
`;

const Track = styled.div`
  position: absolute;
  right: 11px;
  top: 15%;
  bottom: 15%;
  width: 1px;
  background-color: #E6E6E6;
  overflow: visible;
`;

const Thumb = styled.div`
  background-color: #0884FF;
  width: 3px;
  height: 92px;
  display: inline-block;
  position: relative;
  right: 1px;
  z-index: 2;
  top: ${props => props.top + 'px'};
`;



class Scrollable extends React.Component {
  inner;
  track;
  thumb;

  constructor(props) {
    super(props);

    this.state = {
      events: [
        'scroll',
        'mousewheel',
        'DOMMouseScroll',
        'MozMousePixelScroll',
        'resize',
        'touchmove',
        'touchend'
      ],
      top: 0
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    this.state.events.forEach(ev => {
      if (window.addEventListener) {
        findDOMNode(this.inner).addEventListener(ev, this.onScroll, false)
      } else {
        findDOMNode(this.inner).attachEvent('on' + ev, this.onScroll, false)
      }
    })
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
    this.state.events.forEach((type) => {
      if (window.addEventListener) {
        findDOMNode(this.inner).removeEventListener(type, this.onScroll, false)
      } else {
        findDOMNode(this.inner).attachEvent('on' + type, this.onScroll, false)
      }
    })
  }

  onScroll(e) {
    const scrollTop = findDOMNode(this.inner).scrollTop;
    if (e.deltaY) this.inner.scrollTop += e.deltaY;
    const scrollPercentage = 100 * this.inner.scrollTop / (this.inner.scrollHeight - this.inner.clientHeight);
    const top = (this.track.clientHeight - this.thumb.clientHeight) * scrollPercentage / 100;
    this.setState({
      top
    });
    if (scrollPercentage < 99.99 || scrollPercentage > 0.01) {
      e.stopPropagation();
      e.preventDefault();
    }

  }

  scrollToBottom() {
    this.scrollbars &&
      this.scrollbars.scrollToBottom &&
      this.scrollbars.scrollToBottom();
  }

  render() {

    const { onRef, minHeight, ...otherProps } = this.props;

    return (
      <ScrollableWrap minHeight={minHeight}>
        <InnerWrap innerRef={el => (this.inner = el)} {...otherProps} />
        <Track innerRef={el => this.track = el}>
          <Thumb top={this.state.top} innerRef={el => this.thumb = el}/>
        </Track>
      </ScrollableWrap>
    );
  }
}

Scrollable.propTypes = {
  theme: PropTypes.object,
  minHeight: PropTypes.string
};

Scrollable.defaultProps = {
  theme: defaultTheme
};

Scrollable.displayName = ComponentName;

export default Scrollable;
