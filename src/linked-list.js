// Идея - https://www.internet-technologies.ru/articles/strukturirovanie-dannyh-s-pomoschyu-javascript-spiski.html
const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;   // Элемент в начале списка
        this._tail = null;   // Элемент в конце списка
        this.length = 0;    // Длина списка
    }

    append(data) {
        const node = new Node(data);        
        (!this.length) ? (this._head = node, this._tail = node) : (node.prev = this._tail, this._tail.next = node, this._tail = node);
        this.length ++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {             
        return this.searchByIndex(index).data;       
    }

    searchByIndex(index) {
        let currentNode = this._head;                       
        if (this.length === 0 || index < 0 || index > this.length) {
            return null;
        }
        for(let count = 0; count < index; count++) {
            currentNode = currentNode.next;                        
        }
        return currentNode;       
    }

    insertAt(index, data) {        
        if (this.length === 0 || index < 0 || index > this.length) {
            return null;
        }
        let [insertNode, currentNode] = [new Node(data), this.searchByIndex(index)];
        if(index==0) { // Если нужно вставить на первое место         
            this._head.prev = insertNode; // Вставляем перед текущим указателем начала списка
            insertNode.next = this._head; // Назначаем указатель вперед на текущий начальный элемент списка 
            this._head = insertNode; // Перемещаем указатель начала списка на новый элемент
        } else {
            [insertNode.prev, insertNode.next] = [currentNode.prev,  currentNode]; // Вставляем элемент перед текущим
            [currentNode.prev.next, currentNode.prev] = [insertNode, insertNode]; // Привязываем указатели крайних элементов на вставленный элемент     
        }
        this.length ++;   
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        while(this._tail.prev) { // Обнуляем указатели с конца до начала
            [this._tail, this._tail.next] = [this._tail.prev, null];           
        }
        [this._head.data, this._tail.data, this.length] = [null, null, 0];               
        return this;
    }

    deleteAt(index) {
        if(index < 0 || index > this.length)  { return null;}
        let nodeToDelete = this.searchByIndex(index);
        (index == 0) ? 
        (this.length == 1) ? this._head.data = null : [this._head, this._head.prev] = [this._head.next, null] :        
        (nodeToDelete == this._tail) ? 
        [this._tail, this._tail.next] = [this._tail.prev, null] : 
        [nodeToDelete.prev.next, nodeToDelete.next.prev] = [nodeToDelete.next, nodeToDelete.prev];        
        this.length --;  
        return this;
    }

    reverse() {
        let [currentNode, tempNode ] = [this._head, null]; // Предыдущий - null, последующий элемент указывает на начало списка      
        while(currentNode) {
            [currentNode.prev, currentNode.next] = [currentNode.next, tempNode]; // Меняем указатели местами у текущего элемента             
            tempNode = currentNode; // Сохраняем промежуточное значение для последующих циклов
            currentNode = currentNode.prev; // Меняем значение
        }
        this._tail = this._head; // Перекидываем голову в хвост        
        this._head = tempNode;   // Новая голова равна предыдущему элементу       
        return this;
    }

    indexOf(data) {
        let [node, index] = [this._head, 0];        
        while(node) {
            if(node.data == data) return index;            
            node = node.next;
            index ++;
        }         
        return -1;
    }
}

module.exports = LinkedList;
