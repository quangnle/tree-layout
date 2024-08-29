class Tree {
    constructor(rootName, x, y, hMargin = 25, vMargin = 25, nodeSize = 10) {
        this.x = x;
        this.y = y;
        this.hMargin = hMargin;
        this.vMargin = vMargin;
        this.nodeSize = nodeSize;        
        this.root = new TreeNode(rootName);
    }
    
    findNodeAt(x, y){
        return this.root.findNodeAt(x, y);  
    }

    resetLayout() {
        TreeNode.nIdx = 0;
        this.root.updateIndex();
        this.root.layout(this.hMargin, this.vMargin);
    }

    addNodeAt(parentName, nodeName) {
        this.root.addNodeAt(parentName, new TreeNode(nodeName));
        this.resetLayout();
    }

    draw() {
        push();
        translate(this.x, this.y);
        this.root.draw(this.nodeSize);
        pop();
    }

    onMousePressed(mx, my) {
        let node = this.findNodeAt(mx - this.x, my - this.y);
        if (node != null) {
            if (mouseButton === LEFT) {
                TreeNode.nNodes = 0;
                this.root.count();
                this.addNodeAt(node.data, `${TreeNode.nNodes}`);
            } else if (mouseButton === RIGHT) {                
                if (node.parent != null) {
                    let parent = node.parent;
                    let idx = parent.children.indexOf(node);
                    parent.children.splice(idx, 1);
                    this.resetLayout();
                }
            }
        }        
    }
}