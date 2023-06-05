import request from '@/utils/request';
import request1 from 'umi-request';
//CAR
export async function getRoute(params): Promise<any> {
    return request('/api/mine/get/routeinfo', { params });
}
export async function addRoute(data): Promise<any> {
    return request1('/api/mine/add/routeinfo', {
        method: 'post',
        data: data,
    });
}
export async function updateRoute(data): Promise<any> {
    return request1('/api/mine/update/routeinfo', {
        method: 'post',
        data: data,
    });
}
export async function specificRoute(id): Promise<any> {
    return request1('/api/mine/specific/routeinfo', {
        method: 'get',
        params: {
            RouteID: id,
        },
    });
}
export async function deleteRoute(id): Promise<any> {
    return request1('/api/mine/delete/routeinfo', {
        method: 'get',
        params:{
            RouteID: id,
        },
      });
  }
export async function getRouteID(): Promise<any> {
    return request1('/api/mine/get/RouteID');
  }