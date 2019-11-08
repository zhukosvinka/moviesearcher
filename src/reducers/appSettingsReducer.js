import { TOGGLE_LANGUAGE } from '../constants/appSettingsConstants';

const initialState = {
  lang: localStorage.getItem('lang') || 'ru',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      const newLang = state.lang === 'ru' ? 'en' : 'ru';
      localStorage.setItem('lang', newLang);
      return {
        ...state,
        lang: newLang,
      };

    default:
      return state;
  }
};
