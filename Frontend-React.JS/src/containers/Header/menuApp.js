export const adminMenu = [
    { // quản lí người dùng
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            {
                name: 'menu.admin.manage-docter', link: '/system/manage-docter'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            // { name: 'menu.admin.manage-admin', link: '/system/user-admin' },

            // quản lí kế hoạch khám bệnh của bác sĩ

            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },






        ]
    },
    { // quản lí phòng khám
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
        ]
    },
    { // quản lí chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },


        ]
    },
    { // quản lí bài đăng
        name: 'menu.admin.post',
        menus: [
            { name: 'menu.admin.manage-post', link: '/system/manage-post' },


        ]
    },

];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            // quan li ke hoach kham benh
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },

            // quan li benh nhan
            { name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient' },


        ]

    }


];