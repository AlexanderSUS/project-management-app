import { ModalActionKey, ModalConfirmAction } from '../types/modal';
import { modalConfirmAction } from '../constants/modal';

export default function isConfirmAction(
  action: ModalActionKey,
): action is keyof ModalConfirmAction {
  return (action as keyof typeof modalConfirmAction) in modalConfirmAction;
}
