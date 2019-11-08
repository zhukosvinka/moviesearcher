import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ContentContainer, PersonInfo, Loader } from '../components';
import withLocalization from '../hocs/withLocalization';
import { getPersonInfo } from '../actions/personInfoActions';

const PersonInfoContainer = ({ match, currentLang }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(({ personInfoReducer }) => personInfoReducer.isLoading);
  const personData = useSelector(({ personInfoReducer }) => personInfoReducer.data);

  const personId = match.params.personId;

  useEffect(() => {
    dispatch(getPersonInfo(personId, currentLang));
  }, [personId, currentLang, dispatch]);

  const isMovieInfoDataLoaded = !isLoading && Object.keys(personData).length > 0;

  return (
    <ContentContainer title={isMovieInfoDataLoaded ? personData.name : ''}>
      {isMovieInfoDataLoaded ? <PersonInfo personData={personData} /> : <Loader />}
    </ContentContainer>
  );
};

PersonInfoContainer.propTypes = {
  match: PropTypes.object.isRequired,
  currentLang: PropTypes.string.isRequired,
};

export default withLocalization(PersonInfoContainer);
