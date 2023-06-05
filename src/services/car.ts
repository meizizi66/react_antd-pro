import request from '@/utils/request';
import request1 from 'umi-request';
//CAR
export async function getCars(params): Promise<any> {
    return request('/api/priv/get/carinfo', { params });
}
export async function addCar(data): Promise<any> {
    return request1('/api/priv/add/carinfo', {
        method: 'post',
        data: data,
    });
}
export async function updateCar(data): Promise<any> {
    return request1('/api/priv/update/carinfo', {
        method: 'post',
        data: data,
    });
}
export async function specificCar(id): Promise<any> {
    return request1('/api/priv/specific/carinfo', {
        method: 'get',
        params: {
            CarNUM: id,
        },
    });
}
export async function deleteCar(id): Promise<any> {
    return request1('/api/priv/delete/carinfo', {
        method: 'get',
        params: {
            CarNUM: id,
        },
    });
}
export async function getCarID(): Promise<any> {
    return request1('/api/priv/get/carid');
  }
//passenger
export async function getPass(params): Promise<any> {
    return request('/api/priv/get/passinfo', { params });
}
export async function addPass(data): Promise<any> {
    return request1('/api/priv/add/passinfo', {
        method: 'post',
        data: data,
    });
}
export async function updatePass(data): Promise<any> {
    return request1('/api/priv/update/passinfo', {
        method: 'post',
        data: data,
    });
}
export async function specificPass(id): Promise<any> {
    return request1('/api/priv/specific/passinfo', {
        method: 'get',
        params: {
            PassID: id,
        },
    });
}
export async function getPassID(): Promise<any> {
    return request1('/api/priv/get/passID');
}
export async function deletePass(id): Promise<any> {
    return request1('/api/priv/delete/passID', {
        method: 'get',
        params: {
            PassID: id,
        },
    });
}