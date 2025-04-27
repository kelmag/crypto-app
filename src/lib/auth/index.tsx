import { create } from 'zustand';

import { createSelectors } from '../utils';
import { authenticateAsync, isBiometricAvailable } from './biometric';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  isBiometricAvailable: boolean;
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
  authenticateWithBiometric: () => Promise<boolean>;
  checkBiometricAvailability: () => Promise<void>;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  isBiometricAvailable: false,
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
  authenticateWithBiometric: async () => {
    return authenticateAsync();
  },
  checkBiometricAvailability: async () => {
    const available = await isBiometricAvailable();
    set({ isBiometricAvailable: available });
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
