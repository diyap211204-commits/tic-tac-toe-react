const mk=(page,panel,ink,muted,board,tile,edge,x,o,win,btn,btnInk,chip)=>({page,panel,ink,muted,board,tile,'tile-edge':edge,x,o,win,btn,'btn-ink':btnInk,chip});
export const THEMES=[
 {id:'sunset',name:'Sunset',v:mk('#ffe3d1','#ffffff','#4a1f2b','#9a5d6b','#5a1e3a','#7a2a50','#3a1226','#ff9a3c','#ff4f8b','#ffd23f','#4a1f2b','#ffe9dc','#ffcfb5'),sw:['#5a1e3a','#ff9a3c']},
 {id:'teal',name:'Teal',v:null,sw:['#0f5c57','#f26a1b']},
 {id:'candy',name:'Candy',dark:0,v:mk('#ffc93c','#fff3d6','#2b2147','#6b5a8e','#fff3d6','#fffaf0','#e2c890','#ff4d6d','#2d9cdb','#3ddc97','#2b2147','#fff3d6','#ffe3a1'),sw:['#ffc93c','#ff4d6d']},
 {id:'grape',name:'Grape',v:mk('#ece4fb','#ffffff','#2b1d52','#6d5aa6','#3b2a78','#5340a0','#231852','#ff6b6b','#2fd4c8','#ffd23f','#2b1d52','#f1eaff','#d9ccf5'),sw:['#3b2a78','#ff6b6b']},
 {id:'ocean',name:'Ocean',v:mk('#dbeefb','#ffffff','#0b2a4a','#4a7094','#0b4f8a','#1a6bb0','#073560','#ff8a1f','#ff5c93','#ffd23f','#0b2a4a','#e6f3ff','#bddcf3'),sw:['#0b4f8a','#ff8a1f']},
 {id:'mono',name:'Graphite',v:mk('#ececec','#ffffff','#1a1a1a','#666666','#222222','#3a3a3a','#0e0e0e','#ff6a3d','#4cc2ff','#ffd23f','#1a1a1a','#f5f5f5','#dcdcdc'),sw:['#222222','#ff6a3d']},
 {id:'midnight',name:'Midnight',dark:1,v:mk('#0d0f1a','#181c30','#e9ecff','#8f97c9','#05060d','#1b2040','#02030a','#4de1c2','#ff6b9a','#ffd23f','#4de1c2','#05060d','#262c52'),sw:['#05060d','#4de1c2']}
];
