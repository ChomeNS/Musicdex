"use strict";(globalThis.webpackChunkmusicdex=globalThis.webpackChunkmusicdex||[]).push([[66],{48073:(e,t,i)=>{i.d(t,{L:()=>l,N:()=>r});var n=i(29548);const l=n.Z.div`
  width: 100%;
  position: absolute;
  z-index: 0;
  pointer-events: none;
  left: 0px;
  top: 0px;
  height: ${e=>{let{height:t}=e;return t}};
  mask-image: radial-gradient(
    ellipse farthest-side at 33% 12%,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.63) 48%,
    rgba(0, 0, 0, 0.58) 74%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-size: 150% 132%;
  mask-position: left bottom;
  overflow: hidden;
`,r=n.Z.div`
  width: 105%;
  width: calc(100% + 16px);
  position: absolute;
  pointer-events: none;
  z-index: 0;
  left: -8px;
  top: -8px;
  height: ${e=>{let{height:t}=e;return t}};
  background: url(${e=>{let{banner_url:t}=e;return t}});
  background-position: center;
  background-size: cover;
  ${e=>{let{blur:t}=e;return t&&"filter: blur(8px);"}}
`},82066:(e,t,i)=>{i.r(t),i.d(t,{default:()=>y});var n=i(28735),l=i(72791),r=i(6907),s=i(37734),o=i(16871),d=i(7267),a=i(89825),c=i(48073),u=i(6177),h=i(96084),p=i(28487),x=i(42708),b=i(93040),g=i(25090),v=i(62461),j=i(73436),m=i(80184);function y(){var e;const{t:t}=(0,s.$)();let i=(0,o.UO)().radioId;const{data:y,...k}=(0,g.xL)(i),f=(0,b.FA)(),{banner:C,title:w,description:z}=(0,l.useMemo)((()=>y&&{banner:f("bannerImage",y),title:f("title",y),description:f("description",y)}||{}),[f,y]),P=(0,j.U)(),$=(0,v.WX)((e=>e.playback.setPlaylist));var M;return k.error&&(null===k||void 0===k||null===(e=k.error)||void 0===e?void 0:e.status)>=400?(0,m.jsx)(n.xu,{pt:"10vh",px:6,children:(0,m.jsx)(n.M5,{role:"alert",my:10,children:(0,m.jsxs)(n.gC,{spacing:4,children:[(0,m.jsx)(n.X6,{children:t("You do not have access to this playlist (or it doesn't exist)")}),(0,m.jsx)(n.EK,{children:null===k||void 0===k||null===(M=k.error)||void 0===M?void 0:M.toString()})]})})}):y?(0,m.jsxs)(h._,{children:[(0,m.jsx)(r.ql,{children:(0,m.jsxs)("title",{children:[w||t("Untitled Playlist")," - Musicdex Radio"]})}),(0,m.jsx)(c.L,{height:"200px",children:(0,m.jsx)(c.N,{banner_url:C||"",height:"200px"})}),(0,m.jsxs)(u.C,{mt:"12",children:[(0,m.jsx)(x.D,{playlist:y,title:w||t("Untitled Playlist"),description:z||"",count:0}),(0,m.jsx)(p.G,{mb:2,playlist:y,hideElement:["addToQueue","delete","edit"],canEdit:!1,editMode:!1,onPlayClick:()=>{$({playlist:y})},onAddQueueClick:()=>{y.content&&P({songs:[...y.content],immediatelyPlay:!1})}}),y.content&&(0,m.jsx)(a.z,{playlist:y,virtualized:!0})]})]}):(0,m.jsx)(d.o,{queryStatus:k,height:"100%",justifyContent:"center"})}}}]);
//# sourceMappingURL=66.6b196be6.chunk.js.map