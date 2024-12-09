import Mock from 'mockjs'
import homeMock from '../api/mockServe/home'
import user from './user'
import permission from './mockServe/permission'
import club from './club'

// 定义mock拦截
Mock.mock('/api/home/getData',homeMock)

// 用户管理:增删查改
Mock.mock(/\/api\/user\/get/,user.getUserList)
Mock.mock('/api/user/create','post',user.createUser)
Mock.mock('/api/user/update','post',user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)

// 社团管理:增删查改
Mock.mock(/\/api\/club\/get/,club.getClubList)
Mock.mock('/api/club/create','post',club.createClub)
Mock.mock('/api/club/update','post',club.updateClub)
Mock.mock('/api/club/del','post',club.deleteClub)

// 登录权限
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)