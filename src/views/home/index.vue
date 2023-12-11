<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超級管理員</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登入的時間:<span>2023/12/01</span></p>
                    <p>上次登入的地點:<span>台灣</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 460px;">
                <el-table :data="tableData">
                    <el-table-column 
                    v-for="(val, index) in tableLabel" 
                    :key="index" 
                    :prop="index"
                    :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col class="numList" style="margin-top: 20px" :span="16">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: 0}" class="numCard">
                    <div class="icon" :style="{ background: item.color }">
                        <el-icon color="#fff" size="30px">
                            <component :is="item.icon"></component>
                        </el-icon>
                    </div>
                    <div class="detail">
                        <p class="num">¥{{ item.value }}</p>
                        <p class="text">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px"></el-card>
            <div class="graph">
                <el-card style="width: 48%; height: 260px"></el-card>
                <el-card style="width: 48%; height: 260px"></el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
    import { getMenu } from '../../../api/data.js';
    export default {
        name: 'homePage',
        data() {
            return {
                userImg: require('./../../assets/images/user.png'),
                tableData: [
                    {
                        name: 'oppo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'vivo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'apple',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '小米',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '三星',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    }
                ],
                tableLabel : {
                    name: '課程',
                    todayBuy: '今日購買',
                    monthBuy: '本月購買',
                    totalBuy: '總共購買',
                },
                countData: [
                    {
                        name:'今日支付訂單',
                        value: '1234',
                        icon: 'SuccessFilled',
                        color: '#2ec7c9',
                    },
                    {
                        name:'今日收藏訂單',
                        value: '210',
                        icon: 'StarFilled',
                        color: '#ffb980',
                    },
                    {
                        name:'今日未支付訂單',
                        value: '1234',
                        icon: 'GoodsFilled',
                        color: '#5ab1ef',
                    },
                    {
                        name:'本月支付訂單',
                        value: '1234',
                        icon: 'SuccessFilled',
                        color: '#2ec7c9',
                    },
                    {
                        name:'本月收藏訂單',
                        value: '210',
                        icon: 'StarFilled',
                        color: '#ffb980',
                    },
                    {
                        name:'本月未支付訂單',
                        value: '1234',
                        icon: 'GoodsFilled',
                        color: '#5ab1ef',
                    },
                ]
            }
        },
        mounted() {
            getMenu().then(res => {
                console.log(res);
            })
        }
    }

</script>

<style lang="less" scoped>

    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid lightgray;
        padding: 0 0 20px;

        img {
            width: 150px;
            height: 150px;
            flex-shrink: 0;
            margin: 0 20px 0 0;
        }

        .userInfo {
            
            p {
                text-align: left;
                white-space: nowrap;
                margin: 0 0 5px ;

                &.name {
                    font-size: 22px;
                }

                &.access {
                    color: gray;
                    font-size: 14px;
                }
            }
        }
    }

    .login-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 20px 0 0;

        p {
            color: gray;
            font-size: 14px;
            margin: 0 0 10px 0;
            
            span {
                margin: 0 0 0 50px;
            }
        }
    }

    .num {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 0 0 20px;
        .numCard {
        
            .icon {
                width: 80px;
                height: 80px;
                display: flex;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
            }

            .detail {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                padding: 0 0 0 20px;

                p {
                    margin: 0;

                    &.num {
                        font-size: 23px;
                    }

                    &.text {
                        color: #929292;
                        font-size: 14px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    
    .graph {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0 0;
    }
</style>