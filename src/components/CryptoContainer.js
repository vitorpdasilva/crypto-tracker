import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import FetchCoinData from '../../Actions/FetchCoinData';
import CoinCard from './CoinCard';

class CryptoContainer extends Component {
  componentWillMount() {
    this.props.FetchCoinData();
  }
  renderCoinCards() {
    const { crypto } = this.props;
    return crypto.data.map(coin => {
      <CoinCard 
        key={coin.name}
        coin_name={coin.name}
        symbol={coin.symbol}
        price_usd={coin.price_usd}
        percentage_change_24hr={coin.percentage_change_24hr}
        percentage_change_7d={coin.percentage_change_7d}
      />
    })
  }
  render() {
    const { crypto } = this.props;
    const { contentContainer } = styles;
    
    if(crypto.isFetching) {
      return (
        <View>
          <Spinner 
            visible={isFetching}
            textContent="Loading..."
            textStyle={{ color: "#253145" }}
            animation="fade"
          />
        </View>
      )
    }
    return (
      <ScrollView contentContainerStyle={contentContainer}>
        {this.renderCoinCards()}
      </ScrollView>
    )
  }
}
const styles = {
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 55,
  }
}

function mapStatesToProp(state) {
  return {
    crypto: state.crypto,
  }
}

export default connect(mapStatesToProp, { FetchCoinData })(CryptoContainer); 