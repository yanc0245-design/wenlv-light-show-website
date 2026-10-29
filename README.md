# 涵艺夜游展示官网

上海涵艺夜游整合旅游发展有限公司的静态展示网站。无需 Node 依赖或付费 API。

## 本地查看

```sh
python3 -m http.server 8000 --directory dist
```

打开 http://localhost:8000 。HTML、CSS、JavaScript 与图片均使用相对路径，可用于 GitHub Pages 子路径。

## 内容与真实性

- 公司名称、业务方向与周祖陵案例信息来自项目所有者提供的资料。
- `dist/assets/zhouzuling.jpg` 是所有者提供的周祖陵光影秀现场素材封面。清晰度受原始素材限制，未以生成图片冒充实拍。
- 未添加未经证实的客户名称、评价、合作标志或业绩数字。
- 商务电话、微信二维码与更多高清案例需要所有者补充。
- 项目需求单在浏览器本地下载，不上传、不存储、不发送；当前没有线上咨询后台。

## 目录

- `dist/`：可以直接托管的静态网站。
- `docs/`：设计记录与后续内容事项。
- `.openai/hosting.json`：Sites 托管配置（创建成功后写入）。

## GitHub Pages 免费托管

仓库 Settings → Pages → Build and deployment 选择 GitHub Actions。仓库中的 Pages 工作流可手动触发，在 Pages 启用后部署 `dist/`。仅发布公开展示资料；不要向仓库提交密钥、客户私密资料或未获授权素材。
