<template>
    <div>
        <Cm-List 
            ref="CmList"
            :api="listConfig.api"
            :controller="listConfig.controller"
            :searchPlaceholder="listConfig.searchPlaceholder"
            :column="column">
            <template v-slot:search-button>
                <FormItem></FormItem>
            </template>
        </Cm-List>
    </div>
</template>
<script>
    import { admin } from '@/utils/api'
    export default {
        data () {
            return {
                // 系统配置
                SystemConfig : {
                    pathNameAr : ['系统设置','管理员操作日志','列表']
                },
                // 列表组件配置参数
                listConfig : {
                    api : {
                        index : admin.adminLog
                    },
                    controller : 'admin_log',
                    searchPlaceholder : '数据id或管理员id'
                },
                // 项
                column : [
                    {
                        title: 'id',
                        key: 'id',
                        width: 80,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title : '管理员',
                        key : 'admin_name',
                        render: (h, params) => {
                            return h(
                                "div",
                                params.row.admin.nickname
                            );
                        }
                    },
                    {
                        title : '描述',
                        key : 'des'
                    },
                    {
                        title : 'ip',
                        key : 'ip'
                    },
                    {
                        title : '操作时间',
                        key : 'act_time'
                    }
                ]
            }
        },
        methods: {
            // 刷新
            refresh () {
                this.$refs.CmList.refresh()
            },
        },
    }
</script>
