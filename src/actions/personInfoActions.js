import {loadData} from '../helpers'
import {API_KEY} from '../config'
import {GET_PERSON_INFO} from '../constants/personInfoConstants'
import {LOAD_START} from '../constants'

const getAllPersonData = async (personId, currentLang) => {
  const data = await Promise.all([
    loadData(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&language=${currentLang}`,
    ),
    loadData(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${API_KEY}&language=${currentLang}`),
  ]);
  return data;
};

export const getPersonInfo = (personId, currentLang) => async (dispatch) => {
  dispatch({
    type: GET_PERSON_INFO + LOAD_START
  })

  const personData = await getAllPersonData(personId, currentLang)

  personData[0].movies = personData[1].cast

  dispatch({
    type: GET_PERSON_INFO,
    payload: personData[0]
  })
}




