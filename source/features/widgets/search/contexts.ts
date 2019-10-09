import React from 'react';
import { ISearchContext } from './types';

export const searchContext = React.createContext<ISearchContext | null>(null);
