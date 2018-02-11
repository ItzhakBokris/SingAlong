import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import SearchSing from '../../../core/sings/searchSing'
import {singSelected} from '../../../actions';

class SelectSings extends Component {

    componentWillMount() {
        Actions.refresh({onRight: this.onNextPress.bind(this)})
    }

    render() {
        return (
            <SearchSing
                onSingPress={this.props.singSelected.bind(this)}
                selectedSings={this.props.selectedSings}/>
        );
    }

    onNextPress() {
        if (this.props.selectedSings.length > 0) {
            Actions.editGroupName();
        } else {
            Toast.show('Please select at least one sing', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                animation: true,
                hideOnPress: true
            });
        }
    }
}

const mapStateToProps = (state) => ({...state.onBoarding});

export default connect(mapStateToProps, {singSelected})(SelectSings);
