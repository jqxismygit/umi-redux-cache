import { Get } from '@/utils/request';

export async function fetchList() {
    return Get('/all');
}

export async function fetchDetail() {
    return Get('/detail');
}

