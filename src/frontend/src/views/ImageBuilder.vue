<template>
    <v-container>
        <v-layout column fluid>
            <!-- 面包屑-->
            <v-flex>
                <v-breadcrumbs :items="breadcrumbs" divider=">" large></v-breadcrumbs>
            </v-flex>

            <v-layout row align-center mt-4>

                <!-- 创建配置 -->
                <v-flex md10>
                    <v-btn color="info" large :to="{path:'/pipeline/import'}">
                        <v-icon>add</v-icon>导入项目
                    </v-btn>
                </v-flex>
                <v-flex md2>
                    <!-- <v-select
                             tex
                             :items="namespaceArray"
                             v-model="namespaceSelected"
                             @change="listConfigMap(namespaceSelected)"
                             label="命名空间:"
                     >
                     </v-select>-->
                </v-flex>
                <!--刷新按钮-->
                <v-btn icon @click="refreshTable()">
                    <v-icon >cached</v-icon>
                </v-btn>
            </v-layout>
            <v-flex>
                <v-data-table :headers="headers" :items="projects">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">
                            <router-link  :to="{ path: '/cicd/deploying', query: { project:  props.item.name   }}">
                                <v-btn small color="primary">构建</v-btn>
                            </router-link>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped>
    a {
        text-decoration: none;
    }
</style>

<script>
    import API from '../components/api/api'
    import Storage from '../store/storage'

    const ALL_NAMESPACE = "all namespace";
    export default {
        data () {
            return {
                headers: [
                    { text: '项目名', value: 'name' },
                    { text: '', value: 'handle', align: "right" }
                ],

                projects:   [],
                orgin:  [],
                select: [],
                // 导航栏目录
                breadcrumbs: [
                    {
                        text: '项目列表',
                        disabled: true,
                        href: 'image'
                    }
                ],
                namespaceArray: [],
                namespaceSelected: ALL_NAMESPACE
            }
        },
        created: function() {
            this.get_projects();
            this.listNamespace();
        },
        methods: {
            get_projects: function() {
                let group = Storage.get(Storage.KEYS.NAMESPACES);
                let uri = `/v1/group/${group}/get-projects`;
                this.$http.get(API.k8sAddr + uri).then((response) => {
                    this.orgin = response.data
                    response.data != null && Object.keys(response.data).forEach(key => {
                        this.projects.push({"name": key})
                    })
                })
            },
            listNamespace: function () {
                let role = Storage.get(Storage.KEYS.ROLE);
                let namespace = Storage.get(Storage.KEYS.NAMESPACES);
                if (role === Storage.ADMIN_ROLE){
                    this.$http.get(API.listNamespace).then((response) => {
                        for (let n of response.data.items) {
                            this.namespaceArray.push(n.metadata.name);
                        }
                        this.namespaceArray.push(this.namespaceSelected);
                    })
                }else {
                    this.namespaceArray.push(namespace);
                    this.namespaceSelected = namespace;
                }
            },
            refreshTable: function () {
                this.projects = [];
                this.get_projects();
            }
        }
    }
</script>