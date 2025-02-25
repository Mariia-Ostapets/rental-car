import { BeatLoader } from 'react-spinners';
import css from './Loader.module.css';

export const Loader = () => {
  return <BeatLoader className={css.loader} size={20} color={'#0b44cd'} />;
};
