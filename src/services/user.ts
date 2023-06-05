import request from '@/utils/request';
import request1 from 'umi-request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/auth/admin/userinfo');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
//获取驾驶员信息
export async function getDrivers(params): Promise<any> {
  return request('/api/auth/userinfo',{params});
}
export async function changeWork(uid): Promise<any> {
  return request1('/api/auth/change/userinfo', {
      method: 'get',
      params: {
        DriverID: uid,
      },
    });
}
export async function addDriver(data): Promise<any> {
  return request1('/api/auth/add/userinfo', {
      method: 'post',
      data:data,
    });
}
export async function updateDriver(data): Promise<any> {
  return request1('/api/auth/update/userinfo', {
      method: 'post',
      data:data,
    });
}
export async function specificDriver(id): Promise<any> {
  return request1('/api/auth/specific/userinfo', {
      method: 'get',
      params:{
        DriverID: id,
      },
    });
}
export async function deleteDriver(id): Promise<any> {
  return request1('/api/auth/delete/userinfo', {
      method: 'get',
      params:{
        DriverID: id,
      },
    });
}
export async function getDriverID(): Promise<any> {
  return request1('/api/auth/get/driverID');
}