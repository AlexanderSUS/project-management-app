import { SLICE_END, SLICE_START, ELIPSIS } from '../constants/text';

const restrictText = (string: string) => (
  string.length > SLICE_END ? string.slice(SLICE_START, SLICE_END).concat(ELIPSIS) : string
);

export default restrictText;
