import React, { createContext, memo, useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentType, PropsWithChildren, Provider } from 'react';

import {
  ConfirmResult,
  ConfirmationDialogContext,
  DismissResult,
  ModalBaseProps,
  OpenConfirmModalReturnValueType,
  OpenConfirmationModal
} from './types';

/**
 * Creates a confirmation dialog context based on the provided ModalComponent.
 *
 * @template ModalProps - The props type for the ModalComponent.
 * @param {React.ComponentType<ModalProps>} ModalComponent - The modal component used for the confirmation dialog.
 */
export const createConfirmationDialogContext = <ModalProps extends ModalBaseProps>(
  ModalComponent: ComponentType<ModalProps>
): ConfirmationDialogContext<ModalProps> => {
  const BaseContext = createContext<OpenConfirmationModal<ModalProps>>(() => {
    throw new Error('Cannot be used outside of dialog provider');
  });

  const BaseProvider = BaseContext.Provider;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Modal = memo(ModalComponent) as any;

  const DialogProvider = ({ children }: PropsWithChildren<void>) => {
    const [visible, setVisible] = useState(false);
    const [confirmationModalProps, setConfirmationModalProps] = useState<
      Omit<ModalProps, 'onConfirm' | 'onDismiss'> | undefined
    >(undefined);

    const confirmCallbacks = useRef(new Set<(result: ConfirmResult<ModalProps>) => void>());
    const dismissCallbacks = useRef(new Set<(result: DismissResult<ModalProps>) => void>());

    const openConfirmationModal = useCallback(
      (modalProps?: Omit<ModalProps, 'onConfirm' | 'onDismiss'>): OpenConfirmModalReturnValueType<ModalProps> => {
        confirmCallbacks.current.clear();
        dismissCallbacks.current.clear();

        setConfirmationModalProps(modalProps);
        setVisible(true);

        return {
          onConfirm(callback) {
            confirmCallbacks.current.add(callback);
            return this;
          },
          onDismiss(callback) {
            dismissCallbacks.current.add(callback);
            return this;
          }
        };
      },
      []
    );

    const handleConfirm = (result: ConfirmResult<ModalProps>) => {
      confirmCallbacks.current.forEach(callback => callback(result));

      confirmCallbacks.current.clear();
      dismissCallbacks.current.clear();

      setVisible(false);
    };

    const handleDismiss = (result: DismissResult<ModalProps>) => {
      dismissCallbacks.current.forEach(callback => callback(result));

      confirmCallbacks.current.clear();
      dismissCallbacks.current.clear();

      setVisible(false);
    };

    useEffect(() => {
      const confirmCbs = confirmCallbacks.current;
      const dismissCbs = dismissCallbacks.current;

      return () => {
        // Clear callbacks on unmount
        confirmCbs.clear();
        dismissCbs.clear();
      };
    }, []);

    return (
      <BaseProvider value={openConfirmationModal}>
        {children}
        {visible && <Modal {...confirmationModalProps} onConfirm={handleConfirm} onDismiss={handleDismiss} />}
      </BaseProvider>
    );
  };

  BaseContext.Provider = DialogProvider as unknown as Provider<OpenConfirmationModal<ModalProps>>;

  return BaseContext as unknown as ConfirmationDialogContext<ModalProps>;
};
