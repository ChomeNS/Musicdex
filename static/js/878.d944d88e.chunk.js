"use strict";(globalThis.webpackChunkmusicdex=globalThis.webpackChunkmusicdex||[]).push([[878],{48073:(t,e,i)=>{i.d(e,{L:()=>l,N:()=>o});var n=i(29548);const l=n.Z.div`
  width: 100%;
  position: absolute;
  z-index: 0;
  pointer-events: none;
  left: 0px;
  top: 0px;
  height: ${t=>{let{height:e}=t;return e}};
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
`,o=n.Z.div`
  width: 105%;
  width: calc(100% + 16px);
  position: absolute;
  pointer-events: none;
  z-index: 0;
  left: -8px;
  top: -8px;
  height: ${t=>{let{height:e}=t;return e}};
  background: url(${t=>{let{banner_url:e}=t;return e}});
  background-position: center;
  background-size: cover;
  ${t=>{let{blur:e}=t;return e&&"filter: blur(8px);"}}
`},58878:(t,e,i)=>{i.r(e),i.d(e,{default:()=>w});var n=i(30967),l=i(28735),o=i(72791),s=i(6907),d=i(37734),r=i(16871),a=i(7267),c=i(89825),u=i(48073),h=i(6177),v=i(96084),p=i(28487),x=i(42708),g=i(77810),b=i(93040),j=i(25090),y=i(62461),k=i(52587),m=i(73436),f=i(80184);const S=o.lazy((()=>Promise.all([i.e(434),i.e(117)]).then(i.bind(i,80117)))),C=o.lazy((()=>Promise.all([i.e(694),i.e(716)]).then(i.bind(i,31716))));function w(){var t,e,i,w,z,P,E,L;const{t:A}=(0,d.$)();let U=(0,r.UO)().playlistId,{user:$,isLoggedIn:M}=(0,g.m8)();const{data:F,...I}=(0,j.ZW)(U),{mutateAsync:N}=(0,j.t8)(),[T,Z]=(0,o.useState)(!1);(0,o.useEffect)((()=>{Z(!1)}),[U]);const _=(0,b.FA)(),{banner:q,title:D,description:W}=(0,o.useMemo)((()=>F&&{banner:_("bannerImage",F),title:_("title",F),description:_("description",F)}||{}),[_,F]),X=(0,m.U)(),G=(0,y.WX)((t=>t.playback.setPlaylist));(0,k.S)({actions:["playPlaylist"],playlist:F},[F]);const[K,O]=(0,o.useState)(),[Q,Y]=(0,o.useState)(),[B,H]=(0,o.useState)();(0,o.useEffect)((()=>{T||(O(void 0),Y(void 0),H(void 0))}),[T]);const J=(0,n.pm)(),R=(0,o.useCallback)((async(t,e,i)=>{if(void 0!==t||void 0!==e||void 0!==i){const n={...F,content:t,title:void 0!==e?e:null===F||void 0===F?void 0:F.title,description:void 0!==i?i:null===F||void 0===F?void 0:F.description};N(n).then((t=>{J({variant:"subtle",status:"success",title:A("Saved"),duration:1500,position:"top-right"}),Z(!1)}),(t=>{J({variant:"solid",status:"error",title:A("Failed to Save"),description:t,position:"top-right",isClosable:!0}),Z(!1)}))}else Z(!1)}),[F,J,N,A]);var V;return I.error&&(null===I||void 0===I||null===(t=I.error)||void 0===t?void 0:t.status)>=400?(0,f.jsx)(l.xu,{pt:"10vh",px:6,children:(0,f.jsx)(l.M5,{role:"alert",my:10,children:(0,f.jsxs)(l.gC,{spacing:4,children:[(0,f.jsx)(l.X6,{children:A("You do not have access to this playlist (or it doesn't exist)")}),(0,f.jsx)(l.EK,{children:null===I||void 0===I||null===(V=I.error)||void 0===V?void 0:V.toString()})]})})}):F?(0,f.jsxs)(v._,{children:[(0,f.jsx)(s.ql,{children:(0,f.jsxs)("title",{children:[D||A("Untitled Playlist")," - Musicdex"]})}),(0,f.jsx)(u.L,{height:"200px",children:(0,f.jsx)(u.N,{banner_url:q||"",height:"200px"})}),(0,f.jsxs)(h.C,{mt:"12",children:[T?(0,f.jsx)(o.Suspense,{fallback:(0,f.jsx)("div",{children:A("Loading...")}),children:(0,f.jsx)(S,{title:D||A("Untitled Playlist"),description:W||"",setDescription:t=>{Y(t)},setTitle:t=>{O(t)},count:null!==(e=null===B||void 0===B?void 0:B.length)&&void 0!==e?e:(null===F||void 0===F||null===(i=F.content)||void 0===i?void 0:i.length)||0,totalLengthSecs:null===(w=F.content)||void 0===w?void 0:w.reduce(((t,e)=>t+e.end-e.start),0)})}):(0,f.jsx)(x.D,{title:D||A("Untitled Playlist"),description:W||"",count:null!==(z=null===F||void 0===F||null===(P=F.content)||void 0===P?void 0:P.length)&&void 0!==z?z:0,totalLengthSecs:null===(E=F.content)||void 0===E?void 0:E.reduce(((t,e)=>t+e.end-e.start),0),playlist:F}),(0,f.jsx)(p.G,{mb:2,playlist:F,canEdit:M&&F.owner===(null===$||void 0===$?void 0:$.id),canStar:M&&F.owner!==(null===$||void 0===$?void 0:$.id),editMode:T,onPlayClick:()=>{G({playlist:F})},onAddQueueClick:()=>{F.content&&X({songs:[...F.content],immediatelyPlay:!1})},onEditClick:()=>{Z(!0)},onFinishEditClick:()=>R(B,K,Q),onAbortEditClick:()=>Z(!1)}),null!==(L=F.content)&&void 0!==L&&L.length?T?(0,f.jsx)(o.Suspense,{fallback:(0,f.jsx)("div",{children:A("Loading...")}),children:(0,f.jsx)(C,{songs:F.content,songsEdited:H})}):(0,f.jsx)(c.z,{playlist:F,virtualized:!0}):(0,f.jsx)(l.kC,{grow:1,align:"center",justify:"center",children:(0,f.jsx)(l.xv,{fontSize:"2xl",color:"whiteAlpha.500",children:A("No Songs")})})]})]}):(0,f.jsx)(a.o,{queryStatus:I,height:"100%",justifyContent:"center"})}}}]);
//# sourceMappingURL=878.d944d88e.chunk.js.map