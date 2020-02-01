import React from 'react';
import './input.css';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const PLACEHOLDER = "Country name: ";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    }
  }

  componentDidMount() {
    this.inputNode.focus();
  }

  onInputChange = (event) => {
    this.setState({inputValue: event.target.value})
  };

  onEnter = (e) => {
    if (e.key === "Enter") {
      this.props.onInputClick(this.state.inputValue);
    }
  };

  render() {

    return (
      <div className="mainInput">
        <CssTextField
          className="inputField"
          id="custom-css-standard-input"
          label={PLACEHOLDER}
          onChange={this.onInputChange}
          onKeyDown={e => this.onEnter(e)}
          ref={node => this.inputNode = node}/>
      </div>
    );
  }
}