import React, {Component} from 'react';
import {ActivityIndicator, LayoutAnimation, ScrollView, StyleSheet, Text, View} from 'react-native'
import {connect} from "react-redux";
import {SearchBar, Badge} from 'react-native-elements'
import SingList from "./singList";
import {Styles} from "../../styles/appTheme";
import {fetchSings} from "../../actions";

const PAGE_SIZE = 25;

class SearchSing extends Component {

    state = {
        loading: true,
        singsCount: PAGE_SIZE,
        searchText: null
    };

    static defaultProps = {
        onSingPress: () => null,
        selectedSings: []
    };

    componentWillMount() {
        this.props.fetchSings(this.state.singsCount);
    }

    componentWillUpdate(nextProps, nextState) {
        const {selectedSings, sings, fetchSings} = this.props;
        const {searchText, singsCount} = this.state;

        if (nextProps.sings !== sings) {
            this.setState({loading: false});
        }
        if (selectedSings.length !== nextProps.selectedSings.length &&
            (selectedSings.length === 0 || nextProps.selectedSings.length === 0)) {
            LayoutAnimation.spring();
        }
        if (nextState.searchText !== searchText || nextState.singsCount !== singsCount) {
            fetchSings(nextState.singsCount, nextState.searchText);
        }
    }

    onQueryTextChange(searchText) {
        this.setState({singsCount: PAGE_SIZE, searchText});
    }

    onEndReached() {
        if (this.props.sings.length === this.state.singsCount) {
            this.setState({singsCount: this.state.singsCount + PAGE_SIZE});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    {...Styles.searchBar}
                    onChangeText={this.onQueryTextChange.bind(this)}
                    onClearText={this.onQueryTextChange.bind(this)}
                    placeholder='Search...'/>

                {this.renderSelectedSingsCarousel()}
                {this.renderList()}
            </View>
        );
    }

    renderSelectedSingsCarousel() {
        if (this.props.selectedSings.length > 0) {
            return (
                <View>
                    <ScrollView
                        horizontal
                        keyboardShouldPersistTaps='handled'
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={() => this.scrollView.scrollToEnd()}
                        contentContainerStyle={styles.selectedSingsCarousel}>

                        {this.props.selectedSings.map(sing => this.renderSelectedSing(sing))}
                    </ScrollView>
                </View>
            );
        }
    }

    renderSelectedSing(sing) {
        return (
            <Badge
                key={sing.name}
                containerStyle={styles.selectedSingBadge}
                onPress={() => this.props.onSingPress(sing)}>

                <Text numberOfLines={1} style={styles.selectedSingText}>{sing.name}</Text>
            </Badge>
        );
    }

    renderList() {
        if (this.state.loading) {
            return (
                <ActivityIndicator style={styles.loader}/>
            );
        }
        return (
            <SingList
                sings={this.props.sings}
                selectedSings={this.props.selectedSings}
                onSingPress={this.props.onSingPress.bind(this)}
                onEndReached={this.onEndReached.bind(this)}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loader: {
        marginTop: 20
    },
    selectedSingsCarousel: {
        padding: 10
    },
    selectedSingBadge: {
        marginRight: 5,
        backgroundColor: 'lightgrey'
    },
    selectedSingText: {
        paddingVertical: 5,
        maxWidth: 150,
        color: 'white'
    }
});

const mapStateToProps = (state) => ({sings: state.sings});

export default connect(mapStateToProps, {fetchSings})(SearchSing);


