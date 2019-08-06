<template>
  <material-card
    v-bind="$attrs"
    class="v-card--material-stats"
    v-on="$listeners"
  >
  
    <v-card
      slot="offset"
      :class="`elevation-${elevation}`"
      :color="getColor(1)"
      :flat="true"
      :outlined="true"
      class="pa-4"
      width="100px"
      dark
    >
    <!-- TODO 这里的应用图标需要美化 -->
      <i class="iconfont iconDocker"></i>
    </v-card>
    
    <template >
        <v-layout column align-space-around >
            <v-flex md12>
                    <small>服务名称： {{ serverName }}</small> 
            </v-flex>
            <!-- TODO 这里的格式需要优化 -->
            <v-flex  md12>
                    <small>状态：{{getStatusStr(serverStatus)}}</small> 
            </v-flex>
        </v-layout>
    </template>

    <template slot="actions">
      <v-layout row>
         <v-flex >
             <!-- TODO 这里想使用一个分割线分割属性 -->
                <v-card
                 :flat="true"
                >
                <v-flex >
                           <i class="iconfont iconapp"/> 
                           <small> 实例个数：</small>
                            <span
                                :class="subTextColor"
                                class="caption font-weight-light"
                                v-text="configNumber"
                            /><small> 个</small>
                </v-flex>
                <v-flex >
                           <i class="iconfont icontime"/> 
                           <small> 运行时长：</small>
                            <span
                                :class="subTextColor"
                                class="caption font-weight-light"
                                v-text="runTime"
                            />
                </v-flex>
                </v-card>
         </v-flex>
         
         <v-flex >
                   <v-flex >
                           <i class="iconfont iconconfigmap" small/> 
                           <small> 配置文件：</small>
                            <span
                                :class="subTextColor"
                                class="caption font-weight-light"
                                v-text="configNumber"
                            />
                           <small> 个</small>
                    </v-flex>
                    <v-flex>
                             <i class="iconfont iconwenjiancunchu" small/> 
                            <small> 存  储  卷：</small>
                            <span
                                :class="subTextColor"
                                class="caption font-weight-light"
                                v-text="volumeNumber"
                            /><small> 个</small>
                    </v-flex>
         </v-flex>
      </v-layout>
    </template>
  </material-card>
</template>

<script>
import Card from '../material/Card'

export default {
  inheritAttrs: false,

  props: {
    ...Card.props,
    icon: {
      type: String,
      required: true
    },
    subIcon: {
      type: String,
      default: undefined
    },
    subIconColor: {
      type: String,
      default: undefined
    },
    subTextColor: {
      type: String,
      default: undefined
    },
    configNumber: {
      type: Number,
      default: 0
    },
    serverName: {
      type: String,
      default: undefined
    },
    serverStatus: {
      type: Number,
      default: 0
    },
    runTime: {
      type: String,
      default: undefined
    },
    volumeNumber:{
      type: Number,
      default: 0  
    }
  },
  methods:{
      getColor: function(status){
         if (status == 0) {
            return ""
         }else if (status == -1 ){
            return "red"
         }else {
            return "info"
         }
      },
       getStatusStr: function(status){
         if (status == 0) {
            return "已下线"
         }else if (status == -1 ){
            return "异常"
         }else {
            return "运行中"
         }
      }
  }
}
</script>

<style lang="scss">
.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 280px;

  .v-offset {
    display: inline-block;
    flex: 0 1;
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
    padding: 0 16px 0;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 1 0 100%;
  }
}
</style>
