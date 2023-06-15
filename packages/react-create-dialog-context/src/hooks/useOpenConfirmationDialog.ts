import { type Context, useContext } from 'react';
import { ConfirmationDialogContext, ModalBaseProps, OpenConfirmationModal } from '../types';

/**
 * Custom hook for consuming the confirmation dialog context.
 *
 * @template T - The props type for the modal component.
 * @param {ConfirmationDialogContext<T>} context - The confirmation dialog context.
 * @returns {OpenConfirmationModal<T>} The function to open the confirmation dialog.
 */
export const useOpenConfirmationDialog = <T extends ModalBaseProps>(context: ConfirmationDialogContext<T>) => {
  return useContext(context as unknown as Context<T>) as unknown as OpenConfirmationModal<T>;
};
