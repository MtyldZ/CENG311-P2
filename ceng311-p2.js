// UMUT YILDIZ CENG311 P2 : 260201028
// NOTE: This file is used while writing the MIPS assembly file for ceng311 programing assingment 2.


const list = Array(15).fill(0).map((_) => Math.round(Math.random() * 100));
// list is filled with 15 random generated 0-100 integers


function build(list) {
    const root = {
        data: list[0],
        left: null,
        right: null,
        parent: null,
    };

    // slice(1) returns a list without the first value 
    list.slice(1).forEach(number => {
        const insertedNode = insertNode(root, number);
        heapifyReverse(insertedNode);
    });
    printHeap(root);
    console.log("finished");
}


function insertNode(root, number) {
    let level = getLevel(root)[0];
    const newNode = {
        data: number,
        left: null,
        right: null,
        parent: null,
    };
    return insertNodeToLevel(root, newNode, level);
}

function insertNodeToLevel(node, newNode, level) {
    if (level === 0) {
        if (!node.left) {
            newNode.parent = node;
            node.left = newNode;
            return newNode;
        }
        if (!node.right) {
            newNode.parent = node;
            node.right = newNode;
            return newNode;
        }
        return null;
    }
    const left = insertNodeToLevel(node.left, newNode, level - 1);
    if (left) {
        return left;
    }
    const right = insertNodeToLevel(node.right, newNode, level - 1);
    if (right) {
        return right;
    }
}

function heapifyReverse(node) {
    while (node.parent) {
        if (node.data > node.parent.data) {
            const temp = node.data;
            node.data = node.parent.data;
            node.parent.data = temp;
        }
        node = node.parent;
    }
}

function getLevel(node) {
    let left = 0;
    let right = 0;
    let leftNode = {...node};//object destructring for deep copy
    let rightNode = {...node};//object destructring for deep copy

    while (leftNode.left) {
        left++;
        leftNode = leftNode.left;
    }
    while (rightNode.right) {
        right++;
        rightNode = rightNode.right;
    }

    if (right > left) {
        return [left, right];
    }
    return [right, left];
}

function traverseCurrentLevel(node, level) {
    if (!node) {
        return;
    }
    if (level === 0) {
        process.stdout.write(`${node.data} `);
    }
    
    if (level !== 0) {
        const newLevel = level - 1;
        traverseCurrentLevel(node.left, newLevel);
        traverseCurrentLevel(node.right, newLevel);
        
    }
}

function printHeap(root) {
    const level = getLevel(root)[1];
    for (let i = 0; i <= level; i++) {
        process.stdout.write(`level ${i + 1}: `);
        traverseCurrentLevel(root, i);
        console.log()
    }
}

build(list);