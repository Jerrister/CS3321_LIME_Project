

export const textStyle = collapsed => ({
    color: 'black',
    fontWeight: 'bold',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: collapsed ? 0 : '100%', // 控制最大宽度以隐藏或显示文字
    opacity: collapsed ? 0 : 1, // 控制透明度以隐藏或显示文字
    transition: 'max-width 0.3s ease-out, opacity 0.3s ease-out', // 平滑过渡动画
  });

export const logo_stype = 
 (
    {height: '49px', margin: '16px', background: 'rgba(255, 255, 255, 0.3)',   display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'start', 
    padding: '6px 6px 6px 6px', 
    margin: '9px', 
    background: '#f0f0f0', 
    borderRadius: '10px',  }
 );


export default function logo_f(collapsed){
    return (
    <div style={textStyle(collapsed)}>
    <div style={{ marginLeft: '10px', color: 'rgb(74 87 36)', fontWeight: 'bold' , fontSize:'16px'}}>  <span style={{color:"rgb(125 193 10)"}}>Li</span><span style={{color:'rgb(74 87 36)'}} >terature Note</span>  </div>
    <div style={{ marginLeft: '10px', color: 'rgb(74 87 36)', fontWeight: 'bold' }}>  <span style={{color:"rgb(125 193 10)"}}>M</span><span style={{color:'rgb(74 87 36)'}} >anager syst</span><span style={{color:"rgb(125 193 10)"}}>E</span><span style={{color:'rgb(74 87 36)'}} >m</span></div>

    </div>

    );
}

