class TreeNode {
    static nIdx = 0;
    static nNodes = 0;

    constructor(data = "") {
        this.data = data;
        this.level = 0;
        this.index = 0;
        this.parent = null;
        this.children = [];
        this.x = 0;
        this.y = 0;
    }

    addNode(node) {
        node.parent = this;
        node.level = this.level + 1;
        this.children.push(node);
    }

    findNode(data) {
        if (this.data == data) return this;
        for (let i = 0; i < this.children.length; i++) {
            let found = this.children[i].findNode(data);
            if (found != null) return found;
        }
        return null;
    }

    addNodeAt(data, node) {
        let parent = this.findNode(data);
        if (parent != null) {
            parent.addNode(node);
        }
    }

    count(){
        TreeNode.nNodes++;
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].count();
        }
    }

    updateIndex() {
        for (let i = 0; i < this.children.length; i++) {
            if (i > 0) TreeNode.nIdx++;
            this.children[i].index = TreeNode.nIdx;
            this.children[i].updateIndex(TreeNode.nIdx);
        }
    }

    layout(hMargin = 25, vMargin = 25) {
        this.y = this.level * hMargin;
        if (this.children.length > 0) {
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].layout();
            }
            this.x = (this.children[0].x + this.children[this.children.length - 1].x) / 2;
        } else {
            this.x = this.index * vMargin;
        }
        // console.log(this.data, this.x, this.y);
    }

    draw(nodeSize) {
        for (let i = 0; i < this.children.length; i++) {
            line(this.x + 5, this.y + 5, this.children[i].x + 5, this.children[i].y + 5);
            this.children[i].draw(nodeSize);
        }

        rect(this.x, this.y, nodeSize, nodeSize);
        text(this.data, this.x + 2, this.y + 12);
    }

    findNodeAt(x, y) {
        if (x > this.x && x < this.x + 15 && y > this.y && y < this.y + 15) {
            return this;
        }
        for (let i = 0; i < this.children.length; i++) {
            let found = this.children[i].findNodeAt(x, y);
            if (found != null) return found;
        }
        return null;
    }   
}