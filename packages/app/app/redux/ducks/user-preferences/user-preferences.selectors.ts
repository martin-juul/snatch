import {pathOr} from 'ramda';

import {currentLanguage} from 'i18n';
import {namespace} from './user-preferences.slice';

const getLanguage = state => pathOr(currentLanguage, [namespace, 'language'], state);

export default {
  getLanguage,
};
