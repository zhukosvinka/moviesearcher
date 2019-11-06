import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '../actions/appSettingsActions';
import { LOCALIZATION } from '../config';

const withLocaliztion = Component => props => {
  const currentLang = useSelector(({ appSettingsReducer }) => appSettingsReducer.lang);

  const dispatch = useDispatch();

  const toggleLang = () => dispatch(toggleLanguage());

  const localize = text => {
    if (!LOCALIZATION[text]) return 'Localize is not found';
    if (currentLang === 'ru') return LOCALIZATION[text][0];
    if (currentLang === 'en') return LOCALIZATION[text][1];
  };

  return (
    <Component
      localizeText={localize}
      toggleLang={toggleLang}
      currentLang={currentLang}
      {...props}
    />
  );
};

export default withLocaliztion;
