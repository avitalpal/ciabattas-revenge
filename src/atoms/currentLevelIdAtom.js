import { atom } from 'recoil';

// Current level id atom
export const currentLevelIdAtom = atom({
    key: 'currentLevelIdAtom',
    default: 'DemoLevel1'
});