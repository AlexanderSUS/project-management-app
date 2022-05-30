import {
  SLICE_END, SLICE_START, ELIPSIS, SLICE_END_20,
} from '../constants/text';

const restrictText = (string: string) => (
  string.length > SLICE_END ? string.slice(SLICE_START, SLICE_END).concat(ELIPSIS) : string
);

export default restrictText;

export const restrictBoardDescription = (string: string) => (
  string.length > SLICE_END_20 ? string.slice(SLICE_START, SLICE_END_20).concat(ELIPSIS) : string
);
