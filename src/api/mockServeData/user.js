import Mock from 'mockjs'

//get請求從config.url獲取參數，post從config.body中獲取參數
function param2Obj (url) {
    const search = url.split('?')[1];
    if (!search) {
        return {}
    }
    const params = new URLSearchParams(search);
    let obj = {};
    for (let [key, value] of params) {
        obj[key] = value;
    }
    return obj;
}

let List = []
const count = 200;

for (let i = 0; i < count; i ++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            sex: Mock.Random.integer(0, 1),
            birth: Mock.Random.date(),
            'age|18-60':1,
            addr: Mock.mock('@county(true)'),
        })
    )
}


export default {
    /**
     * 獲取列表
     * 要帶參數 name, page, limit; name 可以不填,page, limit 有默認值
     * @param name, page, limit
     * @return {number} code
     * @return {number} count
     * @return {*[]} data
     */
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url);
        console.log('name:' + name, 'page:' + page, '分頁大小limit:' +limit)
        const mockList = List.filter(user => {
            if(name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1)return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page -1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },
    /**
     * 增加用戶
     * @param name, addr, age, birth, sex
     * @return {number} 
     * @return {message: string} data
     */
    createUser: config => {
        const { name, addr, age, birth, sex } = JSON.parse(config.body);
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            sex: sex,
            birth: birth,
            age: age,
            addr: addr,
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },

    /**
     * 刪除用戶
     * @param id
     * @return {*}
     */
    deleteUser: config => {
        const { id } = JSON.parse(config.body);
        if(!id) {
            return {
                code: -999,
                message: '參數不正確'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '刪除成功'
            }
        }
    },
    /**
     * 批量刪除
     * @param config
     * @return {number} 
     * @return {message: string} data
     */
    batchRemove: config => {
        let { ids } = param2Obj(config.url);
        ids = ids.split(',');
        List = List.filter(u => !ids.includes(u.id));
        return {
            code: 20000,
            data: {
                message: '批量刪除成功'
            }
        }
    },
    /**
     * 修改用戶
     * @param id, name, addr, age, birth. sex
     * @return {number} 
     * @return {message: string} data
     */
    updateUser: config => {
        const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
        const sex_num = parseInt(sex);
        List.some(u=> {
            if (u.id === id) {
                u.name = name;
                u.addr = addr;
                u.age = age;
                u.birth = birth;
                u.sex = sex_num;
            }
        })
        return {
            code: 20000,
            data: {
                message: '編輯成功'
            }
        }
    }
}