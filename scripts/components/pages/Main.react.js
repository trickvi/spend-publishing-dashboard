var React = require('react');
var Store = require('../../stores/Store');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var HeaderPanel = require('../panels/Header.react');
var FooterPanel = require('../panels/Footer.react');
var PublisherTable = require('../tables/PublisherTable.react');
var MainOverview = require('../MainOverview.react');
var MainChart = require('../charts/MainChart.react');
var APIUtils = require('../../utils/APIUtils');


function getStateFromStores() {
    return Store.all();
}

var Main = React.createClass({

    statics: {
        bootstrap: APIUtils.getData
    },

    getInitialState: function() {
        return {_waiting: true};
    },

    getDefaultProps: function() {
        return {_waiting: true};
    },

    componentWillMount: function() {
        console.log('will mount');
        if (this.props._waiting) {
            console.log('hesus');
            this.fetch(this.props);
        }
    },

    fetch: function(props) {
        this.constructor.bootstrap(this.props, function(data) {
            this.setState(data);
        }.bind(this));
    },

//    getInitialState: function() {
//        return getStateFromStores();
//    },

//    componentDidMount: function() {
//        Store.addChangeListener(this._onChange);
//    },

    _onChange: function() {
        //this.setState(getStateFromStores());
    },

    render: function() {
        return (
            <div>
                <HeaderPanel instance={this._waiting ? this.state.instance:''} publishers={this._waiting ? this.state.publishers:[]} />
                <section id="main" className="container">
                    <Row>
                        <Col md={12}>
                            <h2>Overview</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                                                                                           <MainOverview results={this._waiting ? this.state.results:[]} />
                        </Col>
                        <Col md={6}>
                                                                                           <MainChart results={this._waiting ? this.state.results:[]} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                                                                                           <PublisherTable publishers={this._waiting ? this.state.publishers:[]} />
                        </Col>
                    </Row>
                </section>
                                                                                           <FooterPanel instance={this._waiting ? this.state.instance:{}} />
            </div>
        );
    }

});


module.exports = Main;
