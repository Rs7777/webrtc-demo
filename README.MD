## WEBRTC-DEMO
> 参考项目 https://github.com/shushushv/webrtc-p2p

```javascript
npm i or yarn 
npm run dev or yarn dev
```

### 通话流程
> 参考 https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity
1. 打开两个页面模拟`发起方`和`响应方`。页面通过`websocket`连接信令服务器。
2. `发起方`通过`navigator.mediaDevices.getUserMedia()`获取本地视频流。
3. `发起方`实例化`RTCPeerConnection`得到实例`peer`, 调用`peer.addTrack()`将获取到的本地视频流添加到轨道。
4. `发起方`通过`peer.createOffer()`创建一个`offer`， 并通过`peer.setLocalDescription(offer)`设置`本地描述`。通过`websocket`将`本地描述`发送给`响应方`。
5. 设置`localDescription`后会触发`onicecandidate`添加`ice`候选。
6. `响应方`接收到`发起方`的描述后使用`setRemoteDescription`设置`远端描述`，使用`createAnswer`制作应答，并将应答设置为`响应方`的`本地描述`，同样通过`websocket`将应答发送到`发起方`。
7. `发起方`收到`响应方`的应答后，使用`setRemoteDescription`将应答设置为`发起方`的`远端描述`。