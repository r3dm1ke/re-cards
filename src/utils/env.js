import {messaging} from 'firebase';

export const is_dev = () => process.env.NODE_ENV === 'development';
export const messaging_supported = messaging.isSupported;
