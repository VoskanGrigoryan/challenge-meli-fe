import React, { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { ToastProvider } from '@/src/components/toast/ToastProvider';
import { store } from '@/src/redux/store';

export function AllProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider>
      <ToastProvider>
        <Provider store={store}>{children}</Provider>
      </ToastProvider>
    </MantineProvider>
  );
}

export default AllProviders;
