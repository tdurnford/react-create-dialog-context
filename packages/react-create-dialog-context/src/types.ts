import type { Context, FC } from 'react';

export type ConfirmResult<P> = P extends { onConfirm?: (result: infer R) => void } ? R : never;
export type DismissResult<P> = P extends { onDismiss?: (result: infer R) => void } ? R : never;
export type MakeOptional<P, K extends keyof P> = Omit<P, K> & Partial<Pick<P, K>>;

export type RequiredOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

export type OtherProps<P, K extends keyof P> = keyof RequiredOnly<Omit<P, K>> extends [never]
  ? [MakeOptional<P, K>?]
  : [MakeOptional<P, K>];

export type OpenConfirmModalReturnValueType<P> = {
  onConfirm: (callback: (result: ConfirmResult<P>) => void) => OpenConfirmModalReturnValueType<P>;
  onDismiss: (callback: (result: DismissResult<P>) => void) => OpenConfirmModalReturnValueType<P>;
};

export type ModalBaseProps<T = unknown> = {
  onConfirm?: (result?: T) => void;
  onDismiss: (result?: T) => void;
};

export type OpenConfirmationModal<P extends ModalBaseProps> = (
  modalProps?: Omit<P, 'onConfirm' | 'onDismiss'>
) => OpenConfirmModalReturnValueType<P>;

export type ConfirmationDialogContext<P extends ModalBaseProps> = Omit<
  Context<OpenConfirmationModal<P>>,
  'Provider'
> & {
  Provider: FC;
};
