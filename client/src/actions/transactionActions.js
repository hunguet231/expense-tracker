import axios from "axios";
import {
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_EDIT_REQUEST,
  TRANSACTION_EDIT_SUCCESS,
  TRANSACTION_EDIT_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
} from "../constants/transactionConstants";

export const listTransactions = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTION_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/users/${userId}/transactions`);

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const transactionDetails = (tranId) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTION_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/transactions/${tranId}`);

    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTransaction =
  (amount, type, title, description) => async (dispatch) => {
    try {
      dispatch({
        type: TRANSACTION_CREATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.post(
        `/api/v1/transactions`,
        { amount, type, title, description },
        config
      );

      dispatch({
        type: TRANSACTION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateTransaction =
  (tid, amount, type, title, description) => async (dispatch) => {
    try {
      dispatch({
        type: TRANSACTION_EDIT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/transactions/${tid}`,
        { amount, type, title, description },
        config
      );

      dispatch({
        type: TRANSACTION_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRANSACTION_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteTransaction = (tid) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSACTION_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };

    const { data } = await axios.delete(`/api/v1/transactions/${tid}`, config);

    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
