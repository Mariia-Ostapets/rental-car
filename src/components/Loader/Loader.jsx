import css from './Loader.module.css';
import { BeatLoader } from 'react-spinners';

export const Loader = () => {
  return <BeatLoader className={css.loader} size={20} color={'#0b44cd'} />;
};
