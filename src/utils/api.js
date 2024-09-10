// 对所有的api接口进行统一管理
import request from './request.js'

// 接口
// export const getAll = (query) => request({
//     url: '/todolist/getAll',
//     method: 'get',
//     params: query
// })

export function getAll(query) {
    return request({
        url: '/todolist/getAll',
        method: 'get',
        params: query
    })
}

export function deleteTodo(id) {
    return request({
        url: `/todolist/delete/${id}`,
        method: 'get'
    })
}

export function getOneTodo(id) {
    return request({
        url: '/todolist/oneTodo',
        method: 'get',
        params: {
            TodoID:id
        }
    })
}