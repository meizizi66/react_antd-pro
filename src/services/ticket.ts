import request from '@/utils/request';
import request1 from 'umi-request';
//CAR
export async function getTicket(params): Promise<any> {
    return request('/api/my/get/ticketinfo', { params });
}
export async function addTicket(data): Promise<any> {
    return request1('/api/my/add/ticketinfo', {
        method: 'post',
        data: data,
    });
}
export async function updateTicket(data): Promise<any> {
    return request1('/api/my/update/ticketinfo', {
        method: 'post',
        data: data,
    });
}
export async function specificTicket(id): Promise<any> {
    return request1('/api/my/specific/ticketinfo', {
        method: 'get',
        params: {
            TicketID: id,
        },
    });
}
export async function deleteTicket(id): Promise<any> {
    return request1('/api/my/delete/ticketinfo', {
        method: 'get',
        params:{
            TicketID: id,
        },
      });
  }