import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

class Colors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            colors: []
        }

        this.handleChangeOption = this.handleChangeOption.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get(`${this.props.url}`)
        .then(res => {
          this.setState({ 
              data: res.data,
            });
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleChangeOption(e) {
        let id = e.target.options[e.target.selectedIndex].id;
        let colors = this.state.data[id];
        this.setState({
            colors: colors
        });
    }
    render() {
        return (
            <div>
                <section className='wrapper' style={{textAlign: 'center'}}>
                    <h2 style={{textAlign: 'center'}}>Google Material Colors</h2>
                    <hr />
                    <p className="about-library">The Material Colors by Google are one of the finest palettes available on the web. These are vibrant, attractive and soft making the design excellent !</p>
                    <select className='dropdown' onChange={this.handleChangeOption}>
                        {Object.keys(this.state.data).map((color, index) => {
                            return <option key={index} id={color}>{color}</option>
                        })}
                    </select>
                    <div className='wrap-colors'>
                        {Object.values(this.state.colors).map((shade, index) => {
                            return (
                                <div data-tip={shade} data-for={shade} className='color-div' style={{backgroundColor: `${shade}`}} key={shade} id={shade}>
                                    <ReactTooltip key={index} id={shade} type="dark" effect="solid" place="top"></ReactTooltip>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        );
    }
}

export default Colors;