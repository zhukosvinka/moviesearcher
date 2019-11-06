import React from 'react';
import styled from 'styled-components';
import moon from '../img/icons/moon.svg';
import sun from '../img/icons/sun.svg';
import withLocalization from '../hocs/withLocalization'

const Wrapper = styled.div`
  max-width: 700px;
  margin: 10px auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ToggleThemeButton = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${({ theme }) => (!theme.isDarkModeEnable ? moon : sun)});
  background-size: 100% 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ToggleLanguageButton = styled.div`
  margin-right: 10px;
  font-weight: 600;
  color: #444444;
  color: ${({ theme }) => (!theme.isDarkModeEnable ? '#444444' : '#fff')};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const SettingsPanelContainer = ({ toggleDarkMode, currentLang, toggleLang }) => {

  const themeButtonClick = () =>
    toggleDarkMode(state => {
      localStorage.setItem('isDarkModeEnable', !state.isDarkModeEnable);

      return {
        ...state,
        isDarkModeEnable: !state.isDarkModeEnable,
      };
    });

  return (
    <Wrapper>
      <ToggleLanguageButton onClick={toggleLang}>
        {currentLang.toUpperCase()}
      </ToggleLanguageButton>
      <ToggleThemeButton onClick={themeButtonClick} />
    </Wrapper>
  );
};

export default withLocalization(SettingsPanelContainer);
