/**
 * @description Dumb Component. Input and List of existing categories
 */
import React, {Component}   from 'react';
import classNames           from 'classnames';
import deepcopy             from 'deepcopy'

//components
import Tree                 from 'react-ui-tree';
import Node                 from './Node';

import createNodeId         from './../../helpers/createNodeId';


import '../../css/react-ui-tree.css';
import './CategorieSection.css';

export default class CategorySection extends Component {

    constructor(){
        super();
    }

    render() {
        const {value} = this.props;
        const {
            input,
            treeList,
            selectedNode
        } = value;


        return <div className="categories_wrapper">
            <div className="left_block">
                <label htmlFor="input">
                    Add heading
                </label>
                <div className="input-group">
                    <input
                        value={input}
                        type="text"
                        className="form-control"
                        onChange={ e => this.onInputChange(e) }
                        onKeyPress={ e => this.onKeyPress(e) }
                        placeholder=""/>

                    <span className="input-group-btn">
                        <button className="btn btn-default"
                                type="button"
                                onClick={ () => this.onAddButton() }>
                            Add
                        </button>
                    </span>

                </div>
                {

                    treeList && <Tree paddingLeft={20}
                                      tree={treeList}
                                      onChange={e => this.onTreeChange(e)}
                                      renderNode={ node => this.renderNode(node) } />
                }
            </div>
            {
                ( selectedNode && !selectedNode.headline && selectedNode.edit ) &&   <div className="right_block">
                                        <h4>Set up { selectedNode.module }</h4>
                                        <div className="form-group">
                                            <label >Icon URL:</label>
                                            <input type="text"
                                                   className="form-control"
                                                   value={ selectedNode.iconUrl }
                                                   onChange={ (e) => this.onIconInputChange(e) }/>
                                        </div>
                                        <div className="form-group">
                                            <label >Priority:</label>
                                            <input type="text"
                                                   className="form-control"
                                                   value={ selectedNode.priority }
                                                   onChange={ (e) => this.onPriorityInputChange(e) }/>
                                        </div>
                                        <button className="btn btn-info"
                                                onClick={() => this.onNodeSave()}>
                                             Save
                                        </button>
                                        <button className="btn btn-danger"
                                                type="button"
                                                onClick={ () => this.onNodeDelete() }>
                                            Delete Item
                                        </button>
                                    </div>
            }
            {
                ( selectedNode && selectedNode.headline && selectedNode.edit ) && <div className="right_block">
                    <h4>Set up { selectedNode.module }</h4>

                    <div className="form-group">
                        <label >Heading name:</label>
                        <input type="text"
                               className="form-control"
                               value={ selectedNode.module }
                               onChange={ (e) => this.onHeadingInputChange(e) }/>
                    </div>

                    <button className="btn btn-info"
                            onClick={() => this.onNodeSave()}>
                        Save
                    </button>

                    <button className="btn btn-danger"
                            type="button"
                            onClick={ () => this.onNodeDelete() }>
                        Delete Item
                    </button>

                </div>
            }
        </div>
    }

    //////////////////////////////////////////////////////////
    // CALLBACKS
    /////////////////////////////////////////////////////////

    /**
     * on node click show ...
     * @param node - element
     */
    onNodeClick(node) {

      console.log('node: ',node)

        this.setState({
            selectedNode: node
        });

        const newValue = {
            ...this.props.value,
            selectedNode: node
        };

        this.props.onChange({
            value: newValue
        });
    }

    /**
     * Create tree Node
     * @param node - tree object
     * @returns {XML} - node html
     */
    renderNode(node){
        const {selectedNode} = this.props.value;

        const isActive = selectedNode && node.id === selectedNode.id;

        // console.log('node check: ', isActive, selectedNode )

        return <Node module={node.module}
                     onClick={ () => this.onNodeClick(node) }
                     isDefault={node.isDefault}
                     isActive={isActive}/>;

    }



    /**
     * Save to tree selectedNode
     */
    onNodeSave(){
        const treeList = deepcopy(this.props.value.treeList);

        const {selectedNode} = this.props.value;

        this.findNode(treeList, selectedNode.id, node => {
            node.iconUrl = selectedNode.iconUrl;
            node.priority = selectedNode.priority;
            node.module = selectedNode.module;
        });

        const newValue = {
            ...this.props.value,
            selectedNode: null,
            treeList: treeList
        };

        this.props.onChange({
            value: newValue
        });
    }

