import Cookies from 'js-cookie';

export const LOAD_MESSAGES = './locations/LOAD_MESSAGES';
export const SAVE_MESSAGES = './locations/SAVE_MESSAGES';

const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages,
  });

  const saveMessages = (messages) => ({
    type: SAVE_MESSAGES,
    messages,
  });
