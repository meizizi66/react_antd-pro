import request from '@/utils/request';
import request1 from 'umi-request';
//CAR
export async function getSeat(params): Promise<any> {
    return request('/api/me/get/seatinfo', { params });
}
export async function addSeat(data): Promise<any> {
    return request1('/api/me/add/seatinfo', {
        method: 'post',
        data: data,
    });
}
export async function updateSeat(data): Promise<any> {
    return request1('/api/me/update/seatinfo', {
        method: 'post',
        data: data,
    });
}
export async function specificSeat(params): Promise<any> {
    return request1('/api/me/specific/seatinfo', {
        method: 'get',
        params,
    });
}
export async function deleteSeat(RouteID,SeatID): Promise<any> {
    return request1('/api/me/delete/seatinfo', {
        method: 'get',
        params:{
            RouteID,
            SeatID,
        },
      });
  }