import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

export const LOAD_MESSAGES = './locations/LOAD_MESSAGES';
export const SAVE_MESSAGES = './locations/SAVE_MESSAGES';

const loadMessages = (oldMessages) => ({
    type: LOAD_MESSAGES,
    oldMessages,
  });

  const saveMessages = (oldMessages) => ({
    type: SAVE_MESSAGES,
    oldMessages,
  });

  export const loadUserMessages = (userId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${userId}`);
    if (response.ok) {
      const messages = await response.json();
      dispatch(loadMessages(messages));
    }
  };

  export const saveUserMessages = (content) => async (dispatch) => {
   const response = await fetch(``, {
     method: 'POST',
     headers: { "Content-Type": "application/json", "XSRF-Token": `${Cookies.get('XSRF-TOKEN')}` },
     body: JSON.stringify({
      content
    })
   });
   if (response.ok) {
     const message = await response.json();
     dispatch(saveMessages(message))
   }
  }

  const initialState = {
    messages: [],
  }

  const messagesReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
      case LOAD_MESSAGES: {
            return {
              ...state,
              messages: action.oldMessages,
            };
        }
        case SAVE_MESSAGES: {
            return {
              ...state,
              messages: action.oldMessages,
            };
        }

        default:
          return state;
      }
  }

export default messagesReducer;
