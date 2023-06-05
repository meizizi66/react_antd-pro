export default [
  {
    path: '/login',
    component: '../layouts/LoginLayout',
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            component:'./welcome'
          },
          {
            name:'驾驶员管理',
            path:'/person',
            icon:'CarOutlined',
            component:'./Person',
          },
          {
            name:'汽车信息管理',
            path:'/car',
            icon:'CarOutlined',
            component:'./Car',
          },
          {
            name:'乘客信息管理',
            path:'/passenger',
            icon:'IdcardOutlined',
            component:'./Passenger',
          },
          {
            name:'路线信息管理',
            path:'/route',
            icon:'BorderOuterOutlined',
            component:'./Route',
          },
          {
            name:'票务信息管理',
            path:'/ticket',
            icon:'MoneyCollectOutlined',
            component:'./Ticket',
          },
          {
            name:'座位信息管理',
            path:'/seat',
            icon:'AuditOutlined',
            component:'./Seat',
          },
          {
            component: './404',
          },
          
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
