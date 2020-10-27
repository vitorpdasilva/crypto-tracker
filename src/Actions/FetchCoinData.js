import axios from 'axios';
import { apiBaseUrl } from '../Utils/Constants';
import { FETCHING_COIN_DATA, FETCHING_COIN_DATA_FAIL, FETCHING_COIN_DATA_SUCCESS } from '../Utils/ActionTypes';

export default function FetchCoinData() {
  console.log('test')
  return dispatch => {
    dispatch({ type: FETCHING_COIN_DATA })
    return axios.get(`${apiBaseUrl}/v1/ticker/?limit=10`)
      .then(res => dispatch({ type: FETCHING_COIN_DATA_SUCCESS, payload: res.data }))
      .catch(res => dispatch({ type: FETCHING_COIN_DATA_FAIL, payload: res.err }));
  }
}