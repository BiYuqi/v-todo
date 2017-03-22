import '../css/index.css';
import Vue from 'vue/dist/vue.min.js';
import './timeplug.js';
import welldata from './data.json';

var filters = {
    all: function(list) {
        return list;
    },
    active: function(list) {
        return list.filter(function (todo) {
            return !todo.status;
        });
    },
    completed: function(list) {
        return list.filter(function (todo) {
            return todo.status;
        });
    }
};
new Vue({
    el:'#wrapper',
    data () {
        return {
            tvalue:'',
            list: JSON.parse(localStorage.getItem('list')) || [],
            type: 'all',
            isShow:false,
            Showdata:'',
            randomNum:1
        }
    },
    methods: {
        changeType (type) {
            this.type = type;
        },
        saveLocal (list){
            localStorage.setItem('list', JSON.stringify(list));
        },
        addData (){
            if(this.tvalue.length<=0){
                return;
            }
            var data = {
                content:this.tvalue,
                status:0,
                time:util.time.getYear()
            }
            this.list.push(data);
            this.saveLocal(this.list);
            this.tvalue = '';
        },
        clearnotes (){
            this.list = filters.active(this.list);
            this.saveLocal(this.list);
        },
        toggleCircle (index){
            this.list[index].status = this.list[index].status ==0 ? 1:0;
            this.saveLocal(this.list);
        },
        removeSingle (index){
            this.list.splice(index,1);
            this.saveLocal(this.list);
        },
        isEnter (event){
            if(event.keyCode == '13'){
                this.addData();
            }
        },
        showClick(it){
            // 传值
            this.Showdata = it;
            this.isShow = true;
        },
        isShowClick () {
            // 随机数字赋值
            this.randomNum = this.random();
            // 模态
            this.isShow = false;
        },
        random (){
            // 随机数字
            return Math.floor(Math.random()*87);
        }
    },
    computed:{
        enRest () {
            var count = 0;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].status == 0) {
                    count += 1;
                }
            }
            return count;
        },
        listGroup () {
            return filters[this.type](this.list);
        },
        isShowdata () {
            return this.Showdata;
        },
        wellNown () {
            // 随机名言
            return welldata[this.randomNum];
        }
    }
})
