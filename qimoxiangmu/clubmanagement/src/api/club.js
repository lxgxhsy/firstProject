import Mock from "mockjs";

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

let List = [];
const count = 200;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      'id|+1': Mock.mock('@increment(1)'),
      name: Mock.mock("@cword(2, 3)社"),
      slogan: Mock.mock("@csentence()"),
      characteristic: Mock.Random.integer(1, 4),
    })
  );
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getClubList: (config) => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter((club) => {
      if (
        name &&
        club.name.indexOf(name) === -1 &&
        club.slogan.indexOf(name) === -1
      )
        return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      list: pageList,
    };
  },
  /**
   * 增加用户
   * @param name, slogan, sequence, birth, characteristic
   * @return {{code: number, data: {message: string}}}
   */
  createClub: (config) => {
    const { name, slogan, sequence, birth, characteristic } = JSON.parse(
      config.body
    );
    console.log(JSON.parse(config.body));
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      slogan: slogan,
      characteristic: characteristic,
    });
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteClub: (config) => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return {
        code: -999,
        message: "参数不正确",
      };
    } else {
      List = List.filter((u) => u.id !== id);
      return {
        code: 20000,
        message: "删除成功",
      };
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: (config) => {
    let { ids } = param2Obj(config.url);
    ids = ids.split(",");
    List = List.filter((u) => !ids.includes(u.id));
    return {
      code: 20000,
      data: {
        message: "批量删除成功",
      },
    };
  },
  /**
   * 修改用户
   * @param id, name, slogan, sequence, birth, characteristic
   * @return {{code: number, data: {message: string}}}
   */
  updateClub: (config) => {
    const { id, name, slogan, sequence, birth, characteristic } = JSON.parse(
      config.body
    );
    const characteristic_num = parseInt(characteristic);
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.slogan = slogan;
        u.characteristic = characteristic_num;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功",
      },
    };
  },
};
