export const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export const other=p=>p==='X'?'O':'X';

export function winner(b){
  for(const l of LINES){const [a,c,d]=l; if(b[a]&&b[a]===b[c]&&b[a]===b[d]) return {p:b[a],line:l};}
  return null;
}
export function minimax(b,turn,ai,d){
  const w=winner(b);
  if(w) return w.p===ai?10-d:d-10;
  if(b.every(Boolean)) return 0;
  let best=turn===ai?-99:99;
  for(let i=0;i<9;i++){
    if(b[i]) continue;
    b[i]=turn;
    const s=minimax(b,other(turn),ai,d+1);
    b[i]=null;
    best=turn===ai?Math.max(best,s):Math.min(best,s);
  }
  return best;
}
export function bestMove(board,p){
  let best=-99,moves=[];
  board.forEach((v,i)=>{
    if(v) return;
    const b=board.slice(); b[i]=p;
    const s=minimax(b,other(p),p,1);
    if(s>best){best=s;moves=[i]} else if(s===best) moves.push(i);
  });
  return moves[Math.floor(Math.random()*moves.length)];
}
export function aiMove(board,p,level){
  const chance={easy:.6,medium:.25,hard:0}[level];
  if(Math.random()<chance){
    const e=[];board.forEach((v,i)=>{if(!v)e.push(i)});
    return e[Math.floor(Math.random()*e.length)];
  }
  return bestMove(board,p);
}
