import { get } from '../utils/request';

export const getPageDetail = (id: string) => get(`/pages/${id}`);
