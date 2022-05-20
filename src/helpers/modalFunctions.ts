import { ModalAction, ModalConfirmAction } from '../types/modal';
import { modalConfirmAction } from '../constants/modal';

export default function isConfirmAction(action: ModalAction): action is keyof ModalConfirmAction {
  return (action as keyof typeof modalConfirmAction) in modalConfirmAction;
}
