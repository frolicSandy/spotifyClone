/** DataLayer is CONTEXT API implementation where we create a data layer which is accessible throughout the app to each and every components. This saves us from the PROP DRILLING problem(Having to pass the data as props through a chain of components)
 * PROP DRILLING makes the code tree really complex and sensitive to change wherein even the slightest changes in any components might break the code.
 */

import React, { createContext, useContext, useReducer } from 'react';

export const DataLayerContext = createContext();

/** props passed from index.js --> initialState, reducer
 * children --> components wrapped in the context API(<App /> in this case)
 */
export const DataLayer = ({ initialState, reducer, children }) => (
    <DataLayerContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
);

/** Way of getting access to data layer to get data or dispatch action */
export const useDataLayerValue = () => useContext(DataLayerContext);