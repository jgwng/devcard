import { writable } from 'svelte/store';

export const svgStore = writable('');

export const user = writable({});

export const isMobile = writable(false);