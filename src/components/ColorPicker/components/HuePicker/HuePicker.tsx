import React from 'react';
import {Slidable, Position} from '../Slidable';
import styles from '../../ColorPicker.scss';
import {calculateDraggerY, hueForDraggerY} from './utilities';

interface State {
  sliderHeight: number;
  draggerHeight: number;
}

export interface HuePickerProps {
  hue: number;
  onChange(hue: number): void;
  onDraggingEnd(): void;
}

export class HuePicker extends React.PureComponent<HuePickerProps, State> {
  state: State = {
    sliderHeight: 0,
    draggerHeight: 0,
  };

  render() {
    const {hue, onDraggingEnd} = this.props;
    const {sliderHeight, draggerHeight} = this.state;
    const draggerY = calculateDraggerY(hue, sliderHeight, draggerHeight);

    return (
      <div className={styles.HuePicker} ref={this.setSliderHeight}>
        <Slidable
          draggerY={draggerY}
          draggerX={0}
          onChange={this.handleChange}
          onDraggerHeight={this.setDraggerHeight}
          onDraggingEnd={onDraggingEnd}
        />
      </div>
    );
  }

  private setSliderHeight = (node: HTMLElement | null) => {
    if (node == null) {
      return;
    }

    this.setState({sliderHeight: node.clientHeight});

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({sliderHeight: node.clientHeight});
      }, 0);
    }
  };

  private setDraggerHeight = (height: number) => {
    this.setState({
      draggerHeight: height,
    });
  };

  private handleChange = ({y}: Position) => {
    const {onChange} = this.props;
    const {sliderHeight} = this.state;
    const hue = hueForDraggerY(y, sliderHeight);
    onChange(hue);
  };
}
