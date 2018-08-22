<template>
  <div class="baseBack">
    <wv-tabs @click="onclick">
      <wv-tab v-for="index in 4" :title="'标签 ' + index" :key="index">
      </wv-tab>
    </wv-tabs>
      <scroller :on-infinite="infinite" :on-refresh="refresh" :noDataText="noDataText" ref="myscroller" v-if="active==0">
          <ul>
            <li v-for="(item,index) in arr" :key="index">
              <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_appmsg" >
                  <div class="weui-media-box__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURQWvEP///53Xn9Lr0rjhuqvcren16Su1MW3GcEW7St3w3n7MgY7RkPT69FrBXsXmxhFC35IAAAI7SURBVGje7ZVBbtpQEIYnLqQNhMKPsQEHIswJsLiAuUHpCcINjNQDwA2gUtUtUVV1C+tu4AbJDcINyg06Y5OoNij1k7qpNN8CGb3//Z43M29MpCiKoiiKoiiKoiiKoiiKovynjBARvUWDH6u4syDUk6VJ91nhQx4s1CglOMsOM6IyXH68RJjSj2WJ6NEjE8MlekRFSJxLbFP6vSzRe/5rYljBL6I3kGA2iGTPH0srkpe1U4a1v+SQE0d04UowYy+tL6DJvyW2NTG0ZNfcwYDo3knry+gcc2Ji+A43RH4LD0T8lNIntd9hYWRIkuGgNrll62ZGf5C+OXhkZhjYbLoKOqxdZfQ+npIXGhn6XY4t9Btcng8ZvaSvjFtDwzkWFrYbj7tkfWyz5z0lLlVBuiDbh6+aTrGuYjEFxxNl9EXO6iXHbWZYQq/i8r7ZzpM99nA4HNDnfr/f40tyw9flKW2YCF6hiMGywSfrjR16SdE8CWPikO+SYQ6v8bCTEodB68Rw5FLgmBpeoTlu8+kGIs3oN/gqRebmjuKz3OUxpEkr4EKiLbcvo7/ATykyB7w+Fj2P4aiOkPu7I/Mho6/io6yxcXhsyzyGvoct/9oywTL6a3yLY6vGBz/wrc5juAcLOV2gE8MroJtMkO6MPsmsyGNYief/FHZsGPOydh8PHPkauEPgx6ng/IhtxB+U+hlDX4ZbXGDGjvIZWvEcLaB1xnAvc1L4EuD7jPIZKoqiKIqiKIqiKIqiKIqiKP+O37IfYPcmpK6KAAAAAElFTkSuQmCC" alt="" class="weui-media-box__thumb"></div>
                  <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{index}}</h4>
                    <p class="weui-media-box__desc">这里是一些描述文字。本例使用 vue-router 进行跳转</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </scroller>
        <div v-if="active===1">
            asdasdsa
        </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      arr: [],
      dataArr: {
        type: 1,
        actType: -1,
        keyWord: '',
        desc: 1,
        page: 0
      },
      noDataText: '',
      active: 0
    }
  },
  methods: {
    onclick (val) {
      this.active = val
      if (val === 1) {
        this.dataArr.page = 1
        this.refresh() // 变为1后要刷新
      }
    },
    List (fn) {
      this.$http.req(
        '/index.php?app=activity&m=act&cmd=102',
        this.dataArr,
        res => {
          if (res.data.info.data.length < 20) {
            // 每次请求数据是10条，如果数据不够10条，就是没数据了 让页数=0；
            this.offset = 0
            this.noDataText = '没有更多数据'
            fn(true) // 没有数据了  就传发true  否则不停请求
            return
          } else {
            if (fn) fn()
          }
          if (this.dataArr.page === 1) {
            this.arr = res.data.info.data // 如果是想下滑动，刷新数据 就让items等于最新数据
          } else {
            this.arr = this.arr.concat(res.data.info.data) // 否则就把数据拼接
          }
        }
      )
    },
    refresh (done) { // (刷新页面的时候) 这是向下滑动的时候请求最新的数据
      this.List(done)
    },
    infinite (done) { // 每当向上滑动的时候就让页数加1
      this.dataArr.page++
      this.List(done)
    }
  },
  mounted () {
    // this.List()
  },
  created () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100vh;
  overflow-y: scroll;
}

.row {
  height: 100px;
  width: 100px;
  background: deepskyblue;
  margin: 10px;
}

.scroller {
  position: relative;
}
._v-container {
  margin-top: 50px;
}
</style>
