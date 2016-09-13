# shopex-refactor
京博云商Hybrid App，HTML页面重构项目

## 编码规范
> 主要遵照【ShopEx48模板开发规范】，如下：
- [HTML规范](http://wiki.zx.shopex.cn/base/html.html)
- [CSS规范](http://wiki.zx.shopex.cn/base/css.html)
- [JavaScritp规范](http://wiki.zx.shopex.cn/base/js.html)
- [通用编码规范](http://codeguide.bootcss.com/)作为补充参考。

## 本环境中的一些约定
- 自适应布局采用[lib-flexible](http://web.jobbole.com/84285/)解决方案
- UI图标元素使用background-image的方式,容器尺寸单位使用px,编译时会换算成rem成为响应式
- 作为UI图标元素的图片文件名以"icon-"开头，如：icon-category.png
- 用作演示占位的图片或测试用假数据，以“temp-”开头，如：temp-product.jpg
- 不使用gif格式的图片
- 重构各页面过程中，同时做好css、js、图片文件优化，将公用资源提取合并
- Ajax操作直接写在HTML文件中,例子:./src/vip-center/release_list.html
- 需要异步加载Tab标签页内容的,给每个tab页添加语义化的id属性,使用switch判断要处理哪个tab,例子:./src/vip-center/release_list.html
- 按钮尽量不使用*button*标签,按需使用*a*与*input*标签
- 表单使用*form*标签包裹
- 考虑字符串溢出撑破版面的情况,开发中自行检查
- input做按钮时按需添加css属性appearance:none,表现区别如图所示![appearance](./src/common-assets/img/temp-input.appearance.jpg)

## 目录组织规则与说明
    -root/
        |-build/                        开发编译目标
        |-release                       交付编译目标
        |-src/                          重构页面源文件
            |-common-assets             全局公用资源目录
            |-index/                    每个重构页独占一个目录
                |-css/                  样式目录
                |-img/                  图片资源，图标文件名中需包含'icon'
                |-js/                   JS脚本目录
                |-index.html            该页HTML入口
                |-README.md             该页说明文档
            |- ...                      更多页面
        |-.csscomb.json                 csscomb配置
        |-.editorconfig
        |-.gitignore
        |-gulpfile.js                   gulp配置
        |-package.json                  npm项目配置
        |-README.md                     项目说明

## 版本控制
请checkout出develop分支用于开发，master分支用于稳定版

## 环境需求
- nodejs
- npm
- cnpm,[taobao的NPM镜像](http://npm.taobao.org/),使用npm安装包出问题时使用

## 使用方法
使用[gulp](http://www.gulpjs.com.cn/)自动化构建

#### 安装依赖
    > npm install gulp -g
    > npm install

#### 启动开发环境服务
    > gulp

#### 编译生产环境文件
    > gulp prod

#### 梳理重格式化样式文件
    > npm run csscomb

## 页面总表
|编号    |文件名              |页面                |作者      |
|-------|--------------------|--------------------|---------|
|       |product-detail.html |商品详情            |陈柏林 张宗义    |
|       |store-detail.html   |商铺详情            |苏治政    |
|       |category.html       |商品分类            | 张宗义    |
|       |category-result.html       |商品分类搜索结果    | 张宗义    |
|       |industrial-supermarket.html |工业品超市    |陈柏林    |
|       |login.html              |登录页            |张宗义    |
|27     |27-find-password.html   |找回密码页        | 张宗义    |
|       |set-password.html       |设置新密码页      | 张宗义    |
|29     |29-register-tab.html    |注册选择页        | 张宗义    |
|25     |25-register_user.html   |注册(个人用户验证手机)|苏治政     |
|25     |25-register_user_password.html|注册(个人用户设置密码)|苏治政|
|26     |26-register_enterprise.html  |注册(企业用户)    |苏治政     |
|       |rules-all.html               |平台规则导航页      |张宗义    |
|       |rules-returnGoods.html       |退换货政策页        | 张宗义    |
|       |product-search.html  |商品搜索             |张宗义    |
|       |store-search.html    |商铺搜索             |张宗义    |
|       |product-result.html    |商品搜索结果展示       |苏治政    |
|       |store-result.html    |商铺搜索结果展示       |苏治政    |
|       |order-confirm.html  |确认订单            | 张宗义    |
|       |address-list.html   |收货地址列表          |陈柏林    |
|       |invoice-info.html   |发票信息             |陈柏林    |
|       |offline-contract-info.html|线下合同信息    |陈柏林    |
|       |shoppingCart.html  |购物车               |张宗义    |
|       |shipping-method.html |配送方式          |陈柏林    |
|       |release.html               |发布需求             |苏治政    |
|       |release_list.html          |需求列表             |苏治政    |
|       |release_responses.html     |采购回应             |苏治政    |
|       |release_purchase.html      |采购需求发布          |苏治政    |
|       |see_offer.html             |查看报价            |苏治政    |
|17     |17-publishing-requirements.html|发布需求         |苏治政 张宗义|
|18     |supplier.html              |供应商选择            |苏治政    |
|31     |31-myCenter.html           |个人中心列表         |张宗义    |
|32     |32-user-info.html          |个人信息             |张宗义    |
|33     |33-enterprise-info.html    |企业信息              |苏治政     |
|36     |36-safe-center.html        |安全中心             |张宗义    |
|37     |37-change-password.html    |修改密码             |张宗义    |
|38     |38-binding-email.html      |绑定邮箱             |张宗义    |
|38     |38-change-email.html       |修改邮箱             |张宗义    |
|40     |40-changePhone-1.html         |修改手机第一步       |张宗义    |
|40     |40-changePhone-2.html      |修改手机第二步       |张宗义    |
|41     |41-vip-center.html        |会员中心             |张宗义    |
|       |new_address.html           |新增收货地址         |苏治政    |
|       |shipping_address.html      |收货地址             |苏治政    |
|43     |43-confirm-contract.html   |确认合同             |张宗义|
|44     |44-contract_detail.html    |合同详情           |余俊舟     |
|46     |46-offline-pay.html        |线下支付             |张宗义|
|46     |46-waiting-check.html      |等待核对             |张宗义|
|47     |47-money-back.html          |退款                |苏治政    |
|50     |50-cancel.html             |已取消订单           |张宗义|
|50     |50-confirm-contract.html   |确认合同             |张宗义|
|50     |50-finishing.html          |完成订单             |张宗义|
|50     |50-waiting-contract.html   |待发合同             |张宗义|
|50     |50-waiting-delivery.html   |待发货               |张宗义|
|50     |50-waiting-pay.html        |待支付               |张宗义|
|50     |50-waiting-receiving.html  |待收货               |张宗义|
|42     |42-order-management.html   |订单列表             |苏治政    |
|45     |45-payment-online.html     |线上支付             |苏治政    |
|48     |48-order-returns.html      |退款明细             |苏治政    |
|49     |49-evaluation.html         |评价页面             |苏治政    |
