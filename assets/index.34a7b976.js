/* empty css              *//* empty css              */import{e as g,u as v,f as _,g as y,o as r,c as p,b as e,h as t,n as w,i as h,j as B,k as C,l as E,m as S,r as z,a,w as c,p as T,q as x,I,s as V,d as f,B as $,T as D}from"./index.bd6e3807.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";const L=["xlink:href","fill"],N=g({props:{prefix:{type:String,default:"icon"},name:{type:String,required:!0},color:{type:String,default:"#333"},size:{type:String,default:"default"}},setup(l){const s=l;v(d=>({"695b92d0":t(o).default,"3fdbd32e":l.color,"61c01f1e":t(o).small,"61584552":t(o).large}));const n=_(()=>`#${s.prefix}-${s.name}`),i=_(()=>({[`sdms-size-${s.size}`]:s.size})),o=y({default:"32px",small:"20px",large:"48px"});return(d,u)=>(r(),p("svg",{"aria-hidden":"true",class:w(["svg-icon-spin",t(i)])},[e("use",{"xlink:href":t(n),fill:l.color},null,8,L)],2))}});var M=F(N,[["__scopeId","data-v-9f7d4108"]]);const q={class:"antialiased bg-white Male text-slate-500 dark:text-slate-400 dark:bg-slate-900"},A={class:"sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"},j={class:"mx-auto max-w-8xl"},H={class:"px-4 py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10"},K={class:"relative flex items-center text-2xl sm:text-2xl font-blimone"},U=f(" LunarCoreTools"),G={class:"relative items-center hidden ml-auto lg:flex"},J={class:"text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200"},O={class:"flex space-x-8"},P=e("li",null,[e("a",{href:"https://www.morax.top/",target:"_bank",class:"block ml-6 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"}," Blog ")],-1),Q={key:0},R=f(" Console "),W={class:"flex items-center pl-6 ml-6 border-l border-slate-200 dark:border-slate-800"},X={href:"https://github.com/moraxs/LunarCoreTools",target:"_bank",class:"block ml-6 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"},oe=g({setup(l){h("I want to study typescript"),window.matchMedia("(prefers-color-scheme: dark)");const s=B();C();const n=_(()=>s.theme),i=E({selector:"body",attribute:"arco-theme",valueDark:"dark",valueLight:"light",storageKey:"arco-theme",onChanged(u){s.toggleTheme(u)}}),o=S(i),d=h(!0);return(u,Y)=>{const m=z("router-link"),k=$,b=D;return r(),p("header",q,[e("div",A,[e("div",j,[e("div",H,[e("div",K,[a(m,{to:"/",class:"mr-3 flex-none w-[2.0625rem] md:w-auto leading-6 dark:text-slate-200"},{default:c(()=>[U]),_:1}),e("div",G,[e("nav",J,[e("ul",O,[P,d.value?(r(),p("li",Q,[a(m,{to:"/start/login",class:"hover:text-sky-500 dark:hover:text-sky-400"},{default:c(()=>[R]),_:1})])):T("",!0)])]),e("div",W,[a(b,{content:t(n)==="light"?"\u8BBE\u7F6E\u6697\u9ED1\u4E3B\u9898":"\u8BBE\u7F6E\u660E\u4EAE\u4E3B\u9898"},{default:c(()=>[a(k,{size:"mini",class:"nav-btn",type:"outline",shape:"circle",onClick:t(o)},{icon:c(()=>[t(n)==="dark"?(r(),x(t(I),{key:0})):(r(),x(t(V),{key:1}))]),_:1},8,["onClick"])]),_:1},8,["content"]),e("a",X,[a(M,{name:"svg-github",size:"small",color:"#999999"})])])])])])])])])}}});export{oe as _};