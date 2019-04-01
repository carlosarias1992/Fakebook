import { merge } from 'lodash';

export const removeObject = (id, oldState) => {
    const stateKeys = Object.keys(oldState);
    let newState = {};

    for (let i = 0; i < stateKeys.length; i++) {
        if (parseInt(stateKeys[i]) !== id) {
            newState = merge(newState, { [stateKeys[i]]: oldState[stateKeys[i]] });
        }
    }

    return newState;
};