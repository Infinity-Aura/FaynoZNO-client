import { ToastOptions, toast } from 'react-toastify';

export const notify = (msg: string, options?: ToastOptions) => toast(msg, options);

export const notifyError = (msg: string, options?: ToastOptions) =>
  notify(msg, { type: 'error', ...options });

export const notifySuccess = (msg: string, options?: ToastOptions) =>
  notify(msg, { type: 'success', ...options });

export const notifyWarn = (msg: string, options?: ToastOptions) =>
  notify(msg, { type: 'warning', ...options });

export const notifyInfo = (msg: string, options?: ToastOptions) =>
  notify(msg, { type: 'info', ...options });
