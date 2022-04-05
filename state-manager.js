class StateManager {

    actions = {
        'ADD_ONE': (state) => {
            return state + 1;
        },
        'REMOVE_ONE': (state) => {
            return state - 1;
        }
    };

    constructor(startingState) {
        this.startingState = startingState;
        this.state = startingState;
        this.actionList = [];
        this.actionsIndex = 0;

        window.addEventListener('plus-one', (e) => this.addOne());
        window.addEventListener('minus-one', (e) => this.removeOne());
        window.addEventListener('undo-action', (e) => this.undo());
        window.addEventListener('redo-action', (e) => this.redo());
    };

    addOne() {
        this.resetFuture();
        this.actionList.push('ADD_ONE');
        this.actionsIndex++;
        this.limitActionsList();
        console.log(this.actionList);
        this.reducer();
    }

    removeOne() {
        this.resetFuture();
        this.actionList.push('REMOVE_ONE');
        this.actionsIndex++;
        this.limitActionsList();
        console.log(this.actionList);
        this.reducer();
    }

    reducer() {
        this.state = this.actionList.reduce((state, action, i) => {
            return i < this.actionsIndex ? this.actions[action](state) : state;
        }, this.startingState);
        console.log(this.state);
        dispatchEvent(new CustomEvent('state-update', { detail: this.state }));
    }

    resetFuture() {
        this.actionList = this.actionList.slice(0, this.actionsIndex);
    }

    undo() {
        if (this.actionsIndex > 0) {
            this.actionsIndex--;
            this.reducer();
        }

    }

    redo() {
        if (this.actionsIndex < this.actionList.length) {
            this.actionsIndex++;
            this.reducer();
        }

    }

    limitActionsList() {
        if (this.actionList.length > 3) {
            this.lostAction = this.actionList.slice(0, 1);
            this.actionList = this.actionList.slice(1, this.actionList.length);
            this.actionsIndex--;
            const actionName = this.lostAction[0];
            this.startingState = this.actions[actionName](this.startingState);
        }
    }

    reset() {
        this.actionList = [];
        this.actionsIndex = 0;
        this.startingState = this.state;
    }
}