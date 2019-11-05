import React, { useState } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
  max-width: 700px;
  background-color: #fff;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0px 9px 10px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: ${({ isHidden }) => (isHidden ? '10px' : 'auto')};
  position: relative;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 14px;
  color: #444444;
  margin-bottom: 10px;
`;

const HideButton = styled.div`
  position: absolute;
  right: 14px;
  font-size: 20px;
  font-weight: 600;
  border: solid #3a3a3a;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 4px;
  cursor: pointer;
  opacity: 0.4;
  transform: ${({ isHidden }) => (isHidden ? 'rotate(44deg)' : 'rotate(-135deg)')};
  &:hover {
    opacity: 0.7;
  }
`;

const ContentContainer = ({ children, title }) => {
  const [isHidden, toggleIsHidden] = useState(false);

  return (
    <Wrapper isHidden={isHidden}>
      <HideButton isHidden={isHidden} onClick={() => toggleIsHidden(!isHidden)}></HideButton>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default ContentContainer;
