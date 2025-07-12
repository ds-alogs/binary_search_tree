'use client';

import './styles.css';
import { useState } from 'react';
import TreeNode from './TreeNode';
import TraversalPopup from './TraversalPopup';

export default function Page() {
  const [name, setName] = useState('Rahul Borole');
  const [number, setNumber] = useState('8149625856');
  const [tree, setTree] = useState<any>(null);
  const [searchNumber, setSearchNumber] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [traversalData, setTraversalData] = useState<any[]>([]);
  const [currentTraversalType, setCurrentTraversalType] = useState<
    'preOrder' | 'postOrder' | 'inOrder'
  >('preOrder');

  const searchNumberInTree = async (value: string) => {
    try {
      const response = await fetch('/api/bst/searchNode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: value }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while searching tree:', error);
      return { status: 'error' };
    }
  };

  // Handler for input change
  const handleSearchNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const result = await searchNumberInTree(value);
    if (result.status === 'success') {
      setSearchNumber(value);
    }
  };

  const getTree = () => {
    fetch('/api/bst/getTree')
      .then((response) => response.json())
      .then((data) => {
        setTree(data.tree ? data.tree : null);
      })
      .catch((error) => {
        console.error('Error while fetching tree:', error);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/bst/insertNode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, number }),
    })
      .then((response) => response.json())
      .then((data) => {
        // clear input fields after submission
        setName('');
        setNumber('');

        getTree();
      })
      .catch((error) => {
        console.error('Error while inserting node:', error);
      });
  };

  // Helper to count nodes in the tree
  const getTreeLength = (node: any): number => {
    if (!node) return 0;
    return 1 + getTreeLength(node.left) + getTreeLength(node.right);
  };

  // Helper to get tree height
  const getTreeHeight = (node: any): number => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
  };

  // Handle preorder/postorder/inorder traversal
  const handlePrePostOrderTraversal = async (
    traversalType: 'preOrder' | 'postOrder' | 'inOrder'
  ) => {
    try {
      setCurrentTraversalType(traversalType);
      let endpoint = '';

      switch (traversalType) {
        case 'preOrder':
          endpoint = '/api/bst/preorderTraversal';
          break;
        case 'postOrder':
          endpoint = '/api/bst/postorderTraversal';
          break;
        case 'inOrder':
          endpoint = '/api/bst/inorderTraversal';
          break;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.data) {
        setTraversalData(data.data);
        setIsPopupVisible(true);
      } else {
        setTraversalData([]);
        setIsPopupVisible(true);
      }
    } catch (error) {
      console.error(`Error while fetching ${traversalType} traversal:`, error);
    }
  };

  // Close popup
  const closePopup = () => {
    setIsPopupVisible(false);
    setTraversalData([]);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h2>Add Contact</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Number:
            <input
              type="text"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <hr />
          <div className="button-row">
            <label htmlFor="searchNumberInput">Search Number:</label>
            <input
              id="searchNumberInput"
              type="text"
              name="number"
              onChange={(e) => handleSearchNumberChange(e)}
            />
          </div>

          <hr />
          <button
            type="button"
            onClick={() => handlePrePostOrderTraversal('preOrder')}
            className="traversal-button"
          >
            Pre order traversal
          </button>
          <button
            type="button"
            onClick={() => handlePrePostOrderTraversal('postOrder')}
            className="traversal-button"
          >
            Post order traversal
          </button>
          <button
            type="button"
            onClick={() => handlePrePostOrderTraversal('inOrder')}
            className="traversal-button"
          >
            In order traversal
          </button>
        </form>
      </div>

      <div className="right-panel">
        <div className="button-row green-text">
          <h2>Phone Directory (Binary Tree), </h2>
          <div>Tree Length - {tree ? getTreeLength(tree) : 0},</div>
          <div>Tree Height - {tree ? getTreeHeight(tree) : 0}</div>
        </div>
        <div className="button-row left-child">RED - Left Child</div>
        <div className="button-row right-child">GREEN - Right Child</div>
        <div className="tree-view">
          {tree ? (
            <TreeNode node={tree} searchNumber={searchNumber} />
          ) : (
            <p>No contacts yet.</p>
          )}
        </div>
      </div>

      <TraversalPopup
        isVisible={isPopupVisible}
        onClose={closePopup}
        traversalData={traversalData}
        traversalType={
          currentTraversalType === 'preOrder'
            ? 'Pre-order'
            : currentTraversalType === 'postOrder'
            ? 'Post-order'
            : 'In-order'
        }
      />
    </div>
  );
}