    /**
     * om button click, delete current node from tree
     */
    onNodeDelete() {
        const treeList = deepcopy(this.props.value.treeList);

        const {selectedNode} = this.props.value;

        swal({
            title: "Are you sure?",
            text: "Element will be deleted with all subordinate items",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "No, cancel",
            closeOnConfirm: false,
            closeOnCancel: false },

            (isConfirm) => {
                if (isConfirm) {
                    swal("Deleted!", "Category successfuly deleted.", "success");

                    this.deleteNode(treeList, selectedNode.id);

                    const newValue = {
                        ...this.props.value,
                        treeList: treeList,
                        selectedNode: null
                    };


                    this.props.onChange({
                        value: newValue
                    });

                } else {
                    swal("Cancelled", "Category will save", "error");
                }
            });
    }

    /**
     * find in tree selectedNode
     * @param node - tree element
     * @param id - selectedNode.id
     * @param callback
     */
    findNode(node, id, callback){
        if (node){
            if (node.id === id){
                callback(node);
            }

            if (Array.isArray(node.children)){
                node.children.forEach(childNode => this.findNode(childNode, id, callback));
            }
        }
    }

    deleteNode(node, id){
        if (node){
            if (Array.isArray(node.children)){
                node.children = node.children.filter(childNode => childNode.id != id);

                node.children.forEach(childNode => this.deleteNode(childNode, id));
            }
        }
    }

    /**
     * change iconInput view on input change
     * @param e - event
     */
    onIconInputChange(e){
        const {selectedNode} = this.props.value;

        const newValue = {
            ...this.props.value,

            selectedNode: {
                ...selectedNode,
                iconUrl: e.target.value
            }
        };

        this.props.onChange({
            value: newValue
        });
    }

    /**
     * change heading name
     * @param e - event
     */
    onHeadingInputChange(e){
        const {selectedNode} = this.props.value;

        const newValue = {
            ...this.props.value,

            selectedNode: {
                ...selectedNode,
                module: e.target.value
            }
        };

        this.props.onChange({
            value: newValue
        });
    }

    /**
     * change priorityInput view on input change
     * @param e - event
     */
    onPriorityInputChange(e){
        if( e.target.value == '' || isANumber(e.target.value)) {
            const newValue = {
                ...this.props.value,
                selectedNode: {
                    ...this.props.value.selectedNode,
                    priority: e.target.value
                }
            };

            this.props.onChange({
                value: newValue
            });
        }
    }

    /**
     * Change value of input
     * @param e - event
     */
    onInputChange(e){
        const newValue = {
            ...this.props.value,
            input: e.target.value
        };

        this.props.onChange({
            value: newValue
        });
    }

    /**
     * Change Root state on Tree change
     * @param tree
     */
    onTreeChange(tree) {

      // console.log('tree: ', tree);

      //refreshing categories
      tree.children = tree.children.map( child => {

      child.children = child.children.map( category => {

        category.headline = false;
        category.isDefault = true;

         return category;
      })

      return child;

      })


        const newValue = {
            ...this.props.value,
            treeList: tree
        };

        this.props.onChange({
            value: newValue
        });
    }

    /**
     * on button click, add new tree node
     */
    onAddButton(){
        if( this.props.value.input.length !== 0 ) {
            const newValue = {
                ...this.props.value,
                treeList: {
                    ...this.props.value.treeList,
                    children: [
                        ...this.props.value.treeList.children,
                        createTreeNode(this.props.value.input, 'heading')
                    ]
                },
                input: ''
            };

            this.props.onChange({
                value: newValue
            });
        }
    }



    /**
     * on input typing watch 'enter' press and then add new tree node
     * @param e
     */
    onKeyPress(e){
        (e.key === 'Enter') && this.onAddButton()
    }
}

/**
 * Create new tree item
 * @param name - category.name
 * @param className - class name (default - "default")
 * @returns {{module: *, children: Array, className: string}}
 */
function createTreeNode(name, className = "default"){
    return {
        id: createNodeId(),
        module: name,
        children: [],
        isDefault: false,
        iconUrl: '',
        priority: '',
        headline: true,
        active: false,
        edit: true
    };
}

/**
 * check if value is Number
 * @param n - value
 * @returns {boolean} - true/false
 */
function isANumber( n ) {
    var numStr = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;
    return numStr.test( n.toString() );
}
