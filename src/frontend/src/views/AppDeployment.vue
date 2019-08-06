<template>
    <v-container fluid>
        <v-layout column>
            <v-flex md12>
                <v-btn 
                    class="mx-1"  
                    dark color="indigo" 
                    @click=""
                    >
                    <v-icon dark>add</v-icon>
                    部署应用
                </v-btn>
            </v-flex>
            <v-flex>
               <v-divider></v-divider>
            </v-flex>
            <v-flex>
                <v-layout column justify-space-around >
                        <v-flex 
                            v-for="d in deployments"
                            :key="d"
                        >
                            <v-layout row justify-space-around>
                                    <v-flex
                                            sm2
                                            xs12
                                            md2
                                            lg3
                                            v-for="d in deployments"
                                            :key="d"
                                    >
                                        <app-deployment-card
                                                color="green"
                                                icon="iconfont icondocker"
                                                title="Revenue"
                                                value="$34,245"
                                                runTime="100天"
                                                serverName="cce as a sb"
                                                sub-icon="mdi-calendar"
                                        />
                                    </v-flex>
                            </v-layout>
                        </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "AppMgrDeployment",
        data() {
            return {
                "deployments":[
                    {},
                    {},
                    {},
                    {},
                ]
            }
        }
    }
</script>

<style scoped>

</style>