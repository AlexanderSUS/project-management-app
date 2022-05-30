import {
  ModalActionKey, ModalConfirmAction, ModalFormAction, NoAction,
} from '../types/modal';
import { modalConfirmAction, modalFormAction } from '../constants/modal';

export function isConfirmAction(
  action: ModalActionKey,
): action is keyof ModalConfirmAction {
  return (action as keyof typeof modalConfirmAction) in modalConfirmAction;
}

export function isFormAction(
  action: ModalActionKey,
): action is keyof ModalFormAction {
  return (action as keyof typeof modalFormAction) in modalFormAction;
}

export function isShowAction(
  action: ModalActionKey,
): action is keyof NoAction {
  return (action as keyof NoAction) === 'noAction';
}
