<style>
    .button-x{ margin-right:8px;}
</style>

<template>
    <div>
        <Spin size="large" fix v-show="isShowLoading" ></Spin>
        <div>
            <Button @click="jumpAddEdit()" icon="md-add-circle" type="primary">
                增加顶级
            </Button>
            <Divider />
        </div>
        <Tree :data="list" :render="renderContent" multiple ></Tree>
    </div>
</template>

<script>
import { menu } from '@/utils/api'
export default {
    configx : {
        title : 'ces',
    },
    data () {
        return {
            // 系统配置
            SystemConfig : {
                pathNameAr : ['系统设置','菜单管理','列表']
            },
            isShowLoading : true,
            list : []
        }
    },
    created() {
        this.refresh()
    },
    methods: {
        refresh () {
            this.list = []
            this.getListData()
        },
        getListData () {
            this.isShowLoading = true
            this.$Cm.api(menu.index).then(res => {
                let newList = []
                for(var i in res.data) {
                    var item = res.data[i]
                    // item.expand = true
                    item.render = (h, { root, node, data }) => {
                        return this.getRender(h, { root, node, data })
                    }
                    newList.push(item)
                }
                this.list = newList
            }).finally(() => {
                this.isShowLoading =  false
            })
        },
        getRender (h, { root, node, data }, isShowBut = true) {
            let self = this
            let button = [
                h(
                    'Button', 
                    {
                        attrs : {title : '详情'},
                        class : 'button-x',
                        on: {
                            click: () => {
                                this.jumpAddEdit(data.father_id, data.id)
                            }
                        }
                    },
                    [
                        h('Icon', {
                            props : {
                                size : 18,
                                type : 'md-albums'
                            }
                        })
                    ]
                ),
                h(
                    'Button', 
                    {
                        attrs : {title : '删除'},
                        class : 'button-x',
                        on: {
                            click: () => { 
                                this.$Modal.confirm({
                                    loading: true,
                                    title: '提示',
                                    content: '数据删除后将无法恢复,是否确定删除?',
                                    cancelText: '取消',
                                    okText: '确定',
                                    onOk () {
                                        this.$Cm.api(menu.delete,{
                                            id : data.id
                                        }).then(res => {
                                            res.run(false).then(() => {
                                                this.$Message.info('操作成功,刷新数据中...');
                                                self.isShowLoading = true
                                                self.list = []
                                                self.getListData()
                                            })
                                        }).finally(() => {
                                            this.$Modal.remove();
                                        })
                                    }
                                })
                            }
                        }
                    },
                    [
                        h('Icon', {
                            props : {
                                size : 18,
                                type : 'md-trash'
                            }
                        })
                    ]
                ),
            ]

            if(isShowBut) {
                button.push(
                    h(
                        'Button', 
                        {
                            attrs : {title : '增加'},
                            class : 'button-x',
                            on: {
                                click: () => { 
                                    this.jumpAddEdit(data.id)
                                }
                            }
                        },
                        [
                            h('Icon', {
                                props : {
                                    size : 18,
                                    type : 'md-add-circle'
                                }
                            })
                        ]
                    ),
                )
            }
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, button)
            ])
        },
        jumpAddEdit(fid = 0, id = '') {
            this.$router.push('/main/menu_add_edit/' + fid + '/' + id)
        },
        renderContent (h, { root, node, data }) {
            return this.getRender(h, { root, node, data }, false)
        }
    },
}
</script>
