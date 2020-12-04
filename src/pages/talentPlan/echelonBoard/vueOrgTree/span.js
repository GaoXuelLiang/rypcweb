

function Span(){
    let aaa = document.getElementsByClassName('org-tree-node-children');
    let bbb = document.getElementsByClassName('org-tree-node');
    let ccc = document.createElement('span')
    ccc.innerHTML = 'span节点'
    for( let i = 0;i < bbb.length;i++ ){
    console.log(aaa[0])
    aaa[0].insertBefore(ccc.cloneNode(true),bbb[i]);
    }
}

export { Span };
