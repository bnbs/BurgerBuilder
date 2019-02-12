import React, { Component } from "react";
import classes from './Checkbox.css';

class Checkbox extends Component {

  toggleCheckboxChange = () => {   
    this.props.value ? this.props.removed() : this.props.added();   
  };

  render() {

    return (

      <div className={classes.Checkbox}>
          <input
            type="checkbox"
            value={this.props.label}
            checked={this.props.value}
            onChange={this.toggleCheckboxChange}
          />

          <label>{this.props.label}</label>
      </div>
    );
  }
}

export default Checkbox;
