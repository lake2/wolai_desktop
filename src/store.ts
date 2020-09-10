import Store from 'electron-store';

const store = new Store();

const action = {
    bounds: {
        get: () => store.get('bounds') as Partial<Electron.Rectangle> | undefined,
        set: (value: Electron.Rectangle) => store.set('bounds', value),
    }
} as const;

export default action;
